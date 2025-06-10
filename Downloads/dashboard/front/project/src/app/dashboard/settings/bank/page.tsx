import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { BankDetailsOverview } from '@/page-sections/settings/bank/BankDetailsOverview';

export const metadata: Metadata = {
  title: 'Bank Details | Admin Panel',
  description: 'Manage your bank account information.',
};

export default function BankDetailsPage() {
  return (
    <Box>
      <PageTitle 
        title="Bank Details" 
        subtitle="Manage your bank account information"
      />
      <BankDetailsOverview />
    </Box>
  );
}