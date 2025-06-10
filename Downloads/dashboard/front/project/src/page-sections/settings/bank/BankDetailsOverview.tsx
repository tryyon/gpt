'use client';

import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Alert, 
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { BankDetailsForm } from './BankDetailsForm';
import { DefaultCard } from '@/global-components/common/DefaultCard';
import { BankAccountDisplay } from './BankAccountDisplay';
import type { BankDetailsData } from './types';

// Mock organizations - Replace with actual data
const mockOrganizations = [
  { id: 'org1', name: 'Organization 1' },
  { id: 'org2', name: 'Organization 2' },
  { id: 'org3', name: 'Organization 3' },
];

// Mock bank accounts - Replace with actual data
const mockBankAccounts: Record<string, BankDetailsData> = {
  org1: {
    organizationId: 'org1',
    accountHolderName: 'John Doe',
    bankName: 'HDFC Bank',
    accountNumber: '1234567890',
    accountType: 'Savings',
    ifscCode: 'HDFC0001234',
    branchName: 'Main Branch',
    branchAddress: '123 Main St, City',
    swiftCode: 'HDFCINBB',
    upiId: 'john@upi',
  },
};

export function BankDetailsOverview() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<string>('');
  const [bankAccounts, setBankAccounts] = useState(mockBankAccounts);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data: BankDetailsData) => {
    try {
      // Here you would typically make an API call to save the data
      console.log('Form data:', data);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setBankAccounts(prev => ({
        ...prev,
        [selectedOrg]: data,
      }));
      setShowSuccess(true);
      setShowForm(false);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const availableOrganizations = mockOrganizations.filter(
    org => !bankAccounts[org.id]
  );

  const handleAddAccount = () => {
    if (availableOrganizations.length > 0) {
      setSelectedOrg(availableOrganizations[0].id);
      setShowForm(true);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Bank Details
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Manage bank accounts for your organizations
      </Typography>

      <DefaultCard>
        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Select Organization</InputLabel>
            <Select
              value={selectedOrg}
              label="Select Organization"
              onChange={(e) => setSelectedOrg(e.target.value)}
            >
              {mockOrganizations.map((org) => (
                <MenuItem 
                  key={org.id} 
                  value={org.id}
                  disabled={bankAccounts[org.id] && !showForm}
                >
                  {org.name} {bankAccounts[org.id] ? '(Account Added)' : ''}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {selectedOrg && bankAccounts[selectedOrg] && !showForm ? (
          <BankAccountDisplay account={bankAccounts[selectedOrg]} />
        ) : showForm ? (
          <BankDetailsForm
            onSubmit={handleSubmit}
            organization={{ 
              id: selectedOrg, 
              name: mockOrganizations.find(org => org.id === selectedOrg)?.name || '' 
            }}
          />
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary" gutterBottom>
              {availableOrganizations.length > 0 
                ? 'No bank account added yet' 
                : 'All organizations have bank accounts configured'}
            </Typography>
            {availableOrganizations.length > 0 && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddAccount}
              >
                Add Bank Account
              </Button>
            )}
          </Box>
        )}
      </DefaultCard>

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
          Bank details saved successfully
        </Alert>
      </Snackbar>
    </Box>
  );
}