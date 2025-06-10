'use client';

import { useState } from 'react';
import { Box, Button, Dialog, Alert, Snackbar } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { DomainsTable } from './DomainsTable';
import { DomainForm } from './DomainForm';
import { DefaultCard } from '@/global-components/common/DefaultCard';

interface Domain {
  id: string;
  domain: string;
  type: 'primary' | 'subdomain';
  status: 'verified' | 'pending';
  ssl: boolean;
  createdAt: string;
}

export function DomainsOverview() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleAddDomain = (data: any) => {
    try {
      console.log('Adding domain:', data);
      setIsFormOpen(false);
      setSnackbar({
        open: true,
        message: 'Domain added successfully. Please configure DNS settings.',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error adding domain. Please try again.',
        severity: 'error',
      });
    }
  };

  return (
    <DefaultCard>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsFormOpen(true)}
        >
          Add Domain
        </Button>
      </Box>

      <DomainsTable />

      <Dialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DomainForm
          onSubmit={handleAddDomain}
          onCancel={() => setIsFormOpen(false)}
        />
      </Dialog>

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
    </DefaultCard>
  );
}