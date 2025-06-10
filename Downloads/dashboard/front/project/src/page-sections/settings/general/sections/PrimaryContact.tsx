'use client';

import { Grid, TextField, Typography } from '@mui/material';
import { UseFormReturn, Controller } from 'react-hook-form';
import type { BasicDetailsData } from '../schema';

interface PrimaryContactProps {
  form: UseFormReturn<BasicDetailsData>;
}

export function PrimaryContact({ form }: PrimaryContactProps) {
  const { control, formState: { errors } } = form;

  return (
    <>
      <Typography variant="subtitle1" gutterBottom fontWeight={500} sx={{ mt: 2 }}>
        Primary Contact
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Controller
            name="primaryContactName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Primary Contact Name"
                fullWidth
                error={!!errors.primaryContactName}
                helperText={errors.primaryContactName?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="primaryContactPhone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Primary Contact Phone"
                fullWidth
                error={!!errors.primaryContactPhone}
                helperText={errors.primaryContactPhone?.message}
                type="tel"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="primaryContactEmail"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Primary Contact Email"
                fullWidth
                error={!!errors.primaryContactEmail}
                helperText={errors.primaryContactEmail?.message}
                type="email"
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
}