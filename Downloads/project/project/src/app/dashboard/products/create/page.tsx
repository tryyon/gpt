import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { CreateProduct } from '@/page-sections/products/CreateProduct';

export const metadata: Metadata = {
  title: 'Create Product | Admin Panel',
  description: 'Add a new product to your store catalog.',
  openGraph: {
    title: 'Create Product | Admin Panel',
    description: 'Add a new product to your store catalog.',
    type: 'website',
  },
};

export default function CreateProductPage() {
  return (
    <Box>
      <PageTitle title="Create Product" />
      <CreateProduct />
    </Box>
  );
}