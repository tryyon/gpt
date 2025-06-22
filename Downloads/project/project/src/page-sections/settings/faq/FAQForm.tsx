'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Typography, // Added for helperText on Select
  FormHelperText // Added for helperText on Select, alternative to Typography
} from '@mui/material';
import { faqSchema, type FAQ } from '@/lib/validations/content';

interface FAQFormProps {
  onSubmit: (data: FAQ) => void;
  initialData?: FAQ | null;
  onCancel: () => void;
}

const categories = [
  { value: 'general', label: 'General' },
  { value: 'orders', label: 'Orders' },
  { value: 'payments', label: 'Payments' },
  { value: 'shipping', label: 'Shipping' },
  { value: 'returns', label: 'Returns' },
  { value: 'account', label: 'Account' },
];

export function FAQForm({ onSubmit, initialData, onCancel }: FAQFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FAQ>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      // Ensure these match your FAQ type and Zod schema expectations.
      // If `id` is generated, `undefined` or `null` might be better for new entries.
      id: initialData?.id || '',
      title: initialData?.title || '',
      items: initialData?.items || [],
      // For date fields, convert to Date objects initially
      dateCreated: initialData?.dateCreated ? new Date(initialData.dateCreated) : new Date(),
      lastUpdated: initialData?.lastUpdated ? new Date(initialData.lastUpdated) : new Date(),
    },
  });

  return (
    <>
      <DialogTitle>
        {initialData ? 'Edit FAQ' : 'Add FAQ'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" id="faq-form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>

            {/* Render FAQ items if they exist in initialData */}
            {initialData?.items && initialData.items.map((item, index) => (
              <Grid item xs={12} key={index}>
                <Typography variant="h6" sx={{ mb: 2 }}>Item {index + 1}</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Controller
                      name={`items.${index}.question`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Question"
                          fullWidth
                          error={!!errors.items?.[index]?.question}
                          helperText={errors.items?.[index]?.question?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name={`items.${index}.answer`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Answer"
                          fullWidth
                          multiline
                          rows={4}
                          error={!!errors.items?.[index]?.answer}
                          helperText={errors.items?.[index]?.answer?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name={`items.${index}.category`}
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.items?.[index]?.category}>
                          <InputLabel>Category</InputLabel>
                          <Select {...field} label="Category">
                            {categories.map(category => (
                              <MenuItem key={category.value} value={category.value}>
                                {category.label}
                              </MenuItem>
                            ))}
                          </Select>
                          {/* Correctly display error message for Select */}
                          {errors.items?.[index]?.category && (
                            <FormHelperText>{errors.items?.[index]?.category.message}</FormHelperText>
                          )}
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name={`items.${index}.displayOrder`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Display Order"
                          type="number"
                          fullWidth
                          // Convert field.value to number and back to string for input
                          value={field.value === null || field.value === undefined ? '' : String(field.value)}
                          onChange={(e) => field.onChange(e.target.value === '' ? null : Number(e.target.value))}
                          error={!!errors.items?.[index]?.displayOrder}
                          helperText={errors.items?.[index]?.displayOrder?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name={`items.${index}.isPublished`}
                      control={control}
                      render={({ field: { value, ...field } }) => (
                        <FormControlLabel
                          control={<Switch checked={!!value} {...field} />} // Ensure boolean for checked
                          label="Published"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name={`items.${index}.isHighlighted`}
                      control={control}
                      render={({ field: { value, ...field } }) => (
                        <FormControlLabel
                          control={<Switch checked={!!value} {...field} />} // Ensure boolean for checked
                          label="Highlighted"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            ))}

            {/* Note: If initialData.items is empty, no item fields will be rendered.
                You might need a way to dynamically add new items if this is desired.
            */}

            <Grid item xs={12}>
              <Controller
                name="dateCreated"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Date Created"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    // Convert Date object to YYYY-MM-DD string for input
                    value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                    // Convert string back to Date object for RHF
                    onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                    error={!!errors.dateCreated}
                    helperText={errors.dateCreated?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="lastUpdated"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Last Updated"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    // Convert Date object to YYYY-MM-DD string for input
                    value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                    // Convert string back to Date object for RHF
                    onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                    error={!!errors.lastUpdated}
                    helperText={errors.lastUpdated?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="faq-form" // This links the button to the form
          variant="contained"
        >
          {initialData ? 'Save Changes' : 'Add FAQ'}
        </Button>
      </DialogActions>
    </>
  );
}