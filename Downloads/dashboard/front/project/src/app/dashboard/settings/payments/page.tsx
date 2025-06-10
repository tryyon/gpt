import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { PaymentsOverview } from '@/page-sections/settings/payments/PaymentsOverview';

export const metadata: Metadata = {
  title: 'Payment Settings | Admin Panel',
  description: 'Configure payment methods and gateways.',
};

export default function PaymentsPage() {
  return (
    <Box>
      <PageTitle 
        title="Payments" 
        subtitle="Configure payment methods and gateways"
      />
      <PaymentsOverview />
    </Box>
  );
}