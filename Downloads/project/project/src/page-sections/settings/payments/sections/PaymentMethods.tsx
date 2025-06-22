'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  FormControlLabel,
  Switch,
  TextField,
  Button,
  Paper,
  Typography,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

interface PaymentMethodsProps {
  onSaveSuccess: (message: string) => void;
  onSaveError: (message: string) => void;
}

const creditCardTypes = [
  { value: 'visa', label: 'Visa' },
  { value: 'mastercard', label: 'Mastercard' },
  { value: 'amex', label: 'American Express' },
  { value: 'discover', label: 'Discover' },
  { value: 'diners', label: "Diners Club" },
  { value: 'jcb', label: 'JCB' },
];

const digitalWallets = [
  { value: 'apple_pay', label: 'Apple Pay' },
  { value: 'google_pay', label: 'Google Pay' },
  { value: 'samsung_pay', label: 'Samsung Pay' },
];

export function PaymentMethods({ onSaveSuccess, onSaveError }: PaymentMethodsProps) {
  const [selectedCards, setSelectedCards] = useState<string[]>(['visa', 'mastercard']);
  const [selectedWallets, setSelectedWallets] = useState<string[]>(['apple_pay', 'google_pay']);
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSaveSuccess('Payment method settings saved successfully');
    } catch (error) {
      onSaveError('Failed to save payment method settings');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        {/* Credit Cards */}
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Credit Card Settings
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Accepted Card Types</InputLabel>
                  <Select
                    multiple
                    value={selectedCards}
                    onChange={(e) => setSelectedCards(e.target.value as string[])}
                    label="Accepted Card Types"
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={creditCardTypes.find(card => card.value === value)?.label}
                            size="small"
                          />
                        ))}
                      </Box>
                    )}
                  >
                    {creditCardTypes.map((card) => (
                      <MenuItem key={card.value} value={card.value}>
                        {card.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Minimum Transaction Amount"
                  type="number"
                  InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Maximum Transaction Amount"
                  type="number"
                  InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Digital Wallets */}
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Digital Wallet Settings
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Accepted Digital Wallets</InputLabel>
                  <Select
                    multiple
                    value={selectedWallets}
                    onChange={(e) => setSelectedWallets(e.target.value as string[])}
                    label="Accepted Digital Wallets"
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={digitalWallets.find(wallet => wallet.value === value)?.label}
                            size="small"
                          />
                        ))}
                      </Box>
                    )}
                  >
                    {digitalWallets.map((wallet) => (
                      <MenuItem key={wallet.value} value={wallet.value}>
                        {wallet.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* ACH Transfers */}
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              ACH Transfer Settings
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Enable ACH Transfers"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Minimum ACH Amount"
                  type="number"
                  InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Maximum ACH Amount"
                  type="number"
                  InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Currency Settings */}
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Currency Settings
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Base Currency</InputLabel>
                  <Select defaultValue="usd" label="Base Currency">
                    <MenuItem value="usd">USD - US Dollar</MenuItem>
                    <MenuItem value="eur">EUR - Euro</MenuItem>
                    <MenuItem value="gbp">GBP - British Pound</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Enable Automatic Currency Conversion"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained">
              Save Payment Methods
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}