'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  FormControlLabel,
  Switch,
  Chip,
  Tooltip,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Info as InfoIcon } from '@mui/icons-material';

interface FeeStructureProps {
  onSaveSuccess: (message: string) => void;
  onSaveError: (message: string) => void;
}

// Predefined tax slabs
const TAX_SLABS = [
  { rate: 3, label: '3% Tax Slab' },
  { rate: 5, label: '5% Tax Slab' },
  { rate: 12, label: '12% Tax Slab' },
  { rate: 18, label: '18% Tax Slab' },
  { rate: 24, label: '24% Tax Slab' },
];

interface TaxRule {
  id: number;
  category: string;
  taxSlab: number;
  description: string;
}

export function FeeStructure({ onSaveSuccess, onSaveError }: FeeStructureProps) {
  const [customRules, setCustomRules] = useState([{ id: 1 }]);
  const [taxRules, setTaxRules] = useState<TaxRule[]>([
    { 
      id: 1, 
      category: 'Electronics', 
      taxSlab: 18,
      description: 'Standard electronics tax rate'
    },
    { 
      id: 2, 
      category: 'Clothing', 
      taxSlab: 5,
      description: 'Essential clothing items'
    }
  ]);

  const handleAddRule = () => {
    const newId = Math.max(...customRules.map(rule => rule.id)) + 1;
    setCustomRules([...customRules, { id: newId }]);
  };

  const handleRemoveRule = (id: number) => {
    setCustomRules(customRules.filter(rule => rule.id !== id));
  };

  const handleAddTaxRule = () => {
    const newId = Math.max(...taxRules.map(rule => rule.id), 0) + 1;
    setTaxRules([...taxRules, {
      id: newId,
      category: '',
      taxSlab: 18,
      description: ''
    }]);
  };

  const handleRemoveTaxRule = (id: number) => {
    setTaxRules(taxRules.filter(rule => rule.id !== id));
  };

  const handleTaxRuleChange = (id: number, field: keyof TaxRule, value: string | number) => {
    setTaxRules(rules => 
      rules.map(rule => 
        rule.id === id ? { ...rule, [field]: value } : rule
      )
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSaveSuccess('Fee structure settings saved successfully');
    } catch (error) {
      onSaveError('Failed to save fee structure settings');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        {/* Tax Slabs Configuration */}
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle2">
                Tax Slabs
              </Typography>
              <Tooltip title="Configure tax rates for different product categories">
                <InfoIcon color="action" fontSize="small" />
              </Tooltip>
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              {TAX_SLABS.map((slab) => (
                <Chip
                  key={slab.rate}
                  label={slab.label}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Tax Categories and Rules
              </Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddTaxRule}
                variant="outlined"
                size="small"
              >
                Add Tax Rule
              </Button>
            </Box>
            
            {taxRules.map((rule) => (
              <Box key={rule.id} sx={{ mb: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Category"
                      value={rule.category}
                      onChange={(e) => handleTaxRuleChange(rule.id, 'category', e.target.value)}
                      placeholder="e.g., Electronics"
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel>Tax Slab</InputLabel>
                      <Select
                        value={rule.taxSlab}
                        label="Tax Slab"
                        onChange={(e) => handleTaxRuleChange(rule.id, 'taxSlab', Number(e.target.value))}
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
                      value={rule.description}
                      onChange={(e) => handleTaxRuleChange(rule.id, 'description', e.target.value)}
                      placeholder="Rule description"
                    />
                  </Grid>
                  <Grid item xs={12} md={1}>
                    <IconButton 
                      color="error" 
                      onClick={() => handleRemoveTaxRule(rule.id)}
                      disabled={taxRules.length === 1}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Transaction Fees */}
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Transaction Fees
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Fixed Fee Amount"
                  type="number"
                  InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Percentage Fee"
                  type="number"
                  InputProps={{ 
                    inputProps: { min: 0, max: 100, step: 0.01 },
                    endAdornment: '%'
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Service Charges */}
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Service Charges
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Charge Type</InputLabel>
                  <Select defaultValue="percentage" label="Charge Type">
                    <MenuItem value="percentage">Percentage of Transaction</MenuItem>
                    <MenuItem value="fixed">Fixed Amount</MenuItem>
                    <MenuItem value="hybrid">Hybrid (Fixed + Percentage)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Service Charge Amount"
                  type="number"
                  InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Pass service charges to customer"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Custom Fee Rules */}
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle2">
                Custom Fee Rules
              </Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddRule}
                variant="outlined"
                size="small"
              >
                Add Rule
              </Button>
            </Box>
            
            {customRules.map((rule) => (
              <Box key={rule.id} sx={{ mb: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel>Condition</InputLabel>
                      <Select label="Condition">
                        <MenuItem value="amount_above">Amount Above</MenuItem>
                        <MenuItem value="amount_below">Amount Below</MenuItem>
                        <MenuItem value="payment_method">Payment Method</MenuItem>
                        <MenuItem value="country">Country</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Value"
                      placeholder="Enter condition value"
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Fee Amount"
                      type="number"
                      InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <FormControl fullWidth>
                      <InputLabel>Fee Type</InputLabel>
                      <Select label="Fee Type">
                        <MenuItem value="fixed">Fixed</MenuItem>
                        <MenuItem value="percentage">Percentage</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={1}>
                    <IconButton 
                      color="error" 
                      onClick={() => handleRemoveRule(rule.id)}
                      disabled={customRules.length === 1}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained">
              Save Fee Structure
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}