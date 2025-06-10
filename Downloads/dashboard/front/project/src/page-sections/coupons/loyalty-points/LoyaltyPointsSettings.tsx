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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Alert,
} from '@mui/material';

interface LoyaltyPointsSettingsProps {
  initialData: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function LoyaltyPointsSettings({ initialData, onSubmit, onCancel }: LoyaltyPointsSettingsProps) {
  const [formData, setFormData] = useState({
    enabled: initialData?.enabled ?? true,
    allowPointsRedemption: initialData?.allowPointsRedemption ?? true,
    minimumPointsRedemption: initialData?.minimumPointsRedemption || 500,
    maximumPointsRedemption: initialData?.maximumPointsRedemption || 10000,
    displayPointsInCart: initialData?.displayPointsInCart ?? true,
    displayPointsInAccount: initialData?.displayPointsInAccount ?? true,
    roundingMethod: initialData?.roundingMethod || 'up',
    sendPointsNotifications: initialData?.sendPointsNotifications ?? true,
  });

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSelectChange = (field: string) => (event: any) => {
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
        Loyalty Program Settings
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Alert severity="info" sx={{ mb: 3 }}>
            These settings apply to all loyalty programs in your store.
          </Alert>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.enabled}
                    onChange={handleSwitchChange('enabled')}
                  />
                }
                label="Enable loyalty points program"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Divider />
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                Redemption Settings
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.allowPointsRedemption}
                    onChange={handleSwitchChange('allowPointsRedemption')}
                  />
                }
                label="Allow customers to redeem points for discounts"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Minimum Points for Redemption"
                value={formData.minimumPointsRedemption}
                onChange={handleChange('minimumPointsRedemption')}
                fullWidth
                type="number"
                disabled={!formData.allowPointsRedemption}
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Maximum Points for Redemption"
                value={formData.maximumPointsRedemption}
                onChange={handleChange('maximumPointsRedemption')}
                fullWidth
                type="number"
                disabled={!formData.allowPointsRedemption}
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Points Rounding Method</InputLabel>
                <Select
                  value={formData.roundingMethod}
                  onChange={handleSelectChange('roundingMethod')}
                  label="Points Rounding Method"
                >
                  <MenuItem value="up">Round Up</MenuItem>
                  <MenuItem value="down">Round Down</MenuItem>
                  <MenuItem value="nearest">Round to Nearest</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <Divider />
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                Display Settings
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.displayPointsInCart}
                    onChange={handleSwitchChange('displayPointsInCart')}
                  />
                }
                label="Display points in shopping cart"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.displayPointsInAccount}
                    onChange={handleSwitchChange('displayPointsInAccount')}
                  />
                }
                label="Display points in customer account"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Divider />
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                Notification Settings
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.sendPointsNotifications}
                    onChange={handleSwitchChange('sendPointsNotifications')}
                  />
                }
                label="Send notifications for points earned and expiring"
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
          Save Settings
        </Button>
      </DialogActions>
    </>
  );
}