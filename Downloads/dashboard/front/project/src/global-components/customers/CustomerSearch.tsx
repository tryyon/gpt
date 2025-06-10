'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Autocomplete,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  CircularProgress,
  Paper,
  Avatar,
  Chip,
  InputAdornment,
  IconButton,
  useTheme,
} from '@mui/material';
import { 
  Add as AddIcon, 
  Search as SearchIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { CustomerForm } from './CustomerForm';
import { CustomerFormData } from '@/types/customer';

interface Customer extends CustomerFormData {
  id: string;
}

// Mock customer data with more realistic information
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    billingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      pincode: '10001',
      country: 'USA',
    },
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '9876543210',
    billingAddress: {
      street: '456 Park Ave',
      city: 'Boston',
      state: 'MA',
      pincode: '02108',
      country: 'USA',
    },
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    phone: '5551234567',
    billingAddress: {
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      pincode: '60601',
      country: 'USA',
    },
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '7778889999',
    billingAddress: {
      street: '321 Pine St',
      city: 'San Francisco',
      state: 'CA',
      pincode: '94101',
      country: 'USA',
    },
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael@example.com',
    phone: '3334445555',
    billingAddress: {
      street: '654 Maple St',
      city: 'Seattle',
      state: 'WA',
      pincode: '98101',
      country: 'USA',
    },
  },
];

interface CustomerSearchProps {
  onCustomerSelect: (customer: Customer) => void;
}

export function CustomerSearch({ onCustomerSelect }: CustomerSearchProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const handleAddNewCustomer = (customerData: CustomerFormData) => {
    const newCustomer = {
      id: `C${customers.length + 1}`,
      ...customerData,
    };
    setCustomers([...customers, newCustomer]);
    onCustomerSelect(newCustomer);
    setSelectedCustomer(newCustomer);
    setOpen(false);
  };

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    // Filter customers based on search term
    const filteredCustomers = mockCustomers.filter(customer =>
      customer.name.toLowerCase().includes(term.toLowerCase()) ||
      customer.email?.toLowerCase().includes(term.toLowerCase()) ||
      customer.phone.includes(term)
    );
    setCustomers(filteredCustomers);
    setLoading(false);
  };

  const handleClearSelection = () => {
    setSelectedCustomer(null);
  };

  return (
    <Box>
      {!selectedCustomer ? (
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Autocomplete
              options={customers}
              getOptionLabel={(option) => `${option.name} (${option.phone})`}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Customer"
                  variant="outlined"
                  placeholder="Search by name, email, or phone"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <>
                        {loading && <CircularProgress size={20} />}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              )}
              onChange={(_, value) => value && onCustomerSelect(value)}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  {...props}
                  key={option.id}
                  sx={{
                    '&:hover': {
                      bgcolor: theme.palette.action.hover,
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Avatar 
                      sx={{ 
                        mr: 2, 
                        bgcolor: theme.palette.primary.main 
                      }}
                    >
                      {option.name.charAt(0)}
                    </Avatar>
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography variant="body1" fontWeight={500} noWrap>
                        {option.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Typography variant="caption" color="text.secondary" noWrap>
                          <PhoneIcon fontSize="inherit" sx={{ mr: 0.5, verticalAlign: 'text-bottom' }} />
                          {option.phone}
                        </Typography>
                        {option.email && (
                          <Typography variant="caption" color="text.secondary" noWrap>
                            <EmailIcon fontSize="inherit" sx={{ mr: 0.5, verticalAlign: 'text-bottom' }} />
                            {option.email}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
              loading={loading}
              fullWidth
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpen(true)}
            >
              Add New
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Paper 
          variant="outlined" 
          sx={{ 
            p: 2, 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: theme.palette.background.default,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
              {selectedCustomer.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="subtitle1">{selectedCustomer.name}</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Chip 
                  icon={<PhoneIcon fontSize="small" />} 
                  label={selectedCustomer.phone} 
                  size="small" 
                  variant="outlined"
                />
                {selectedCustomer.email && (
                  <Chip 
                    icon={<EmailIcon fontSize="small" />} 
                    label={selectedCustomer.email} 
                    size="small" 
                    variant="outlined"
                  />
                )}
              </Box>
            </Box>
          </Box>
          <IconButton onClick={handleClearSelection}>
            <ClearIcon />
          </IconButton>
        </Paper>
      )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add New Customer</DialogTitle>
        <DialogContent>
          <CustomerForm onSubmit={handleAddNewCustomer} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}