import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { CareersManagement } from '@/page-sections/settings/careers/CareersManagement';

export const metadata: Metadata = {
  title: 'Careers | Admin Panel',
  description: 'Manage your career listings and job opportunities.',
};

export default function CareersPage() {
  return (
    <Box>
      <PageTitle 
        title="Careers" 
        subtitle="Manage job listings and career opportunities"
      />
      <CareersManagement />
    </Box>
  );
}