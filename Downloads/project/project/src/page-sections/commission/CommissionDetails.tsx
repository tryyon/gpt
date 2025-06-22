'use client';

import { useState } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  CheckCircle,
  Cancel as RejectIcon,
  Person as PersonIcon,
  ShoppingCart as OrderIcon,
  Payments as PaymentIcon,
  Receipt as ReceiptIcon,
  CurrencyRupee as CurrencyRupeeIcon,
  CalendarToday as CalendarIcon,
  AccountBalance as AccountIcon,
} from '@mui/icons-material';

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
      id={`commission-tabpanel-${index}`}
      aria-labelledby={`commission-tab-${index}`}
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

interface CommissionDetailsProps {
  open: boolean;
  onClose: () => void;
  commission: any;
  onApprove: (commission: any) => void;
  onReject: (commission: any) => void;
}

export function CommissionDetails({ open, onClose, commission, onApprove, onReject }: CommissionDetailsProps) {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  if (!commission) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'paid':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            Commission Details
          </Typography>
          <Chip
            label={commission.status}
            color={getStatusColor(commission.status)}
            sx={{ textTransform: 'capitalize' }}
          />
        </Box>
      </DialogTitle>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Overview" />
          <Tab label="Related Orders" />
          <Tab label="Payment Details" />
          <Tab label="Audit Log" />
        </Tabs>
      </Box>
      
      <DialogContent dividers>
        <TabPanel value={currentTab} index={0}>
          <Grid container spacing={3}>
            {/* User Information */}
            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  User Information
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box
                    component="img"
                    src={commission.avatar}
                    alt={commission.userName}
                    sx={{ width: 64, height: 64, borderRadius: '50%' }}
                  />
                  <Box>
                    <Typography variant="h6">{commission.userName}</Typography>
                    <Typography variant="body2" color="text.secondary">{commission.email}</Typography>
                    <Chip
                      icon={<PersonIcon />}
                      label={commission.userType}
                      size="small"
                      color={commission.userType.toLowerCase() === 'influencer' ? 'primary' : 'secondary'}
                      variant="outlined"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">User ID</Typography>
                    <Typography variant="body1">{commission.userId}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Joined Date</Typography>
                    <Typography variant="body1">{new Date(commission.joinDate).toLocaleDateString()}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Commission Rate</Typography>
                    <Typography variant="body1">{commission.commissionRate}%</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Total Earnings</Typography>
                    <Typography variant="body1" fontWeight={500} color="primary">₹{commission.totalEarnings.toLocaleString()}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
            {/* Commission Details */}
            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Commission Details
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Commission ID</Typography>
                    <Typography variant="body1">{commission.id}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Created Date</Typography>
                    <Typography variant="body1">{new Date(commission.createdDate).toLocaleDateString()}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Amount</Typography>
                    <Typography variant="h6" color="primary">₹{commission.amount.toLocaleString()}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Status</Typography>
                    <Chip
                      label={commission.status}
                      color={getStatusColor(commission.status)}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">Description</Typography>
                    <Typography variant="body1">{commission.description}</Typography>
                  </Grid>
                  {commission.lastPaymentDate && (
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">Last Payment Date</Typography>
                      <Typography variant="body1">{new Date(commission.lastPaymentDate).toLocaleDateString()}</Typography>
                    </Grid>
                  )}
                </Grid>
                
                {commission.status === 'pending' && (
                  <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<RejectIcon />}
                      onClick={() => onReject(commission)}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<CheckCircle />}
                      onClick={() => onApprove(commission)}
                    >
                      Approve
                    </Button>
                  </Box>
                )}
              </Paper>
            </Grid>
            
            {/* Verification Checklist */}
            {commission.status === 'pending' && (
              <Grid item xs={12}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Verification Checklist
                  </Typography>
                  
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="User account is verified" 
                        secondary="User has completed all verification steps"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Sales data verification" 
                        secondary="All related orders have been confirmed and delivered"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Commission calculation" 
                        secondary="Amount has been verified against the commission rate"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="No duplicate entries" 
                        secondary="This commission has not been previously processed"
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            )}
          </Grid>
        </TabPanel>
        
        <TabPanel value={currentTab} index={1}>
          <Typography variant="subtitle1" gutterBottom>
            Related Orders
          </Typography>
          
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell align="right">Order Amount</TableCell>
                  <TableCell align="right">Commission</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {commission.relatedOrders?.map((order: any) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell align="right">₹{order.amount.toLocaleString()}</TableCell>
                    <TableCell align="right">₹{order.commission.toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={order.status === 'completed' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        
        <TabPanel value={currentTab} index={2}>
          <Typography variant="subtitle1" gutterBottom>
            Payment Details
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Bank Account Information
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">Account Holder</Typography>
                    <Typography variant="body1">{commission.paymentDetails?.accountName || commission.userName}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Bank Name</Typography>
                    <Typography variant="body1">{commission.paymentDetails?.bankName || 'Not provided'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Account Number</Typography>
                    <Typography variant="body1">
                      {commission.paymentDetails?.accountNumber 
                        ? `XXXX${commission.paymentDetails.accountNumber.slice(-4)}` 
                        : 'Not provided'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">IFSC Code</Typography>
                    <Typography variant="body1">{commission.paymentDetails?.ifscCode || 'Not provided'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">UPI ID</Typography>
                    <Typography variant="body1">{commission.paymentDetails?.upiId || 'Not provided'}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Payment History
                </Typography>
                
                {commission.paymentHistory && commission.paymentHistory.length > 0 ? (
                  <List>
                    {commission.paymentHistory.map((payment: any, index: number) => (
                      <ListItem key={index} divider={index < commission.paymentHistory.length - 1}>
                        <ListItemIcon>
                          <PaymentIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={`₹${payment.amount.toLocaleString()} - ${payment.method}`}
                          secondary={`${new Date(payment.date).toLocaleString()} • ${payment.reference}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    No payment history available
                  </Typography>
                )}
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Tax Information
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Tax Status</Typography>
                    <Typography variant="body1">{commission.taxDetails?.status || 'Standard'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">TDS Applicable</Typography>
                    <Typography variant="body1">{commission.taxDetails?.tdsApplicable ? 'Yes' : 'No'}</Typography>
                  </Grid>
                  {commission.taxDetails?.tdsApplicable && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">TDS Percentage</Typography>
                        <Typography variant="body1">{commission.taxDetails?.tdsPercentage}%</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">TDS Amount</Typography>
                        <Typography variant="body1">₹{(commission.amount * commission.taxDetails?.tdsPercentage / 100).toLocaleString()}</Typography>
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">PAN Number</Typography>
                    <Typography variant="body1">{commission.taxDetails?.panNumber || 'Not provided'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">GST Number</Typography>
                    <Typography variant="body1">{commission.taxDetails?.gstNumber || 'Not provided'}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
        
        <TabPanel value={currentTab} index={3}>
          <Typography variant="subtitle1" gutterBottom>
            Audit Log
          </Typography>
          
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date & Time</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>IP Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {commission.auditLog?.map((log: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip
                        label={log.action}
                        color={
                          log.action === 'created' ? 'info' :
                          log.action === 'approved' ? 'success' :
                          log.action === 'rejected' ? 'error' :
                          log.action === 'paid' ? 'success' :
                          'default'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>{log.details}</TableCell>
                    <TableCell>{log.ipAddress}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>
          Close
        </Button>
        {commission.status === 'pending' && (
          <>
            <Button
              variant="outlined"
              color="error"
              startIcon={<RejectIcon />}
              onClick={() => onReject(commission)}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckCircle />}
              onClick={() => onApprove(commission)}
            >
              Approve
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}