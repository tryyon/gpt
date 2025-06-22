'use client';

import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { ProductContentsManagement } from '@/page-sections/settings/product-contents/ProductContentsManagement';

export default function ProductContentsPage() {
  return (
    <Box>
      <PageTitle 
        title="Product Contents" 
        subtitle="Manage product content settings"
      />
      <ProductContentsManagement />
    </Box>
  );
}