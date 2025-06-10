'use client';

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
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  color: z.enum(['primary', 'secondary', 'success', 'error', 'warning', 'info']),
  isActive: z.boolean(),
});

type FormData = z.infer<typeof schema>;

interface VisibilityFormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  initialData?: {
    name: string;
    description: string;
    color: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
    isActive: boolean;
  } | null;
}

const colorOptions = [
  { value: 'primary', label: 'Blue' },
  { value: 'secondary', label: 'Purple' },
  { value: 'success', label: 'Green' },
  { value: 'error', label: 'Red' },
  { value: 'warning', label: 'Orange' },
  { value: 'info', label: 'Light Blue' },
] as const;

export function VisibilityForm({ onSubmit, onCancel, initialData }: VisibilityFormProps) {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      color: initialData?.color || 'primary',
      isActive: initialData?.isActive ?? true,
    },
  });

  return (
    <>
      <DialogTitle>
        {initialData ? 'Edit Visibility Section' : 'Add Visibility Section'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" id="visibility-form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Section Name"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    required
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                rules={{ required: 'Description is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    required
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Color</InputLabel>
                    <Select {...field} label="Color">
                      {colorOptions.map((color) => (
                        <MenuItem key={color.value} value={color.value}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box
                              sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '50%',
                                bgcolor: `${color.value}.main`,
                              }}
                            />
                            {color.label}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                    label="Section is active"
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
          form="visibility-form"
          variant="contained"
        >
          {initialData ? 'Save Changes' : 'Add Section'}
        </Button>
      </DialogActions>
    </>
  );
}