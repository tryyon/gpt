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
  Alert,
} from '@mui/material';
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';

interface PaymentGatewaysProps {
  onSaveSuccess: (message: string) => void;
  onSaveError: (message: string) => void;
}

export function PaymentGateways({ onSaveSuccess, onSaveError }: PaymentGatewaysProps) {
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [selectedGateway, setSelectedGateway] = useState('stripe');
  const [testMode, setTestMode] = useState(true);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSaveSuccess('Payment gateway settings saved successfully');
    } catch (error) {
      onSaveError('Failed to save payment gateway settings');
    }
  };

  const toggleSecretVisibility = (field: string) => {
    setShowSecrets(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Alert severity="info" sx={{ mb: 3 }}>
            Configure your payment gateway credentials. All API keys and secrets are encrypted before storage.
          </Alert>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Payment Gateway</InputLabel>
            <Select
              value={selectedGateway}
              label="Payment Gateway"
              onChange={(e) => setSelectedGateway(e.target.value)}
            >
              <MenuItem value="stripe">Stripe</MenuItem>
              <MenuItem value="paypal">PayPal</MenuItem>
              <MenuItem value="razorpay">Razorpay</MenuItem>
              <MenuItem value="square">Square</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={
              <Switch
                checked={testMode}
                onChange={(e) => setTestMode(e.target.checked)}
              />
            }
            label="Test Mode"
          />
        </Grid>

        {selectedGateway === 'stripe' && (
          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Stripe Configuration
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Publishable Key"
                    placeholder={testMode ? 'pk_test_...' : 'pk_live_...'}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Secret Key"
                    type={showSecrets.stripeSecret ? 'text' : 'password'}
                    placeholder={testMode ? 'sk_test_...' : 'sk_live_...'}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => toggleSecretVisibility('stripeSecret')}
                          edge="end"
                        >
                          {showSecrets.stripeSecret ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Webhook Secret"
                    type={showSecrets.stripeWebhook ? 'text' : 'password'}
                    placeholder={testMode ? 'whsec_...' : 'whsec_...'}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => toggleSecretVisibility('stripeWebhook')}
                          edge="end"
                        >
                          {showSecrets.stripeWebhook ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}

        {selectedGateway === 'paypal' && (
          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                PayPal Configuration
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Client ID"
                    placeholder={testMode ? 'sandbox-client-id' : 'live-client-id'}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Client Secret"
                    type={showSecrets.paypalSecret ? 'text' : 'password'}
                    placeholder={testMode ? 'sandbox-secret' : 'live-secret'}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => toggleSecretVisibility('paypalSecret')}
                          edge="end"
                        >
                          {showSecrets.paypalSecret ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}

        {selectedGateway === 'razorpay' && (
          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Razorpay Configuration
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Key ID"
                    placeholder={testMode ? 'rzp_test_...' : 'rzp_live_...'}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Key Secret"
                    type={showSecrets.razorpaySecret ? 'text' : 'password'}
                    placeholder={testMode ? 'test_secret_key' : 'live_secret_key'}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => toggleSecretVisibility('razorpaySecret')}
                          edge="end"
                        >
                          {showSecrets.razorpaySecret ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Webhook Secret"
                    type={showSecrets.razorpayWebhook ? 'text' : 'password'}
                    placeholder="webhook_secret"
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => toggleSecretVisibility('razorpayWebhook')}
                          edge="end"
                        >
                          {showSecrets.razorpayWebhook ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}

        {selectedGateway === 'square' && (
          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Square Configuration
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Application ID"
                    placeholder={testMode ? 'sandbox-app-id' : 'live-app-id'}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Access Token"
                    type={showSecrets.squareToken ? 'text' : 'password'}
                    placeholder={testMode ? 'sandbox-token' : 'live-token'}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => toggleSecretVisibility('squareToken')}
                          edge="end"
                        >
                          {showSecrets.squareToken ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Location ID"
                    placeholder={testMode ? 'sandbox-location-id' : 'live-location-id'}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained">
              Save Gateway Settings
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}