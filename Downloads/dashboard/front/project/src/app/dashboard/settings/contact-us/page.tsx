import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { ContactUsManagement } from '@/page-sections/settings/contact-us/ContactUsManagement';

export const metadata: Metadata = {
  title: 'Contact Us | Admin Panel',
  description: 'Manage your store\'s contact information and settings.',
};

export default function ContactUsPage() {
  return (
    <Box>
      <PageTitle 
        title="Contact Us" 
        subtitle="Manage your contact information and settings"
      />
      <ContactUsManagement />
    </Box>
  );
}