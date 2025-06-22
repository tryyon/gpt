import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { SEOManagement } from '@/page-sections/settings/seo/SEOManagement';

export default function SEOPage() {
  return (
    <Box>
      <PageTitle 
        title="SEO Settings" 
        subtitle="Optimize your store for search engines"
      />
      <SEOManagement />
    </Box>
  );
}