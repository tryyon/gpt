import { Metadata } from 'next';
import { CustomersOverview } from '@/page-sections/customers/CustomersOverview';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';

export const metadata: Metadata = {
  title: 'Customers | Admin Panel',
  description: 'Manage your customer database, view customer details and purchase history.',
  openGraph: {
    title: 'Customers | Admin Panel',
    description: 'Manage your customer database, view customer details and purchase history.',
    type: 'website',
  },
};

export default function CustomersPage() {
  return (
    <Box>
      <PageTitle title="Customers" subtitle="Manage your customer database" />
      <CustomersOverview />
    </Box>
  );
}