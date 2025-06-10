'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Paper,
  Alert,
  Snackbar,
} from '@mui/material';
import { z } from 'zod';
import { OwnerInformation } from './sections/OwnerInformation';
import { BusinessInformation } from './sections/BusinessInformation';
import { PrimaryContact } from './sections/PrimaryContact';

const schema = z.object({
  // Owner Information
  ownerFullName: z.string().min(1, 'Business owner\'s full name is required'),
  ownerEmail: z.string().email('Invalid email format').optional(),
  ownerContactNumber: z.string().optional(),
  businessType: z.enum(['retail', 'wholesale', 'both']).optional(),

  // Business Information
  businessName: z.string().min(1, 'Business name is required'),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  pincode: z.string().optional(),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  registrationNumber: z.string().optional(),
  incorporationDate: z.string().optional(),

  // Primary Contact
  primaryContactName: z.string().optional(),
  primaryContactEmail: z.string().email('Invalid email format').optional(),
  primaryContactPhone: z.string().optional(),
  primaryContactDesignation: z.string().optional(),
  primaryContactDepartment: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function BasicDetailsForm() {
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      businessType: 'retail',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form data:', data);
      setShowSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Owner Information */}
          <Grid item xs={12}>
            <OwnerInformation form={form} />
          </Grid>

          {/* Business Information */}
          <Grid item xs={12}>
            <BusinessInformation form={form} />
          </Grid>

          {/* Primary Contact */}
          <Grid item xs={12}>
            <PrimaryContact form={form} />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setShowSuccess(false)} 
          severity="success"
          variant="filled"
        >
          Basic details saved successfully
        </Alert>
      </Snackbar>
    </Paper>
  );
}