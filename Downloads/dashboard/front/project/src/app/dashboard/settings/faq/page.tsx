import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { FAQManagement } from '@/page-sections/settings/faq/FAQManagement';

export const metadata: Metadata = {
  title: 'FAQ Management | Admin Panel',
  description: 'Manage frequently asked questions and answers.',
};

export default function FAQPage() {
  return (
    <Box>
      <PageTitle 
        title="FAQ Management" 
        subtitle="Manage frequently asked questions and answers"
      />
      <FAQManagement />
    </Box>
  );
}