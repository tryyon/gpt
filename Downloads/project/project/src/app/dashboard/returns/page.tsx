import { Metadata } from 'next';
import { Box } from '@mui/material';
import { ReturnsOverview } from '@/page-sections/returns/ReturnsOverview';

export const metadata: Metadata = {
  title: 'Returns | Admin Panel',
  description: 'Manage product returns and refunds.',
  openGraph: {
    title: 'Returns | Admin Panel',
    description: 'Manage product returns and refunds.',
    type: 'website',
  },
};

export default function ReturnsPage() {
  return (
    <Box>
      <ReturnsOverview />
    </Box>
  );
}