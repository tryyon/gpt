import { Metadata } from 'next';
import { OrderDetails } from '@/page-sections/orders/OrderDetails';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';

export const metadata: Metadata = {
  title: 'Order Details | Admin Panel',
  description: 'View details of a specific order.',
  openGraph: {
    title: 'Order Details | Admin Panel',
    description: 'View details of a specific order.',
    type: 'website',
  },
};

export default function OrderDetailsPage() {
  return (
    <Box>
      <PageTitle 
        title="Order Details" 
        subtitle="Detailed view of your order"
      />
      <OrderDetails />
    </Box>
  );
}