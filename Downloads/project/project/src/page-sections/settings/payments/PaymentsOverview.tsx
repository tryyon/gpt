'use client';

import { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Payment as PaymentIcon,
  CreditCard as CreditCardIcon,
  AttachMoney as MoneyIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { PaymentGateways } from './sections/PaymentGateways';
import { PaymentMethods } from './sections/PaymentMethods';
import { FeeStructure } from './sections/FeeStructure';
import { SecuritySettings } from './sections/SecuritySettings';
import { NotificationSetup } from './sections/NotificationSetup';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`payment-settings-tabpanel-${index}`}
      aria-labelledby={`payment-settings-tab-${index}`}
      sx={{ py: 3 }}
    >
      {value === index && children}
    </Box>
  );
}

export function PaymentsOverview() {
  const [currentTab, setCurrentTab] = useState(0);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleSaveSuccess = (message: string) => {
    setSnackbar({
      open: true,
      message,
      severity: 'success',
    });
  };

  const handleSaveError = (message: string) => {
    setSnackbar({
      open: true,
      message,
      severity: 'error',
    });
  };

  return (
    <Box>
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={currentTab} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="payment settings tabs"
          >
            <Tab 
              icon={<PaymentIcon />} 
              label="Payment Gateways" 
              iconPosition="start"
            />
            <Tab 
              icon={<CreditCardIcon />} 
              label="Payment Methods" 
              iconPosition="start"
            />
            <Tab 
              icon={<MoneyIcon />} 
              label="Fee Structure" 
              iconPosition="start"
            />
            <Tab 
              icon={<SecurityIcon />} 
              label="Security" 
              iconPosition="start"
            />
            <Tab 
              icon={<NotificationsIcon />} 
              label="Notifications" 
              iconPosition="start"
            />
          </Tabs>
        </Box>

        <CardContent>
          <TabPanel value={currentTab} index={0}>
            <Typography variant="h6" gutterBottom>
              Payment Gateway Configuration
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Configure your payment gateway credentials and settings
            </Typography>
            <PaymentGateways 
              onSaveSuccess={handleSaveSuccess}
              onSaveError={handleSaveError}
            />
          </TabPanel>

          <TabPanel value={currentTab} index={1}>
            <Typography variant="h6" gutterBottom>
              Payment Methods
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Manage accepted payment methods and transaction limits
            </Typography>
            <PaymentMethods 
              onSaveSuccess={handleSaveSuccess}
              onSaveError={handleSaveError}
            />
          </TabPanel>

          <TabPanel value={currentTab} index={2}>
            <Typography variant="h6" gutterBottom>
              Fee Structure
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Configure transaction fees and service charges
            </Typography>
            <FeeStructure 
              onSaveSuccess={handleSaveSuccess}
              onSaveError={handleSaveError}
            />
          </TabPanel>

          <TabPanel value={currentTab} index={3}>
            <Typography variant="h6" gutterBottom>
              Security Settings
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Configure payment security and fraud prevention settings
            </Typography>
            <SecuritySettings 
              onSaveSuccess={handleSaveSuccess}
              onSaveError={handleSaveError}
            />
          </TabPanel>

          <TabPanel value={currentTab} index={4}>
            <Typography variant="h6" gutterBottom>
              Notification Setup
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Configure payment notifications and alerts
            </Typography>
            <NotificationSetup 
              onSaveSuccess={handleSaveSuccess}
              onSaveError={handleSaveError}
            />
          </TabPanel>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}