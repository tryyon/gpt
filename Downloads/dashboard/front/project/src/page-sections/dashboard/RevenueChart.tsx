'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, Typography, Box, useTheme, CircularProgress, ButtonGroup, Button } from '@mui/material';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  TooltipProps
} from 'recharts';
import { ArrowUpward as ArrowUpwardIcon, ArrowDownward as ArrowDownwardIcon } from '@mui/icons-material';
import { DetailedReportDialog } from './DetailedReportDialog';

// Generate mock data for different time ranges with fewer data points
const generateRevenueData = (timeRange: string) => {
  const now = new Date();
  const data = [];
  
  switch(timeRange) {
    case 'day':
      // Last 24 hours, but only 6 data points (every 4 hours)
      for (let i = 0; i < 6; i++) {
        const hour = new Date(now);
        hour.setHours(now.getHours() - 20 + (i * 4));
        data.push({
          time: hour.toLocaleTimeString([], { hour: '2-digit' }),
          revenue: Math.floor(Math.random() * 1000) + 500,
          target: Math.floor(Math.random() * 1000) + 600,
        });
      }
      break;
    
    case 'week':
      // Last 7 days, but only 4 data points
      for (let i = 0; i < 4; i++) {
        const day = new Date(now);
        day.setDate(now.getDate() - 6 + (i * 2));
        data.push({
          time: day.toLocaleDateString([], { weekday: 'short' }),
          revenue: Math.floor(Math.random() * 5000) + 2000,
          target: Math.floor(Math.random() * 5000) + 3000,
        });
      }
      break;
    
    case 'month':
      // Last 30 days, but only 4 data points (weekly)
      for (let i = 0; i < 4; i++) {
        const week = new Date(now);
        week.setDate(now.getDate() - 28 + (i * 7));
        data.push({
          time: `W${i + 1}`,
          revenue: Math.floor(Math.random() * 20000) + 10000,
          target: Math.floor(Math.random() * 20000) + 15000,
        });
      }
      break;
    
    case 'year':
      // Last 12 months, but only 6 data points (bimonthly)
      const months = ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'];
      for (let i = 0; i < 6; i++) {
        data.push({
          time: months[i],
          revenue: Math.floor(Math.random() * 100000) + 50000,
          target: Math.floor(Math.random() * 100000) + 60000,
        });
      }
      break;
    
    case 'all':
      // Last 3 years
      const currentYear = now.getFullYear();
      for (let i = 0; i < 3; i++) {
        data.push({
          time: (currentYear - 2 + i).toString(),
          revenue: Math.floor(Math.random() * 1000000) + 500000,
          target: Math.floor(Math.random() * 1000000) + 600000,
        });
      }
      break;
    
    default:
      // Default to monthly with 4 data points
      for (let i = 0; i < 4; i++) {
        const week = new Date(now);
        week.setDate(now.getDate() - 28 + (i * 7));
        data.push({
          time: `W${i + 1}`,
          revenue: Math.floor(Math.random() * 20000) + 10000,
          target: Math.floor(Math.random() * 20000) + 15000,
        });
      }
  }
  
  return data;
};

// Calculate total revenue and growth
const calculateMetrics = (data: any[]) => {
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  
  // Calculate growth (comparing first half to second half)
  const midpoint = Math.floor(data.length / 2);
  const firstHalfRevenue = data.slice(0, midpoint).reduce((sum, item) => sum + item.revenue, 0);
  const secondHalfRevenue = data.slice(midpoint).reduce((sum, item) => sum + item.revenue, 0);
  
  let growthRate = 0;
  if (firstHalfRevenue > 0) {
    growthRate = ((secondHalfRevenue - firstHalfRevenue) / firstHalfRevenue) * 100;
  }
  
  return { totalRevenue, growthRate };
};

interface RevenueChartProps {
  timeRange: string;
}

