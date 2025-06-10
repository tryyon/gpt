import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { LoyaltyPointsOverview } from '@/page-sections/coupons/loyalty-points/LoyaltyPointsOverview';

export const metadata: Metadata = {
  title: 'Loyalty Points | Admin Panel',
  description: 'Manage loyalty points program for your store.',
  openGraph: {
    title: 'Loyalty Points | Admin Panel',
    description: 'Manage loyalty points program for your store.',
    type: 'website',
  },
};

export default function LoyaltyPointsPage() {
  return (
    <Box>
      <PageTitle 
        title="Loyalty Points" 
        subtitle="Create and manage loyalty points program for your customers"
      />
      <LoyaltyPointsOverview />
    </Box>
  );
}