'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { rootCategorySchema, type RootCategoryFormData } from '@/lib/validations/category';
import { FileUpload } from '@/global-components/common/FileUpload';
import { Image as ImageIcon } from '@mui/icons-material';

interface RootCategoryFormProps {
  onSubmit: (data: RootCategoryFormData) => void;
  initialData?: any;
  onCancel: () => void;
}

export function RootCategoryForm({ onSubmit, initialData, onCancel }: RootCategoryFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RootCategoryFormData>({
    resolver: zodResolver(rootCategorySchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      slug: initialData?.slug || '',
      metaTitle: initialData?.metaTitle || '',
      metaDescription: initialData?.metaDescription || '',
      isActive: initialData?.isActive ?? true,
      displayOrder: initialData?.displayOrder || 0,
    },
  });

  return (
    <>
      <DialogTitle>
        {initialData ? 'Edit Root Category' : 'Add Root Category'}
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" id="root-category-form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                {...register('name')}
                label="Category Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...register('slug')}
                label="URL Slug"
                fullWidth
                error={!!errors.slug}
                helperText={errors.slug?.message}
                required
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
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FileUpload
                label="Category Logo"
                accept="image/*"
                maxSize={2 * 1024 * 1024}
                error={errors.logo?.message}
                value={null}
                onChange={() => {}}
                icon={<ImageIcon />}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FileUpload
                label="Category Image"
                accept="image/*"
                maxSize={2 * 1024 * 1024}
                error={errors.image?.message}
                value={null}
                onChange={() => {}}
                icon={<ImageIcon />}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...register('metaTitle')}
                label="Meta Title"
                fullWidth
                error={!!errors.metaTitle}
                helperText={errors.metaTitle?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...register('displayOrder')}
                label="Display Order"
                type="number"
                fullWidth
                error={!!errors.displayOrder}
                helperText={errors.displayOrder?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('metaDescription')}
                label="Meta Description"
                fullWidth
                multiline
                rows={2}
                error={!!errors.metaDescription}
                helperText={errors.metaDescription?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    {...register('isActive')}
                    defaultChecked
                  />
                }
                label="Category is active"
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
          form="root-category-form"
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Add Category'}
        </Button>
      </DialogActions>
    </>
  );
}