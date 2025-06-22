import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { PolicyManagement } from '@/page-sections/settings/policies/PolicyManagement';

export const metadata: Metadata = {
  title: 'Security Policy | Admin Panel',
  description: 'Manage your store\'s security policy.',
};

export default function SecurityPolicyPage() {
  return (
    <Box>
      <PageTitle 
        title="Security Policy" 
        subtitle="Manage your store's security policy"
      />
      <PolicyManagement policyType="security" />
    </Box>
  );
}