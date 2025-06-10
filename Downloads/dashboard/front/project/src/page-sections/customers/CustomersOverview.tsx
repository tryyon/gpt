'use client';

import { useState, useCallback } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  People as PeopleIcon,
  ShoppingCart as OrdersIcon,
  AttachMoney as RevenueIcon,
} from '@mui/icons-material';
import { CustomersTable } from './CustomersTable';
import { CustomerForm } from './CustomerForm';
import { CustomersToolbar } from './CustomersToolbar';
import type { CustomerFormData } from '@/lib/validations/customer';

// Mock data for customer stats
const customerStats = [
  { title: 'Total Customers', value: '2,345', icon: <PeopleIcon /> },
  { title: 'Total Orders', value: '12,456', icon: <OrdersIcon /> },
  { title: 'Total Revenue', value: '$234,567', icon: <RevenueIcon /> },
];

export function CustomersOverview() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerFormData | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);

  const handleAddCustomer = useCallback(() => {
    setSelectedCustomer(null);
    setIsFormOpen(true);
  }, []);

  const handleSaveCustomer = useCallback((data: CustomerFormData) => {
    console.log('Adding customer:', data);
    setIsFormOpen(false);
    setSelectedCustomer(null);
    setSuccessMessage('Customer added successfully');
    setShowSuccess(true);
  }, []);

  const handleEditCustomer = useCallback((customer: CustomerFormData) => {
    setSelectedCustomer(customer);
    setIsFormOpen(true);
  }, []);

  const handleDeleteSelected = useCallback(() => {
    console.log('Deleting selected customers:', selectedCustomers);
    setSelectedCustomers([]);
    setSuccessMessage(`${selectedCustomers.length} customers deleted successfully`);
    setShowSuccess(true);
  }, [selectedCustomers]);

  return (
    <Box>
      {/* Customer Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {customerStats.map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box 
                  sx={{ 
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                  }}
                >
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    {stat.title}
                  </Typography>
                  <Typography variant="h5">
                    {stat.value}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Customers Table */}
      <Card>
        <CardContent>
          <CustomersToolbar 
            onAddCustomer={handleAddCustomer} 
            onImportCustomers={() => {}}
            customers={[]}
            selectedCustomers={selectedCustomers}
            onDeleteSelected={handleDeleteSelected}
          />
          <CustomersTable onEditCustomer={handleEditCustomer} />
        </CardContent>
      </Card>

      {/* Add/Edit Customer Dialog */}
      <Dialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedCustomer(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedCustomer ? 'Edit Customer' : 'Add New Customer'}
        </DialogTitle>
        <DialogContent>
          <CustomerForm
            onSubmit={handleSaveCustomer}
            initialData={selectedCustomer}
          />
        </DialogContent>
      </Dialog>

      {/* Success Snackbar */}
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
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}