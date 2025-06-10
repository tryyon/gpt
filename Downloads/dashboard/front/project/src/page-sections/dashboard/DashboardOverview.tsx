'use client';

import { Suspense, useState, useCallback, useMemo } from 'react';
import { Box, Grid, Card, CardContent, Typography, ButtonGroup, Button, useTheme, CircularProgress } from '@mui/material';
import dynamic from 'next/dynamic';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { useTranslation } from 'react-i18next';

// Dynamically import components to reduce initial bundle size
const DashboardStats = dynamic(() => import('./DashboardStats').then(mod => ({ default: mod.DashboardStats })), {
  ssr: true,
  loading: () => <Box sx={{ height: 120, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></Box>
});

const SalesChart = dynamic(() => import('./SalesChart').then(mod => ({ default: mod.SalesChart })), {
  ssr: true,
  loading: () => <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></Box>
});

const RecentOrders = dynamic(() => import('./RecentOrders').then(mod => ({ default: mod.RecentOrders })), {
  ssr: true,
  loading: () => <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></Box>
});

const RevenueChart = dynamic(() => import('./RevenueChart').then(mod => ({ default: mod.RevenueChart })), {
  ssr: true,
  loading: () => <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></Box>
});

const ConversionRateChart = dynamic(() => import('./ConversionRateChart').then(mod => ({ default: mod.ConversionRateChart })), {
  ssr: true,
  loading: () => <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></Box>
});

type TimeRange = 'day' | 'week' | 'month' | 'year' | 'all';

export function DashboardOverview() {
  const theme = useTheme();
  const hours = new Date().getHours();
  const { t } = useTranslation();
  
  // Get greeting based on time of day
  const greeting = hours < 12 ? t('goodMorning') : hours < 18 ? t('goodAfternoon') : t('goodEvening');
  
  const [timeRange, setTimeRange] = useState<TimeRange>('month');

  // Memoize the time range handler to prevent unnecessary re-renders
  const handleTimeRangeChange = useCallback((newRange: TimeRange) => {
    setTimeRange(newRange);
  }, []);

  // Memoize the greeting section to prevent unnecessary re-renders
  const greetingSection = useMemo(() => (
    <Box sx={{ 
      mb: 4, 
      p: 3, 
      borderRadius: 2, 
      background: theme.palette.mode === 'dark' 
        ? 'linear-gradient(45deg, #1e3c72 0%, #2a5298 100%)' 
        : 'linear-gradient(45deg, #2196f3 0%, #64b5f6 100%)',
      color: '#fff',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {`${greeting}, John Doe`}
      </Typography>
      <Typography variant="body1" sx={{ opacity: 0.9 }}>
        {t('hereIsWhatsHappening')}
      </Typography>
    </Box>
  ), [greeting, t, theme.palette.mode]);

  // Memoize the time range buttons to prevent unnecessary re-renders
  const timeRangeButtons = useMemo(() => (
    <ButtonGroup 
      size="small" 
      aria-label="time range selection"
      sx={{ 
        '& .MuiButton-root': {
          px: 2,
          py: 0.75,
          borderRadius: '4px !important',
          fontWeight: 500
        },
        '& .MuiButton-contained': {
          boxShadow: 'none'
        }
      }}
    >
      <Button 
        variant={timeRange === 'day' ? 'contained' : 'outlined'} 
        onClick={() => handleTimeRangeChange('day')}
      >
        {t('day')}
      </Button>
      <Button 
        variant={timeRange === 'week' ? 'contained' : 'outlined'} 
        onClick={() => handleTimeRangeChange('week')}
      >
        {t('week')}
      </Button>
      <Button 
        variant={timeRange === 'month' ? 'contained' : 'outlined'} 
        onClick={() => handleTimeRangeChange('month')}
      >
        {t('month')}
      </Button>
      <Button 
        variant={timeRange === 'year' ? 'contained' : 'outlined'} 
        onClick={() => handleTimeRangeChange('year')}
      >
        {t('year')}
      </Button>
      <Button 
        variant={timeRange === 'all' ? 'contained' : 'outlined'} 
        onClick={() => handleTimeRangeChange('all')}
      >
        {t('all')}
      </Button>
    </ButtonGroup>
  ), [timeRange, handleTimeRangeChange, t]);

  return (
    <Box>
      {greetingSection}
      
      <Suspense fallback={<Box sx={{ height: 120, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></Box>}>
        <DashboardStats />
      </Suspense>
      
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mt: 4, 
        mb: 2,
        px: 1
      }}>
        <Typography variant="h6" fontWeight="bold">{t('performanceMetrics')}</Typography>
        {timeRangeButtons}
      </Box>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Suspense fallback={<Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></Box>}>
            <RevenueChart timeRange={timeRange} />
          </Suspense>
        </Grid>
        <Grid item xs={12} md={6}>
          <Suspense fallback={<Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></Box>}>
            <ConversionRateChart timeRange={timeRange} />
          </Suspense>
        </Grid>
      </Grid>
      
      <Box sx={{ mb: 2, px: 1 }}>
        <Typography variant="h6" fontWeight="bold">{t('salesOverview')}</Typography>
      </Box>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Suspense fallback={<Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></Box>}>
            <SalesChart />
          </Suspense>
        </Grid>
        <Grid item xs={12} md={4}>
          <Suspense fallback={<Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></Box>}>
            <RecentOrders />
          </Suspense>
        </Grid>
      </Grid>
    </Box>
  );
}