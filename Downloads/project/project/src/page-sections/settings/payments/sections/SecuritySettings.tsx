'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  FormControlLabel,
  Switch,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';

interface SecuritySettingsProps {
  onSaveSuccess: (message: string) => void;
  onSaveError: (message: string) => void;
}

export function SecuritySettings({ onSaveSuccess, onSaveError }: SecuritySettingsProps) {
  const [threeDSecure, setThreeDSecure] = useState(true);
  const [fraudDetection, setFraudDetection] = useState(true);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSaveSuccess('Security settings saved successfully');
    } catch (error) {
      onSaveError('Failed to save security settings');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        {/* 3D Secure Authentication */}
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              3D Secure Authentication
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={threeDSecure}
                      onChange={(e) => setThreeDSecure(e.target.checked)}
                    />
                  }
                  label="Enable 3D Secure Authentication"
                />
              </Grid>
              {threeDSecure && (
                <>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>3DS Version</InputLabel>
                      <Select defaultValue="2" label="3DS Version">
                        <MenuItem value="1">3D Secure 1.0</MenuItem>
                        <MenuItem value="2">3D Secure 2.0</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Minimum Amount for 3DS"
                      type="number"
                      InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
        </Grid>

        {/* Fraud Detection */}
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Fraud Detection Rules
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={fraudDetection}
                      onChange={(e) => setFraudDetection(e.target.checked)}
                    />
                  }
                  label="Enable Fraud Detection"
                />
              </Grid>
              {fraudDetection && (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Maximum Failed Attempts"
                      type="number"
                      defaultValue={3}
                      InputProps={{ inputProps: { min: 1, max: 10 } }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Block Duration (minutes)"
                      type="number"
                      defaultValue={30}
                      InputProps={{ inputProps: { min: 5 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>High-Risk Countries</InputLabel>
                      <Select
                        multiple
                        defaultValue={[]}
                        label="High-Risk Countries"
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {(selected as string[]).map((value) => (
                              <Chip key={value} label={value} size="small" />
                            ))}
                          </Box>
                        )}
                      >
                        <MenuItem value="country1">Country 1</MenuItem>
                        <MenuItem value="country2">Country 2</MenuItem>
                        <MenuItem value="country3">Country 3</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
        </Grid>

        {/* IP Restrictions */}
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              IP Restrictions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Allowed IP Addresses"
                  multiline
                  rows={3}
                  placeholder="Enter IP addresses (one per line)"
                  helperText="Leave empty to allow all IPs"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Blocked IP Addresses"
                  multiline
                  rows={3}
                  placeholder="Enter IP addresses to block (one per line)"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* PCI Compliance */}
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              PCI Compliance
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Enable PCI Compliance Mode"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Mask Card Numbers"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Enable Secure Data Deletion"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained">
              Save Security Settings
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}