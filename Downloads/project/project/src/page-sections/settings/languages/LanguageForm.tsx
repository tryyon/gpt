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
import { languageSchema, type Language } from '@/lib/validations/language';

interface LanguageFormProps {
  onSubmit: (data: Language) => Promise<void>;
  initialData?: Language | null;
  onCancel: () => void;
  existingLanguages: Language[];
}

export function LanguageForm({ onSubmit, initialData, onCancel, existingLanguages }: LanguageFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Language>({
    resolver: zodResolver(languageSchema),
    defaultValues: initialData || {
      code: '',
      name: '',
      nativeName: '',
      isDefault: false,
      isActive: true,
      direction: 'ltr',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: 'hh:mm A',
    },
  });

  return (
    <>
      <DialogTitle>
        {initialData ? 'Edit Language' : 'Add Language'}
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" id="language-form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Language Name"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="nativeName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Native Name"
                    fullWidth
                    error={!!errors.nativeName}
                    helperText={errors.nativeName?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="code"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Language Code"
                    fullWidth
                    error={!!errors.code}
                    helperText={errors.code?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="direction"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Text Direction</InputLabel>
                    <Select {...field} label="Text Direction">
                      <MenuItem value="ltr">Left to Right (LTR)</MenuItem>
                      <MenuItem value="rtl">Right to Left (RTL)</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="dateFormat"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Date Format"
                    fullWidth
                    error={!!errors.dateFormat}
                    helperText={errors.dateFormat?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="timeFormat"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Time Format"
                    fullWidth
                    error={!!errors.timeFormat}
                    helperText={errors.timeFormat?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="isDefault"
                control={control}
                render={({ field: { value, ...field } }) => (
                  <FormControlLabel
                    control={<Switch checked={value} {...field} />}
                    label="Set as default language"
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
                    label="Language is active"
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
          form="language-form"
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Add Language'}
        </Button>
      </DialogActions>
    </>
  );
}