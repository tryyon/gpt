'use client';

import { useState } from 'react';
import { 
  Box, 
  Button,
  Tabs,
  Tab,
  Alert,
  Snackbar,
  Typography,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DefaultCard } from '@/global-components/common/DefaultCard';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { CompanyInformation } from './sections/CompanyInformation';
import { LegalInformation } from './sections/LegalInformation';
import { SocialProfiles } from './sections/SocialProfiles';
import type { OrganizationData } from '@/types/organization';
import { organizationSchema } from './schema';

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
      id={`org-tabpanel-${index}`}
      aria-labelledby={`org-tab-${index}`}
      sx={{ pt: 3 }}
    >
      {value === index && children}
    </Box>
  );
}

interface Organization extends OrganizationData {
  id: string;
  name: string;
}

const defaultValues: OrganizationData = {
  companyName: '',
  companyType: 'private_limited',
  yearEstablished: undefined,
  employeeCount: undefined,
  website: undefined,
  logo: undefined,
  registrationNumber: undefined,
  taxId: undefined,
  vatNumber: undefined,
  legalAddress: undefined,
  registeredState: undefined,
  incorporationDate: undefined,
  gstCertificates: [],
  socialProfiles: {
    facebook: undefined,
    twitter: undefined,
    linkedin: undefined,
    instagram: undefined,
  },
};

export function OrganizationDetails() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [currentTab, setCurrentTab] = useState(0);

  const form = useForm<OrganizationData>({
    resolver: zodResolver(organizationSchema),
    defaultValues,
  });

  const { handleSubmit, formState: { isSubmitting }, reset } = form;

  const handleAddOrganization = () => {
    const newOrg = {
      id: `org-${organizations.length + 1}`,
      name: `Organization ${organizations.length + 1}`,
      ...defaultValues,
    };
    setOrganizations([...organizations, newOrg]);
    setCurrentTab(organizations.length);
    reset(defaultValues);
  };

  const handleDeleteOrganization = (index: number) => {
    setOrganizations(orgs => orgs.filter((_, i) => i !== index));
    setCurrentTab(Math.max(0, currentTab - 1));
  };

  const onSubmit = async (data: OrganizationData) => {
    try {
      setOrganizations(prev => 
        prev.map((org, index) => 
          index === currentTab ? { ...org, ...data } : org
        )
      );
      setShowSuccess(true);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <DefaultCard>
      <PageTitle 
        title="Organization Details" 
        subtitle="Manage your organization's profile and legal information"
      />
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tabs 
            value={currentTab} 
            onChange={(_, newValue) => setCurrentTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ flex: 1 }}
          >
            {organizations.map((org, index) => (
              <Tab
                key={org.id}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>{org.companyName || `Organization ${index + 1}`}</span>
                    {organizations.length > 1 && (
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteOrganization(index);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                }
              />
            ))}
          </Tabs>
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddOrganization}
            sx={{ ml: 2 }}
          >
            Add Organization
          </Button>
        </Box>
      </Box>

      {organizations.length === 0 ? (
        <Box
          sx={{
            p: 4,
            textAlign: 'center',
            border: '1px dashed',
            borderColor: 'divider',
            borderRadius: 1,
            mt: 3,
          }}
        >
          <Typography color="text.secondary" gutterBottom>
            No organizations added yet
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddOrganization}
          >
            Add Organization
          </Button>
        </Box>
      ) : (
        organizations.map((org, index) => (
          <TabPanel key={org.id} value={currentTab} index={index}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <CompanyInformation form={form} />
                <LegalInformation form={form} />
                <SocialProfiles form={form} />

                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end',
                  pt: 3,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Box>
              </Box>
            </form>
          </TabPanel>
        ))
      )}

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
          Organization saved successfully
        </Alert>
      </Snackbar>
    </DefaultCard>
  );
}