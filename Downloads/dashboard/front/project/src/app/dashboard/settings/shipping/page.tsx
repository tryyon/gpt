import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { ShippingManagement } from '@/page-sections/settings/shipping/ShippingManagement';

export default function ShippingPage() {
  return (
    <Box>
      <PageTitle 
        title="Shipping Settings" 
        subtitle="Configure shipping methods and delivery options"
      />
      <ShippingManagement />
    </Box>
  );
}