'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Alert,
  Typography,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { seoSettingsSchema, type SEOSettings } from '@/lib/validations/seo';

export function SEOManagement() {
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SEOSettings>({
    resolver: zodResolver(seoSettingsSchema),
    defaultValues: {
      defaultTitle: '',
      defaultDescription: '',
      defaultKeywords: '',
      robotsTxt: 'User-agent: *\nAllow: /',
      sitemapEnabled: true,
      canonicalUrlEnabled: true,
      socialMetaEnabled: true,
    },
  });

  const onSubmit = async (data: SEOSettings) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowSuccess(true);
    } catch (error) {
      console.error('Error updating SEO settings:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Default Meta Tags
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Controller
                  name="defaultTitle"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Default Title"
                      fullWidth
                      error={!!errors.defaultTitle}
                      helperText={errors.defaultTitle?.message}
                    />
                  )}
                />
                <Controller
                  name="defaultDescription"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Default Description"
                      fullWidth
                      multiline
                      rows={3}
                      error={!!errors.defaultDescription}
                      helperText={errors.defaultDescription?.message}
                    />
                  )}
                />
                <Controller
                  name="defaultKeywords"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Default Keywords"
                      fullWidth
                      error={!!errors.defaultKeywords}
                      helperText={errors.defaultKeywords?.message || 'Separate keywords with commas'}
                    />
                  )}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Advanced Settings
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Controller
                  name="robotsTxt"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="robots.txt Content"
                      fullWidth
                      multiline
                      rows={4}
                      error={!!errors.robotsTxt}
                      helperText={errors.robotsTxt?.message}
                      sx={{ mb: 3 }}
                    />
                  )}
                />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Controller
                    name="sitemapEnabled"
                    control={control}
                    render={({ field: { value, ...field } }) => (
                      <FormControlLabel
                        control={<Switch checked={value} {...field} />}
                        label="Enable XML Sitemap"
                      />
                    )}
                  />
                  <Controller
                    name="canonicalUrlEnabled"
                    control={control}
                    render={({ field: { value, ...field } }) => (
                      <FormControlLabel
                        control={<Switch checked={value} {...field} />}
                        label="Enable Canonical URLs"
                      />
                    )}
                  />
                  <Controller
                    name="socialMetaEnabled"
                    control={control}
                    render={({ field: { value, ...field } }) => (
                      <FormControlLabel
                        control={<Switch checked={value} {...field} />}
                        label="Enable Social Media Meta Tags"
                      />
                    )}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Grid>
      </Grid>

      {showSuccess && (
        <Alert 
          severity="success" 
          sx={{ mt: 2 }}
          onClose={() => setShowSuccess(false)}
        >
          SEO settings updated successfully
        </Alert>
      )}
    </form>
  );
}