import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { GiftWrappingManagement } from '@/page-sections/settings/gift-wrapping/GiftWrappingManagement';

export default function GiftWrappingPage() {
  return (
    <Box>
      <PageTitle 
        title="Gift Wrapping" 
        subtitle="Manage gift wrapping options for your products"
      />
      <GiftWrappingManagement />
    </Box>
  );
}