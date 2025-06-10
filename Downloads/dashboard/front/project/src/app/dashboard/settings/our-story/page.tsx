import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { OurStoryManagement } from '@/page-sections/settings/our-story/OurStoryManagement';

export const metadata: Metadata = {
  title: 'Our Story | Admin Panel',
  description: 'Manage your company story and history.',
};

export default function OurStoryPage() {
  return (
    <Box>
      <PageTitle 
        title="Our Story" 
        subtitle="Share your company's journey and values"
      />
      <OurStoryManagement />
    </Box>
  );
}