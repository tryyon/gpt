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
import { policySchema, policyTypes, type Policy } from '@/lib/validations/policy';

interface PolicyFormProps {
  onSubmit: (data: Policy) => void;
  initialData?: Policy | null;
  onCancel: () => void;
  policyType?: string;
}

export function PolicyForm({ onSubmit, initialData, onCancel, policyType }: PolicyFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Policy>({
    resolver: zodResolver(policySchema),
    defaultValues: {
      title: initialData?.title || '',
      type: policyType || initialData?.type || policyTypes[0],
      content: initialData?.content || '',
      isActive: initialData?.isActive ?? true,
      lastUpdated: initialData?.lastUpdated || new Date(),
      version: initialData?.version || '1.0.0',
      isRequired: initialData?.isRequired ?? true,
      displayOrder: initialData?.displayOrder || 1,
    },
  });

  return (
    <>
      <DialogTitle>
        {initialData ? 'Edit Policy' : 'Add Policy'}
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" id="policy-form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Policy Title"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    required
                  />
                )}
              />
            </Grid>

            {!policyType && (
              <Grid item xs={12}>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Policy Type</InputLabel>
                      <Select {...field} label="Policy Type">
                        {policyTypes.map(type => (
                          <MenuItem 
                            key={type} 
                            value={type}
                            sx={{ textTransform: 'capitalize' }}
                          >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Policy Content"
                    fullWidth
                    multiline
                    rows={10}
                    error={!!errors.content}
                    helperText={errors.content?.message}
                    required
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="version"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Version"
                    fullWidth
                    error={!!errors.version}
                    helperText={errors.version?.message || 'Format: x.y or x.y.z'}
                    required
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
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
                    required
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="isRequired"
                control={control}
                render={({ field: { value, ...field } }) => (
                  <FormControlLabel
                    control={<Switch checked={value} {...field} />}
                    label="Policy acceptance is required"
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
                    label="Policy is active"
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
          form="policy-form"
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Add Policy'}
        </Button>
      </DialogActions>
    </>
  );
}