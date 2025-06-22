'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
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
  Collapse,
  Divider,
  FormHelperText,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { shippingSettingsSchema, type ShippingSettings, type BooleanSettings } from '@/lib/validations/shipping';
import { ShippingToggle } from './ShippingToggle';
import { ShippingPartnerForm } from './ShippingPartnerForm';
import { DeliveryTimeForm } from './DeliveryTimeForm';

const defaultBooleanSettings: BooleanSettings = {
  freeShippingEnabled: false,
  fixedShippingEnabled: false,
  expressShippingEnabled: false,
  integratedShipping: false,
  pickupInStore: false,
  codEnabled: false,
  averageDeliveryTimeEnabled: false,
};

// Predefined shipping partners
const predefinedShippingPartners = [
  { name: 'Delhivery', apiKey: '', password: '' },
  { name: 'ShipRocket', apiKey: '', password: '' },
];

export function ShippingForm({ onSubmit }: { onSubmit: (data: ShippingSettings) => Promise<void> }) {
  const [booleanSettings, setBooleanSettings] = useState<BooleanSettings>(defaultBooleanSettings);

  const { 
    control, 
    handleSubmit, 
    formState: { errors }, 
    register,
  } = useForm<ShippingSettings>({
    resolver: zodResolver(shippingSettingsSchema),
    defaultValues: {
      freeShippingThreshold: '',
      fixedShippingType: 'order',
      fixedShippingAmount: '',
      expressShippingType: 'order',
      expressShippingAmount: '',
      codExtraCharge: '',
      codPartialAdvance: '',
      averageDeliveryTimes: [{ unit: 'days', value: '' }],
      shippingPartners: [],
    },
  });

  const { 
    fields: shippingPartnerFields, 
    append: appendShippingPartner, 
    remove: removeShippingPartner 
  } = useFieldArray({
    control,
    name: 'shippingPartners',
  });

  const { 
    fields: deliveryTimeFields, 
    append: appendDeliveryTime, 
    remove: removeDeliveryTime 
  } = useFieldArray({
    control,
    name: 'averageDeliveryTimes',
  });

  const handleBooleanChange = (setting: keyof BooleanSettings) => {
    setBooleanSettings(prev => {
      const newSettings = { ...prev, [setting]: !prev[setting] };
      
      if (setting === 'pickupInStore' && newSettings.pickupInStore) {
        return {
          ...defaultBooleanSettings,
          pickupInStore: true,
        };
      }
      
      if (setting === 'integratedShipping' && newSettings.integratedShipping) {
        return {
          ...defaultBooleanSettings,
          integratedShipping: true,
        };
      }
      
      return newSettings;
    });
  };

  const handleAddPredefinedPartner = (partner: typeof predefinedShippingPartners[0]) => {
    appendShippingPartner(partner);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        {/* Basic Shipping Options */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Basic Shipping Options
          </Typography>
          <ShippingToggle
            label="Use Default Shipping Configuration"
            description="Use the default shipping configuration for all products"
            name="freeShippingEnabled"
            value={!booleanSettings.pickupInStore && !booleanSettings.integratedShipping}
            onChange={() => {
              setBooleanSettings({
                ...defaultBooleanSettings,
                freeShippingEnabled: true,
              });
            }}
          />
        </Grid>

        {/* Store Pickup Options */}
        <Grid item xs={12}>
          <ShippingToggle
            label="Pickup in Store"
            description="If enabled, products can only be picked up from the store"
            name="pickupInStore"
            value={booleanSettings.pickupInStore}
            onChange={handleBooleanChange}
          />
        </Grid>

        {/* Integrated Shipping */}
        <Grid item xs={12}>
          <ShippingToggle
            label="Integrated Shipping"
            description="Variable shipping price based on each product"
            name="integratedShipping"
            value={booleanSettings.integratedShipping}
            onChange={handleBooleanChange}
            disabled={booleanSettings.pickupInStore}
          />
        </Grid>

        {booleanSettings.integratedShipping && (
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Shipping Partners
            </Typography>
            
            {/* Predefined shipping partners */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Quick Add Partners
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                {predefinedShippingPartners.map((partner, idx) => (
                  <Button 
                    key={idx} 
                    variant="outlined" 
                    onClick={() => handleAddPredefinedPartner(partner)}
                  >
                    {partner.name}
                  </Button>
                ))}
              </Box>
            </Box>
            
            {shippingPartnerFields.map((field, index) => (
              <Box key={field.id} sx={{ mb: 3 }}>
                <ShippingPartnerForm
                  control={control}
                  index={index}
                  onRemove={() => removeShippingPartner(index)}
                  errors={errors}
                />
              </Box>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={() => appendShippingPartner({ name: '', apiKey: '', password: '' })}
              variant="outlined"
            >
              Add Custom Shipping Partner
            </Button>
          </Grid>
        )}

        {!booleanSettings.pickupInStore && !booleanSettings.integratedShipping && (
          <>
            {/* Free Shipping */}
            <Grid item xs={12}>
              <ShippingToggle
                label="Free Shipping"
                description="Enable free shipping above a certain amount"
                name="freeShippingEnabled"
                value={booleanSettings.freeShippingEnabled}
                onChange={handleBooleanChange}
              />
            </Grid>

            {booleanSettings.freeShippingEnabled && (
              <Grid item xs={12} md={6}>
                <TextField
                  {...register('freeShippingThreshold')}
                  label="Free Shipping Threshold"
                  type="number"
                  fullWidth
                  error={!!errors.freeShippingThreshold}
                  helperText={errors.freeShippingThreshold?.message}
                />
              </Grid>
            )}

            {/* Fixed Shipping */}
            <Grid item xs={12}>
              <ShippingToggle
                label="Fixed Shipping"
                description="Set a fixed shipping price"
                name="fixedShippingEnabled"
                value={booleanSettings.fixedShippingEnabled}
                onChange={handleBooleanChange}
              />
            </Grid>

            {booleanSettings.fixedShippingEnabled && (
              <>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Fixed Shipping Type</InputLabel>
                    <Select
                      {...register('fixedShippingType')}
                      label="Fixed Shipping Type"
                    >
                      <MenuItem value="order">Per Order</MenuItem>
                      <MenuItem value="product">Per Product</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    {...register('fixedShippingAmount')}
                    label="Fixed Shipping Amount"
                    type="number"
                    fullWidth
                    error={!!errors.fixedShippingAmount}
                    helperText={errors.fixedShippingAmount?.message}
                  />
                </Grid>
              </>
            )}

            {/* Express Shipping */}
            <Grid item xs={12}>
              <ShippingToggle
                label="Express Shipping"
                description="Enable express shipping option"
                name="expressShippingEnabled"
                value={booleanSettings.expressShippingEnabled}
                onChange={handleBooleanChange}
              />
            </Grid>

            {booleanSettings.expressShippingEnabled && (
              <>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Express Shipping Type</InputLabel>
                    <Select
                      {...register('expressShippingType')}
                      label="Express Shipping Type"
                    >
                      <MenuItem value="order">Per Order</MenuItem>
                      <MenuItem value="product">Per Product</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    {...register('expressShippingAmount')}
                    label="Express Shipping Amount"
                    type="number"
                    fullWidth
                    error={!!errors.expressShippingAmount}
                    helperText={errors.expressShippingAmount?.message}
                  />
                </Grid>
              </>
            )}

            {/* Delivery Times */}
            <Grid item xs={12}>
              <ShippingToggle
                label="Average Delivery Times"
                description="Set estimated delivery times"
                name="averageDeliveryTimeEnabled"
                value={booleanSettings.averageDeliveryTimeEnabled}
                onChange={handleBooleanChange}
              />
            </Grid>

            {booleanSettings.averageDeliveryTimeEnabled && (
              <Grid item xs={12}>
                {deliveryTimeFields.map((field, index) => (
                  <Box key={field.id} sx={{ mb: 3 }}>
                    <DeliveryTimeForm
                      control={control}
                      index={index}
                      onRemove={() => removeDeliveryTime(index)}
                      errors={errors}
                    />
                  </Box>
                ))}
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => appendDeliveryTime({ unit: 'days', value: '' })}
                  variant="outlined"
                >
                  Add Delivery Time
                </Button>
              </Grid>
            )}
          </>
        )}

        <Grid item xs={12}>
          <Divider />
        </Grid>

        {/* COD Settings */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Cash on Delivery (COD)
          </Typography>
          <ShippingToggle
            label="Enable COD"
            description="Allow cash on delivery payments"
            name="codEnabled"
            value={booleanSettings.codEnabled}
            onChange={handleBooleanChange}
            disabled={booleanSettings.pickupInStore}
          />
        </Grid>

        {booleanSettings.codEnabled && !booleanSettings.pickupInStore && (
          <>
            <Grid item xs={12} md={6}>
              <TextField
                {...register('codExtraCharge')}
                label="COD Extra Charge"
                type="number"
                fullWidth
                error={!!errors.codExtraCharge}
                helperText={errors.codExtraCharge?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...register('codPartialAdvance')}
                label="COD Partial Advance"
                type="number"
                fullWidth
                error={!!errors.codPartialAdvance}
                helperText={errors.codPartialAdvance?.message}
              />
            </Grid>
          </>
        )}

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            size="large"
          >
            Save Shipping Settings
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}