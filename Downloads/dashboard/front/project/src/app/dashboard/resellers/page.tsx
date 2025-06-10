import { Metadata } from 'next';
import { Box } from '@mui/material';
import { ResellersOverview } from '@/page-sections/resellers/ResellersOverview';

export const metadata: Metadata = {
  title: 'Resellers | Admin Panel',
  description: 'Manage your reseller network and partnerships.',
};

export default function ResellersPage() {
  return (
    <Box>
      <ResellersOverview />
    </Box>
  );
}