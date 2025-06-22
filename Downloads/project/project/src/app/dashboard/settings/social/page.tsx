import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { SocialManagement } from '@/page-sections/settings/social/SocialManagement';

export default function SocialPage() {
  return (
    <Box>
      <PageTitle 
        title="Social Media Settings" 
        subtitle="Configure your social media integrations and sharing options"
      />
      <SocialManagement />
    </Box>
  );
}