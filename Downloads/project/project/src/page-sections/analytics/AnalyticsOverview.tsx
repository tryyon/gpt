'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  IconButton,
  Tooltip,
  CircularProgress,
  Chip,
} from '@mui/material';
import {
  Help as HelpIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Refresh as RefreshIcon,
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';
import { analytics } from '@/lib/analytics';

interface ConnectionStatus {
  connected: boolean;
  lastSync?: Date;
  error?: string;
}

export function AnalyticsOverview() {
  const [gaStatus, setGaStatus] = useState<ConnectionStatus>({ connected: false });
  const [pixelStatus, setPixelStatus] = useState<ConnectionStatus>({ connected: false });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'info',
  });

  const [formData, setFormData] = useState({
    // Google Analytics
    gaClientId: '',
    gaClientSecret: '',
    gaPropertyId: '',
    gaViewId: '',
    
    // Meta Pixel
    pixelId: '',
    pixelAccessToken: '',
  });

  useEffect(() => {
    // Check existing connections on mount
    checkConnections();
  }, []);

  const checkConnections = async () => {
    setLoading(true);
    try {
      // Simulate API calls to check connections
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock responses - replace with actual API calls
      setGaStatus({
        connected: true,
        lastSync: new Date(),
      });
      
      setPixelStatus({
        connected: true,
        lastSync: new Date(),
      });
    } catch (error) {
      console.error('Error checking connections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSnackbar({
        open: true,
        message: 'Analytics configuration saved successfully',
        severity: 'success',
      });
      
      checkConnections();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error saving configuration',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTestConnection = async (platform: 'ga' | 'pixel') => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSnackbar({
        open: true,
        message: `${platform === 'ga' ? 'Google Analytics' : 'Meta Pixel'} connection successful`,
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Error testing ${platform === 'ga' ? 'Google Analytics' : 'Meta Pixel'} connection`,
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Connection Status Dashboard */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Connection Status
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {gaStatus.connected ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <ErrorIcon color="error" />
                    )}
                    <Box>
                      <Typography variant="subtitle1">
                        Google Analytics
                        {gaStatus.connected && (
                          <Chip
                            label="Connected"
                            color="success"
                            size="small"
                            sx={{ ml: 1 }}
                          />
                        )}
                      </Typography>
                      {gaStatus.lastSync && (
                        <Typography variant="caption" color="text.secondary">
                          Last synced: {gaStatus.lastSync.toLocaleString()}
                        </Typography>
                      )}
                    </Box>
                    <IconButton onClick={() => handleTestConnection('ga')} disabled={loading}>
                      <RefreshIcon />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {pixelStatus.connected ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <ErrorIcon color="error" />
                    )}
                    <Box>
                      <Typography variant="subtitle1">
                        Meta Pixel
                        {pixelStatus.connected && (
                          <Chip
                            label="Connected"
                            color="success"
                            size="small"
                            sx={{ ml: 1 }}
                          />
                        )}
                      </Typography>
                      {pixelStatus.lastSync && (
                        <Typography variant="caption" color="text.secondary">
                          Last synced: {pixelStatus.lastSync.toLocaleString()}
                        </Typography>
                      )}
                    </Box>
                    <IconButton onClick={() => handleTestConnection('pixel')} disabled={loading}>
                      <RefreshIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Google Analytics Configuration */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Typography variant="h6">
                  Google Analytics Configuration
                </Typography>
                <Tooltip title="Click to view Google Analytics setup guide">
                  <IconButton 
                    size="small"
                    onClick={() => window.open('https://support.google.com/analytics/answer/9304153?hl=en')}
                  >
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Client ID"
                    value={formData.gaClientId}
                    onChange={handleChange('gaClientId')}
                    required
                    helperText="From Google Cloud Console"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Client Secret"
                    type="password"
                    value={formData.gaClientSecret}
                    onChange={handleChange('gaClientSecret')}
                    required
                    helperText="From Google Cloud Console"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Property ID"
                    value={formData.gaPropertyId}
                    onChange={handleChange('gaPropertyId')}
                    required
                    helperText="Your GA4 property ID"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="View ID"
                    value={formData.gaViewId}
                    onChange={handleChange('gaViewId')}
                    required
                    helperText="Your GA4 view ID"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      onClick={() => handleTestConnection('ga')}
                      disabled={loading}
                    >
                      Test Connection
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<OpenInNewIcon />}
                      onClick={() => window.open('https://analytics.google.com')}
                    >
                      Open Google Analytics
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Meta Pixel Configuration */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Typography variant="h6">
                  Meta Pixel Configuration
                </Typography>
                <Tooltip title="Click to view Meta Pixel setup guide">
                  <IconButton 
                    size="small"
                    onClick={() => window.open('https://www.facebook.com/business/help/952192354843755')}
                  >
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Pixel ID"
                    value={formData.pixelId}
                    onChange={handleChange('pixelId')}
                    required
                    helperText="Your Meta Pixel ID"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Access Token"
                    type="password"
                    value={formData.pixelAccessToken}
                    onChange={handleChange('pixelAccessToken')}
                    required
                    helperText="Your Meta Pixel access token"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      onClick={() => handleTestConnection('pixel')}
                      disabled={loading}
                    >
                      Test Event
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<OpenInNewIcon />}
                      onClick={() => window.open('https://business.facebook.com/events_manager')}
                    >
                      Open Events Manager
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Save Button */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={loading}
              sx={{ minWidth: 200 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Save Configuration'
              )}
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}