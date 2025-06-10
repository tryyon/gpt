'use client';

import { Box, Grid, Typography } from '@mui/material';
import type { BankDetailsData } from './types';

interface BankAccountDisplayProps {
  account: BankDetailsData;
}

export function BankAccountDisplay({ account }: BankAccountDisplayProps) {
  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        Bank Account Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="body2" color="text.secondary">
            Account Holder
          </Typography>
          <Typography variant="body1">
            {account.accountHolderName}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body2" color="text.secondary">
            Bank Name
          </Typography>
          <Typography variant="body1">
            {account.bankName}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body2" color="text.secondary">
            Account Number
          </Typography>
          <Typography variant="body1">
            {account.accountNumber}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body2" color="text.secondary">
            IFSC Code
          </Typography>
          <Typography variant="body1">
            {account.ifscCode}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body2" color="text.secondary">
            Account Type
          </Typography>
          <Typography variant="body1">
            {account.accountType}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body2" color="text.secondary">
            UPI ID
          </Typography>
          <Typography variant="body1">
            {account.upiId}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}