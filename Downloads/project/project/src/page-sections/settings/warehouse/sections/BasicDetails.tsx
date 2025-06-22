'use client';

import { Grid, TextField, Button, Box } from '@mui/material';
import { UseFormReturn, Controller } from 'react-hook-form';
import { VerifiedUser as VerifyIcon } from '@mui/icons-material';
import type { FormData } from '../schema';

interface BasicDetailsProps {
  form: UseFormReturn<FormData>;
  index: number;
}

export function BasicDetails({ form, index }: BasicDetailsProps) {
  const { control, formState: { errors } } = form;

  const handleVerify = () => {
    console.log('Verifying GSTIN');
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Controller
          name={`warehouses.${index}.warehousePincode`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Warehouse Pincode"
              fullWidth
              error={!!errors.warehouses?.[index]?.warehousePincode}
              helperText={errors.warehouses?.[index]?.warehousePincode?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Box display="flex" alignItems="flex-start">
          <Controller
            name={`warehouses.${index}.warehouseGSTIN`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Enter Warehouse GSTIN"
                fullWidth
                error={!!errors.warehouses?.[index]?.warehouseGSTIN}
                helperText={errors.warehouses?.[index]?.warehouseGSTIN?.message}
              />
            )}
          />
          <Button
            onClick={handleVerify}
            variant="outlined"
            startIcon={<VerifyIcon />}
            sx={{ ml: 1, height: '56px' }}
          >
            Verify
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Controller
          name={`warehouses.${index}.warehouseAddress`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Warehouse Address"
              fullWidth
              multiline
              rows={2}
              error={!!errors.warehouses?.[index]?.warehouseAddress}
              helperText={errors.warehouses?.[index]?.warehouseAddress?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <Controller
          name={`warehouses.${index}.city`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="City"
              fullWidth
              error={!!errors.warehouses?.[index]?.city}
              helperText={errors.warehouses?.[index]?.city?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <Controller
          name={`warehouses.${index}.state`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="State"
              fullWidth
              error={!!errors.warehouses?.[index]?.state}
              helperText={errors.warehouses?.[index]?.state?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <Controller
          name={`warehouses.${index}.country`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Country"
              fullWidth
              error={!!errors.warehouses?.[index]?.country}
              helperText={errors.warehouses?.[index]?.country?.message}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}