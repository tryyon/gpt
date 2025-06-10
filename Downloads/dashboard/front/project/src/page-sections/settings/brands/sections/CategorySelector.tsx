'use client';

import { Grid, FormControl, InputLabel, Select, MenuItem, Typography, Paper } from '@mui/material';
import { UseFormReturn, Controller } from 'react-hook-form';
import type { BrandFormData } from '@/lib/validations/brand';

interface CategorySelectorProps {
  form: UseFormReturn<BrandFormData>;
}

export function CategorySelector({ form }: CategorySelectorProps) {
  const { control, formState: { errors } } = form;

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle2" gutterBottom color="text.secondary">
        Category Selection
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Controller
            name="categories.0.rootCategory"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.categories?.[0]?.rootCategory}>
                <InputLabel>Root Category</InputLabel>
                <Select {...field} label="Root Category">
                  <MenuItem value="electronics">Electronics</MenuItem>
                  <MenuItem value="fashion">Fashion</MenuItem>
                  <MenuItem value="home">Home & Living</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Controller
            name="categories.0.mainCategory"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.categories?.[0]?.mainCategory}>
                <InputLabel>Main Category</InputLabel>
                <Select {...field} label="Main Category">
                  <MenuItem value="smartphones">Smartphones</MenuItem>
                  <MenuItem value="laptops">Laptops</MenuItem>
                  <MenuItem value="clothing">Clothing</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Controller
            name="categories.0.childCategory"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.categories?.[0]?.childCategory}>
                <InputLabel>Child Category</InputLabel>
                <Select {...field} label="Child Category">
                  <MenuItem value="android">Android Phones</MenuItem>
                  <MenuItem value="iphone">iPhones</MenuItem>
                  <MenuItem value="tshirts">T-Shirts</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}