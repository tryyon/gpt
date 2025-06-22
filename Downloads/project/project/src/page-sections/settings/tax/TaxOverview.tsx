'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormControlLabel,
  Switch,
  Typography,
  Button,
  Alert,
  Snackbar,
  Divider,
  Paper,
  IconButton,
  Chip,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

// Predefined tax slabs
const TAX_SLABS = [
  { rate: 3, label: '3% GST' },
  { rate: 5, label: '5% GST' },
  { rate: 12, label: '12% GST' },
  { rate: 18, label: '18% GST' },
  { rate: 24, label: '24% GST' },
];

interface TaxCategory {
  id: number;
  name: string;
  description: string;
  taxRate: number;
  isActive: boolean;
}

export function TaxOverview() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [automaticTax, setAutomaticTax] = useState(true);
  const [roundTax, setRoundTax] = useState(true);
  const [displayPricesWithTax, setDisplayPricesWithTax] = useState(true);
  const [taxCategories, setTaxCategories] = useState<TaxCategory[]>([
    {
      id: 1,
      name: 'Electronics',
      description: 'Electronic devices and accessories',
      taxRate: 18,
      isActive: true,
    },
    {
      id: 2,
      name: 'Clothing',
      description: 'Essential clothing items',
      taxRate: 5,
      isActive: true,
    },
  ]);

  const handleAddCategory = () => {
    const newId = Math.max(...taxCategories.map(cat => cat.id)) + 1;
    setTaxCategories([...taxCategories, {
      id: newId,
      name: '',
      description: '',
      taxRate: 18,
      isActive: true,
    }]);
  };

  const handleRemoveCategory = (id: number) => {
    setTaxCategories(prev => prev.filter(cat => cat.id !== id));
  };

  const handleCategoryChange = (id: number, field: keyof TaxCategory, value: string | number | boolean) => {
    setTaxCategories(prev => prev.map(cat => 
      cat.id === id ? { ...cat, [field]: value } : cat
    ));
  };

  const handleSave = () => {
    setShowSuccess(true);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Tax Categories and Slabs */}
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">
                Tax Categories
              </Typography>
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                onClick={handleAddCategory}
              >
                Add Category
              </Button>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Available Tax Slabs
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {TAX_SLABS.map((slab) => (
                  <Chip
                    key={slab.rate}
                    label={slab.label}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            {taxCategories.map((category) => (
              <Box key={category.id} sx={{ mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Category Name"
                      value={category.name}
                      onChange={(e) => handleCategoryChange(category.id, 'name', e.target.value)}
                      placeholder="e.g., Electronics"
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel>Tax Rate</InputLabel>
                      <Select
                        value={category.taxRate}
                        label="Tax Rate"
                        onChange={(e) => handleCategoryChange(category.id, 'taxRate', Number(e.target.value))}
                      >
                        {TAX_SLABS.map((slab) => (
                          <MenuItem key={slab.rate} value={slab.rate}>
                            {slab.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <TextField
                      fullWidth
                      label="Description"
                      value={category.description}
                      onChange={(e) => handleCategoryChange(category.id, 'description', e.target.value)}
                      placeholder="Category description"
                    />
                  </Grid>
                  <Grid item xs={12} md={1}>
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveCategory(category.id)}
                      disabled={taxCategories.length === 1}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* General Tax Settings */}
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ height: '100%' }}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                General Settings
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={automaticTax}
                      onChange={(e) => setAutomaticTax(e.target.checked)}
                    />
                  }
                  label="Enable automatic tax calculation"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={roundTax}
                      onChange={(e) => setRoundTax(e.target.checked)}
                    />
                  }
                  label="Round tax to 2 decimal places"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={displayPricesWithTax}
                      onChange={(e) => setDisplayPricesWithTax(e.target.checked)}
                    />
                  }
                  label="Display prices including tax"
                />
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Tax Calculation */}
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ height: '100%' }}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Tax Calculation
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Tax Calculation Based On</InputLabel>
                    <Select
                      label="Tax Calculation Based On"
                      defaultValue="shipping"
                    >
                      <MenuItem value="shipping">Shipping Address</MenuItem>
                      <MenuItem value="billing">Billing Address</MenuItem>
                      <MenuItem value="store">Store Address</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Tax Exemptions */}
        <Grid item xs={12}>
          <Paper variant="outlined">
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Tax Exemptions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Tax Exempt Customer Groups</InputLabel>
                    <Select
                      multiple
                      label="Tax Exempt Customer Groups"
                      defaultValue={[]}
                    >
                      <MenuItem value="wholesale">Wholesale Customers</MenuItem>
                      <MenuItem value="nonprofit">Non-Profit Organizations</MenuItem>
                      <MenuItem value="government">Government Agencies</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tax Exemption Certificate Validation"
                    multiline
                    rows={3}
                    placeholder="Enter validation requirements for tax exemption certificates..."
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Save Button */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setShowSuccess(false)} 
          severity="success"
          variant="filled"
        >
          Tax settings saved successfully
        </Alert>
      </Snackbar>
    </Box>
  );
}