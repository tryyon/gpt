'use client';

import { useState } from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Switch, Typography, Paper, Box, Autocomplete } from '@mui/material';
import { UseFormReturn, Controller } from 'react-hook-form';
import type { CreateProductInput } from '@/lib/validations/product';
import { CategorySelector } from './CategorySelector';

interface GeneralDetailsProps {
  form: UseFormReturn<CreateProductInput>;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
];

const countries = [
  { code: 'IN', name: 'India' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'SG', name: 'Singapore' },
  { code: 'AE', name: 'United Arab Emirates' },
];

const productStatuses = [
  { value: 'enabled', label: 'Enabled', color: 'success.main' },
  { value: 'disabled', label: 'Disabled', color: 'error.main' },
  { value: 'draft', label: 'Draft', color: 'warning.main' },
];

// Mock brands data with more realistic information
const brands = [
  { 
    id: 1, 
    name: 'Nike',
    logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    description: 'Global sports and athleisure brand',
    country: 'US',
    categories: ['Sportswear', 'Footwear', 'Accessories'],
    website: 'nike.com'
  },
  { 
    id: 2, 
    name: 'Adidas',
    logo: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f',
    description: 'Leading manufacturer of athletic shoes and apparel',
    country: 'DE',
    categories: ['Sports Equipment', 'Footwear', 'Clothing'],
    website: 'adidas.com'
  },
  { 
    id: 3, 
    name: 'Puma',
    logo: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
    description: 'Multinational sportswear manufacturer',
    country: 'DE',
    categories: ['Sports Apparel', 'Footwear', 'Accessories'],
    website: 'puma.com'
  },
  { 
    id: 4, 
    name: 'Under Armour',
    logo: 'https://images.unsplash.com/photo-1519744346361-7a029b427a59',
    description: 'Performance apparel and footwear manufacturer',
    country: 'US',
    categories: ['Athletic Wear', 'Footwear', 'Sports Equipment'],
    website: 'underarmour.com'
  },
  { 
    id: 5, 
    name: 'New Balance',
    logo: 'https://images.unsplash.com/photo-1539185441755-769473a23570',
    description: 'Athletic footwear and apparel manufacturer',
    country: 'US',
    categories: ['Running Shoes', 'Athletic Wear', 'Sports Accessories'],
    website: 'newbalance.com'
  }
];

export function GeneralDetails({ form }: GeneralDetailsProps) {
  const { register, formState: { errors }, control } = form;
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [showAdvancedInfo, setShowAdvancedInfo] = useState(false);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">General Details</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              defaultValue="draft"
              label="Status"
            >
              {productStatuses.map((status) => (
                <MenuItem 
                  key={status.value} 
                  value={status.value}
                  sx={{ color: status.color }}
                >
                  {status.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Seller"
            value="seller business name"
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Product ID"
            value="dsavasvdsadv123121"
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Language</InputLabel>
            <Select label="Language" defaultValue="en">
              {languages.map((lang) => (
                <MenuItem key={lang.code} value={lang.code}>
                  {lang.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Country of origin</InputLabel>
            <Select label="Country of origin" defaultValue="IN">
              {countries.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            options={brands}
            getOptionLabel={(option) => option.name}
            onChange={(_, value) => setSelectedBrandId(value?.id || null)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Brand"
                placeholder="Choose a brand"
                required
              />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Box
                    component="img"
                    src={option.logo}
                    alt={option.name}
                    sx={{ 
                      width: 40, 
                      height: 40, 
                      objectFit: 'cover',
                      borderRadius: 1,
                    }}
                  />
                  <Box>
                    <Typography variant="body2" fontWeight={500}>
                      {option.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {option.description}
                    </Typography>
                  </Box>
                </Box>
              </li>
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={showAdvancedInfo}
                onChange={(e) => setShowAdvancedInfo(e.target.checked)}
              />
            }
            label="Advanced information"
          />
        </Grid>

        {showAdvancedInfo && (
          <>
            {/* Manufacturer Details */}
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom color="text.secondary">
                  Manufacturer Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Manufacturer Name"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Contact Number"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Email"
                      type="email"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Address"
                      fullWidth
                      multiline
                      rows={3}
                      required
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Importer Details */}
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom color="text.secondary">
                  Importer Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Importer Name"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Contact Number"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Email"
                      type="email"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Address"
                      fullWidth
                      multiline
                      rows={3}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Packer Details */}
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom color="text.secondary">
                  Packer Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Packer Name"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Contact Number"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Email"
                      type="email"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Address"
                      fullWidth
                      multiline
                      rows={3}
                      required
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </>
        )}

        {/* Category Selection */}
        <Grid item xs={12}>
          <CategorySelector form={form} brandId={selectedBrandId} />
        </Grid>
      </Grid>
    </Box>
  );
}