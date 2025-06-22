import { Metadata } from 'next';
import { Box } from '@mui/material';
import { WalletOverview } from '@/page-sections/wallet/WalletOverview';

export const metadata: Metadata = {
  title: 'Wallet | Admin Panel',
  description: 'Manage your store wallet and transactions.',
};

export default function WalletPage() {
  return (
    <Box>
      <WalletOverview />
    </Box>
  );
}