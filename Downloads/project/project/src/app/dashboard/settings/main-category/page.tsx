import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { MainCategoryManagement } from '@/page-sections/settings/categories/main/MainCategoryManagement';

export default function MainCategoryPage() {
  return (
    <Box>
      <PageTitle 
        title="Main Categories" 
        subtitle="Manage sub-categories under root categories"
      />
      <MainCategoryManagement />
    </Box>
  );
}