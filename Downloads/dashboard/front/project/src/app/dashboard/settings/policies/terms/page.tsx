import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { PolicyManagement } from '@/page-sections/settings/policies/PolicyManagement';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Admin Panel',
  description: 'Manage your store\'s terms and conditions.',
};

export default function TermsPolicyPage() {
  return (
    <Box>
      <PageTitle 
        title="Terms & Conditions" 
        subtitle="Manage your store's terms and conditions"
      />
      <PolicyManagement policyType="terms" />
    </Box>
  );
}