'use client';

import { useState } from 'react';
import { Box, Tabs, Tab, Alert, Snackbar } from '@mui/material';
import { CustomerDetails } from '@/page-sections/customers/details/CustomerDetails';
import { CustomerOrders } from '@/page-sections/customers/details/CustomerOrders';
import { CustomerPayments } from '@/page-sections/customers/details/CustomerPayments';
import { CustomerSupport } from '@/page-sections/customers/details/CustomerSupport';

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
      id={`customer-tabpanel-${index}`}
      aria-labelledby={`customer-tab-${index}`}
      sx={{ py: 3 }}
    >
      {value === index && children}
    </Box>
  );
}

export default function CustomerDetailsPage() {
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

  const handleUpdateSuccess = (message: string) => {
    setSnackbar({
      open: true,
      message,
      severity: 'success',
    });
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={currentTab} 
          onChange={handleTabChange}
          aria-label="customer details tabs"
        >
          <Tab label="Overview" />
          <Tab label="Orders" />
          <Tab label="Payments" />
          <Tab label="Support" />
        </Tabs>
      </Box>

      <TabPanel value={currentTab} index={0}>
        <CustomerDetails onUpdateSuccess={handleUpdateSuccess} />
      </TabPanel>

      <TabPanel value={currentTab} index={1}>
        <CustomerOrders />
      </TabPanel>

      <TabPanel value={currentTab} index={2}>
        <CustomerPayments />
      </TabPanel>

      <TabPanel value={currentTab} index={3}>
        <CustomerSupport />
      </TabPanel>

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