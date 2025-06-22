import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { MarketplaceProductsOverview } from '@/page-sections/products/marketplace/MarketplaceProductsOverview';

export const metadata: Metadata = {
  title: 'Marketplace Products | Admin Panel',
  description: 'Discover and manage products from the marketplace.',
  openGraph: {
    title: 'Marketplace Products | Admin Panel',
    description: 'Discover and manage products from the marketplace.',
    type: 'website',
  },
};

export default function MarketplaceProductsPage() {
  return (
    <Box>
      <PageTitle 
        title="Marketplace Products" 
        subtitle="Discover and add products from the marketplace to your website"
      />
      <MarketplaceProductsOverview />
    </Box>
  );
}