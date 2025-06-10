'use client';

import { useState } from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  useTheme,
  LinearProgress,
  Chip
} from '@mui/material';
import {
  AssignmentReturn as ReturnIcon,
  CheckCircle as ApprovedIcon,
  Cancel as RejectedIcon,
  Pending as PendingIcon,
  LocalShipping as ShippingIcon,
} from '@mui/icons-material';

// Mock data for return statistics
const mockStats = [
  { 
    title: 'Total Returns', 
    value: 124, 
    icon: <ReturnIcon />, 
    color: 'primary.main',
    change: '+12%',
    trend: 'up'
  },
  { 
    title: 'Pending Approval', 
    value: 18, 
    icon: <PendingIcon />, 
    color: 'warning.main',
    change: '-5%',
    trend: 'down'
  },
  { 
    title: 'Approved', 
    value: 86, 
    icon: <ApprovedIcon />, 
    color: 'success.main',
    change: '+8%',
    trend: 'up'
  },
  { 
    title: 'Rejected', 
    value: 20, 
    icon: <RejectedIcon />, 
    color: 'error.main',
    change: '+2%',
    trend: 'up'
  },
];

export function ReturnsStats() {
  const theme = useTheme();
  const [stats] = useState(mockStats);

  // Calculate approval rate
  const totalReturns = stats[0].value;
  const approvedReturns = stats[2].value;
  const approvalRate = Math.round((approvedReturns / totalReturns) * 100);

  return (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              elevation={0} 
              sx={{ 
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box 
                    sx={{ 
                      p: 1.5, 
                      borderRadius: 2, 
                      bgcolor: `${stat.color}15`, 
                      color: stat.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Chip 
                    label={stat.change} 
                    color={stat.trend === 'up' ? 'success' : 'error'} 
                    size="small"
                    variant="outlined"
                  />
                </Box>
                <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Approval Rate Card */}
        <Grid item xs={12}>
          <Card elevation={0}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Return Approval Rate</Typography>
                <Chip 
                  label={`${approvalRate}%`} 
                  color={approvalRate > 70 ? 'success' : approvalRate > 50 ? 'warning' : 'error'} 
                />
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={approvalRate} 
                color={approvalRate > 70 ? 'success' : approvalRate > 50 ? 'warning' : 'error'}
                sx={{ height: 10, borderRadius: 5, mb: 1 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {approvedReturns} approved out of {totalReturns} total returns
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Target: 80%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}