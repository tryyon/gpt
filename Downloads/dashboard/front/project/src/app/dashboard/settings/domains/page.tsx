import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { DomainsOverview } from '@/page-sections/settings/domains/DomainsOverview';

export const metadata: Metadata = {
  title: 'Domain Management | Admin Panel',
  description: 'Configure and manage custom domains for your store.',
};

export default function DomainsPage() {
  return (
    <Box>
      <PageTitle title="Domain Management" />
      <DomainsOverview />
    </Box>
  );
}