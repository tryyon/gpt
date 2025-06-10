import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { NotificationManagement } from '@/page-sections/settings/notifications/NotificationManagement';

export default function NotificationsPage() {
  return (
    <Box>
      <PageTitle 
        title="Notification Settings" 
        subtitle="Configure your notification preferences"
      />
      <NotificationManagement />
    </Box>
  );
}