'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormControlLabel,
  Switch,
  Typography,
  Button,
  Alert,
  Snackbar,
} from '@mui/material';

export function CheckoutOverview() {
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Guest Checkout
            </Typography>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Allow guest checkout"
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Let customers check out without creating an account
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Order Review
            </Typography>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Enable order review step"
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Add a review step before order confirmation
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Cart Settings
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Minimum Order Value"
                  type="number"
                  defaultValue={0}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Cart Expiry (hours)"
                  type="number"
                  defaultValue={24}
                  InputProps={{ inputProps: { min: 1 } }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Order Confirmation
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Default Order Status</InputLabel>
                  <Select
                    label="Default Order Status"
                    defaultValue="pending"
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="processing">Processing</MenuItem>
                    <MenuItem value="on-hold">On Hold</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Send order confirmation email"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => setShowSuccess(true)}
          >
            Save Changes
          </Button>
        </Box>
      </Grid>

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
          Checkout settings saved successfully
        </Alert>
      </Snackbar>
    </Grid>
  );
}