'use client';

import { useForm, Controller } from 'react-hook-form';
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
  Typography,
} from '@mui/material';
import { Image as ImageIcon } from '@mui/icons-material';
import { giftWrappingSchema, wrappingTypes, type GiftWrapping } from '@/lib/validations/giftWrapping';
import { FileUpload } from '@/global-components/common/FileUpload';

interface GiftWrappingFormProps {
  onSubmit: (data: GiftWrapping) => void;
  onCancel: () => void;
  initialData?: GiftWrapping | null;
  isSubmitting: boolean;
}

export function GiftWrappingForm({ onSubmit, onCancel, initialData, isSubmitting }: GiftWrappingFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GiftWrapping>({
    resolver: zodResolver(giftWrappingSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      price: initialData?.price || 0,
      type: initialData?.type || 'Paper',
      color: initialData?.color || '',
      isActive: initialData?.isActive ?? true,
      isDefault: initialData?.isDefault ?? false,
      maxDimensions: initialData?.maxDimensions || { length: 0, width: 0, height: 0 },
      image: null,
      imageUrl: initialData?.imageUrl || '',
    },
  });

  return (
    <>
      <DialogTitle>
        {initialData ? 'Edit Gift Wrapping' : 'Add Gift Wrapping'}
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" id="gift-wrapping-form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="image"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <FileUpload
                    {...field}
                    label="Upload Image"
                    accept="image/*"
                    maxSize={2 * 1024 * 1024}
                    error={typeof errors.image === 'object' && errors.image !== null ? (errors.image as { message?: string }).message : undefined}
                    value={value}
                    onChange={onChange}
                    icon={<ImageIcon />}
                    currentImage={initialData?.imageUrl}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Name"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.type}>
                    <InputLabel>Type</InputLabel>
                    <Select {...field} label="Type">
                      {wrappingTypes.map(type => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Color"
                    fullWidth
                    error={!!errors.color}
                    helperText={errors.color?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Price"
                    type="number"
                    fullWidth
                    error={!!errors.price}
                    helperText={errors.price?.message}
                    inputProps={{ min: 0, step: 0.01 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Maximum Dimensions (cm)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Controller
                    name="maxDimensions.length"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Length"
                        type="number"
                        fullWidth
                        error={!!errors.maxDimensions?.length}
                        helperText={errors.maxDimensions?.length?.message}
                        inputProps={{ min: 0, step: 0.1 }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Controller
                    name="maxDimensions.width"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Width"
                        type="number"
                        fullWidth
                        error={!!errors.maxDimensions?.width}
                        helperText={errors.maxDimensions?.width?.message}
                        inputProps={{ min: 0, step: 0.1 }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Controller
                    name="maxDimensions.height"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Height"
                        type="number"
                        fullWidth
                        error={!!errors.maxDimensions?.height}
                        helperText={errors.maxDimensions?.height?.message}
                        inputProps={{ min: 0, step: 0.1 }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 3 }}>
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
                <Controller
                  name="isDefault"
                  control={control}
                  render={({ field: { value, ...field } }) => (
                    <FormControlLabel
                      control={<Switch checked={value} {...field} />}
                      label="Set as Default"
                    />
                  )}
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
          form="gift-wrapping-form"
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Add Gift Wrapping'}
        </Button>
      </DialogActions>
    </>
  );
}