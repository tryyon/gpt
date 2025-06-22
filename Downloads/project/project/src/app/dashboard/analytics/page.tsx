import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { AnalyticsOverview } from '@/page-sections/analytics/AnalyticsOverview';

export const metadata: Metadata = {
  title: 'Analytics | Admin Panel',
  description: 'Configure and monitor your analytics integrations.',
};

export default function AnalyticsPage() {
  return (
    <Box>
      <PageTitle 
        title="Analytics" 
        subtitle="Configure and monitor your analytics integrations"
      />
      <AnalyticsOverview />
    </Box>
  );
}