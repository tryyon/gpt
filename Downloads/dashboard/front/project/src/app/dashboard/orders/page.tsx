import { Metadata } from 'next';
import { OrdersOverview } from '@/page-sections/orders/OrdersOverview';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';

export const metadata: Metadata = {
  title: 'Orders | Admin Panel',
  description: 'View and manage all your store orders in one place.',
  openGraph: {
    title: 'Orders | Admin Panel',
    description: 'View and manage all your store orders in one place.',
    type: 'website',
  },
};

export default function OrdersPage() {
  return (
    <Box>
      <PageTitle 
        title="Orders" 
        subtitle="Manage and track all your orders"
      />
      <OrdersOverview />
    </Box>
  );
}