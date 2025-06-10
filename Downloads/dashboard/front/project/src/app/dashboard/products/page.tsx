import { Metadata } from 'next';
import { ProductsOverview } from '@/page-sections/products/ProductsOverview';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { Box } from '@mui/material';

export const metadata: Metadata = {
  title: 'My Products | Admin Panel',
  description: 'Manage your product catalog, inventory, and product details.',
  openGraph: {
    title: 'My Products | Admin Panel',
    description: 'Manage your product catalog, inventory, and product details.',
    type: 'website',
  },
};

export default function ProductsPage() {
  return (
    <Box>
      <PageTitle title="My Products" subtitle="Manage your product catalog and inventory" />
      <ProductsOverview />
    </Box>
  );
}