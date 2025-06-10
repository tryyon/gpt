import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { AnalyticsConfig } from '@/page-sections/settings/analytics/AnalyticsConfig';

export const metadata: Metadata = {
  title: 'Analytics Settings | Admin Panel',
  description: 'Configure analytics and tracking settings.',
};

export default function AnalyticsSettingsPage() {
  return (
    <Box>
      <PageTitle 
        title="Analytics Settings" 
        subtitle="Configure analytics and tracking integrations"
      />
      <AnalyticsConfig />
    </Box>
  );
}