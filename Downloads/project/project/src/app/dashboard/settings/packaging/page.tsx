import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { PackagingManagement } from '@/page-sections/settings/packaging/PackagingManagement';

export default function PackagingPage() {
  return (
    <Box>
      <PageTitle 
        title="Packaging" 
        subtitle="Manage packaging options for your products"
      />
      <PackagingManagement />
    </Box>
  );
}