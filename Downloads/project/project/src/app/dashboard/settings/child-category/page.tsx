import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { ChildCategoryManagement } from '@/page-sections/settings/categories/child/ChildCategoryManagement';

export default function ChildCategoryPage() {
  return (
    <Box>
      <PageTitle 
        title="Child Categories" 
        subtitle="Manage product sub-categories"
      />
      <ChildCategoryManagement />
    </Box>
  );
}