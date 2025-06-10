import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { VariantsOverview } from '@/page-sections/products/variants/VariantsOverview';

export const metadata: Metadata = {
  title: 'Product Variants | Admin Panel',
  description: 'Manage product variants and variations.',
};

export default function VariantsPage() {
  return (
    <Box>
      <PageTitle 
        title="Product Variants" 
        subtitle="Manage product variants and variations"
      />
      <VariantsOverview />
    </Box>
  );
}