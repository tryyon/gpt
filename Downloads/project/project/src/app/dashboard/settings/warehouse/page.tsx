import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { WarehouseManagement } from '@/page-sections/settings/warehouse/WarehouseManagement';

export default function WarehousePage() {
  return (
    <Box>
      <PageTitle 
        title="Warehouse Management" 
        subtitle="Configure warehouse locations and settings"
      />
      <WarehouseManagement />
    </Box>
  );
}