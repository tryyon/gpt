'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Collapse,
} from '@mui/material';
import { customerSchema, type CustomerFormData } from '@/lib/validations/customer';
import { AddressFields } from './AddressFields';

const gstTypes = [
  { value: 'unregistered', label: 'Unregistered/Consumer' },
  { value: 'regular', label: 'Registered Business - Regular' },
  { value: 'composition', label: 'Registered Business - Composition' },
];

interface CustomerFormProps {
  onSubmit: (data: CustomerFormData) => void;
  initialData?: Partial<CustomerFormData>;
}

export function CustomerForm({ onSubmit, initialData }: CustomerFormProps) {
  const [showAddress, setShowAddress] = useState(false);
  const [showGST, setShowGST] = useState(false);
  const [sameAsBilling, setSameAsBilling] = useState(true);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: initialData?.name || '',
      phone: initialData?.phone || '',
      email: initialData?.email || '',
      gstType: initialData?.gstType || 'unregistered',
      gstNumber: initialData?.gstNumber || '',
      billingAddress: initialData?.billingAddress || {
        street: '',
        pincode: '',
        city: '',
        state: '',
        country: '',
      },
      shippingAddress: initialData?.shippingAddress || {
        street: '',
        pincode: '',
        city: '',
        state: '',
        country: '',
      },
    },
  });

  const gstType = watch('gstType');
  const billingAddress = watch('billingAddress');

  const handleSameAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSameAsBilling(event.target.checked);
    if (event.target.checked) {
      setValue('shippingAddress', billingAddress);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        {/* Required Fields */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Customer Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone?.message}
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </Grid>

        {/* Optional Fields */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showGST}
                  onChange={(e) => setShowGST(e.target.checked)}
                />
              }
              label="Add GST Details"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={showAddress}
                  onChange={(e) => setShowAddress(e.target.checked)}
                />
              }
              label="Add Address"
            />
          </Box>
        </Grid>

        {/* GST Details */}
        <Grid item xs={12}>
          <Collapse in={showGST}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  GST Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Controller
                      name="gstType"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          label="GST Registration Type"
                          fullWidth
                          error={!!errors.gstType}
                          helperText={errors.gstType?.message}
                        >
                          {gstTypes.map((type) => (
                            <MenuItem key={type.value} value={type.value}>
                              {type.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Grid>
                  {gstType && gstType !== 'unregistered' && (
                    <Grid item xs={12}>
                      <Controller
                        name="gstNumber"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="GST Number"
                            fullWidth
                            error={!!errors.gstNumber}
                            helperText={errors.gstNumber?.message}
                          />
                        )}
                      />
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Collapse>
        </Grid>

        {/* Address Fields */}
        <Grid item xs={12}>
          <Collapse in={showAddress}>
            <Grid container spacing={3}>
              {/* Billing Address */}
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle2" gutterBottom>
                      Billing Address
                    </Typography>
                    <AddressFields
                      type="billing"
                      control={control}
                      errors={errors}
                    />
                  </CardContent>
                </Card>
              </Grid>

              {/* Same as Billing Checkbox */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={sameAsBilling}
                      onChange={handleSameAddressChange}
                    />
                  }
                  label="Use same address for shipping"
                />
              </Grid>

              {/* Shipping Address */}
              <Grid item xs={12}>
                <Collapse in={!sameAsBilling}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" gutterBottom>
                        Shipping Address
                      </Typography>
                      <AddressFields
                        type="shipping"
                        control={control}
                        errors={errors}
                      />
                    </CardContent>
                  </Card>
                </Collapse>
              </Grid>
            </Grid>
          </Collapse>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Customer'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}