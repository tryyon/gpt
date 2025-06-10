'use client';

import { Grid, TextField, Typography } from '@mui/material';
import { UseFormReturn, Controller } from 'react-hook-form';
import type { BasicDetailsData } from '../schema';

interface OwnerInformationProps {
  form: UseFormReturn<BasicDetailsData>;
}

export function OwnerInformation({ form }: OwnerInformationProps) {
  const { control, formState: { errors } } = form;

  return (
    <>
      <Typography variant="subtitle1" gutterBottom fontWeight={500}>
        Owner Information
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Controller
            name="ownerFullName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Business Owner's Full Name"
                fullWidth
                error={!!errors.ownerFullName}
                helperText={errors.ownerFullName?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="panNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="PAN Number"
                fullWidth
                error={!!errors.panNumber}
                helperText={errors.panNumber?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="ownerEmail"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Owner's Email"
                fullWidth
                error={!!errors.ownerEmail}
                helperText={errors.ownerEmail?.message}
                type="email"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="ownerContactNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Owner's Contact Number"
                fullWidth
                error={!!errors.ownerContactNumber}
                helperText={errors.ownerContactNumber?.message}
                type="tel"
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
}