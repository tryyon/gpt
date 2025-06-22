import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { PolicyManagement } from '@/page-sections/settings/policies/PolicyManagement';

export const metadata: Metadata = {
  title: 'Privacy Policy | Admin Panel',
  description: 'Manage your store\'s privacy policy.',
};

export default function PrivacyPolicyPage() {
  return (
    <Box>
      <PageTitle 
        title="Privacy Policy" 
        subtitle="Manage your store's privacy policy"
      />
      <PolicyManagement policyType="privacy" />
    </Box>
  );
}