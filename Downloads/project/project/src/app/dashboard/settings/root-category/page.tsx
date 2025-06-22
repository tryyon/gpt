import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { RootCategoryManagement } from '@/page-sections/settings/categories/root/RootCategoryManagement';

export default function RootCategoryPage() {
  return (
    <Box>
      <PageTitle 
        title="Root Categories" 
        subtitle="Manage top-level product categories"
      />
      <RootCategoryManagement />
    </Box>
  );
}