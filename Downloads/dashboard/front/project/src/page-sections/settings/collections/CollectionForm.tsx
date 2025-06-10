'use client';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Typography,
  Paper,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { collectionSchema, type Collection } from '@/lib/validations/collection';

interface CollectionFormProps {
  onSubmit: (data: Collection) => Promise<void>;
  onCancel: () => void;
  initialData?: Collection | null;
  isSubmitting: boolean;
}

export function CollectionForm({ onSubmit, onCancel, initialData, isSubmitting }: CollectionFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Collection>({
    resolver: zodResolver(collectionSchema),
    defaultValues: initialData || {
      id: 0,
      title: '',
      items: [{ description: '' }],
      dateCreated: new Date(),
      status: 'Enabled',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Collection Title"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
                required
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select {...field} label="Status">
                  <MenuItem value="Enabled">Enabled</MenuItem>
                  <MenuItem value="Disabled">Disabled</MenuItem>
                  <MenuItem value="Archived">Archived</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Collection Items
          </Typography>
          {fields.map((field, index) => (
            <Paper
              key={field.id}
              variant="outlined"
              sx={{ p: 2, mb: 2, position: 'relative' }}
            >
              <Controller
                name={`items.${index}.description`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={`Item ${index + 1}`}
                    fullWidth
                    multiline
                    rows={2}
                    error={!!errors.items?.[index]?.description}
                    helperText={errors.items?.[index]?.description?.message}
                  />
                )}
              />
              {fields.length > 1 && (
                <IconButton
                  size="small"
                  onClick={() => remove(index)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: 'error.main',
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Paper>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={() => append({ description: '' })}
            variant="outlined"
            fullWidth
          >
            Add Item
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : initialData?.id ? 'Save Changes' : 'Create Collection'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}