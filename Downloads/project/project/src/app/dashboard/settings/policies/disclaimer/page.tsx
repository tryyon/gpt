import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { PolicyManagement } from '@/page-sections/settings/policies/PolicyManagement';

export const metadata: Metadata = {
  title: 'Disclaimer | Admin Panel',
  description: 'Manage your store\'s disclaimer.',
};

export default function DisclaimerPolicyPage() {
  return (
    <Box>
      <PageTitle 
        title="Disclaimer" 
        subtitle="Manage your store's disclaimer"
      />
      <PolicyManagement policyType="disclaimer" />
    </Box>
  );
}