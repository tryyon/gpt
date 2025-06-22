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
import { contactInfoSchema, type ContactInfo } from '@/lib/validations/content';

interface ContactInfoFormProps {
  onSubmit: (data: ContactInfo) => void;
  initialData?: ContactInfo | null;
  onCancel: () => void;
}

const contactTypes = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'address', label: 'Address' },
  { value: 'social', label: 'Social Media' },
];

export function ContactInfoForm({ onSubmit, initialData, onCancel }: ContactInfoFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInfo>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      type: initialData?.type || 'email',
      label: initialData?.label || '',
      value: initialData?.value || '',
      isActive: initialData?.isActive ?? true,
      displayOrder: initialData?.displayOrder || 0,
    },
  });

  return (
    <>
      <DialogTitle>
        {initialData ? 'Edit Contact Information' : 'Add Contact Information'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" id="contact-info-form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.type}>
                    <InputLabel>Type</InputLabel>
                    <Select {...field} label="Type">
                      {contactTypes.map(type => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="label"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Label"
                    fullWidth
                    error={!!errors.label}
                    helperText={errors.label?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="value"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Value"
                    fullWidth
                    error={!!errors.value}
                    helperText={errors.value?.message}
                  />
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
          form="contact-info-form"
          variant="contained"
        >
          {initialData ? 'Save Changes' : 'Add Contact'}
        </Button>
      </DialogActions>
    </>
  );
}