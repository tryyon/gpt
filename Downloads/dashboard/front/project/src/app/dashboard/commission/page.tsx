import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { CommissionOverview } from '@/page-sections/commission/CommissionOverview';

export const metadata: Metadata = {
  title: 'Commission Management | Admin Panel',
  description: 'Manage commission payments for influencers and resellers.',
  openGraph: {
    title: 'Commission Management | Admin Panel',
    description: 'Manage commission payments for influencers and resellers.',
    type: 'website',
  },
};

export default function CommissionPage() {
  return (
    <Box>
      <PageTitle 
        title="Commission Management" 
        subtitle="Manage commission payments for influencers and resellers"
      />
      <CommissionOverview />
    </Box>
  );
}