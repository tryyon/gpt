'use client';

import { useState, useMemo } from 'react';
import { Box } from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Inventory as InventoryIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { StatCard } from './StatCard';
import { DetailedReportDialog } from './DetailedReportDialog';
import { useTranslation } from 'react-i18next';

export function DashboardStats() {
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [currentReportType, setCurrentReportType] = useState<'revenue' | 'orders' | 'conversion'>('revenue');
  const [currentReportTitle, setCurrentReportTitle] = useState('');
  const { t } = useTranslation();

  // Memoize stats to prevent unnecessary re-renders
  const stats = useMemo(() => [
    {
      title: t('orders'),
      value: '145',
      icon: <ShoppingCartIcon sx={{ fontSize: 24 }} />,
      color: '#4caf50',
      change: '+8.2%',
      trend: 'up',
      reportType: 'orders',
    },
    {
      title: t('products'),
      value: '89',
      icon: <InventoryIcon sx={{ fontSize: 24 }} />,
      color: '#ff9800',
      change: '+5.1%',
      trend: 'up',
      reportType: null,
    },
    {
      title: t('customers'),
      value: '2,345',
      icon: <PeopleIcon sx={{ fontSize: 24 }} />,
      color: '#9c27b0',
      change: '+15.3%',
      trend: 'up',
      reportType: null,
    },
  ], [t]);

  const handleOpenReport = (reportType: 'revenue' | 'orders' | 'conversion', title: string) => {
    if (!reportType) return;
    
    setCurrentReportType(reportType);
    setCurrentReportTitle(title);
    setReportDialogOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)', // Changed from 6 to 3 cards per row
          },
          gap: 3,
          width: '100%',
        }}
      >
        {stats.map((stat) => (
          <StatCard 
            key={stat.title} 
            {...stat} 
            onClick={stat.reportType ? () => handleOpenReport(stat.reportType as any, stat.title) : undefined}
          />
        ))}
      </Box>

      <DetailedReportDialog
        open={reportDialogOpen}
        onClose={() => setReportDialogOpen(false)}
        reportType={currentReportType}
        title={currentReportTitle}
      />
    </>
  );
}