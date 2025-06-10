'use client';

import { useState } from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import { 
  AccountBalance as AccountBalanceIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Visibility as VisibilityIcon,
  CreditCard as CreditCardIcon,
  AccountBalanceWallet as WalletIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';
import { PageTitle } from '@/global-components/layout/PageTitle';

// Mock data - Replace with actual API data
const initialWalletStats = [
  { title: 'Available Balance', value: 12345.67, icon: <AccountBalanceIcon /> },
  { title: 'Pending Balance', value: 890.00, icon: <ArrowUpwardIcon /> },
  { title: 'Total Withdrawals', value: 45678.90, icon: <ArrowDownwardIcon /> },
];

const initialTransactions = [
  { 
    id: 1, 
    type: 'credit',
    amount: 1234.56,
    description: 'Order payment received',
    date: '2024-03-15',
    status: 'completed',
    reference: 'TXN123456',
  },
  { 
    id: 2, 
    type: 'debit',
    amount: 500.00,
    description: 'Withdrawal to bank account',
    date: '2024-03-14',
    status: 'pending',
    reference: 'WTH789012',
  },
  { 
    id: 3, 
    type: 'credit',
    amount: 789.00,
    description: 'Refund processed',
    date: '2024-03-13',
    status: 'completed',
    reference: 'REF345678',
  },
];

const paymentMethods = [
  { id: 'credit_card', label: 'Credit Card', icon: <CreditCardIcon /> },
  { id: 'bank_transfer', label: 'Bank Transfer', icon: <AccountBalanceIcon /> },
  { id: 'upi', label: 'UPI', icon: <WalletIcon /> },
];

const withdrawalMethods = [
  { id: 'bank_account', label: 'Bank Account', icon: <AccountBalanceIcon /> },
  { id: 'upi', label: 'UPI', icon: <WalletIcon /> },
];

interface TransactionDetails {
  id: number;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: string;
  reference: string;
}

export function WalletOverview() {
  const [walletStats, setWalletStats] = useState(initialWalletStats);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [addFundsOpen, setAddFundsOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionDetails | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Add Funds Form State
  const [addFundsAmount, setAddFundsAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [addFundsStep, setAddFundsStep] = useState(1);

  // Withdraw Form State
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedWithdrawMethod, setSelectedWithdrawMethod] = useState('');
  const [withdrawStep, setWithdrawStep] = useState(1);
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    accountName: '',
    bankName: '',
    ifscCode: '',
  });

  const generateReference = (prefix: string) => {
    return `${prefix}${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000)}`;
  };

  const updateWalletStats = (amount: number, isCredit: boolean) => {
    setWalletStats(prev => prev.map(stat => {
      if (stat.title === 'Available Balance') {
        return {
          ...stat,
          value: isCredit ? stat.value + amount : stat.value - amount
        };
      }
      return stat;
    }));
  };

  const addTransaction = (amount: number, type: 'credit' | 'debit', description: string) => {
    const newTransaction: TransactionDetails = {
      id: transactions.length + 1,
      type,
      amount,
      description,
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      reference: generateReference(type === 'credit' ? 'TXN' : 'WTH'),
    };

    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleAddFunds = async () => {
    if (addFundsStep === 1) {
      if (!addFundsAmount || !selectedPaymentMethod) {
        setError('Please fill in all required fields');
        return;
      }
      setAddFundsStep(2);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const amount = parseFloat(addFundsAmount);
      updateWalletStats(amount, true);
      addTransaction(
        amount,
        'credit',
        `Funds added via ${paymentMethods.find(m => m.id === selectedPaymentMethod)?.label}`
      );

      setSuccess('Funds added successfully!');
      setAddFundsOpen(false);
      setAddFundsStep(1);
      setAddFundsAmount('');
      setSelectedPaymentMethod('');
    } catch (err) {
      setError('Failed to add funds. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (withdrawStep === 1) {
      if (!withdrawAmount || !selectedWithdrawMethod) {
        setError('Please fill in all required fields');
        return;
      }
      setWithdrawStep(2);
      return;
    }

    if (withdrawStep === 2 && selectedWithdrawMethod === 'bank_account') {
      if (!bankDetails.accountNumber || !bankDetails.accountName || !bankDetails.bankName || !bankDetails.ifscCode) {
        setError('Please fill in all bank details');
        return;
      }
    }

    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const amount = parseFloat(withdrawAmount);
      updateWalletStats(amount, false);
      addTransaction(
        amount,
        'debit',
        `Withdrawal via ${withdrawalMethods.find(m => m.id === selectedWithdrawMethod)?.label}`
      );

      setSuccess('Withdrawal request submitted successfully!');
      setWithdrawOpen(false);
      setWithdrawStep(1);
      setWithdrawAmount('');
      setSelectedWithdrawMethod('');
      setBankDetails({
        accountNumber: '',
        accountName: '',
        bankName: '',
        ifscCode: '',
      });
    } catch (err) {
      setError('Failed to process withdrawal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (transaction: TransactionDetails) => {
    setSelectedTransaction(transaction);
    setDetailsOpen(true);
  };

  const calculateFee = (amount: string) => {
    // Example fee calculation
    return parseFloat(amount) * 0.015; // 1.5% fee
  };

  return (
    <Box>
      <PageTitle 
        title="Wallet" 
        subtitle="Manage your store's finances and transactions"
      />

      {/* Wallet Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {walletStats.map((stat, index) => (
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
                    ${stat.value.toFixed(2)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Actions */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <Button 
          variant="contained" 
          startIcon={<ArrowUpwardIcon />}
          onClick={() => setAddFundsOpen(true)}
        >
          Add Funds
        </Button>
        <Button 
          variant="contained" 
          color="secondary"
          startIcon={<ArrowDownwardIcon />}
          onClick={() => setWithdrawOpen(true)}
        >
          Withdraw Funds
        </Button>
      </Box>

      {/* Transactions */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Transactions
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Reference</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {transaction.reference}
                      </Typography>
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell align="right">
                      <Typography
                        color={transaction.type === 'credit' ? 'success.main' : 'error.main'}
                      >
                        {transaction.type === 'credit' ? '+' : '-'}
                        ${transaction.amount.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={transaction.status}
                        color={transaction.status === 'completed' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="View Details">
                        <IconButton 
                          size="small"
                          onClick={() => handleViewDetails(transaction)}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add Funds Dialog */}
      <Dialog 
        open={addFundsOpen} 
        onClose={() => {
          setAddFundsOpen(false);
          setAddFundsStep(1);
          setError(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Add Funds to Wallet
        </DialogTitle>
        <DialogContent>
          {addFundsStep === 1 ? (
            <Box sx={{ pt: 2 }}>
              <TextField
                label="Amount"
                type="number"
                fullWidth
                value={addFundsAmount}
                onChange={(e) => setAddFundsAmount(e.target.value)}
                InputProps={{
                  startAdornment: '$',
                }}
                sx={{ mb: 3 }}
              />
              <FormControl fullWidth>
                <InputLabel>Payment Method</InputLabel>
                <Select
                  value={selectedPaymentMethod}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  label="Payment Method"
                >
                  {paymentMethods.map((method) => (
                    <MenuItem key={method.id} value={method.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {method.icon}
                        {method.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          ) : (
            <Box sx={{ pt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Confirm Transaction
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography color="text.secondary">Amount:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>${addFundsAmount}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography color="text.secondary">Payment Method:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    {paymentMethods.find(m => m.id === selectedPaymentMethod)?.label}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography color="text.secondary">Processing Fee:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>${calculateFee(addFundsAmount).toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">Total Amount:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">
                    ${(parseFloat(addFundsAmount) + calculateFee(addFundsAmount)).toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => {
              setAddFundsOpen(false);
              setAddFundsStep(1);
              setError(null);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddFunds}
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? 'Processing...' : addFundsStep === 1 ? 'Continue' : 'Confirm Payment'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Withdraw Funds Dialog */}
      <Dialog 
        open={withdrawOpen} 
        onClose={() => {
          setWithdrawOpen(false);
          setWithdrawStep(1);
          setError(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Withdraw Funds
        </DialogTitle>
        <DialogContent>
          {withdrawStep === 1 ? (
            <Box sx={{ pt: 2 }}>
              <TextField
                label="Amount"
                type="number"
                fullWidth
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                InputProps={{
                  startAdornment: '$',
                }}
                sx={{ mb: 3 }}
              />
              <FormControl fullWidth>
                <InputLabel>Withdrawal Method</InputLabel>
                <Select
                  value={selectedWithdrawMethod}
                  onChange={(e) => setSelectedWithdrawMethod(e.target.value)}
                  label="Withdrawal Method"
                >
                  {withdrawalMethods.map((method) => (
                    <MenuItem key={method.id} value={method.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {method.icon}
                        {method.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          ) : (
            <Box sx={{ pt: 2 }}>
              {selectedWithdrawMethod === 'bank_account' && (
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12}>
                    <TextField
                      label="Account Holder Name"
                      fullWidth
                      value={bankDetails.accountName}
                      onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Account Number"
                      fullWidth
                      value={bankDetails.accountNumber}
                      onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Bank Name"
                      fullWidth
                      value={bankDetails.bankName}
                      onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="IFSC Code"
                      fullWidth
                      value={bankDetails.ifscCode}
                      onChange={(e) => setBankDetails({ ...bankDetails, ifscCode: e.target.value })}
                    />
                  </Grid>
                </Grid>
              )}

              <Typography variant="h6" gutterBottom>
                Withdrawal Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography color="text.secondary">Amount:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>${withdrawAmount}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography color="text.secondary">Withdrawal Method:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    {withdrawalMethods.find(m => m.id === selectedWithdrawMethod)?.label}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography color="text.secondary">Processing Fee:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>${calculateFee(withdrawAmount).toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">You'll Receive:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">
                    ${(parseFloat(withdrawAmount) - calculateFee(withdrawAmount)).toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Alert severity="info" sx={{ mt: 2 }}>
                    Estimated processing time: 2-3 business days
                  </Alert>
                </Grid>
              </Grid>
            </Box>
          )}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => {
              setWithdrawOpen(false);
              setWithdrawStep(1);
              setError(null);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleWithdraw}
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? 'Processing...' : withdrawStep === 1 ? 'Continue' : 'Confirm Withdrawal'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Transaction Details Dialog */}
      <Dialog
        open={detailsOpen}
        onClose={() => {
          setDetailsOpen(false);
          setSelectedTransaction(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Transaction Details
        </DialogTitle>
        <DialogContent>
          {selectedTransaction && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <ReceiptIcon color="primary" />
                    <Typography variant="h6">
                      {selectedTransaction.reference}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Typography color="text.secondary">Type:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Chip
                    label={selectedTransaction.type === 'credit' ? 'Credit' : 'Debit'}
                    color={selectedTransaction.type === 'credit' ? 'success' : 'error'}
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography color="text.secondary">Amount:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography color={selectedTransaction.type === 'credit' ? 'success.main' : 'error.main'}>
                    {selectedTransaction.type === 'credit' ? '+' : '-'}
                    ${selectedTransaction.amount.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography color="text.secondary">Date:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    {new Date(selectedTransaction.date).toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography color="text.secondary">Status:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Chip
                    label={selectedTransaction.status}
                    color={selectedTransaction.status === 'completed' ? 'success' : 'warning'}
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography color="text.secondary">Description:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    {selectedTransaction.description}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setDetailsOpen(false);
            setSelectedTransaction(null);
          }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Dialog
        open={!!success}
        onClose={() => setSuccess(null)}
        maxWidth="xs"
        fullWidth
      >
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom color="success.main">
            Success!
          </Typography>
          <Typography>
            {success}
          </Typography>
          <Button
            variant="contained"
            onClick={() => setSuccess(null)}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
}