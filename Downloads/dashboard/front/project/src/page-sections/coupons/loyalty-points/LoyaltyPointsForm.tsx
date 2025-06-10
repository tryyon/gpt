'use client';

import { useState } from 'react';
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
  Typography,
  InputAdornment,
} from '@mui/material';

interface LoyaltyPointsFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function LoyaltyPointsForm({ initialData, onSubmit, onCancel }: LoyaltyPointsFormProps) {
  // Parse date from initialData if available
  const parseDate = (dateString: string | undefined, defaultDate: Date) => {
    if (!dateString) return defaultDate.toISOString().split('T')[0];
    try {
      return new Date(dateString).toISOString().split('T')[0];
    } catch (e) {
      return defaultDate.toISOString().split('T')[0];
    }
  };
  
  const startDate = parseDate(initialData?.startDate, new Date());
  const endDate = parseDate(initialData?.endDate, new Date(Date.now() + 365 * 24 * 60 * 60 * 1000));
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    pointsPerDollar: initialData?.pointsPerDollar || 10,
    minimumPurchase: initialData?.minimumPurchase || 0,
    pointsValuation: initialData?.pointsValuation || 0.01,
    expiryDays: initialData?.expiryDays || 365,
    startDate: startDate,
    endDate: endDate,
    isActive: initialData?.isActive ?? true,
    description: initialData?.description || '',
  });

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSwitchChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.checked });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <>
      <DialogTitle>
        {initialData ? 'Edit Loyalty Program' : 'Create New Loyalty Program'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Program Name"
                value={formData.name}
                onChange={handleChange('name')}
                fullWidth
                required
                placeholder="e.g., Standard Points Program"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Points Per Dollar"
                value={formData.pointsPerDollar}
                onChange={handleChange('pointsPerDollar')}
                fullWidth
                required
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                helperText="Number of points earned per dollar spent"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Minimum Purchase Amount"
                value={formData.minimumPurchase}
                onChange={handleChange('minimumPurchase')}
                fullWidth
                type="number"
                InputProps={{ 
                  inputProps: { min: 0 },
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                helperText="Minimum purchase amount to earn points (0 for no minimum)"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Points Valuation"
                value={formData.pointsValuation}
                onChange={handleChange('pointsValuation')}
                fullWidth
                required
                type="number"
                InputProps={{ 
                  inputProps: { min: 0.01, step: 0.01 },
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                helperText="Dollar value of each point (e.g., $0.01 per point)"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Points Expiry (Days)"
                value={formData.expiryDays}
                onChange={handleChange('expiryDays')}
                fullWidth
                required
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                helperText="Number of days until points expire"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                value={formData.description}
                onChange={handleChange('description')}
                fullWidth
                multiline
                rows={2}
                placeholder="Brief description of the loyalty program"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Validity Period
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Start Date"
                type="date"
                value={formData.startDate}
                onChange={handleChange('startDate')}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="End Date"
                type="date"
                value={formData.endDate}
                onChange={handleChange('endDate')}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={handleSwitchChange('isActive')}
                  />
                }
                label="Program is active"
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
          variant="contained"
          onClick={handleSubmit}
        >
          {initialData ? 'Update Program' : 'Create Program'}
        </Button>
      </DialogActions>
    </>
  );
}