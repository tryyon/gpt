import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { PolicyManagement } from '@/page-sections/settings/policies/PolicyManagement';

export const metadata: Metadata = {
  title: 'Accessibility Policy | Admin Panel',
  description: 'Manage your store\'s accessibility policy.',
};

export default function AccessibilityPolicyPage() {
  return (
    <Box>
      <PageTitle 
        title="Accessibility Policy" 
        subtitle="Manage your store's accessibility policy"
      />
      <PolicyManagement policyType="accessibility" />
    </Box>
  );
}