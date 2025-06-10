'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
} from '@mui/material';

interface NotificationSetupProps {
  onSaveSuccess: (message: string) => void;
  onSaveError: (message: string) => void;
}

export function NotificationSetup({ onSaveSuccess, onSaveError }: NotificationSetupProps) {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [webhookEnabled, setWebhookEnabled] = useState(true);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSaveSuccess('Notification settings saved successfully');
    } catch (error) {
      onSaveError('Failed to save notification settings');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        {/* Email Templates */}
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Email Notifications
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={emailEnabled}
                      onChange={(e) => setEmailEnabled(e.target.checked)}
                    />
                  }
                  label="Enable Email Notifications"
                />
              </Grid>
              {emailEnabled && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Payment Success Template"
                      multiline
                      rows={4}
                      defaultValue={`Dear {{customer_name}},

Your payment of {{amount}} has been successfully processed.
Transaction ID: {{transaction_id}}

Thank you for your business!`}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Payment Failure Template"
                      multiline
                      rows={4}
                      defaultValue={`Dear {{customer_name}},

We were unable to process your payment of {{amount}}.
Error: {{error_message}}

Please try again or contact support.`}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
        </Grid>

        {/* Webhook Configuration */}
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Webhook Configuration
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={webhookEnabled}
                      onChange={(e) => setWebhookEnabled(e.target.checked)}
                    />
                  }
                  label="Enable Webhook Notifications"
                />
              </Grid>
              {webhookEnabled && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Webhook URL"
                      placeholder="https://your-domain.com/webhook"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Webhook Secret"
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Webhook Version</InputLabel>
                      <Select defaultValue="2" label="Webhook Version">
                        <MenuItem value="1">Version 1.0</MenuItem>
                        <MenuItem value="2">Version 2.0</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
        </Grid>

        {/* Alert Thresholds */}
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Alert Thresholds
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="High Amount Threshold"
                  type="number"
                  InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                  helperText="Trigger alert for transactions above this amount"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Suspicious Activity Threshold"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  helperText="Number of failed attempts before triggering alert"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Alert Recipients</InputLabel>
                  <Select
                    multiple
                    defaultValue={['admin']}
                    label="Alert Recipients"
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="finance">Finance Team</MenuItem>
                    <MenuItem value="security">Security Team</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained">
              Save Notification Settings
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}