'use client';

import { useState } from 'react';
import { 
  Box, 
  Grid, 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormControlLabel, 
  Switch, 
  Divider, 
  Chip,
  Alert,
} from '@mui/material';
import {
  LocalShipping as LocalShippingIcon,
} from '@mui/icons-material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { UseFormReturn } from 'react-hook-form';
import type { CreateProductInput } from '@/lib/validations/product';

interface ShippingProps {
  form: UseFormReturn<CreateProductInput>;
}

export function Shipping({ form }: ShippingProps) {
  const [useDefaultShipping, setUseDefaultShipping] = useState(true);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [shippingCarrier, setShippingCarrier] = useState('');
  const [freeShipping, setFreeShipping] = useState(false);
  const [storePickupOnly, setStorePickupOnly] = useState(false);
  const [pickupFromStore, setPickupFromStore] = useState(false);
  const [shippingConfigOpen, setShippingConfigOpen] = useState(false);
  

  const handleShippingMethodChange = (
    event: SelectChangeEvent<string>
  ) => {
    const value = event.target.value;
    setShippingMethod(value);

    // Update related states based on shipping method
    if (value === 'free') {
      setFreeShipping(true);
    } else if (value === 'pickup') {
      setStorePickupOnly(true);
      setFreeShipping(false);
    } else {
      setFreeShipping(false);
      setStorePickupOnly(false);
    }
  };

  const handleOpenShippingConfig = () => {
    window.open('/dashboard/settings/shipping', '_blank');
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Shipping Configuration
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Shipping Options
              </Typography>
              <Button 
                variant="outlined" 
                startIcon={<LocalShippingIcon />}
                onClick={handleOpenShippingConfig}
              >
                Configure National Shipping
              </Button>
            </Box>
            
            <FormControlLabel
              control={
                <Switch
                  checked={useDefaultShipping}
                  onChange={(e) => setUseDefaultShipping(e.target.checked)}
                />
              }
              label="Use default shipping configuration"
            />
            
            <Grid item xs={12} sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={storePickupOnly}
                    onChange={(e) => {
                      setStorePickupOnly(e.target.checked);
                      if (e.target.checked) {
                        setUseDefaultShipping(false);
                        setFreeShipping(false);
                        setPickupFromStore(false);
                      }
                    }}
                  />
                }
                label="Store pickup only (no shipping)"
              />
            </Grid>
            
            <Grid item xs={12} sx={{ mt: 1 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={pickupFromStore}
                    onChange={(e) => setPickupFromStore(e.target.checked)}
                    disabled={storePickupOnly}
                  />
                }
                label="Allow pickup from store (in addition to shipping)"
              />
            </Grid>
            
            {!useDefaultShipping && !storePickupOnly && (
              <Box sx={{ mt: 3 }}>
                <Alert severity="info" sx={{ mb: 3 }}>
                  Custom shipping settings will override the national shipping configuration for this product only.
                </Alert>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Shipping Method</InputLabel>
                      <Select
                        value={shippingMethod}
                        onChange={handleShippingMethodChange}
                        label="Shipping Method"
                      >
                        <MenuItem value="standard">Standard Shipping</MenuItem>
                        <MenuItem value="express">Express Shipping</MenuItem>
                        <MenuItem value="free">Free Shipping</MenuItem>
                        <MenuItem value="pickup">Store Pickup Only</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth disabled={storePickupOnly}>
                      <InputLabel>Preferred Carrier</InputLabel>
                      <Select
                        value={shippingCarrier}
                        onChange={(e) => setShippingCarrier(e.target.value)}
                        label="Preferred Carrier"
                      >
                        <MenuItem value="">No Preference</MenuItem>
                        <MenuItem value="delhivery">Delhivery</MenuItem>
                        <MenuItem value="shiprocket">ShipRocket</MenuItem>
                        <MenuItem value="fedex">FedEx</MenuItem>
                        <MenuItem value="dhl">DHL</MenuItem>
                        <MenuItem value="bluedart">BlueDart</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Shipping Weight (kg)"
                      type="number"
                      fullWidth
                      InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                      disabled={storePickupOnly}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Shipping Fee"
                      type="number"
                      fullWidth
                      InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                      disabled={freeShipping || storePickupOnly}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={freeShipping}
                          onChange={(e) => setFreeShipping(e.target.checked)}
                          disabled={storePickupOnly}
                        />
                      }
                      label="Free shipping for this product"
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
            
            {useDefaultShipping && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Current National Shipping Configuration
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  <Chip label="Standard Shipping: $5.99" variant="outlined" />
                  <Chip label="Express Shipping: $12.99" variant="outlined" />
                  <Chip label="Free Shipping over $50" color="success" variant="outlined" />
                  <Chip label="Delhivery & ShipRocket Integrated" color="primary" variant="outlined" />
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Delivery Estimates
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Standard Delivery (days)"
                  type="number"
                  fullWidth
                  InputProps={{ inputProps: { min: 1 } }}
                  defaultValue={3}
                  disabled={storePickupOnly}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="Express Delivery (days)"
                  type="number"
                  fullWidth
                  InputProps={{ inputProps: { min: 1 } }}
                  defaultValue={1}
                  disabled={storePickupOnly}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              International Shipping
            </Typography>
            
            <FormControlLabel
              control={
                <Switch defaultChecked />
              }
              label="Available for international shipping"
              disabled={storePickupOnly}
            />
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                International shipping rates will be calculated based on destination country, weight, and dimensions.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}