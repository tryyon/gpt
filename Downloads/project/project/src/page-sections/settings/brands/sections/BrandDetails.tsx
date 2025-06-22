'use client';

import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Switch, Typography, Paper } from '@mui/material';
import { UseFormReturn, Controller } from 'react-hook-form';
import type { BrandFormData } from '@/lib/validations/brand';
import { natureOfBusinessOptions } from '@/lib/validations/brand';

interface BrandDetailsProps {
  form: UseFormReturn<BrandFormData>;
}

export function BrandDetails({ form }: BrandDetailsProps) {
  const { control, formState: { errors } } = form;

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle2" gutterBottom color="text.secondary">
        Brand Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name="brandName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Brand Name"
                fullWidth
                error={!!errors.brandName}
                helperText={errors.brandName?.message}
                required
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="natureOfBusiness"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.natureOfBusiness}>
                <InputLabel>Nature of Business</InputLabel>
                <Select {...field} label="Nature of Business">
                  {natureOfBusinessOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="yearsOfOperation"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Years of Operation"
                type="number"
                fullWidth
                error={!!errors.yearsOfOperation}
                helperText={errors.yearsOfOperation?.message}
                inputProps={{ min: 0 }}
                required
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="manufacturerName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Manufacturer Name"
                fullWidth
                error={!!errors.manufacturerName}
                helperText={errors.manufacturerName?.message}
                required
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="manufacturerContactNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Manufacturer Contact Number"
                fullWidth
                error={!!errors.manufacturerContactNumber}
                helperText={errors.manufacturerContactNumber?.message}
                required
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="manufacturerAddress"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Manufacturer Address"
                fullWidth
                multiline
                rows={3}
                error={!!errors.manufacturerAddress}
                helperText={errors.manufacturerAddress?.message}
                required
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="packerName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Packer Name"
                fullWidth
                error={!!errors.packerName}
                helperText={errors.packerName?.message}
                required
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="packerContact"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Packer Contact Number"
                fullWidth
                error={!!errors.packerContact}
                helperText={errors.packerContact?.message}
                required
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="packerAddress"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Packer Address"
                fullWidth
                multiline
                rows={3}
                error={!!errors.packerAddress}
                helperText={errors.packerAddress?.message}
                required
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Brand Description"
                fullWidth
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="earthFriendly"
            control={control}
            render={({ field: { value, ...field } }) => (
              <FormControlLabel
                control={
                  <Switch
                    checked={value}
                    {...field}
                  />
                }
                label="Earth Friendly Products"
              />
            )}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}