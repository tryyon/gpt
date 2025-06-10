import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { CheckoutOverview } from '@/page-sections/settings/checkout/CheckoutOverview';

export const metadata: Metadata = {
  title: 'Checkout Settings | Admin Panel',
  description: 'Configure checkout process settings.',
};

export default function CheckoutPage() {
  return (
    <Box>
      <PageTitle 
        title="Checkout" 
        subtitle="Configure checkout process settings"
      />
      <CheckoutOverview />
    </Box>
  );
}