'use client';

import { useState } from 'react';
import { 
  Grid, 
  TextField,
  FormControlLabel,
  Switch,
  Paper,
  Typography,
  Box,
  FormHelperText,
  Alert,
  Divider,
} from '@mui/material';
import { UseFormReturn, Controller } from 'react-hook-form';
import type { CreateProductInput } from '@/lib/validations/product';

interface InventoryProps {
  form: UseFormReturn<CreateProductInput>;
}

export function Inventory({ form }: InventoryProps) {
  const { control, watch, formState: { errors } } = form;
  const [canPurchaseOnline, setCanPurchaseOnline] = useState(true);
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const [allowOutOfStockOrders, setAllowOutOfStockOrders] = useState(false);

  return (
    <Grid container spacing={3}>
      {/* Stock Management */}
      <Grid item xs={12}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight={500}>
            Stock Management
          </Typography>
          
          <Controller
            name="lowStockThreshold"
            control={control}
            defaultValue={5}
            render={({ field }) => (
              <TextField
                {...field}
                label="Low Stock Alert Threshold"
                type="number"
                fullWidth
                error={!!errors.lowStockThreshold}
                helperText={errors.lowStockThreshold?.message}
                InputProps={{ inputProps: { min: 0 } }}
              />
            )}
          />
        </Paper>
      </Grid>

      {/* Availability Settings */}
      <Grid item xs={12}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight={500}>
            Availability Settings
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={canPurchaseOnline}
                  onChange={(e) => setCanPurchaseOnline(e.target.checked)}
                />
              }
              label="Can be purchased online"
            />
            <FormHelperText>
              When enabled, product will be available for purchase online
            </FormHelperText>

            <Divider sx={{ my: 1 }} />

            <FormControlLabel
              control={
                <Switch
                  checked={showOutOfStock}
                  onChange={(e) => setShowOutOfStock(e.target.checked)}
                />
              }
              label="Show when out of stock to customers"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={allowOutOfStockOrders}
                  onChange={(e) => setAllowOutOfStockOrders(e.target.checked)}
                />
              }
              label="Allow orders on out of stock product"
            />

            <Controller
              name="outOfStockMessage"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Out of Stock Message"
                  fullWidth
                  multiline
                  rows={2}
                  error={!!errors.outOfStockMessage}
                  helperText={errors.outOfStockMessage?.message || "0/100 characters"}
                  inputProps={{ maxLength: 100 }}
                />
              )}
            />
          </Box>
        </Paper>
      </Grid>

      {/* Important Dates */}
      <Grid item xs={12}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight={500}>
            Important Dates
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Controller
                name="advanceBookingDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Advance Booking Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.advanceBookingDate}
                    helperText={errors.advanceBookingDate?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="dispatchingDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Dispatching Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.dispatchingDate}
                    helperText={errors.dispatchingDate?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="restockDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Restock Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.restockDate}
                    helperText={errors.restockDate?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Alerts */}
      {(showOutOfStock || allowOutOfStockOrders) && (
        <Grid item xs={12}>
          <Alert severity="info">
            {showOutOfStock && 'Customers will be able to see out of stock products. '}
            {allowOutOfStockOrders && 'Customers can place orders for out of stock items.'}
          </Alert>
        </Grid>
      )}
    </Grid>
  );
}