export function RevenueChart({ timeRange }: RevenueChartProps) {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [metrics, setMetrics] = useState({ totalRevenue: 0, growthRate: 0 });
  const [chartType, setChartType] = useState<'revenue' | 'comparison'>('revenue');
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  
  // Memoize the data generation to prevent unnecessary recalculations
  const generateData = useCallback(() => {
    return generateRevenueData(timeRange);
  }, [timeRange]);
  
  useEffect(() => {
    setLoading(true);
    
    // Use a longer timeout to reduce refresh frequency
    const timer = setTimeout(() => {
      const newData = generateData();
      setData(newData);
      setMetrics(calculateMetrics(newData));
      setLoading(false);
    }, 2000); // Increased from 500ms to 2000ms
    
    return () => clearTimeout(timer);
  }, [timeRange, generateData]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Memoize the tooltip component to prevent unnecessary re-renders
  const CustomTooltip = useMemo(() => {
    return ({ active, payload, label }: TooltipProps<number, string>) => {
      if (active && payload && payload.length) {
        return (
          <Box sx={{ 
            bgcolor: 'background.paper', 
            p: 1.5, // Reduced padding
            border: '1px solid', 
            borderColor: 'divider',
            borderRadius: 1,
            boxShadow: 1
          }}>
            <Typography variant="subtitle2" fontSize="0.8rem">{label}</Typography> {/* Smaller font */}
            {payload.map((entry, index) => (
              <Typography 
                key={`item-${index}`} 
                variant="body2" 
                fontSize="0.75rem" // Smaller font
                color={entry.color}
              >
                {entry.name}: {formatCurrency(entry.value as number)}
              </Typography>
            ))}
          </Box>
        );
      }
      return null;
    };
  }, []);

  const timeRangeLabel = useMemo(() => {
    switch(timeRange) {
      case 'day': return 'Today';
      case 'week': return 'This Week';
      case 'month': return 'This Month';
      case 'year': return 'This Year';
      case 'all': return 'All Time';
      default: return 'This Month';
    }
  }, [timeRange]);

  const handleViewDetailedReport = useCallback(() => {
    setReportDialogOpen(true);
  }, []);

  // Ensure we always render the chart container with the same height
  const chartContainerStyle = {
    flexGrow: 1,
    overflow: 'hidden',
    minHeight: 200,
    maxHeight: 200,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <>
      <Card sx={{ 
        height: '100%',
        maxHeight: '300px', // Set a maximum height
        boxShadow: theme.palette.mode === 'dark' ? 'none' : '0px 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid',
        borderColor: theme.palette.divider,
        bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : '#ffffff',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: theme.palette.mode === 'dark' 
            ? '0px 3px 6px rgba(0, 0, 0, 0.3)' 
            : '0px 3px 6px rgba(0, 0, 0, 0.15)',
          transform: 'translateY(-2px)',
        },
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
      onClick={handleViewDetailedReport}
      >
        <CardContent sx={{ p: 2, flexGrow: 0 }}> {/* Reduced padding */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}> {/* Reduced margin */}
            <Box>
              <Typography variant="h6" fontSize="1rem">Revenue</Typography> {/* Smaller font */}
              <Typography variant="body2" color="text.secondary" fontSize="0.75rem">{timeRangeLabel}</Typography> {/* Smaller font */}
            </Box>
            <ButtonGroup size="small">
              <Button 
                variant={chartType === 'revenue' ? 'contained' : 'outlined'} 
                onClick={(e) => {
                  e.stopPropagation();
                  setChartType('revenue');
                }}
                sx={{ py: 0.5, px: 1 }} // Smaller button
              >
                Trend
              </Button>
              <Button 
                variant={chartType === 'comparison' ? 'contained' : 'outlined'} 
                onClick={(e) => {
                  e.stopPropagation();
                  setChartType('comparison');
                }}
                sx={{ py: 0.5, px: 1 }} // Smaller button
              >
                vs Target
              </Button>
            </ButtonGroup>
          </Box>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}> {/* Reduced height */}
              <CircularProgress size={30} /> {/* Smaller loader */}
            </Box>
          ) : (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}> {/* Reduced margin */}
                <Box>
                  <Typography variant="h5" color="primary.main" fontSize="1.25rem"> {/* Smaller font */}
                    {formatCurrency(metrics.totalRevenue)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" fontSize="0.75rem"> {/* Smaller font */}
                    Total Revenue
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    {metrics.growthRate > 0 ? (
                      <ArrowUpwardIcon fontSize="small" sx={{ fontSize: '0.9rem' }} color="success" /> // Smaller icon
                    ) : (
                      <ArrowDownwardIcon fontSize="small" sx={{ fontSize: '0.9rem' }} color="error" /> // Smaller icon
                    )}
                    <Typography 
                      variant="h6" 
                      fontSize="1rem" // Smaller font
                      color={metrics.growthRate > 0 ? 'success.main' : 'error.main'}
                    >
                      {Math.abs(metrics.growthRate).toFixed(1)}%
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" fontSize="0.75rem"> {/* Smaller font */}
                    vs Previous
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </CardContent>
        
        <Box sx={chartContainerStyle}>
          {loading ? (
            <CircularProgress size={30} />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 5, left: 0, bottom: 0 }} // Reduced margins
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={theme.palette.divider} 
                  vertical={false}
                />
                <XAxis 
                  dataKey="time" 
                  stroke={theme.palette.text.secondary}
                  style={{ fontSize: '0.7rem' }} // Smaller font
                  tickMargin={5} // Reduced margin
                />
                <YAxis 
                  stroke={theme.palette.text.secondary}
                  style={{ fontSize: '0.7rem' }} // Smaller font
                  tickMargin={5} // Reduced margin
                  tickFormatter={(value) => `$${value/1000}k`} // Shorter format
                />
                <Tooltip content={CustomTooltip} />
                {chartType === 'comparison' && <Legend iconSize={10} wrapperStyle={{ fontSize: '0.7rem' }} />} {/* Smaller legend */}
                <Line
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke={theme.palette.primary.main}
                  strokeWidth={2}
                  dot={{ strokeWidth: 2, r: 3 }} // Smaller dots
                  activeDot={{ r: 5 }} // Smaller active dots
                />
                {chartType === 'comparison' && (
                  <Line
                    type="monotone"
                    dataKey="target"
                    name="Target"
                    stroke={theme.palette.secondary.main}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ strokeWidth: 2, r: 3 }} // Smaller dots
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          )}
        </Box>
      </Card>

      <DetailedReportDialog
        open={reportDialogOpen}
        onClose={() => setReportDialogOpen(false)}
        reportType="revenue"
        title="Revenue"
      />
    </>
  );
}