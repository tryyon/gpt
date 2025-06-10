import { Metadata } from 'next';
import { CreateOrderForm } from '@/page-sections/orders/CreateOrderForm';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { Box } from '@mui/material';

export const metadata: Metadata = {
  title: 'Create Order | Admin Panel',
  description: 'Create a new order and manage order details.',
  openGraph: {
    title: 'Create Order | Admin Panel',
    description: 'Create a new order and manage order details.',
    type: 'website',
  },
};

export default function CreateOrderPage() {
  return (
    <Box>
      <PageTitle title="Create New Order" />
      <CreateOrderForm />
    </Box>
  );
}