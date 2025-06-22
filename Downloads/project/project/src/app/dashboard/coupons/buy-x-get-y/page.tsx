import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { BuyXGetYOverview } from '@/page-sections/coupons/buy-x-get-y/BuyXGetYOverview';

export const metadata: Metadata = {
  title: 'Buy X Get Y Free | Admin Panel',
  description: 'Manage buy one get one free and similar promotions for your store.',
  openGraph: {
    title: 'Buy X Get Y Free | Admin Panel',
    description: 'Manage buy one get one free and similar promotions for your store.',
    type: 'website',
  },
};

export default function BuyXGetYPage() {
  return (
    <Box>
      <PageTitle 
        title="Buy X Get Y Free" 
        subtitle="Create and manage buy one get one free and similar promotions"
      />
      <BuyXGetYOverview />
    </Box>
  );
}