'use client';

import { Grid, TextField, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Control, Controller } from 'react-hook-form';
import type { ShippingSettings } from '@/lib/validations/shipping';

interface ShippingPartnerFormProps {
  control: Control<ShippingSettings>;
  index: number;
  onRemove: () => void;
  errors: any;
}

export function ShippingPartnerForm({ control, index, onRemove, errors }: ShippingPartnerFormProps) {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={4}>
        <Controller
          name={`shippingPartners.${index}.name`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Shipping Partner"
              fullWidth
              error={!!errors?.shippingPartners?.[index]?.name}
              helperText={errors?.shippingPartners?.[index]?.name?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Controller
          name={`shippingPartners.${index}.apiKey`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="API Key"
              type="password"
              fullWidth
              error={!!errors?.shippingPartners?.[index]?.apiKey}
              helperText={errors?.shippingPartners?.[index]?.apiKey?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Controller
          name={`shippingPartners.${index}.password`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              fullWidth
              error={!!errors?.shippingPartners?.[index]?.password}
              helperText={errors?.shippingPartners?.[index]?.password?.message}
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