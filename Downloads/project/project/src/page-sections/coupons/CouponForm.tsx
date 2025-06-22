'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Typography,
  Tabs,
  Tab,
  Autocomplete,
  Chip,
  InputAdornment,
  Divider,
} from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`coupon-tabpanel-${index}`}
      aria-labelledby={`coupon-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

interface CouponFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

// Mock data for products and categories
const mockProducts = [
  { id: 'p1', name: 'Nike Air Max' },
  { id: 'p2', name: 'Adidas Ultraboost' },
  { id: 'p3', name: 'Puma RS-X' },
  { id: 'p4', name: 'New Balance 990' },
];

const mockCategories = [
  { id: 'c1', name: 'Shoes' },
  { id: 'c2', name: 'Clothing' },
  { id: 'c3', name: 'Accessories' },
  { id: 'c4', name: 'Electronics' },
];

export function CouponForm({ initialData, onSubmit, onCancel }: CouponFormProps) {
  const [currentTab, setCurrentTab] = useState(0);
  
  // Parse date and time from initialData if available
  const parseDateTime = (dateTimeStr: string | undefined, defaultDate: Date) => {
    if (!dateTimeStr) return { date: defaultDate.toISOString().split('T')[0], time: '00:00' };
    
    try {
      const date = new Date(dateTimeStr);
      return {
        date: date.toISOString().split('T')[0],
        time: `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
      };
    } catch (e) {
      return { date: defaultDate.toISOString().split('T')[0], time: '00:00' };
    }
  };
  
  const startDateTime = parseDateTime(initialData?.startDate, new Date());
  const endDateTime = parseDateTime(initialData?.endDate, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
  
  const [formData, setFormData] = useState({
    code: initialData?.code || '',
    type: initialData?.type || 'percentage',
    value: initialData?.value || '',
    minPurchase: initialData?.minPurchase || '',
    minOrderQuantity: initialData?.minOrderQuantity || '',
    maxDiscount: initialData?.maxDiscount || '',
    startDate: startDateTime.date,
    startTime: startDateTime.time,
    endDate: endDateTime.date,
    endTime: endDateTime.time,
    usageLimit: initialData?.usageLimit || '',
    maxUsageCount: initialData?.maxUsageCount || '',
    isActive: initialData?.isActive ?? true,
    description: initialData?.description || '',
    applicableProducts: initialData?.applicableProducts || 'all',
    selectedProducts: initialData?.selectedProducts || [],
    excludedProducts: initialData?.excludedProducts || [],
    applicableCategories: initialData?.applicableCategories || 'all',
    selectedCategories: initialData?.selectedCategories || [],
    excludedCategories: initialData?.excludedCategories || [],
    // Coupon functionality options
    showToCustomer: initialData?.showToCustomer ?? true,
    onlinePaymentsOnly: initialData?.onlinePaymentsOnly ?? false,
    newCustomersOnly: initialData?.newCustomersOnly ?? false,
    autoApply: initialData?.autoApply ?? false,
  });

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSelectChange = (field: string) => (event: any) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSwitchChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.checked });
  };

  const handleSubmit = () => {
    // Combine date and time for start and end dates
    const combinedData = {
      ...formData,
      startDate: combineDateTime(formData.startDate, formData.startTime),
      endDate: combineDateTime(formData.endDate, formData.endTime),
    };
    
    // Remove the separate time fields before submitting
    const { startTime, endTime, ...dataToSubmit } = combinedData;
    
    onSubmit(dataToSubmit);
  };
  
  // Helper function to combine date and time into ISO string
  const combineDateTime = (date: string, time: string) => {
    const [hours, minutes] = time.split(':');
    const dateObj = new Date(date);
    dateObj.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    return dateObj.toISOString();
  };

  return (
    <>
      <DialogTitle>
        {initialData ? 'Edit Coupon' : 'Create New Coupon'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
          <Tabs value={currentTab} onChange={handleTabChange} aria-label="coupon form tabs">
            <Tab label="Basic Information" />
            <Tab label="Restrictions" />
            <Tab label="Products & Categories" />
          </Tabs>
        </Box>

        <TabPanel value={currentTab} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Coupon Code"
                value={formData.code}
                onChange={handleChange('code')}
                fullWidth
                required
                placeholder="e.g., SUMMER25"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Discount Type</InputLabel>
                <Select
                  value={formData.type}
                  onChange={handleSelectChange('type')}
                  label="Discount Type"
                >
                  <MenuItem value="percentage">Percentage Discount</MenuItem>
                  <MenuItem value="fixed">Fixed Amount Discount</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Discount Value"
                value={formData.value}
                onChange={handleChange('value')}
                fullWidth
                required
                type="number"
                InputProps={{
                  startAdornment: formData.type === 'percentage' ? null : (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                  endAdornment: formData.type === 'percentage' ? (
                    <InputAdornment position="end">%</InputAdornment>
                  ) : null,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                value={formData.description}
                onChange={handleChange('description')}
                fullWidth
                multiline
                rows={2}
                placeholder="Brief description of the coupon"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Validity Period
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={7}>
                  <TextField
                    label="Start Date"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange('startDate')}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    label="Start Time"
                    type="time"
                    value={formData.startTime}
                    onChange={handleChange('startTime')}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={7}>
                  <TextField
                    label="End Date"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange('endDate')}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    label="End Time"
                    type="time"
                    value={formData.endTime}
                    onChange={handleChange('endTime')}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                Coupon Functionality
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.showToCustomer}
                        onChange={handleSwitchChange('showToCustomer')}
                        color="primary"
                      />
                    }
                    label="Show coupon to customer"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.onlinePaymentsOnly}
                        onChange={handleSwitchChange('onlinePaymentsOnly')}
                        color="primary"
                      />
                    }
                    label="Valid only for online payments"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.newCustomersOnly}
                        onChange={handleSwitchChange('newCustomersOnly')}
                        color="primary"
                      />
                    }
                    label="Valid only for new customers"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.autoApply}
                        onChange={handleSwitchChange('autoApply')}
                        color="primary"
                      />
                    }
                    label="Auto apply coupon"
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={handleSwitchChange('isActive')}
                  />
                }
                label="Coupon is active"
              />
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={currentTab} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Minimum Purchase Amount"
                value={formData.minPurchase}
                onChange={handleChange('minPurchase')}
                fullWidth
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                helperText="Leave blank for no minimum"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Minimum Order Quantity"
                value={formData.minOrderQuantity}
                onChange={handleChange('minOrderQuantity')}
                fullWidth
                type="number"
                helperText="Minimum number of items required"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Maximum Discount Amount"
                value={formData.maxDiscount}
                onChange={handleChange('maxDiscount')}
                fullWidth
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                helperText="Leave blank for no maximum"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Usage Limit Per Customer"
                value={formData.usageLimit}
                onChange={handleChange('usageLimit')}
                fullWidth
                type="number"
                helperText="Leave blank for unlimited usage"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Max Count of Coupon Usage"
                value={formData.maxUsageCount}
                onChange={handleChange('maxUsageCount')}
                fullWidth
                type="number"
                helperText="Maximum number of times this coupon can be used across all customers"
              />
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={currentTab} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Product Restrictions
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Applicable Products</InputLabel>
                <Select
                  value={formData.applicableProducts}
                  onChange={handleSelectChange('applicableProducts')}
                  label="Applicable Products"
                >
                  <MenuItem value="all">All Products</MenuItem>
                  <MenuItem value="specific">Specific Products</MenuItem>
                </Select>
              </FormControl>

              {formData.applicableProducts === 'specific' && (
                <Autocomplete
                  multiple
                  options={mockProducts}
                  getOptionLabel={(option) => option.name}
                  value={formData.selectedProducts}
                  onChange={(_, newValue) => {
                    setFormData({ ...formData, selectedProducts: newValue });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Products"
                      placeholder="Search products"
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        label={option.name}
                        {...getTagProps({ index })}
                        key={option.id}
                      />
                    ))
                  }
                  sx={{ mb: 2 }}
                />
              )}

              <Autocomplete
                multiple
                options={mockProducts}
                getOptionLabel={(option) => option.name}
                value={formData.excludedProducts}
                onChange={(_, newValue) => {
                  setFormData({ ...formData, excludedProducts: newValue });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Excluded Products"
                    placeholder="Products that cannot use this coupon"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option.name}
                      {...getTagProps({ index })}
                      key={option.id}
                    />
                  ))
                }
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Category Restrictions
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Applicable Categories</InputLabel>
                <Select
                  value={formData.applicableCategories}
                  onChange={handleSelectChange('applicableCategories')}
                  label="Applicable Categories"
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="specific">Specific Categories</MenuItem>
                </Select>
              </FormControl>

              {formData.applicableCategories === 'specific' && (
                <Autocomplete
                  multiple
                  options={mockCategories}
                  getOptionLabel={(option) => option.name}
                  value={formData.selectedCategories}
                  onChange={(_, newValue) => {
                    setFormData({ ...formData, selectedCategories: newValue });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Categories"
                      placeholder="Search categories"
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        label={option.name}
                        {...getTagProps({ index })}
                        key={option.id}
                      />
                    ))
                  }
                  sx={{ mb: 2 }}
                />
              )}

              <Autocomplete
                multiple
                options={mockCategories}
                getOptionLabel={(option) => option.name}
                value={formData.excludedCategories}
                onChange={(_, newValue) => {
                  setFormData({ ...formData, excludedCategories: newValue });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Excluded Categories"
                    placeholder="Categories that cannot use this coupon"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option.name}
                      {...getTagProps({ index })}
                      key={option.id}
                    />
                  ))
                }
              />
            </Grid>
          </Grid>
        </TabPanel>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          {initialData ? 'Update Coupon' : 'Create Coupon'}
        </Button>
      </DialogActions>
    </>
  );
}