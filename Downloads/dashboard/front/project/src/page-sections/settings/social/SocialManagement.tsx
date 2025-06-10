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
  InputAdornment,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { socialSettingsSchema, type SocialSettings } from '@/lib/validations/social';

export function SocialManagement() {
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SocialSettings>({
    resolver: zodResolver(socialSettingsSchema),
    defaultValues: {
      facebook: '',
      twitter: '',
      instagram: '',
      pinterest: '',
      youtube: '',
      tiktok: '',
      enableSharing: true,
      enableSocialLogin: true,
      facebookAppId: '',
      twitterHandle: '',
    },
  });

  const onSubmit = async (data: SocialSettings) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowSuccess(true);
    } catch (error) {
      console.error('Error updating social settings:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Social Media Profiles
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Controller
                  name="facebook"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Facebook Page URL"
                      fullWidth
                      error={!!errors.facebook}
                      helperText={errors.facebook?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            facebook.com/
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                <Controller
                  name="twitter"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Twitter Handle"
                      fullWidth
                      error={!!errors.twitter}
                      helperText={errors.twitter?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            @
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                <Controller
                  name="instagram"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Instagram Username"
                      fullWidth
                      error={!!errors.instagram}
                      helperText={errors.instagram?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            @
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                <Controller
                  name="pinterest"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Pinterest Username"
                      fullWidth
                      error={!!errors.pinterest}
                      helperText={errors.pinterest?.message}
                    />
                  )}
                />
                <Controller
                  name="youtube"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="YouTube Channel URL"
                      fullWidth
                      error={!!errors.youtube}
                      helperText={errors.youtube?.message}
                    />
                  )}
                />
                <Controller
                  name="tiktok"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="TikTok Username"
                      fullWidth
                      error={!!errors.tiktok}
                      helperText={errors.tiktok?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            @
                          </InputAdornment>
                        ),
                      }}
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
                Social Features
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Controller
                  name="enableSharing"
                  control={control}
                  render={({ field: { value, ...field } }) => (
                    <FormControlLabel
                      control={<Switch checked={value} {...field} />}
                      label="Enable Social Sharing"
                    />
                  )}
                />
                <Controller
                  name="enableSocialLogin"
                  control={control}
                  render={({ field: { value, ...field } }) => (
                    <FormControlLabel
                      control={<Switch checked={value} {...field} />}
                      label="Enable Social Login"
                    />
                  )}
                />
              </Box>

              <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                API Configuration
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Controller
                  name="facebookAppId"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Facebook App ID"
                      fullWidth
                      error={!!errors.facebookAppId}
                      helperText={errors.facebookAppId?.message}
                    />
                  )}
                />
                <Controller
                  name="twitterHandle"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Twitter Handle for Cards"
                      fullWidth
                      error={!!errors.twitterHandle}
                      helperText={errors.twitterHandle?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            @
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
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
          Social media settings updated successfully
        </Alert>
      )}
    </form>
  );
}