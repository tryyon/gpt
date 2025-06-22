'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Grid,
  TextField,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { packagingSchema, packagingTypes, type Packaging } from '@/lib/validations/packaging';

interface PackagingFormProps {
  onSubmit: (data: Packaging) => void;
  onCancel: () => void;
  initialData?: Packaging | null;
  isSubmitting: boolean;
}

export function PackagingForm({ onSubmit, onCancel, initialData, isSubmitting }: PackagingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Packaging>({
    resolver: zodResolver(packagingSchema),
    defaultValues: initialData || {
      name: '',
      type: 'Box',
      dimensions: { length: 0, width: 0, height: 0 },
      weight: 0,
      material: '',
      cost: 0,
      isActive: true,
      isDefault: false,
      description: '',
    },
  });

  return (
    <>
      <DialogTitle>
        {initialData ? 'Edit Packaging Option' : 'Add Packaging Option'}
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" id="packaging-form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                {...register('name')}
                label="Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.type}>
                <InputLabel>Type</InputLabel>
                <Select {...register('type')} label="Type">
                  {packagingTypes.map(type => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                {...register('dimensions.length')}
                label="Length (cm)"
                type="number"
                fullWidth
                error={!!errors.dimensions?.length}
                helperText={errors.dimensions?.length?.message}
                inputProps={{ step: 0.1 }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                {...register('dimensions.width')}
                label="Width (cm)"
                type="number"
                fullWidth
                error={!!errors.dimensions?.width}
                helperText={errors.dimensions?.width?.message}
                inputProps={{ step: 0.1 }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                {...register('dimensions.height')}
                label="Height (cm)"
                type="number"
                fullWidth
                error={!!errors.dimensions?.height}
                helperText={errors.dimensions?.height?.message}
                inputProps={{ step: 0.1 }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...register('weight')}
                label="Weight (g)"
                type="number"
                fullWidth
                error={!!errors.weight}
                helperText={errors.weight?.message}
                inputProps={{ step: 0.1 }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...register('cost')}
                label="Cost"
                type="number"
                fullWidth
                error={!!errors.cost}
                helperText={errors.cost?.message}
                inputProps={{ step: 0.01 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('material')}
                label="Material"
                fullWidth
                error={!!errors.material}
                helperText={errors.material?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('description')}
                label="Description"
                fullWidth
                multiline
                rows={3}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <FormControlLabel
                  control={
                    <Switch
                      {...register('isActive')}
                      defaultChecked
                    />
                  }
                  label="Active"
                />
                <FormControlLabel
                  control={
                    <Switch
                      {...register('isDefault')}
                    />
                  }
                  label="Set as Default"
                />
              </Box>
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
          form="packaging-form"
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Add Packaging Option'}
        </Button>
      </DialogActions>
    </>
  );
}