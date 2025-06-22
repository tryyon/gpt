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
  FormControlLabel,
  Switch,
} from '@mui/material';
import { productQASchema, type ProductQA } from '@/lib/validations/productQA';

interface ProductQAFormProps {
  onSubmit: (data: ProductQA) => void;
  onCancel: () => void;
  initialData?: ProductQA | null;
}

export function ProductQAForm({ onSubmit, onCancel, initialData }: ProductQAFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductQA>({
    resolver: zodResolver(productQASchema),
    defaultValues: initialData || {
      question: '',
      answer: '',
      isPublished: false,
      isHighlighted: false,
      displayOrder: 0,
    },
  });

  return (
    <>
      <DialogTitle>
        {initialData ? 'Edit Q&A' : 'Add Q&A'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" id="product-qa-form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="question"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Question"
                    fullWidth
                    error={!!errors.question}
                    helperText={errors.question?.message}
                    required
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="answer"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Answer"
                    fullWidth
                    multiline
                    rows={4}
                    error={!!errors.answer}
                    helperText={errors.answer?.message}
                    required
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
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
                    inputProps={{ min: 0 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Controller
                  name="isPublished"
                  control={control}
                  render={({ field: { value, ...field } }) => (
                    <FormControlLabel
                      control={<Switch checked={value} {...field} />}
                      label="Published"
                    />
                  )}
                />
                <Controller
                  name="isHighlighted"
                  control={control}
                  render={({ field: { value, ...field } }) => (
                    <FormControlLabel
                      control={<Switch checked={value} {...field} />}
                      label="Highlighted"
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
          form="product-qa-form"
          variant="contained"
        >
          {initialData ? 'Save Changes' : 'Add Q&A'}
        </Button>
      </DialogActions>
    </>
  );
}