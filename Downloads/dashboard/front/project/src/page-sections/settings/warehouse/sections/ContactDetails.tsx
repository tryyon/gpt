'use client';

import { Grid, TextField } from '@mui/material';
import { UseFormReturn, Controller } from 'react-hook-form';
import type { FormData } from '../schema';

interface ContactDetailsProps {
  form: UseFormReturn<FormData>;
  index: number;
}

export function ContactDetails({ form, index }: ContactDetailsProps) {
  const { control, formState: { errors } } = form;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Controller
          name={`warehouses.${index}.warehouseEmailID`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Warehouse Email ID"
              fullWidth
              error={!!errors.warehouses?.[index]?.warehouseEmailID}
              helperText={errors.warehouses?.[index]?.warehouseEmailID?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Controller
          name={`warehouses.${index}.warehouseContactNumber`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Warehouse Contact Number"
              fullWidth
              error={!!errors.warehouses?.[index]?.warehouseContactNumber}
              helperText={errors.warehouses?.[index]?.warehouseContactNumber?.message}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}