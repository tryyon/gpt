'use client';

import { useState } from 'react';
import {
  Box,
  TextField,
  Stack,
  MenuItem,
  Button,
  useTheme,
} from '@mui/material';
import {
  FilterList as FilterListIcon,
  FileDownload as FileDownloadIcon,
} from '@mui/icons-material';
import { GridToolbarDensitySelector } from '@mui/x-data-grid';
import { timeRanges } from './types';
import { exportToCsv } from '@/utils/exportToCsv';

interface OrdersToolbarProps {
  onTimeRangeChange: (range: string) => void;
  orders: any[];
}

export function OrdersToolbar({ onTimeRangeChange, orders }: OrdersToolbarProps) {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState('24h');
  const [customRange, setCustomRange] = useState({ value: '', unit: 'hours' });

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    onTimeRangeChange(value);
  };

  const handleExport = () => {
    const headers = {
      orderNumber: 'Order Number',
      customer: 'Customer Name',
      email: 'Email',
      date: 'Date',
      total: 'Total Amount',
      status: 'Order Status',
      paymentStatus: 'Payment Status',
    };

    const transformers = {
      date: (date: string) => new Date(date).toLocaleString(),
      total: (amount: number) => amount.toFixed(2),
      status: (status: string) => status.charAt(0).toUpperCase() + status.slice(1),
      paymentStatus: (status: string) => status.charAt(0).toUpperCase() + status.slice(1),
    };

    exportToCsv(
      orders,
      `orders_export_${new Date().toISOString().split('T')[0]}`,
      headers,
      transformers
    );
  };

  return (
    <Box sx={{ 
      p: 2, 
      display: 'flex', 
      gap: 2,
      flexDirection: { xs: 'column', sm: 'row' },
      alignItems: { xs: 'stretch', sm: 'center' },
      justifyContent: 'space-between',
      borderBottom: `1px solid ${theme.palette.divider}`,
    }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          select
          size="small"
          value={timeRange}
          onChange={(e) => handleTimeRangeChange(e.target.value)}
          sx={{ minWidth: 150 }}
          InputProps={{
            startAdornment: <FilterListIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        >
          {timeRanges.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          <MenuItem value="custom">Custom Range</MenuItem>
        </TextField>
        {timeRange === 'custom' && (
          <>
            <TextField
              size="small"
              type="number"
              value={customRange.value}
              onChange={(e) => setCustomRange({ ...customRange, value: e.target.value })}
              sx={{ width: 100 }}
            />
            <TextField
              size="small"
              select
              value={customRange.unit}
              onChange={(e) => setCustomRange({ ...customRange, unit: e.target.value })}
              sx={{ width: 120 }}
            >
              <MenuItem value="hours">Hours</MenuItem>
              <MenuItem value="days">Days</MenuItem>
              <MenuItem value="weeks">Weeks</MenuItem>
              <MenuItem value="months">Months</MenuItem>
              <MenuItem value="years">Years</MenuItem>
            </TextField>
          </>
        )}
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <GridToolbarDensitySelector />
        <Button
          startIcon={<FileDownloadIcon />}
          onClick={handleExport}
          sx={{ color: 'text.secondary' }}
        >
          Export
        </Button>
      </Stack>
    </Box>
  );
}