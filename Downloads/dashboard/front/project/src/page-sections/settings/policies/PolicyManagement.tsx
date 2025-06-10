'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Dialog,
  Alert,
  Snackbar,
  Paper,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { Add as AddIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { PolicyForm } from './PolicyForm';
import { PolicyTable } from './PolicyTable';
import { DefaultCard } from '@/global-components/common/DefaultCard';
import type { Policy } from '@/lib/validations/policy';

// Mock data - Replace with API call in production
const mockPolicies: Policy[] = [
  {
    id: '1',
    title: 'Privacy Policy',
    type: 'privacy',
    content: 'Our privacy policy details...',
    isActive: true,
    lastUpdated: new Date('2024-03-15'),
    version: '1.0',
    isRequired: true,
    displayOrder: 1,
  },
  {
    id: '2',
    title: 'Terms of Service',
    type: 'terms',
    content: 'Terms and conditions...',
    isActive: true,
    lastUpdated: new Date('2024-03-15'),
    version: '1.0',
    isRequired: true,
    displayOrder: 2,
  },
  {
    id: '3',
    title: 'Cookie Policy',
    type: 'cookies',
    content: 'Cookie policy details...',
    isActive: true,
    lastUpdated: new Date('2024-03-15'),
    version: '1.0',
    isRequired: true,
    displayOrder: 3,
  },
  {
    id: '4',
    title: 'Accessibility Statement',
    type: 'accessibility',
    content: 'Accessibility policy details...',
    isActive: true,
    lastUpdated: new Date('2024-03-15'),
    version: '1.0',
    isRequired: true,
    displayOrder: 4,
  },
  {
    id: '5',
    title: 'Security Policy',
    type: 'security',
    content: 'Security policy details...',
    isActive: true,
    lastUpdated: new Date('2024-03-15'),
    version: '1.0',
    isRequired: true,
    displayOrder: 5,
  },
];

interface PolicyManagementProps {
  policyType?: string;
}

export function PolicyManagement({ policyType }: PolicyManagementProps) {
  const router = useRouter();
  const [policies, setPolicies] = useState<Policy[]>(mockPolicies);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(
    policyType ? policies.find(p => p.type === policyType) || null : null
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSave = (data: Policy) => {
    try {
      if (selectedPolicy?.id) {
        // Update existing policy
        setPolicies(prev => prev.map(p => 
          p.id === selectedPolicy.id ? { ...data, id: p.id } : p
        ));
      } else {
        // Add new policy
        const newPolicy = {
          ...data,
          id: String(Date.now()),
          lastUpdated: new Date(),
        };
        setPolicies(prev => [...prev, newPolicy]);
      }

      setSnackbar({
        open: true,
        message: `Policy ${selectedPolicy ? 'updated' : 'created'} successfully`,
        severity: 'success',
      });
      setIsFormOpen(false);
      setSelectedPolicy(null);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error saving policy',
        severity: 'error',
      });
    }
  };

  const handleDelete = (policyId: string) => {
    setPolicies(prev => prev.filter(p => p.id !== policyId));
    setSnackbar({
      open: true,
      message: 'Policy deleted successfully',
      severity: 'success',
    });
  };

  // If a specific policy type is provided, show the form for that policy
  if (policyType) {
    const policy = policies.find(p => p.type === policyType);
    
    return (
      <DefaultCard>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push('/dashboard/settings/policies')}
          >
            Back to Policies
          </Button>
          {!policy && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setIsFormOpen(true)}
            >
              Create Policy
            </Button>
          )}
        </Box>

        {policy ? (
          <Card variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography variant="h6">
                    {policy.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Version {policy.version} • Last updated {new Date(policy.lastUpdated).toLocaleDateString()}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  onClick={() => {
                    setSelectedPolicy(policy);
                    setIsFormOpen(true);
                  }}
                >
                  Edit Policy
                </Button>
              </Box>

              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {policy.content}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="text.secondary">
              No policy has been created yet. Click the button above to create one.
            </Typography>
          </Paper>
        )}

        <Dialog
          open={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedPolicy(null);
          }}
          maxWidth="md"
          fullWidth
        >
          <PolicyForm
            onSubmit={handleSave}
            initialData={selectedPolicy}
            onCancel={() => {
              setIsFormOpen(false);
              setSelectedPolicy(null);
            }}
            policyType={policyType}
          />
        </Dialog>
      </DefaultCard>
    );
  }

  // Show the policy list if no specific type is provided
  return (
    <DefaultCard>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedPolicy(null);
            setIsFormOpen(true);
          }}
        >
          Add Policy
        </Button>
      </Box>

      <PolicyTable
        policies={policies}
        onEdit={(policy) => {
          setSelectedPolicy(policy);
          setIsFormOpen(true);
        }}
        onDelete={handleDelete}
      />

      <Dialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedPolicy(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <PolicyForm
          onSubmit={handleSave}
          initialData={selectedPolicy}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedPolicy(null);
          }}
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