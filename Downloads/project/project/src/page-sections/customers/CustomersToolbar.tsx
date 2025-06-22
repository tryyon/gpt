'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Stack,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  ArrowDownward as ArrowDownwardIcon,
  ArrowOutward as ArrowOutwardIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { BulkImportDialog } from './BulkImportDialog';
import { CustomerFormData } from '@/lib/validations/customer';
import { exportToCsv } from '@/utils/exportToCsv';

interface CustomersToolbarProps {
  onAddCustomer: () => void;
  onImportCustomers: (customers: CustomerFormData[]) => void;
  customers: any[];
  selectedCustomers?: string[];
  onDeleteSelected?: () => void;
}

export function CustomersToolbar({ 
  onAddCustomer, 
  onImportCustomers, 
  customers = [],
  selectedCustomers = [],
  onDeleteSelected
}: CustomersToolbarProps) {
  const theme = useTheme();
  const [importDialogOpen, setImportDialogOpen] = useState(false);

  const handleExport = () => {
    if (!customers || customers.length === 0) {
      console.warn('No customers data available to export');
      return;
    }

    const headers = {
      name: 'Name',
      phone: 'Phone',
      email: 'Email',
      gstType: 'GST Type',
      gstNumber: 'GST Number',
      billingAddress: 'Billing Address',
      createdAt: 'Created At',
      status: 'Status',
    };

    const transformers = {
      billingAddress: (addr: any) => {
        if (!addr) return '';
        const parts = [
          addr.street,
          addr.city,
          addr.state,
          addr.pincode,
          addr.country
        ].filter(Boolean);
        return parts.join(', ');
      },
      createdAt: (date: string) => date ? new Date(date).toLocaleString() : '',
      gstType: (type: string) => type || 'Unregistered',
    };

    try {
      exportToCsv(
        customers,
        `customers_export_${new Date().toISOString().split('T')[0]}`,
        headers,
        transformers
      );
    } catch (error) {
      console.error('Error exporting customers:', error);
    }
  };

  return (
    <>
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        gap: 2,
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'stretch', sm: 'center' },
        justifyContent: 'space-between',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} width={{ xs: '100%', sm: 'auto' }}>
          {selectedCustomers && selectedCustomers.length > 0 ? (
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={onDeleteSelected}
            >
              Delete Selected ({selectedCustomers.length})
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onAddCustomer}
            >
              Add Customer
            </Button>
          )}
          <Button
            variant="outlined"
            startIcon={<ArrowDownwardIcon />}
            onClick={() => setImportDialogOpen(true)}
          >
            Import
          </Button>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            startIcon={<ArrowOutwardIcon />}
            onClick={handleExport}
            sx={{ color: 'text.secondary' }}
          >
            Export
          </Button>
        </Stack>
      </Box>

      <BulkImportDialog
        open={importDialogOpen}
        onClose={() => setImportDialogOpen(false)}
        onImportSuccess={(customers) => {
          onImportCustomers(customers);
          setImportDialogOpen(false);
        }}
      />
    </>
  );
}