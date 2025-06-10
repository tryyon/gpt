'use client';

import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Chip,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import type { BlogPost } from '@/types/content';

interface BlogListProps {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (postId: string) => void;
}

export function BlogList({ posts, onEdit, onDelete }: BlogListProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleViewDetails = (post: BlogPost) => {
    setSelectedPost(post);
    setDetailsOpen(true);
  };

  return (
    <>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} key={post.id}>
            <Card variant="outlined">
              <Grid container>
                {post.featuredImage && (
                  <Grid item xs={12} md={3}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={post.featuredImage}
                      alt={post.title}
                      sx={{ objectFit: 'cover' }}
                    />
                  </Grid>
                )}
                <Grid item xs={12} md={post.featuredImage ? 9 : 12}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {post.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block">
                          By {post.author} • {new Date(post.publishDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Box>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => handleViewDetails(post)}
                            color="primary"
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() => onEdit(post)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            onClick={() => onDelete(post.id!)}
                            color="error"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>

                    <Typography variant="body2" paragraph>
                      {post.excerpt}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {post.categories.map((category) => (
                        <Chip
                          key={category}
                          label={category}
                          color="primary"
                          size="small"
                          variant="outlined"
                        />
                      ))}
                      {post.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                      <Chip
                        label={post.isPublished ? 'Published' : 'Draft'}
                        color={post.isPublished ? 'success' : 'default'}
                        size="small"
                      />
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedPost?.title}
        </DialogTitle>
        <DialogContent dividers>
          {selectedPost && (
            <Box>
              {selectedPost.featuredImage && (
                <Box
                  component="img"
                  src={selectedPost.featuredImage}
                  alt={selectedPost.title}
                  sx={{
                    width: '100%',
                    height: 300,
                    objectFit: 'cover',
                    borderRadius: 1,
                    mb: 3,
                  }}
                />
              )}

              <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                By {selectedPost.author} • {new Date(selectedPost.publishDate).toLocaleDateString()}
              </Typography>

              <Box sx={{
                mt: 2,
                '& h1': { fontSize: '1.5rem', fontWeight: 600, mb: 2 },
                '& h2': { fontSize: '1.25rem', fontWeight: 600, mb: 2 },
                '& h3': { fontSize: '1.1rem', fontWeight: 600, mb: 1 },
                '& p': { mb: 2 },
                '& ul, & ol': { pl: 3, mb: 2 },
                '& li': { mb: 1 },
              }}>
                <ReactMarkdown>
                  {selectedPost.content}
                </ReactMarkdown>
              </Box>

              <Box sx={{ mt: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {selectedPost.categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    color="primary"
                    variant="outlined"
                  />
                ))}
                {selectedPost.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)}>
            Close
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setDetailsOpen(false);
              if (selectedPost) {
                onEdit(selectedPost);
              }
            }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}