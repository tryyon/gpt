'use client';

import { Grid, TextField, Typography } from '@mui/material';
import { UseFormReturn, Controller } from 'react-hook-form';
import type { OrganizationData } from '@/types/organization';

interface SocialProfilesProps {
  form: UseFormReturn<OrganizationData>;
}

export function SocialProfiles({ form }: SocialProfilesProps) {
  const { control, formState: { errors } } = form;

  return (
    <>
      <Typography variant="subtitle1" gutterBottom fontWeight={500} sx={{ mt: 2 }}>
        Social Media Profiles
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Controller
            name="socialProfiles.facebook"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Facebook Profile"
                fullWidth
                error={!!errors.socialProfiles?.facebook}
                helperText={errors.socialProfiles?.facebook?.message}
                placeholder="https://facebook.com/yourcompany"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="socialProfiles.twitter"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Twitter Profile"
                fullWidth
                error={!!errors.socialProfiles?.twitter}
                helperText={errors.socialProfiles?.twitter?.message}
                placeholder="https://twitter.com/yourcompany"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="socialProfiles.linkedin"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="LinkedIn Profile"
                fullWidth
                error={!!errors.socialProfiles?.linkedin}
                helperText={errors.socialProfiles?.linkedin?.message}
                placeholder="https://linkedin.com/company/yourcompany"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="socialProfiles.instagram"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Instagram Profile"
                fullWidth
                error={!!errors.socialProfiles?.instagram}
                helperText={errors.socialProfiles?.instagram?.message}
                placeholder="https://instagram.com/yourcompany"
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
}