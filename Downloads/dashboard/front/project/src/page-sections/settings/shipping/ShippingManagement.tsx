'use client';

import { useState } from 'react';
import { Box, Card, CardContent, Alert, Snackbar } from '@mui/material';
import { ShippingForm } from './ShippingForm';
import type { ShippingSettings } from '@/lib/validations/shipping';

export function ShippingManagement() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (data: ShippingSettings) => {
    try {
      // Here you would typically make an API call to save the data
      console.log('Form data:', data);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setShowSuccess(true);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <ShippingForm onSubmit={handleSubmit} />
        </CardContent>
      </Card>

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
          Shipping settings saved successfully
        </Alert>
      </Snackbar>
    </Box>
  );
}