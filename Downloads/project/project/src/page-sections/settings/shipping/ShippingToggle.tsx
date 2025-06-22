'use client';

import { FormControlLabel, Switch, Box, Typography } from '@mui/material';
import type { BooleanSettings } from '@/lib/validations/shipping';

interface ShippingToggleProps {
  label: string;
  description?: string;
  name: keyof BooleanSettings;
  value: boolean;
  onChange: (name: keyof BooleanSettings) => void;
  disabled?: boolean;
}

export function ShippingToggle({ 
  label, 
  description, 
  name, 
  value, 
  onChange, 
  disabled 
}: ShippingToggleProps) {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={value}
          onChange={() => onChange(name)}
          disabled={disabled}
        />
      }
      label={
        <Box>
          <Typography variant="body1">{label}</Typography>
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </Box>
      }
    />
  );
}