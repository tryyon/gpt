'use client';

import { useForm, useWatch } from 'react-hook-form';
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
  FormHelperText,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { childCategorySchema, type ChildCategoryFormData } from '@/lib/validations/category';
import { FileUpload } from '@/global-components/common/FileUpload';
import { Image as ImageIcon } from '@mui/icons-material';

// Mock categories - Replace with actual data
const rootCategories = [
  { id: 'rc1', name: 'Electronics' },
  { id: 'rc2', name: 'Fashion' },
];

const mainCategories = {
  rc1: [
    { id: 'mc1', name: 'Smartphones' },
    { id: 'mc2', name: 'Laptops' },
  ],
  rc2: [
    { id: 'mc3', name: 'Men\'s Clothing' },
    { id: 'mc4', name: 'Women\'s Clothing' },
  ],
};

interface ChildCategoryFormProps {
  onSubmit: (data: ChildCategoryFormData) => void;
  initialData?: any;
  onCancel: () => void;
}

export function ChildCategoryForm({ onSubmit, initialData, onCancel }: ChildCategoryFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChildCategoryFormData>({
    resolver: zodResolver(childCategorySchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      rootCategoryId: initialData?.rootCategoryId || '',
      mainCategoryId: initialData?.mainCategoryId || '',
      isActive: initialData?.isActive ?? true,
      displayOrder: initialData?.displayOrder || 0,
    },
  });

  const rootCategoryId = useWatch({
    control,
    name: 'rootCategoryId',
  });

  return (
    <>
      <DialogTitle>
        {initialData ? 'Edit Child Category' : 'Add Child Category'}
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" id="child-category-form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.rootCategoryId}>
                <InputLabel>Root Category</InputLabel>
                <Select
                  {...register('rootCategoryId')}
                  label="Root Category"
                >
                  {rootCategories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.rootCategoryId && (
                  <FormHelperText>{errors.rootCategoryId.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl 
                fullWidth 
                error={!!errors.mainCategoryId}
                disabled={!rootCategoryId}
              >
                <InputLabel>Main Category</InputLabel>
                <Select
                  {...register('mainCategoryId')}
                  label="Main Category"
                >
                  {mainCategories[rootCategoryId as keyof typeof mainCategories]?.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.mainCategoryId && (
                  <FormHelperText>{errors.mainCategoryId.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

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
          form="child-category-form"
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Add Category'}
        </Button>
      </DialogActions>
    </>
  );
}