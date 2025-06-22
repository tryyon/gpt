import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { LanguageManagement } from '@/page-sections/settings/languages/LanguageManagement';

export default function LanguagesPage() {
  return (
    <Box>
      <PageTitle 
        title="Language Settings" 
        subtitle="Manage store languages and translations"
      />
      <LanguageManagement />
    </Box>
  );
}