import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Grid,
  CircularProgress,
} from '@mui/material';

interface PaymentProps {
  onNext: (data: { paymentMethod: string }) => void;
  onBack: () => void;
}

export function Payment({ onNext, onBack }: PaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      onNext({ paymentMethod });
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Payment Details
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Choose your preferred payment method
      </Typography>

      <RadioGroup
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        sx={{ mb: 4 }}
      >
        <FormControlLabel 
          value="card" 
          control={<Radio />} 
          label="Credit/Debit Card"
        />
        <FormControlLabel 
          value="upi" 
          control={<Radio />} 
          label="UPI"
        />
        <FormControlLabel 
          value="netbanking" 
          control={<Radio />} 
          label="Net Banking"
        />
      </RadioGroup>

      {paymentMethod === 'card' && (
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Card Number"
              placeholder="1234 5678 9012 3456"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Expiry Date"
              placeholder="MM/YY"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="CVV"
              placeholder="123"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name on Card"
              placeholder="John Doe"
            />
          </Grid>
        </Grid>
      )}

      {paymentMethod === 'upi' && (
        <TextField
          fullWidth
          label="UPI ID"
          placeholder="username@upi"
          sx={{ mb: 4 }}
        />
      )}

      {paymentMethod === 'netbanking' && (
        <TextField
          fullWidth
          select
          label="Select Bank"
          defaultValue=""
          sx={{ mb: 4 }}
        >
          {/* Add bank options here */}
        </TextField>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onBack} disabled={loading}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Complete Payment'}
        </Button>
      </Box>

      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}