import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { SizeChartManagement } from '@/page-sections/settings/size-chart/SizeChartManagement';

export default function SizeChartPage() {
  return (
    <Box>
      <PageTitle 
        title="Size Charts" 
        subtitle="Manage product size charts and measurement guides"
      />
      <SizeChartManagement />
    </Box>
  );
}