'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
  Alert,
  Snackbar,
  Divider,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { DefaultCard } from '@/global-components/common/DefaultCard';

export function AnalyticsConfig() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [formData, setFormData] = useState({
    // Google Analytics
    googleClientId: '',
    googleClientSecret: '',
    redirectUri: '',
    projectId: '',
    gaTrackingId: process.env.NEXT_PUBLIC_GA_ID || '',

    // Facebook Pixel
    fbPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID || '',
    fbAppId: '',
    fbAppSecret: '',

    // Additional Services
    apiKey: '',
    accessToken: '',
    serviceAccountEmail: '',
    serviceAccountKey: '',
  });

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Here you would typically make an API call to save the settings
      console.log('Saving analytics settings:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowSuccess(true);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <DefaultCard>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Google Analytics Configuration */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Google Analytics Configuration
            </Typography>
            <Card variant="outlined">
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={analyticsEnabled}
                          onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                        />
                      }
                      label="Enable Google Analytics"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Google Client ID"
                      value={formData.googleClientId}
                      onChange={handleChange('googleClientId')}
                      disabled={!analyticsEnabled}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Google Client Secret"
                      type="password"
                      value={formData.googleClientSecret}
                      onChange={handleChange('googleClientSecret')}
                      disabled={!analyticsEnabled}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Authorized Redirect URI"
                      value={formData.redirectUri}
                      onChange={handleChange('redirectUri')}
                      disabled={!analyticsEnabled}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Project ID"
                      value={formData.projectId}
                      onChange={handleChange('projectId')}
                      disabled={!analyticsEnabled}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="GA4 Measurement ID"
                      value={formData.gaTrackingId}
                      onChange={handleChange('gaTrackingId')}
                      placeholder="G-XXXXXXXXXX"
                      disabled={!analyticsEnabled}
                      helperText="Your Google Analytics 4 measurement ID"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Facebook Pixel Configuration */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Facebook Pixel Configuration
            </Typography>
            <Card variant="outlined">
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Facebook Pixel ID"
                      value={formData.fbPixelId}
                      onChange={handleChange('fbPixelId')}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Facebook App ID"
                      value={formData.fbAppId}
                      onChange={handleChange('fbAppId')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Facebook App Secret"
                      type="password"
                      value={formData.fbAppSecret}
                      onChange={handleChange('fbAppSecret')}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Additional Services */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Additional Service Credentials
            </Typography>
            <Card variant="outlined">
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="API Key"
                      value={formData.apiKey}
                      onChange={handleChange('apiKey')}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Access Token"
                      type="password"
                      value={formData.accessToken}
                      onChange={handleChange('accessToken')}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Service Account Email"
                      value={formData.serviceAccountEmail}
                      onChange={handleChange('serviceAccountEmail')}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Service Account Key"
                      type="password"
                      value={formData.serviceAccountKey}
                      onChange={handleChange('serviceAccountKey')}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Save Settings
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

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
          Analytics settings saved successfully
        </Alert>
      </Snackbar>
    </DefaultCard>
  );
}