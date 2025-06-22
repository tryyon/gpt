import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { VisibilityManagement } from '@/page-sections/settings/visibility/VisibilityManagement';

export const metadata: Metadata = {
  title: 'Visibility Settings | Admin Panel',
  description: 'Configure product visibility sections and featured areas.',
};

export default function VisibilityPage() {
  return (
    <Box>
      <PageTitle 
        title="Visibility Settings" 
        subtitle="Manage product visibility sections and featured areas"
      />
      <VisibilityManagement />
    </Box>
  );
}