import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { ProductCategories } from '@/page-sections/products/ProductCategories';

export default function ProductCategoriesPage() {
  return (
    <Box>
      <PageTitle 
        title="Product Categories" 
        subtitle="Manage your product categories"
      />
      <ProductCategories />
    </Box>
  );
}