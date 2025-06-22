'use client';

import { useState } from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  useTheme,
  IconButton,
} from '@mui/material';
import { 
  Percent as PercentIcon,
  LocalOffer as TagIcon,
  Loyalty as LoyaltyIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface CouponStat {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
  path: string;
  description: string;
  action?: () => void;
}

export function CouponSummaryCards() {
  const theme = useTheme();
  const router = useRouter();
  
  // In a real application, these would be fetched from an API
  const [couponStats] = useState<CouponStat[]>([
    {
      title: 'Percentage or Flat Discount',
      count: 12,
      icon: <PercentIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.primary.main,
      path: '/dashboard/coupons',
      description: 'Offer a percentage discount to your customers.',
      action: () => {
        // This will be handled by the parent component
        window.dispatchEvent(new CustomEvent('openCouponForm'));
      }
    },
    {
      title: 'Buy X Get Y Free',
      count: 5,
      icon: <TagIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.info.main,
      path: '/dashboard/coupons/buy-x-get-y',
      description: 'Buy specific quantity and get free items.',
      action: () => {
        // This will be handled by the parent component
        window.dispatchEvent(new CustomEvent('openBuyXGetYForm'));
      }
    },
    {
      title: 'Loyalty Points',
      count: 3,
      icon: <LoyaltyIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.error.main,
      path: '/dashboard/coupons/loyalty-points',
      description: 'Offer loyalty on every purchase or above a certain amount.'
    },
  ]);

  const handleCardClick = (stat: CouponStat) => {
    if (stat.action) {
      stat.action();
    } else {
      router.push(stat.path);
    }
  };

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {couponStats.map((stat, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Card 
            sx={{ 
              height: '100%',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 3,
              }
            }}
            onClick={() => handleCardClick(stat)}
          >
            <CardContent sx={{ p: 3, position: 'relative' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <Box 
                  sx={{ 
                    p: 1.5, 
                    borderRadius: 2, 
                    bgcolor: `${stat.color}15`, 
                    color: stat.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}
                >
                  {stat.icon}
                </Box>
                <IconButton 
                  size="small" 
                  sx={{ color: theme.palette.text.secondary }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (stat.action) {
                      stat.action();
                    } else {
                      router.push(stat.path);
                    }
                  }}
                >
                  <ArrowForwardIcon />
                </IconButton>
              </Box>
              
              <Typography variant="h5" component="div" sx={{ mb: 0.5, fontWeight: 600 }}>
                {stat.count}
              </Typography>
              
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                {stat.title}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {stat.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
