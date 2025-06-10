'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Collapse,
  Grid,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';

// Mock order data
const mockOrders = [
  {
    id: 'ORD-2024-001',
    date: '2024-03-15T10:30:00',
    status: 'completed',
    total: 299.99,
    items: [
      { id: 1, name: 'Product 1', quantity: 2, price: 149.99 },
      { id: 2, name: 'Product 2', quantity: 1, price: 99.99 },
    ],
    shipping: {
      method: 'Express',
      address: '123 Main St, Mumbai, 400001',
      tracking: 'TRK123456789',
    },
    payment: {
      method: 'Credit Card',
      status: 'paid',
    },
  },
  {
    id: 'ORD-2024-002',
    date: '2024-03-14T15:45:00',
    status: 'processing',
    total: 199.99,
    items: [
      { id: 3, name: 'Product 3', quantity: 1, price: 199.99 },
    ],
    shipping: {
      method: 'Standard',
      address: '123 Main St, Mumbai, 400001',
      tracking: 'TRK987654321',
    },
    payment: {
      method: 'UPI',
      status: 'paid',
    },
  },
];

export function CustomerOrders() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleExpandOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'processing':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const filteredOrders = mockOrders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.items.some(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="outlined"
          startIcon={<FilterIcon />}
        >
          Filter
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filteredOrders.map((order) => (
          <Card key={order.id}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6">
                    {order.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(order.date).toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                  <Typography variant="h6" color="primary">
                    ${order.total.toFixed(2)}
                  </Typography>
                  <IconButton
                    onClick={() => handleExpandOrder(order.id)}
                    sx={{ transform: expandedOrder === order.id ? 'rotate(180deg)' : 'none' }}
                  >
                    {expandedOrder === order.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
              </Box>

              <Collapse in={expandedOrder === order.id}>
                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={3}>
                    {/* Order Items */}
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" gutterBottom>
                        Items
                      </Typography>
                      {order.items.map((item) => (
                        <Box
                          key={item.id}
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            py: 1,
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                          }}
                        >
                          <Box>
                            <Typography variant="body2">
                              {item.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Quantity: {item.quantity}
                            </Typography>
                          </Box>
                          <Typography variant="body2">
                            ${(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </Box>
                      ))}
                    </Grid>

                    {/* Shipping Details */}
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Shipping Details
                      </Typography>
                      <Typography variant="body2">
                        Method: {order.shipping.method}
                      </Typography>
                      <Typography variant="body2">
                        Address: {order.shipping.address}
                      </Typography>
                      <Typography variant="body2">
                        Tracking: {order.shipping.tracking}
                      </Typography>
                    </Grid>

                    {/* Payment Details */}
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Payment Details
                      </Typography>
                      <Typography variant="body2">
                        Method: {order.payment.method}
                      </Typography>
                      <Typography variant="body2">
                        Status: {order.payment.status}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Collapse>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}