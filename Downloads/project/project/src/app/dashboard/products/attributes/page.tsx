import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { ProductAttributes } from '@/page-sections/products/ProductAttributes';

export default function ProductAttributesPage() {
  return (
    <Box>
      <PageTitle 
        title="Product Attributes" 
        subtitle="Manage product attributes and variations"
      />
      <ProductAttributes />
    </Box>
  );
}