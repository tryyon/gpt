import { Metadata } from 'next';
import { DashboardOverview } from '@/page-sections/dashboard/DashboardOverview';
import { Box } from '@mui/material';

export const metadata: Metadata = {
  title: 'Dashboard | Admin Panel',
  description: 'View and manage your store performance, sales, and analytics.',
  openGraph: {
    title: 'Dashboard | Admin Panel',
    description: 'View and manage your store performance, sales, and analytics.',
    type: 'website',
  },
};

export default function DashboardPage() {
  return (
    <Box>
      <DashboardOverview />
    </Box>
  );
}