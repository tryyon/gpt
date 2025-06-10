import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { BrandsOverview } from '@/page-sections/settings/brands/BrandsOverview';

export const metadata: Metadata = {
  title: 'Brands | Admin Panel',
  description: 'Manage your store brands and manufacturers.',
};

export default function BrandsPage() {
  return (
    <Box>
      <PageTitle 
        title="Brands" 
        subtitle="Manage your store brands"
      />
      <BrandsOverview />
    </Box>
  );
}