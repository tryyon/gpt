import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { ModifierManagement } from '@/page-sections/settings/modifiers/ModifierManagement';

export const metadata: Metadata = {
  title: 'Product Modifiers | Admin Panel',
  description: 'Configure product modifiers and options.',
};

export default function ModifiersPage() {
  return (
    <Box>
      <PageTitle 
        title="Product Modifiers" 
        subtitle="Configure product modifiers and options"
      />
      <ModifierManagement />
    </Box>
  );
}