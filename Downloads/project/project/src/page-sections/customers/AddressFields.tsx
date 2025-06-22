'use client';

import { Control, FieldErrors } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';
import { CustomerFormData } from '@/lib/validations/customer';

interface AddressFieldsProps {
  type: 'billing' | 'shipping';
  control: Control<CustomerFormData>;
  errors: FieldErrors<CustomerFormData>;
}

export function AddressFields({ type, control, errors }: AddressFieldsProps) {
  const addressType = `${type}Address` as const;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Street Address"
          {...control.register(`${addressType}.street`)}
          error={!!errors[addressType]?.street}
          helperText={errors[addressType]?.street?.message}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Pincode"
          {...control.register(`${addressType}.pincode`)}
          error={!!errors[addressType]?.pincode}
          helperText={errors[addressType]?.pincode?.message}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="City"
          {...control.register(`${addressType}.city`)}
          error={!!errors[addressType]?.city}
          helperText={errors[addressType]?.city?.message}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="State"
          {...control.register(`${addressType}.state`)}
          error={!!errors[addressType]?.state}
          helperText={errors[addressType]?.state?.message}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Country"
          {...control.register(`${addressType}.country`)}
          error={!!errors[addressType]?.country}
          helperText={errors[addressType]?.country?.message}
        />
      </Grid>
    </Grid>
  );
}