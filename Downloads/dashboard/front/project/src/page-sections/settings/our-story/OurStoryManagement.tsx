'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Alert,
  Snackbar,
  Divider,
  IconButton,
  Paper,
  Chip,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { corporateInfoSchema, type CorporateInfo } from '@/lib/validations/content';
import { DefaultCard } from '@/global-components/common/DefaultCard';
import ReactMarkdown from 'react-markdown';

// Mock data with achievements
const mockStory: CorporateInfo = {
  id: '1',
  section: 'our-story',
  title: 'Our Journey',
  content: `# Our Story

Founded in 2020, we set out to revolutionize the e-commerce industry with innovative solutions and customer-centric approaches.

## Our Mission

To provide businesses with powerful tools that enable growth and success in the digital marketplace.

## Our Values

- **Innovation**: Constantly pushing boundaries
- **Quality**: Delivering excellence in every product
- **Customer Focus**: Putting our customers first
- **Integrity**: Operating with transparency and honesty

## Key Milestones & Achievements

### 2024
- 🏆 Awarded "Best E-commerce Solution Provider" by Tech Excellence
- 🚀 Reached 1 million active users milestone
- 💡 Launched revolutionary AI-powered product recommendations
- 📈 Achieved 300% year-over-year growth

### 2023
- 🌟 Featured in Forbes "Top 50 Tech Startups"
- 🤝 Established strategic partnerships with 100+ global brands
- 🌍 Expanded operations to 25 countries
- 💪 Grew team to 500+ employees worldwide

### 2022
- 🎉 Successfully raised Series B funding of $50M
- 📱 Launched mobile app with 500K+ downloads
- 🏅 Achieved ISO 27001 certification
- 👥 Surpassed 100,000 merchant milestone

### 2021
- 🚀 Completed Series A funding round
- 🌟 Named "Most Innovative E-commerce Platform"
- 💡 Released game-changing inventory management system
- 🤝 Formed key strategic partnerships

### 2020
- 🎯 Company founded with a vision to transform e-commerce
- 🚀 Successfully launched beta platform
- 👥 Built core team of industry experts
- 💡 Secured initial seed funding

## Looking Forward

We continue to innovate and push boundaries in the e-commerce space, with exciting developments planned for the future:

- **Global Expansion**: Plans to enter 15 new markets
- **AI Integration**: Enhanced AI capabilities across the platform
- **Sustainability**: Commitment to carbon-neutral operations by 2025
- **Community Growth**: Targeting 2 million active users by 2025`,
  isActive: true,
  displayOrder: 1,
};

export function OurStoryManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [previewMode, setPreviewMode] = useState<'edit' | 'preview'>('preview');

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CorporateInfo>({
    resolver: zodResolver(corporateInfoSchema),
    defaultValues: mockStory,
  });

  const content = watch('content');

  const onSubmit = async (data: CorporateInfo) => {
    try {
      // Here you would typically make an API call to save the data
      console.log('Saving story:', data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
      setShowSuccess(true);
    } catch (error) {
      console.error('Error saving story:', error);
    }
  };

  return (
    <DefaultCard>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 3 }}>
        {isEditing && (
          <Button
            variant="outlined"
            onClick={() => setPreviewMode(previewMode === 'edit' ? 'preview' : 'edit')}
          >
            {previewMode === 'edit' ? 'Show Preview' : 'Show Editor'}
          </Button>
        )}
        <Button
          variant="contained"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Story'}
        </Button>
      </Box>

      {isEditing ? (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
              {previewMode === 'edit' ? (
                <Controller
                  name="content"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Content (Markdown supported)"
                      fullWidth
                      multiline
                      rows={30}
                      error={!!errors.content}
                      helperText={
                        errors.content?.message || 
                        "Use Markdown for formatting. Use '## ' for section headers and '- ' for bullet points. Add emojis for visual appeal."
                      }
                    />
                  )}
                />
              ) : (
                <Paper variant="outlined" sx={{ p: 3 }}>
                  <Typography variant="h5" gutterBottom>
                    Preview
                  </Typography>
                  <Box sx={{
                    '& h1': {
                      fontSize: '2rem',
                      fontWeight: 600,
                      mb: 2,
                    },
                    '& h2': {
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      mb: 2,
                      mt: 4,
                    },
                    '& h3': {
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      mb: 2,
                      color: 'primary.main',
                    },
                    '& p': {
                      mb: 2,
                    },
                    '& ul, & ol': {
                      pl: 3,
                      mb: 2,
                    },
                    '& li': {
                      mb: 1,
                    },
                    '& strong': {
                      fontWeight: 600,
                    },
                  }}>
                    <ReactMarkdown>
                      {content}
                    </ReactMarkdown>
                  </Box>
                </Paper>
              )}
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Save Changes
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Card variant="outlined">
          <CardContent>
            <Box sx={{
              '& h1': {
                fontSize: '2rem',
                fontWeight: 600,
                mb: 2,
              },
              '& h2': {
                fontSize: '1.5rem',
                fontWeight: 600,
                mb: 2,
                mt: 4,
              },
              '& h3': {
                fontSize: '1.25rem',
                fontWeight: 600,
                mb: 2,
                color: 'primary.main',
              },
              '& p': {
                mb: 2,
              },
              '& ul, & ol': {
                pl: 3,
                mb: 2,
              },
              '& li': {
                mb: 1,
              },
              '& strong': {
                fontWeight: 600,
              },
            }}>
              <ReactMarkdown>
                {mockStory.content}
              </ReactMarkdown>
            </Box>
          </CardContent>
        </Card>
      )}

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setShowSuccess(false)} 
          severity="success"
          variant="filled"
        >
          Story updated successfully
        </Alert>
      </Snackbar>
    </DefaultCard>
  );
}