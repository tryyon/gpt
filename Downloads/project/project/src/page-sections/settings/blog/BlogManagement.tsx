'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  Button,
  Dialog,
  Alert,
  Snackbar,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { BlogForm } from './BlogForm';
import { BlogList } from './BlogList';
import { BannerSection } from './BannerSection';
import { DefaultCard } from '@/global-components/common/DefaultCard';
import type { BlogPost, Banner } from '@/types/content';

// Mock data
const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with E-commerce',
    slug: 'getting-started-with-ecommerce',
    content: `# Getting Started with E-commerce

Starting an online store can be both exciting and challenging. Here are some key points to consider:

## Choose Your Niche
- Research market opportunities
- Identify target audience
- Analyze competition

## Set Up Your Store
- Select an e-commerce platform
- Design your website
- Configure payment methods

## Marketing Strategy
- Develop social media presence
- Implement SEO best practices
- Plan email marketing campaigns`,
    excerpt: 'A comprehensive guide to starting your e-commerce journey',
    author: 'John Doe',
    publishDate: new Date('2024-03-15'),
    isPublished: true,
    categories: ['Guides', 'E-commerce'],
    tags: ['getting started', 'tips', 'business'],
    featuredImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '2',
    title: 'E-commerce Trends for 2024',
    slug: 'ecommerce-trends-2024',
    content: `# E-commerce Trends for 2024

The e-commerce landscape is constantly evolving. Here are the top trends for 2024:

## AI and Machine Learning
- Personalized shopping experiences
- Smart inventory management
- Automated customer service

## Sustainable Commerce
- Eco-friendly packaging
- Sustainable supply chains
- Carbon-neutral shipping

## Mobile Commerce
- Mobile-first design
- App-based shopping
- Mobile payment solutions`,
    excerpt: 'Discover the latest trends shaping the future of e-commerce',
    author: 'Jane Smith',
    publishDate: new Date('2024-03-10'),
    isPublished: true,
    categories: ['Trends', 'Technology'],
    tags: ['trends', 'AI', 'mobile', 'sustainability'],
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
  },
];

const mockBanner: Banner = {
  title: 'Blog',
  subtitle: 'Insights, guides, and industry news',
  image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1000',
  isActive: true,
  displayOrder: 1,
};

export function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts);
  const [banner, setBanner] = useState<Banner>(mockBanner);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSavePost = (data: BlogPost) => {
    try {
      if (selectedPost?.id) {
        setPosts(prev => prev.map(post => 
          post.id === selectedPost.id ? { ...data, id: post.id } : post
        ));
      } else {
        const newPost = {
          ...data,
          id: String(Date.now()),
        };
        setPosts(prev => [...prev, newPost]);
      }

      setSnackbar({
        open: true,
        message: `Blog post ${selectedPost ? 'updated' : 'added'} successfully`,
        severity: 'success',
      });
      setIsFormOpen(false);
      setSelectedPost(null);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error saving blog post',
        severity: 'error',
      });
    }
  };

  const handleSaveBanner = (data: Banner) => {
    try {
      setBanner(data);
      setSnackbar({
        open: true,
        message: 'Banner updated successfully',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error updating banner',
        severity: 'error',
      });
    }
  };

  const handleDelete = (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
    setSnackbar({
      open: true,
      message: 'Blog post deleted successfully',
      severity: 'success',
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <BannerSection
          banner={banner}
          onSave={handleSaveBanner}
        />
      </Grid>

      <Grid item xs={12}>
        <DefaultCard>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setIsFormOpen(true)}
            >
              Add Blog Post
            </Button>
          </Box>

          <BlogList
            posts={posts}
            onEdit={(post) => {
              setSelectedPost(post);
              setIsFormOpen(true);
            }}
            onDelete={handleDelete}
          />
        </DefaultCard>
      </Grid>

      <Dialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedPost(null);
        }}
        maxWidth="lg"
        fullWidth
      >
        <BlogForm
          onSubmit={handleSavePost}
          initialData={selectedPost}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedPost(null);
          }}
        />
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}