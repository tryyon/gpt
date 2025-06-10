'use client';

import { Box, Grid, Card, CardContent, Typography, useTheme } from '@mui/material';
import {
  CurrencyRupee as CurrencyRupeeIcon,
  CheckCircle as ApprovedIcon,
  Pending as PendingIcon,
  Payments as PaidIcon,
  Person as InfluencerIcon,
  Store as ResellerIcon,
} from '@mui/icons-material';

// Mock data for commission stats
const commissionStats = [
  { 
    title: 'Total Commission', 
    value: '₹1,245,678', 
    icon: <CurrencyRupeeIcon />, 
    color: 'primary.main',
    change: '+12%',
    trend: 'up'
  },
  { 
    title: 'Pending Approval', 
    value: '₹245,890', 
    icon: <PendingIcon />, 
    color: 'warning.main',
    change: '+5%',
    trend: 'up'
  },
  { 
    title: 'Approved', 
    value: '₹567,432', 
    icon: <ApprovedIcon />, 
    color: 'success.main',
    change: '+8%',
    trend: 'up'
  },
  { 
    title: 'Paid Out', 
    value: '₹432,356', 
    icon: <PaidIcon />, 
    color: 'info.main',
    change: '+15%',
    trend: 'up'
  },
];

// User type stats
const userTypeStats = [
  { 
    title: 'Influencer Commissions', 
    value: '₹765,432', 
    icon: <InfluencerIcon />, 
    color: 'secondary.main',
    count: '24 users'
  },
  { 
    title: 'Reseller Commissions', 
    value: '₹480,246', 
    icon: <ResellerIcon />, 
    color: 'error.main',
    count: '36 users'
  },
];

export function CommissionStats() {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={3}>
        {/* Main Stats */}
        {commissionStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
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
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="caption" color={stat.trend === 'up' ? 'success.main' : 'error.main'}>
                      {stat.change}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        
        {/* User Type Stats */}
        {userTypeStats.map((stat, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card 
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
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="caption" color="text.secondary">
                      {stat.count}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}