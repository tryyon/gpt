'use client';

import { Grid, TextField, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Control, Controller } from 'react-hook-form';
import type { ShippingSettings } from '@/lib/validations/shipping';

interface DeliveryTimeFormProps {
  control: Control<ShippingSettings>;
  index: number;
  onRemove: () => void;
  errors: any;
}

export function DeliveryTimeForm({ control, index, onRemove, errors }: DeliveryTimeFormProps) {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={5}>
        <Controller
          name={`averageDeliveryTimes.${index}.unit`}
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors?.averageDeliveryTimes?.[index]?.unit}>
              <InputLabel>Unit</InputLabel>
              <Select {...field} label="Unit">
                <MenuItem value="hours">Hours</MenuItem>
                <MenuItem value="days">Days</MenuItem>
              </Select>
            </FormControl>
          )}
        />
      </Grid>
      <Grid item xs={12} sm={5}>
        <Controller
          name={`averageDeliveryTimes.${index}.value`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Delivery Time"
              type="number"
              fullWidth
              error={!!errors?.averageDeliveryTimes?.[index]?.value}
              helperText={errors?.averageDeliveryTimes?.[index]?.value?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <IconButton onClick={onRemove} color="error">
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}