'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Alert,
  FormControlLabel,
  Switch,
  Typography,
  Divider,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { notificationSettingsSchema, type NotificationSettingsInput } from '@/lib/validations/settings';

export function NotificationManagement() {
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NotificationSettingsInput>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      orderUpdates: true,
      newCustomers: true,
      productReviews: false,
      securityAlerts: true,
      systemUpdates: true,
      newsletter: false,
    },
  });

  const onSubmit = async (data: NotificationSettingsInput) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowSuccess(true);
    } catch (error) {
      console.error('Error updating notification settings:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Notifications
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Controller
                  name="orderUpdates"
                  control={control}
                  render={({ field: { value, ...field } }) => (
                    <FormControlLabel
                      control={<Switch checked={value} {...field} />}
                      label="Order status updates"
                    />
                  )}
                />
                <Controller
                  name="newCustomers"
                  control={control}
                  render={({ field: { value, ...field } }) => (
                    <FormControlLabel
                      control={<Switch checked={value} {...field} />}
                      label="New customer registrations"
                    />
                  )}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                Product Notifications
              </Typography>
              <Controller
                name="productReviews"
                control={control}
                render={({ field: { value, ...field } }) => (
                  <FormControlLabel
                    control={<Switch checked={value} {...field} />}
                    label="Product reviews and ratings"
                  />
                )}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Notifications
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Controller
                  name="securityAlerts"
                  control={control}
                  render={({ field: { value, ...field } }) => (
                    <FormControlLabel
                      control={<Switch checked={value} {...field} />}
                      label="Security alerts"
                    />
                  )}
                />
                <Controller
                  name="systemUpdates"
                  control={control}
                  render={({ field: { value, ...field } }) => (
                    <FormControlLabel
                      control={<Switch checked={value} {...field} />}
                      label="System updates and maintenance"
                    />
                  )}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                Marketing
              </Typography>
              <Controller
                name="newsletter"
                control={control}
                render={({ field: { value, ...field } }) => (
                  <FormControlLabel
                    control={<Switch checked={value} {...field} />}
                    label="Newsletter and promotional emails"
                  />
                )}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Grid>
      </Grid>

      {showSuccess && (
        <Alert 
          severity="success" 
          sx={{ mt: 2 }}
          onClose={() => setShowSuccess(false)}
        >
          Notification preferences updated successfully
        </Alert>
      )}
    </form>
  );
}