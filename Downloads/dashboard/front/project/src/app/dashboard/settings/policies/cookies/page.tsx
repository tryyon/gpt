import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { PolicyManagement } from '@/page-sections/settings/policies/PolicyManagement';

export const metadata: Metadata = {
  title: 'Cookie Policy | Admin Panel',
  description: 'Manage your store\'s cookie policy.',
};

export default function CookiePolicyPage() {
  return (
    <Box>
      <PageTitle 
        title="Cookie Policy" 
        subtitle="Manage your store's cookie policy"
      />
      <PolicyManagement policyType="cookies" />
    </Box>
  );
}