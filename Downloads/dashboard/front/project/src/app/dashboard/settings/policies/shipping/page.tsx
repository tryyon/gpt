import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { PolicyManagement } from '@/page-sections/settings/policies/PolicyManagement';

export const metadata: Metadata = {
  title: 'Shipping Policy | Admin Panel',
  description: 'Manage your store\'s shipping policy.',
};

export default function ShippingPolicyPage() {
  return (
    <Box>
      <PageTitle 
        title="Shipping Policy" 
        subtitle="Manage your store's shipping policy"
      />
      <PolicyManagement policyType="shipping" />
    </Box>
  );
}