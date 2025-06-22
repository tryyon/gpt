'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Card,
  CardContent,
  Collapse,
  Divider,
  Paper,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Chip,
  Avatar,
  Alert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { 
  ShoppingCart as CartIcon, 
  Person as PersonIcon, 
  Payment as PaymentIcon,
  ArrowBack as BackIcon,
  ArrowForward as NextIcon,
  Check as CheckIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { CustomerSearch } from '@/global-components/customers/CustomerSearch';
import { CustomerForm } from '@/page-sections/customers/CustomerForm';

import { ProductSelectionView } from '@/page-sections/products/ProductSelectionView';
import type { CustomerFormData } from '@/types/customer';
import type { SelectedProduct } from '@/types/product';

const paymentMethods = [
  { value: 'credit_card', label: 'Credit Card', icon: '💳' },
  { value: 'cash', label: 'Cash', icon: '💵' },
  { value: 'bank_transfer', label: 'Bank Transfer', icon: '🏦' },
  { value: 'upi', label: 'UPI', icon: '📱' },
];

const steps = ['Customer Information', 'Products', 'Payment & Confirmation'];

export function CreateOrderForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState<(CustomerFormData & { id: string; address?: { city?: string; state?: string; pincode?: string } }) | null>(null);
  const [customerAction, setCustomerAction] = useState<'search' | 'add_new'>('search'); // 'search' or 'add_new'
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [upiId, setUpiId] = useState('');
  const [notes, setNotes] = useState('');
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0,
  });

  // Calculate order summary whenever selected products change
  const calculateOrderSummary = (products: SelectedProduct[]) => {
    const subtotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    const tax = subtotal * 0.18; // 18% tax
    const shipping = subtotal > 500 ? 0 : 50; // Free shipping over $500
    const total = subtotal + tax + shipping;
    
    setOrderSummary({
      subtotal,
      tax,
      shipping,
      total
    });
  };

  // Update order summary when products change
  const handleProductsChange = (products: SelectedProduct[]) => {
    setSelectedProducts(products);
    calculateOrderSummary(products);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0 && selectedCustomer) {
      setSelectedCustomer(null);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleCreateOrder = () => {
    // Here you would submit the order
    console.log({
      customer: selectedCustomer,
      products: selectedProducts,
      payment: {
        method: paymentMethod,
        upiId: paymentMethod === 'upi' ? upiId : undefined,
      },
      notes,
      summary: orderSummary,
    });
    
    // Show success message or redirect
    setActiveStep(steps.length); // Move to completion step
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 0: // Customer Information
        return !!selectedCustomer;
      case 1: // Products
        return selectedProducts.length > 0;
      case 2: // Payment
        return paymentMethod !== '' && (paymentMethod !== 'upi' || upiId !== '');
      default:
        return false;
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', fontWeight: 500 }}>
              Customer Information
            </Typography>
            {!selectedCustomer ? (
              customerAction === 'search' ? (
                <Box>
                  <CustomerSearch onCustomerSelect={(customer) => {
                    setSelectedCustomer(customer);
                    setCustomerAction('search'); // Reset to search after selection
                  }} />
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => setCustomerAction('add_new')}
                    sx={{ mt: 2 }}
                  >
                    Add New Customer
                  </Button>
                </Box>
              ) : (
                <Box>
                  <CustomerForm onSubmit={(data) => {
                    // Here you would typically save the new customer to your backend
                    // For now, we'll just select them and close the form
                    setSelectedCustomer({ ...data, id: `new-${Date.now()}` }); // Assign a temporary ID
                    setCustomerAction('search'); // Go back to search view after adding
                  }} />
                  <Button
                    variant="outlined"
                    startIcon={<BackIcon />}
                    onClick={() => setCustomerAction('search')}
                    sx={{ mt: 2 }}
                  >
                    Back to Search
                  </Button>
                </Box>
              )
            ) : (
              <Paper 
                variant="outlined" 
                sx={{ 
                  mt: 2, 
                  p: 2, 
                  bgcolor: 'background.default',
                  borderRadius: 1
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {selectedCustomer.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1">{selectedCustomer.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{selectedCustomer.phone}</Typography>
                      </Box>
                      <Button
                    variant="outlined"
                    onClick={() => setSelectedCustomer(null)}
                    sx={{ mt: 2 }}
                  >
                    Change Customer
                  </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Email</Typography>
                    <Typography variant="body1">{selectedCustomer.email || 'Not provided'}</Typography>
                  </Grid>
                  {selectedCustomer.address && typeof selectedCustomer.address === 'object' && 'city' in selectedCustomer.address && 'state' in selectedCustomer.address && 'pincode' in selectedCustomer.address ? (
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">Address</Typography>
                      <Typography variant="body1">
                        {`${(selectedCustomer.address as { city?: string; state?: string; pincode?: string }).city || ''}, ${(selectedCustomer.address as { city?: string; state?: string; pincode?: string }).state || ''}, ${(selectedCustomer.address as { city?: string; state?: string; pincode?: string }).pincode || ''}`}
                      </Typography>
                    </Grid>
                  ) : null}
                </Grid>
              </Paper>
            )}
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', fontWeight: 500 }}>
              Products
            </Typography>
            <ProductSelectionView />
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', fontWeight: 500 }}>
              Payment Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Payment Method
                  </Typography>
                  <Grid container spacing={2}>
                    {paymentMethods.map((method) => (
                      <Grid item xs={6} key={method.value}>
                        <Paper
                          variant="outlined"
                          sx={{
                            p: 2,
                            textAlign: 'center',
                            cursor: 'pointer',
                            borderColor: paymentMethod === method.value ? 'primary.main' : 'divider',
                            bgcolor: paymentMethod === method.value ? 'primary.light' : 'background.paper',
                            '&:hover': {
                              borderColor: 'primary.main',
                              bgcolor: 'action.hover',
                            },
                          }}
                          onClick={() => setPaymentMethod(method.value)}
                        >
                          <Typography variant="h5" sx={{ mb: 1 }}>
                            {method.icon}
                          </Typography>
                          <Typography variant="body2">
                            {method.label}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>

                  <Collapse in={paymentMethod === 'upi'} sx={{ mt: 2 }}>
                    <TextField
                      fullWidth
                      label="UPI ID"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="example@upi"
                      required={paymentMethod === 'upi'}
                    />
                  </Collapse>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Order Notes
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Add any special instructions or notes for this order..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Order Summary
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="body2">Subtotal</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" align="right">
                          ${orderSummary.subtotal.toFixed(2)}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">Tax (18%)</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" align="right">
                          ${orderSummary.tax.toFixed(2)}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">Shipping</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" align="right">
                          ${orderSummary.shipping.toFixed(2)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ my: 1 }} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Total
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1" fontWeight="bold" align="right">
                          ${orderSummary.total.toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Box sx={{ 
              width: 80, 
              height: 80, 
              borderRadius: '50%', 
              bgcolor: 'success.main', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mx: 'auto',
              mb: 3
            }}>
              <CheckIcon sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography variant="h5" gutterBottom>
              Order Created Successfully!
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              The order has been created and is now being processed.
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => window.location.href = '/dashboard/orders'}
              sx={{ mt: 2 }}
            >
              View All Orders
            </Button>
          </Box>
        );
    }
  };

  return (
    <Card variant="outlined">
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Stepper 
          activeStep={activeStep} 
          alternativeLabel={!isMobile}
          orientation={isMobile ? 'vertical' : 'horizontal'}
          sx={{ mb: 4 }}
        >
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            if (index < activeStep) {
              stepProps.completed = true;
            }
            
            return (
              <Step key={label} {...stepProps}>
                <StepLabel 
                  StepIconProps={{
                    icon: index === 0 ? <PersonIcon /> : 
                           index === 1 ? <CartIcon /> : 
                           <PaymentIcon />
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          getStepContent(activeStep)
        ) : (
          <>
            <Box sx={{ mb: 4 }}>
              {getStepContent(activeStep)}
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              mt: 4,
              pt: 3,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={activeStep === 0}
                startIcon={<BackIcon />}
              >
                Back
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateOrder}
                  disabled={!isStepComplete(activeStep)}
                  endIcon={<CheckIcon />}
                >
                  Create Order
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={!isStepComplete(activeStep)}
                  endIcon={<NextIcon />}
                >
                  Next
                </Button>
              )}
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
}