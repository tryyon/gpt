'use client';

import { Grid, TextField } from '@mui/material';
import { UseFormReturn, Controller } from 'react-hook-form';
import type { FormData } from '../schema';

interface OperationDetailsProps {
  form: UseFormReturn<FormData>;
  index: number;
}

export function OperationDetails({ form, index }: OperationDetailsProps) {
  const { control, formState: { errors } } = form;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Controller
          name={`warehouses.${index}.operationStartTime`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Operation Start Time"
              fullWidth
              type="time"
              InputLabelProps={{ shrink: true }}
              error={!!errors.warehouses?.[index]?.operationStartTime}
              helperText={errors.warehouses?.[index]?.operationStartTime?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Controller
          name={`warehouses.${index}.operationEndTime`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Operation End Time"
              fullWidth
              type="time"
              InputLabelProps={{ shrink: true }}
              error={!!errors.warehouses?.[index]?.operationEndTime}
              helperText={errors.warehouses?.[index]?.operationEndTime?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Controller
          name={`warehouses.${index}.perDayOrderProcessingCapacity`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Per day order processing capacity"
              fullWidth
              type="number"
              error={!!errors.warehouses?.[index]?.perDayOrderProcessingCapacity}
              helperText={errors.warehouses?.[index]?.perDayOrderProcessingCapacity?.message}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}