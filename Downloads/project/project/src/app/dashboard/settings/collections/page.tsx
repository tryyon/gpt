import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { CollectionsManagement } from '@/page-sections/settings/collections/CollectionsManagement';

export default function CollectionsPage() {
  return (
    <Box>
      <PageTitle 
        title="Collections" 
        subtitle="Manage product collections"
      />
      <CollectionsManagement />
    </Box>
  );
}