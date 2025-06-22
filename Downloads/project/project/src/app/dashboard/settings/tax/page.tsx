import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { TaxOverview } from '@/page-sections/settings/tax/TaxOverview';

export const metadata: Metadata = {
  title: 'Tax Settings | Admin Panel',
  description: 'Configure tax rates and rules.',
};

export default function TaxPage() {
  return (
    <Box>
      <PageTitle 
        title="Tax Settings" 
        subtitle="Configure tax rates and rules"
      />
      <TaxOverview />
    </Box>
  );
}