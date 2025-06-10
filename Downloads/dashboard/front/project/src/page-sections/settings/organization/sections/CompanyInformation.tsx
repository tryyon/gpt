'use client';

import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { UseFormReturn, Controller } from 'react-hook-form';
import type { OrganizationData } from '../schema';

interface CompanyInformationProps {
  form: UseFormReturn<OrganizationData>;
}

const companyTypes = [
  { value: 'private_limited', label: 'Private Limited Company' },
  { value: 'public_limited', label: 'Public Limited Company' },
  { value: 'llp', label: 'Limited Liability Partnership (LLP)' },
  { value: 'partnership', label: 'Partnership Firm' },
  { value: 'proprietorship', label: 'Sole Proprietorship' },
];

export function CompanyInformation({ form }: CompanyInformationProps) {
  const { control, formState: { errors } } = form;

  return (
    <>
      <Typography variant="subtitle1" gutterBottom fontWeight={500}>
        Company Information
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Company Name"
                fullWidth
                error={!!errors.companyName}
                helperText={errors.companyName?.message}
                required
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="companyType"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Company Type</InputLabel>
                <Select {...field} label="Company Type">
                  {companyTypes.map(type => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="yearEstablished"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Year Established"
                type="number"
                fullWidth
                error={!!errors.yearEstablished}
                helperText={errors.yearEstablished?.message}
                inputProps={{ min: 1900, max: new Date().getFullYear() }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="employeeCount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Number of Employees"
                type="number"
                fullWidth
                error={!!errors.employeeCount}
                helperText={errors.employeeCount?.message}
                inputProps={{ min: 1 }}
              />
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

        <Grid item xs={12} md={6}>
          <Controller
            name="logo"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Logo URL"
                fullWidth
                error={!!errors.logo}
                helperText={errors.logo?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
}