'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Grid,
  TextField,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Paper,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { productContentSchema, type ProductContent } from '@/lib/validations/productContent';

interface ProductContentsFormProps {
  onSubmit: (data: ProductContent) => void;
  onCancel: () => void;
  initialData?: ProductContent | null;
  isSubmitting: boolean;
}

export function ProductContentsForm({ onSubmit, onCancel, initialData, isSubmitting }: ProductContentsFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductContent>({
    resolver: zodResolver(productContentSchema),
    defaultValues: initialData || {
      title: '',
      items: [{ 
        name: '', 
        dimensions: { length: 0, width: 0, height: 0 }, 
        weight: 0 
      }],
      dateCreated: new Date(),
      status: 'Enabled',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  return (
    <>
      <DialogTitle>
        {initialData ? 'Edit Product Content' : 'Add Product Content'}
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" id="product-content-form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                {...register('title')}
                label="Content Title"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Items
              </Typography>
              {fields.map((field, index) => (
                <Paper key={field.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        {...register(`items.${index}.name`)}
                        label="Item Name"
                        fullWidth
                        error={!!errors.items?.[index]?.name}
                        helperText={errors.items?.[index]?.name?.message}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        {...register(`items.${index}.dimensions.length`)}
                        label="Length (cm)"
                        type="number"
                        fullWidth
                        error={!!errors.items?.[index]?.dimensions?.length}
                        helperText={errors.items?.[index]?.dimensions?.length?.message}
                        inputProps={{ min: 0, step: 0.1 }}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        {...register(`items.${index}.dimensions.width`)}
                        label="Width (cm)"
                        type="number"
                        fullWidth
                        error={!!errors.items?.[index]?.dimensions?.width}
                        helperText={errors.items?.[index]?.dimensions?.width?.message}
                        inputProps={{ min: 0, step: 0.1 }}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        {...register(`items.${index}.dimensions.height`)}
                        label="Height (cm)"
                        type="number"
                        fullWidth
                        error={!!errors.items?.[index]?.dimensions?.height}
                        helperText={errors.items?.[index]?.dimensions?.height?.message}
                        inputProps={{ min: 0, step: 0.1 }}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        {...register(`items.${index}.weight`)}
                        label="Weight (g)"
                        type="number"
                        fullWidth
                        error={!!errors.items?.[index]?.weight}
                        helperText={errors.items?.[index]?.weight?.message}
                        inputProps={{ min: 0, step: 0.1 }}
                        required
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton
                          onClick={() => remove(index)}
                          color="error"
                          disabled={fields.length <= 1}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              ))}

              <Button
                startIcon={<AddIcon />}
                onClick={() => append({ 
                  name: '', 
                  dimensions: { length: 0, width: 0, height: 0 }, 
                  weight: 0 
                })}
                variant="outlined"
                fullWidth
              >
                Add Item
              </Button>
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
          form="product-content-form"
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Add Content'}
        </Button>
      </DialogActions>
    </>
  );
}