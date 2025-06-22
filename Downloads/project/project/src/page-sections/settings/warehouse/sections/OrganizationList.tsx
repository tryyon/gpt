'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Typography, IconButton, Dialog, FormControlLabel, Checkbox } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { UseFormReturn } from 'react-hook-form';
import type { FormData } from '../schema';

// Mock list of organizations - Replace with actual data
const organizationsList = [
  'Organization 1',
  'Organization 2',
  'Organization 3',
  'Organization 4',
  'Organization 5',
];

interface OrganizationListProps {
  form: UseFormReturn<FormData>;
  index: number;
}

export function OrganizationList({ form, index }: OrganizationListProps) {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrgs, setSelectedOrgs] = useState<string[]>([]);

  useEffect(() => {
    const orgs = form.watch(`warehouses.${index}.organizations`);
    if (orgs) {
      setOrganizations(orgs);
      setSelectedOrgs(orgs.map(org => org.name));
    }
  }, [form, index]);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleOrgChange = (org: string) => {
    setSelectedOrgs(prev => 
      prev.includes(org) 
        ? prev.filter(o => o !== org)
        : [...prev, org]
    );
  };

  const handleSaveOrgs = () => {
    const updatedOrgs = selectedOrgs.map(org => {
      const existing = organizations.find(o => o.name === org);
      return existing || { name: org, status: 'pending' };
    });
    form.setValue(`warehouses.${index}.organizations`, updatedOrgs);
    setOrganizations(updatedOrgs);
    setDialogOpen(false);
  };

  const handleRemoveOrganization = (orgName: string) => {
    const updatedOrgs = organizations.filter(org => org.name !== orgName);
    form.setValue(`warehouses.${index}.organizations`, updatedOrgs);
    setOrganizations(updatedOrgs);
    setSelectedOrgs(updatedOrgs.map(org => org.name));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#4CAF50';
      case 'not approved': return '#F44336';
      default: return '#FFA000';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Approved';
      case 'not approved': return 'Not Approved';
      default: return 'Pending';
    }
  };

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={handleOpenDialog}
        sx={{ height: '40px', width: 'fit-content' }}
      >
        Add this warehouse to an organisation
      </Button>
      
      <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
        {organizations.map((org, orgIndex) => (
          <Box
            key={orgIndex}
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: '#F5F5F5',
              borderRadius: '16px',
              padding: '4px 12px',
              margin: '4px',
            }}
          >
            <Typography variant="body2" sx={{ mr: 1 }}>
              {org.name}
            </Typography>
            <Box
              sx={{
                bgcolor: getStatusColor(org.status),
                color: 'white',
                borderRadius: '12px',
                padding: '2px 8px',
                fontSize: '0.75rem',
              }}
            >
              {getStatusText(org.status)}
            </Box>
            <IconButton
              size="small"
              onClick={() => handleRemoveOrganization(org.name)}
              sx={{ ml: 0.5 }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Select Organizations
          </Typography>
          <Box sx={{ mt: 2, mb: 3 }}>
            {organizationsList.map((org) => (
              <FormControlLabel
                key={org}
                control={
                  <Checkbox
                    checked={selectedOrgs.includes(org)}
                    onChange={() => handleOrgChange(org)}
                  />
                }
                label={org}
              />
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={handleSaveOrgs} variant="contained">
              Save
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}