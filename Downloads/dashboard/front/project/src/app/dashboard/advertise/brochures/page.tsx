import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { BrochureManagement } from '@/page-sections/advertise/brochures/BrochureManagement';

export const metadata: Metadata = {
  title: 'Product Brochures | Admin Panel',
  description: 'Create and manage interactive product brochures for your marketing campaigns.',
};

export default function BrochuresPage() {
  return (
    <Box>
      <PageTitle 
        title="Product Brochures" 
        subtitle="Create and manage interactive product brochures"
      />
      <BrochureManagement />
    </Box>
  );
}