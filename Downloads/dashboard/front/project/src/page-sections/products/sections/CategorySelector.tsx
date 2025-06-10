'use client';

import { useState, useEffect } from 'react';
import { 
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Paper,
} from '@mui/material';
import { UseFormReturn, Controller } from 'react-hook-form';
import type { CreateProductInput } from '@/lib/validations/product';

interface CategorySelectorProps {
  form: UseFormReturn<CreateProductInput>;
  brandId?: number | null;
}

export function CategorySelector({ form, brandId }: CategorySelectorProps) {
  const { control } = form;
  const [selectedRoot, setSelectedRoot] = useState<string>('');
  const [selectedMain, setSelectedMain] = useState<string>('');
  const [categories, setCategories] = useState<{
    root: { id: string; name: string }[];
    main: { [key: string]: { id: string; name: string }[] };
    child: { [key: string]: { id: string; name: string }[] };
  }>({
    root: [],
    main: {},
    child: {},
  });

  // Fetch categories when brandId changes
  useEffect(() => {
    const fetchCategories = async () => {
      if (!brandId) {
        setCategories({ root: [], main: {}, child: {} });
        return;
      }

      try {
        // Replace this with actual API call
        // Mock data for demonstration
        setCategories({
          root: [
            { id: 'electronics', name: 'Electronics' },
            { id: 'fashion', name: 'Fashion' },
          ],
          main: {
            electronics: [
              { id: 'smartphones', name: 'Smartphones' },
              { id: 'laptops', name: 'Laptops' },
            ],
            fashion: [
              { id: 'mens', name: "Men's Wear" },
              { id: 'womens', name: "Women's Wear" },
            ],
          },
          child: {
            smartphones: [
              { id: 'android', name: 'Android Phones' },
              { id: 'iphone', name: 'iPhones' },
            ],
            laptops: [
              { id: 'gaming', name: 'Gaming Laptops' },
              { id: 'business', name: 'Business Laptops' },
            ],
          },
        });
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [brandId]);

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle2" gutterBottom color="text.secondary">
        Product Categories
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
        {/* Root Category */}
        <Controller
          name="rootCategory"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth error={!!error} disabled={!brandId}>
              <InputLabel>Root Category</InputLabel>
              <Select
                {...field}
                label="Root Category"
                onChange={(e) => {
                  field.onChange(e);
                  setSelectedRoot(e.target.value);
                  setSelectedMain('');
                }}
              >
                {categories.root.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        {/* Main Category */}
        {selectedRoot && (
          <Controller
            name="mainCategory"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth error={!!error}>
                <InputLabel>Main Category</InputLabel>
                <Select
                  {...field}
                  label="Main Category"
                  onChange={(e) => {
                    field.onChange(e);
                    setSelectedMain(e.target.value);
                  }}
                >
                  {categories.main[selectedRoot]?.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        )}

        {/* Child Category */}
        {selectedMain && categories.child[selectedMain] && (
          <Controller
            name="childCategory"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth error={!!error}>
                <InputLabel>Child Category</InputLabel>
                <Select {...field} label="Child Category">
                  {categories.child[selectedMain]?.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        )}

        {!brandId && (
          <Typography variant="caption" color="text.secondary">
            Please select a brand first to view available categories
          </Typography>
        )}
      </Box>
    </Paper>
  );
}