import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { ProductQAManagement } from '@/page-sections/settings/qa/ProductQAManagement';

export const metadata: Metadata = {
  title: 'Product Q&A | Admin Panel',
  description: 'Manage product questions and answers.',
};

export default function QAPage() {
  return (
    <Box>
      <PageTitle 
        title="Product Q&A" 
        subtitle="Manage product questions and answers"
      />
      <ProductQAManagement />
    </Box>
  );
}