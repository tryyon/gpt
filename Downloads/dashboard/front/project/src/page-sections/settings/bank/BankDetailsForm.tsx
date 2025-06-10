'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  FormHelperText,
} from '@mui/material';
import type { BankDetailsData } from '@/types/bank';
import { bankDetailsSchema } from '@/lib/validations/bank';

interface BankDetailsFormProps {
  onSubmit: (data: BankDetailsData) => Promise<void>;
  organization: {
    id: string;
    name: string;
  };
}

export function BankDetailsForm({ onSubmit, organization }: BankDetailsFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BankDetailsData>({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues: {
      organizationId: organization.id,
      accountHolderName: '',
      bankName: '',
      accountNumber: '',
      accountType: 'Savings',
      ifscCode: '',
      branchName: '',
      branchAddress: '',
      swiftCode: '',
      upiId: '',
      isDefault: false,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        {/* Account Holder Information */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Account Holder Information
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="accountHolderName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Account Holder Name"
                fullWidth
                error={!!errors.accountHolderName}
                helperText={errors.accountHolderName?.message}
                required
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="bankName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Bank Name"
                fullWidth
                error={!!errors.bankName}
                helperText={errors.bankName?.message}
                required
              />
            )}
          />
        </Grid>

        {/* Account Details */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Account Details
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="accountNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Account Number"
                fullWidth
                error={!!errors.accountNumber}
                helperText={errors.accountNumber?.message}
                required
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth error={!!errors.accountType}>
            <InputLabel>Account Type</InputLabel>
            <Controller
              name="accountType"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Account Type">
                  <MenuItem value="Savings">Savings</MenuItem>
                  <MenuItem value="Current">Current</MenuItem>
                </Select>
              )}
            />
            {errors.accountType && (
              <FormHelperText>{errors.accountType.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="ifscCode"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="IFSC Code"
                fullWidth
                error={!!errors.ifscCode}
                helperText={errors.ifscCode?.message}
                required
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="swiftCode"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="SWIFT Code (Optional)"
                fullWidth
                error={!!errors.swiftCode}
                helperText={errors.swiftCode?.message}
              />
            )}
          />
        </Grid>

        {/* Branch Information */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Branch Information
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="branchName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Branch Name"
                fullWidth
                error={!!errors.branchName}
                helperText={errors.branchName?.message}
                required
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="branchAddress"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Branch Address"
                fullWidth
                multiline
                rows={3}
                error={!!errors.branchAddress}
                helperText={errors.branchAddress?.message}
                required
              />
            )}
          />
        </Grid>

        {/* Digital Payment */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Digital Payment
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="upiId"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="UPI ID (Optional)"
                fullWidth
                error={!!errors.upiId}
                helperText={errors.upiId?.message}
                placeholder="example@upi"
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{ minWidth: 200 }}
            >
              {isSubmitting ? 'Saving...' : 'Save Bank Details'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}