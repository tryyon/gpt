'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  Person as PersonIcon,
  Campaign as CampaignIcon,
} from '@mui/icons-material';
import { SvgIcon } from '@mui/material';

// Custom TikTok icon component
import type { SvgIconProps } from '@mui/material';
const TikTokIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 015.9 5.82v4.28a4.28 4.28 0 008.2 1.73c.2-.46.31-.97.31-1.49V6.7a4.28 4.28 0 002.18-4.3z"/>
    <path d="M19 8.4v4.24a4.22 4.22 0 01-4.21 4.22 4.22 4.22 0 01-4.21-4.22V8.4a4.22 4.22 0 014.21-4.21A4.22 4.22 0 0119 8.4z"/>
  </SvgIcon>
);

// Mock data for influencer stats
const influencerStats = [
  { title: 'Total Influencers', value: '24', icon: <PersonIcon /> },
  { title: 'Active Campaigns', value: '8', icon: <CampaignIcon /> },
  { title: 'Total Reach', value: '2.4M', icon: <VisibilityIcon /> },
];

// Mock data for influencers
const mockInfluencers = [
  {
    id: '1',
    name: 'Emma Johnson',
    handle: '@emmastyle',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    platform: 'Instagram',
    followers: '245K',
    engagement: '3.2%',
    category: 'Fashion',
    status: 'active',
    campaigns: 3,
    lastPost: '2024-03-15',
  },
  {
    id: '2',
    name: 'Alex Rivera',
    handle: '@techwithalex',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    platform: 'YouTube',
    followers: '1.2M',
    engagement: '4.5%',
    category: 'Tech',
    status: 'active',
    campaigns: 2,
    lastPost: '2024-03-10',
  },
  {
    id: '3',
    name: 'Sarah Chen',
    handle: '@sarahfitness',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    platform: 'TikTok',
    followers: '890K',
    engagement: '5.7%',
    category: 'Fitness',
    status: 'pending',
    campaigns: 1,
    lastPost: '2024-03-12',
  },
];

// Platform icon mapping
const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return <InstagramIcon />;
    case 'youtube':
      return <YouTubeIcon />;
    case 'twitter':
      return <TwitterIcon />;
    case 'facebook':
      return <FacebookIcon />;
    case 'tiktok':
      return <TikTokIcon />;
    default:
      return null;
  }
};

export default function InfluencersClient() {
  const [influencers, setInfluencers] = useState(mockInfluencers);

  return (
    <Box>
      {/* Influencer Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {influencerStats.map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box 
                  sx={{ 
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                  }}
                >
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    {stat.title}
                  </Typography>
                  <Typography variant="h5">
                    {stat.value}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Influencers Table */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">
              Influencer List
            </Typography>
          </Box>

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Influencer</TableCell>
                  <TableCell>Platform</TableCell>
                  <TableCell>Followers</TableCell>
                  <TableCell>Engagement</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Campaigns</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {influencers.map((influencer) => (
                  <TableRow key={influencer.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={influencer.avatar} />
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {influencer.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {influencer.handle}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getPlatformIcon(influencer.platform)}
                        <Typography variant="body2">
                          {influencer.platform}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{influencer.followers}</TableCell>
                    <TableCell>{influencer.engagement}</TableCell>
                    <TableCell>
                      <Chip
                        label={influencer.category}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={influencer.status}
                        color={influencer.status === 'active' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{influencer.campaigns}</TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Tooltip title="View Details">
                          <IconButton size="small">
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton size="small">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small" color="error">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}