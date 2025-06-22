import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { StaffManagement } from '@/page-sections/settings/staff/StaffManagement';

export const metadata: Metadata = {
  title: 'Staff Management | Admin Panel',
  description: 'Manage staff members, roles, and permissions.',
};

export default function StaffPage() {
  return (
    <Box>
      <PageTitle 
        title="Staff Management" 
        subtitle="Manage staff members, roles, and permissions"
      />
      <StaffManagement />
    </Box>
  );
}