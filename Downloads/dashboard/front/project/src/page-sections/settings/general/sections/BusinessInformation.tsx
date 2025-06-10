'use client';

import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { UseFormReturn, Controller } from 'react-hook-form';
import type { BasicDetailsData } from '../schema';

interface BusinessInformationProps {
  form: UseFormReturn<BasicDetailsData>;
}

export function BusinessInformation({ form }: BusinessInformationProps) {
  const { control, formState: { errors } } = form;

  return (
    <>
      <Typography variant="subtitle1" gutterBottom fontWeight={500} sx={{ mt: 2 }}>
        Business Information
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Controller
            name="businessType"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.businessType}>
                <InputLabel>Business Type</InputLabel>
                <Select {...field} label="Business Type">
                  <MenuItem value="retail">Retail</MenuItem>
                  <MenuItem value="wholesale">Wholesale</MenuItem>
                  <MenuItem value="both">Retail and Wholesale</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="website"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Website"
                fullWidth
                error={!!errors.website}
                helperText={errors.website?.message}
                placeholder="https://example.com"
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Owner's Address"
                fullWidth
                multiline
                rows={3}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="City"
                fullWidth
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="State"
                fullWidth
                error={!!errors.state}
                helperText={errors.state?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Country"
                fullWidth
                error={!!errors.country}
                helperText={errors.country?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="pincode"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Pincode"
                fullWidth
                error={!!errors.pincode}
                helperText={errors.pincode?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
}