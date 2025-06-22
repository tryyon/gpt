import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { CouponsOverview } from '@/page-sections/coupons/CouponsOverview';

export const metadata: Metadata = {
  title: 'Coupons | Admin Panel',
  description: 'Manage discount coupons and promotional offers for your store.',
  openGraph: {
    title: 'Coupons | Admin Panel',
    description: 'Manage discount coupons and promotional offers for your store.',
    type: 'website',
  },
};

export default function CouponsPage() {
  return (
    <Box>
      <PageTitle 
        title="Coupons" 
        subtitle="Manage discount coupons and promotional offers"
      />
      <CouponsOverview />
    </Box>
  );
}