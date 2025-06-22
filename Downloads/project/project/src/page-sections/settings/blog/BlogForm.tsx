'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControlLabel,
  Switch,
  Typography,
  Paper,
  Autocomplete,
  Chip,
} from '@mui/material';
import { blogPostSchema, type BlogPost } from '@/lib/validations/content';
import ReactMarkdown from 'react-markdown';

interface BlogFormProps {
  onSubmit: (data: BlogPost) => void;
  initialData?: BlogPost | null;
  onCancel: () => void;
}

const categories = [
  'Guides',
  'Tutorials',
  'News',
  'Updates',
  'Case Studies',
  'E-commerce',
  'Technology',
  'Marketing',
  'Business',
];

const tags = [
  'getting started',
  'tips',
  'business',
  'marketing',
  'seo',
  'social media',
  'analytics',
  'trends',
  'mobile',
  'security',
];

export function BlogForm({ onSubmit, initialData, onCancel }: BlogFormProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BlogPost>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: initialData || {
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      author: '',
      publishDate: new Date(),
      isPublished: false,
      categories: [],
      tags: [],
    },
  });

  const content = watch('content');

  return (
    <>
      <DialogTitle>
        {initialData ? 'Edit Blog Post' : 'Add Blog Post'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" id="blog-form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="slug"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="URL Slug"
                    fullWidth
                    error={!!errors.slug}
                    helperText={errors.slug?.message || 'URL-friendly version of the title'}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="author"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Author"
                    fullWidth
                    error={!!errors.author}
                    helperText={errors.author?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="publishDate"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <TextField
                    {...field}
                    type="date"
                    label="Publish Date"
                    fullWidth
                    value={value instanceof Date ? value.toISOString().split('T')[0] : value}
                    onChange={e => onChange(new Date(e.target.value))}
                    error={!!errors.publishDate}
                    helperText={errors.publishDate?.message}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="featuredImage"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Featured Image URL"
                    fullWidth
                    error={!!errors.featuredImage}
                    helperText={errors.featuredImage?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="excerpt"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Excerpt"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.excerpt}
                    helperText={errors.excerpt?.message || 'Brief summary of the post'}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Content (Markdown supported)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="content"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        multiline
                        rows={20}
                        error={!!errors.content}
                        helperText={errors.content?.message}
                        placeholder="Write your blog post content here..."
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper 
                    variant="outlined" 
                    sx={{ 
                      p: 2, 
                      height: '100%', 
                      overflow: 'auto',
                      '& img': {
                        maxWidth: '100%',
                        height: 'auto',
                      },
                    }}
                  >
                    <Typography variant="subtitle2" gutterBottom>
                      Preview
                    </Typography>
                    <Box sx={{
                      '& h1': { fontSize: '1.5rem', fontWeight: 600, mb: 2 },
                      '& h2': { fontSize: '1.25rem', fontWeight: 600, mb: 2 },
                      '& h3': { fontSize: '1.1rem', fontWeight: 600, mb: 1 },
                      '& p': { mb: 2 },
                      '& ul, & ol': { pl: 3, mb: 2 },
                      '& li': { mb: 1 },
                    }}>
                      <ReactMarkdown>
                        {content}
                      </ReactMarkdown>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="categories"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    options={categories}
                    value={value}
                    onChange={(_, newValue) => onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Categories"
                        error={!!errors.categories}
                        helperText={errors.categories?.message}
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          key={option}
                          label={option}
                          color="primary"
                          variant="outlined"
                        />
                      ))
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="tags"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    freeSolo
                    options={tags}
                    value={value}
                    onChange={(_, newValue) => onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tags"
                        error={!!errors.tags}
                        helperText={errors.tags?.message}
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          key={option}
                          label={option}
                          variant="outlined"
                        />
                      ))
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="isPublished"
                control={control}
                render={({ field: { value, ...field } }) => (
                  <FormControlLabel
                    control={<Switch checked={value} {...field} />}
                    label="Publish post"
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="blog-form"
          variant="contained"
        >
          {initialData ? 'Save Changes' : 'Add Post'}
        </Button>
      </DialogActions>
    </>
  );
}