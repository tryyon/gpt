import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { SecurityManagement } from '@/page-sections/settings/security/SecurityManagement';

export default function SecurityPage() {
  return (
    <Box>
      <PageTitle 
        title="Security Settings" 
        subtitle="Manage your account security and authentication settings"
      />
      <SecurityManagement />
    </Box>
  );
}