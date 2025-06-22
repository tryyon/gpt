import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { AdvertiseOverview } from '@/page-sections/advertise/AdvertiseOverview';

export const metadata: Metadata = {
  title: 'Advertise | Admin Panel',
  description: 'Create and manage advertising campaigns for your products.',
};

export default function AdvertisePage() {
  return (
    <Box>
      <PageTitle 
        title="Advertise" 
        subtitle="Create and manage advertising campaigns for your products"
      />
      <AdvertiseOverview />
    </Box>
  );
}