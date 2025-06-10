import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { WarrantyManagement } from '@/page-sections/settings/warranty/WarrantyManagement';

export default function WarrantyPage() {
  return (
    <Box>
      <PageTitle 
        title="Warranty & Guarantee" 
        subtitle="Manage warranty, guarantee, refund and exchange policies"
      />
      <WarrantyManagement />
    </Box>
  );
}