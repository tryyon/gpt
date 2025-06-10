import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { PressManagement } from '@/page-sections/settings/press/PressManagement';

export const metadata: Metadata = {
  title: 'Press | Admin Panel',
  description: 'Manage your press releases and media coverage.',
};

export default function PressPage() {
  return (
    <Box>
      <PageTitle 
        title="Press" 
        subtitle="Manage press releases and media coverage"
      />
      <PressManagement />
    </Box>
  );
}