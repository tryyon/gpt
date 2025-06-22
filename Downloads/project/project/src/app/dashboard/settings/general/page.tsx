import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { GeneralSettings } from '@/page-sections/settings/general/GeneralSettings';

export const metadata: Metadata = {
  title: 'General Settings | Admin Panel',
  description: 'Configure your store\'s basic settings and information',
};

export default function GeneralPage() {
  return (
    <Box>
      <PageTitle 
        title="General Settings" 
        subtitle="Configure your store's basic settings and information"
      />
      <GeneralSettings />
    </Box>
  );
}