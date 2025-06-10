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
      question: initialData?.question || '',
      answer: initialData?.answer || '',
      category: initialData?.category || 'general',
      isActive: initialData?.isActive ?? true,
      displayOrder: initialData?.displayOrder || 0,
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
                name="question"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Question"
                    fullWidth
                    error={!!errors.question}
                    helperText={errors.question?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="answer"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Answer"
                    fullWidth
                    multiline
                    rows={4}
                    error={!!errors.answer}
                    helperText={errors.answer?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.category}>
                    <InputLabel>Category</InputLabel>
                    <Select {...field} label="Category">
                      {categories.map(category => (
                        <MenuItem key={category.value} value={category.value}>
                          {category.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="displayOrder"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Display Order"
                    type="number"
                    fullWidth
                    error={!!errors.displayOrder}
                    helperText={errors.displayOrder?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="isActive"
                control={control}
                render={({ field: { value, ...field } }) => (
                  <FormControlLabel
                    control={<Switch checked={value} {...field} />}
                    label="Active"
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
          form="faq-form"
          variant="contained"
        >
          {initialData ? 'Save Changes' : 'Add FAQ'}
        </Button>
      </DialogActions>
    </>
  );
}