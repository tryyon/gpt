import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { PolicyManagement } from '@/page-sections/settings/policies/PolicyManagement';

export const metadata: Metadata = {
  title: 'Policies | Admin Panel',
  description: 'Manage your store\'s policies and terms.',
};

export default function PoliciesPage() {
  return (
    <Box>
      <PageTitle 
        title="Policies" 
        subtitle="Manage your store's policies and terms"
      />
      <PolicyManagement />
    </Box>
  );
}