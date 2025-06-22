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
  Typography,
  Autocomplete,
  Chip,
} from '@mui/material';
import { brandAssetSchema, type BrandAsset } from '@/lib/validations/content';

interface BrandAssetFormProps {
  onSubmit: (data: BrandAsset) => void;
  initialData?: BrandAsset | null;
  onCancel: () => void;
}

const assetTypes = [
  { value: 'logo', label: 'Logo' },
  { value: 'icon', label: 'Icon' },
  { value: 'banner', label: 'Banner' },
  { value: 'media_kit', label: 'Media Kit' },
  { value: 'style_guide', label: 'Style Guide' },
  { value: 'other', label: 'Other' },
];

const assetCategories = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'monochrome', label: 'Monochrome' },
  { value: 'social', label: 'Social Media' },
  { value: 'print', label: 'Print' },
  { value: 'web', label: 'Web' },
];

const assetFormats = [
  { value: 'png', label: 'PNG' },
  { value: 'jpg', label: 'JPG' },
  { value: 'svg', label: 'SVG' },
  { value: 'pdf', label: 'PDF' },
  { value: 'ai', label: 'Adobe Illustrator' },
  { value: 'zip', label: 'ZIP Archive' },
];

const suggestedTags = [
  'dark',
  'light',
  'transparent',
  'vertical',
  'horizontal',
  'square',
  'high-res',
  'official',
  'promotional',
  'seasonal',
];

export function BrandAssetForm({ onSubmit, initialData, onCancel }: BrandAssetFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BrandAsset>({
    resolver: zodResolver(brandAssetSchema),
    defaultValues: initialData || {
      name: '',
      type: 'logo',
      category: 'primary',
      format: 'png',
      url: '',
      description: '',
      isActive: true,
      dateAdded: new Date(),
      tags: [],
      version: '1.0',
    },
  });

  return (
    <>
      <DialogTitle>
        {initialData ? 'Edit Brand Asset' : 'Add Brand Asset'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" id="brand-asset-form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Asset Name"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.type}>
                    <InputLabel>Asset Type</InputLabel>
                    <Select {...field} label="Asset Type">
                      {assetTypes.map(type => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.category}>
                    <InputLabel>Category</InputLabel>
                    <Select {...field} label="Category">
                      {assetCategories.map(category => (
                        <MenuItem key={category.value} value={category.value}>
                          {category.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="format"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.format}>
                    <InputLabel>Format</InputLabel>
                    <Select {...field} label="Format">
                      {assetFormats.map(format => (
                        <MenuItem key={format.value} value={format.value}>
                          {format.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="url"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Asset URL"
                    fullWidth
                    error={!!errors.url}
                    helperText={errors.url?.message}
                  />
                )}
              />
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

            <Grid item xs={12} md={6}>
              <Controller
                name="dimensions.width"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Width (px)"
                    type="number"
                    fullWidth
                    error={!!errors.dimensions?.width}
                    helperText={errors.dimensions?.width?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="dimensions.height"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Height (px)"
                    type="number"
                    fullWidth
                    error={!!errors.dimensions?.height}
                    helperText={errors.dimensions?.height?.message}
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
                    helperText={errors.version?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="fileSize"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="File Size (bytes)"
                    type="number"
                    fullWidth
                    error={!!errors.fileSize}
                    helperText={errors.fileSize?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="tags"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    freeSolo
                    options={suggestedTags}
                    value={value || []}
                    onChange={(_, newValue) => onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tags"
                        error={!!errors.tags}
                        helperText={errors.tags?.message}
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          key={option}
                          label={option}
                          variant="outlined"
                        />
                      ))
                    }
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
                    label="Asset is active"
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
          form="brand-asset-form"
          variant="contained"
        >
          {initialData ? 'Save Changes' : 'Add Asset'}
        </Button>
      </DialogActions>
    </>
  );
}