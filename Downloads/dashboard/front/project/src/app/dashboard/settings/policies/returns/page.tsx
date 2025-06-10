import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { PolicyManagement } from '@/page-sections/settings/policies/PolicyManagement';

export const metadata: Metadata = {
  title: 'Returns Policy | Admin Panel',
  description: 'Manage your store\'s returns policy.',
};

export default function ReturnsPolicyPage() {
  return (
    <Box>
      <PageTitle 
        title="Returns Policy" 
        subtitle="Manage your store's returns policy"
      />
      <PolicyManagement policyType="returns" />
    </Box>
  );
}