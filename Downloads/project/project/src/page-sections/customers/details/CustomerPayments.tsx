'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

// Mock payment data
const mockPaymentMethods = [
  {
    id: 1,
    type: 'Credit Card',
    last4: '4242',
    expiryDate: '12/25',
    isDefault: true,
  },
  {
    id: 2,
    type: 'UPI',
    upiId: 'user@upi',
    isDefault: false,
  },
];

const mockTransactions = [
  {
    id: 1,
    date: '2024-03-15T10:30:00',
    type: 'payment',
    amount: 299.99,
    method: 'Credit Card',
    status: 'completed',
    orderId: 'ORD-2024-001',
  },
  {
    id: 2,
    date: '2024-03-14T15:45:00',
    type: 'refund',
    amount: 99.99,
    method: 'Credit Card',
    status: 'completed',
    orderId: 'ORD-2024-002',
  },
];

export function CustomerPayments() {
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [creditLimit] = useState(5000);
  const [availableCredit] = useState(3500);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Credit Overview */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Credit Overview
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Credit Limit
                </Typography>
                <Typography variant="h4">
                  ${creditLimit.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Available Credit
                </Typography>
                <Typography variant="h4" color="success.main">
                  ${availableCredit.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Used Credit
                </Typography>
                <Typography variant="h4" color="warning.main">
                  ${(creditLimit - availableCredit).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Payment Methods */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">
                Payment Methods
              </Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={() => setShowAddPayment(true)}
              >
                Add Method
              </Button>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {mockPaymentMethods.map((method) => (
                <Paper key={method.id} variant="outlined" sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle2">
                        {method.type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {method.type === 'Credit Card' 
                          ? `**** **** **** ${method.last4}`
                          : method.id
                        }
                      </Typography>
                    </Box>
                    {method.isDefault && (
                      <Chip
                        label="Default"
                        color="primary"
                        size="small"
                      />
                    )}
                  </Box>
                </Paper>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Transaction History */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Transaction History
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Typography
                          color={transaction.type === 'refund' ? 'error.main' : 'inherit'}
                          sx={{ textTransform: 'capitalize' }}
                        >
                          {transaction.type}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          color={transaction.type === 'refund' ? 'error.main' : 'success.main'}
                        >
                          {transaction.type === 'refund' ? '-' : '+'}
                          ${transaction.amount.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={transaction.status}
                          color={getStatusColor(transaction.status)}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Add Payment Method Dialog */}
      <Dialog
        open={showAddPayment}
        onClose={() => setShowAddPayment(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Payment Method</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Card Number"
              fullWidth
              placeholder="**** **** **** ****"
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Expiry Date"
                placeholder="MM/YY"
              />
              <TextField
                label="CVV"
                placeholder="***"
              />
            </Box>
            <TextField
              label="Cardholder Name"
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddPayment(false)}>
            Cancel
          </Button>
          <Button variant="contained">
            Add Payment Method
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}