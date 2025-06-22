import { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Divider,
  Chip,
  IconButton,
  FormHelperText,
  Paper,
  Autocomplete,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define schema for form validation
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  buyQuantity: z.number().min(1, 'Buy quantity must be at least 1'),
  getQuantity: z.number().min(1, 'Get quantity must be at least 1'),
  applicableProducts: z.array(z.string()).min(1, 'At least one product must be selected'),
  freeProducts: z.array(z.string()).min(1, 'At least one free product must be selected'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  isActive: z.boolean().default(true),
});

type FormData = z.infer<typeof schema>;

// Mock product data
const mockProducts = [
  { id: 'prod1', name: 'Product 1', category: 'Category A', price: 19.99 },
  { id: 'prod2', name: 'Product 2', category: 'Category B', price: 29.99 },
  { id: 'prod3', name: 'Product 3', category: 'Category A', price: 39.99 },
  { id: 'prod4', name: 'Product 4', category: 'Category C', price: 49.99 },
  { id: 'prod5', name: 'Product 5', category: 'Category B', price: 59.99 },
];

interface BuyXGetYFormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  initialData?: Partial<FormData>;
}

export function BuyXGetYForm({ onSubmit, onCancel, initialData }: BuyXGetYFormProps) {
  const [selectedApplicableProducts, setSelectedApplicableProducts] = useState<string[]>(
    initialData?.applicableProducts || []
  );
  const [selectedFreeProducts, setSelectedFreeProducts] = useState<string[]>(
    initialData?.freeProducts || []
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      buyQuantity: initialData?.buyQuantity || 1,
      getQuantity: initialData?.getQuantity || 1,
      applicableProducts: initialData?.applicableProducts || [],
      freeProducts: initialData?.freeProducts || [],
      startDate: initialData?.startDate || '',
      endDate: initialData?.endDate || '',
      isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
    },
  });

  const handleApplicableProductsChange = (_: any, newValue: string[]) => {
    setSelectedApplicableProducts(newValue);
  };

  const handleFreeProductsChange = (_: any, newValue: string[]) => {
    setSelectedFreeProducts(newValue);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Basic Information
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Promotion Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="isActive"
            control={control}
            render={({ field: { value, onChange } }) => (
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={value ? 'active' : 'inactive'}
                  onChange={(e) => onChange(e.target.value === 'active')}
                  label="Status"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
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

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Promotion Details
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="buyQuantity"
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
              <TextField
                {...field}
                label="Buy Quantity"
                type="number"
                fullWidth
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                error={!!errors.buyQuantity}
                helperText={errors.buyQuantity?.message}
                InputProps={{ inputProps: { min: 1 } }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="getQuantity"
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
              <TextField
                {...field}
                label="Get Quantity"
                type="number"
                fullWidth
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                error={!!errors.getQuantity}
                helperText={errors.getQuantity?.message}
                InputProps={{ inputProps: { min: 1 } }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Start Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.startDate}
                helperText={errors.startDate?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="End Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.endDate}
                helperText={errors.endDate?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Product Selection
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Buy Products (Customers must buy these)
          </Typography>
          <Controller
            name="applicableProducts"
            control={control}
            render={({ field: { onChange, ...field } }) => (
              <Autocomplete
                {...field}
                multiple
                options={mockProducts.map((product) => product.id)}
                getOptionLabel={(option) => {
                  const product = mockProducts.find((p) => p.id === option);
                  return product ? `${product.name} - $${product.price}` : '';
                }}
                value={selectedApplicableProducts}
                onChange={(_, newValue) => {
                  handleApplicableProductsChange(_, newValue);
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Products"
                    error={!!errors.applicableProducts}
                    helperText={errors.applicableProducts?.message}
                  />
                )}
                renderOption={(props, option) => {
                  const product = mockProducts.find((p) => p.id === option);
                  if (!product) return null;
                  
                  return (
                    <li {...props} key={option}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body2">{product.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {product.category} - ${product.price}
                        </Typography>
                      </Box>
                    </li>
                  );
                }}
                renderTags={(tagValue, getTagProps) =>
                  tagValue.map((option, index) => {
                    const product = mockProducts.find((p) => p.id === option);
                    return (
                      <Chip
                        {...getTagProps({ index })}
                        key={option}
                        label={product?.name}
                        sx={{
                          color: 'info.contrastText',
                          backgroundColor: '#e3f2fd'
                        }}
                      />
                    );
                  })
                }
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Free Products (Customers will get these free)
          </Typography>
          <Controller
            name="freeProducts"
            control={control}
            render={({ field: { onChange, ...field } }) => (
              <Autocomplete
                {...field}
                multiple
                options={mockProducts.map((product) => product.id)}
                getOptionLabel={(option) => {
                  const product = mockProducts.find((p) => p.id === option);
                  return product ? `${product.name} - $${product.price}` : '';
                }}
                value={selectedFreeProducts}
                onChange={(_, newValue) => {
                  handleFreeProductsChange(_, newValue);
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Free Products"
                    error={!!errors.freeProducts}
                    helperText={errors.freeProducts?.message}
                  />
                )}
                renderOption={(props, option) => {
                  const product = mockProducts.find((p) => p.id === option);
                  if (!product) return null;
                  
                  return (
                    <li {...props} key={option}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body2">{product.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {product.category} - ${product.price}
                        </Typography>
                      </Box>
                    </li>
                  );
                }}
                renderTags={(tagValue, getTagProps) =>
                  tagValue.map((option, index) => {
                    const product = mockProducts.find((p) => p.id === option);
                    return (
                      <Chip
                        {...getTagProps({ index })}
                        key={option}
                        label={product?.name}
                        sx={{
                          color: 'success.contrastText',
                          backgroundColor: 'success.light',
                        }}
                      />
                    );
                  })
                }
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="submit" variant="contained">
              {initialData ? 'Update Promotion' : 'Create Promotion'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}