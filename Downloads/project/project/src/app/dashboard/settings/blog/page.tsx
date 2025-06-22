import { Metadata } from 'next';
import { Box } from '@mui/material';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { BlogManagement } from '@/page-sections/settings/blog/BlogManagement';

export const metadata: Metadata = {
  title: 'Blog | Admin Panel',
  description: 'Manage your blog posts and content.',
};

export default function BlogPage() {
  return (
    <Box>
      <PageTitle 
        title="Blog" 
        subtitle="Manage blog posts and content"
      />
      <BlogManagement />
    </Box>
  );
}