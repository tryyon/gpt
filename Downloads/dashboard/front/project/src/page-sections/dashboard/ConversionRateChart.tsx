'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, Typography, Box, useTheme, CircularProgress, ButtonGroup, Button } from '@mui/material';
import { 
  AreaChart, 
  Area, 
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
const generateConversionData = (timeRange: string) => {
  const now = new Date();
  const data = [];
  
  switch(timeRange) {
    case 'day':
      // Last 24 hours, but only 4 data points (every 6 hours)
      for (let i = 0; i < 4; i++) {
        const hour = new Date(now);
        hour.setHours(now.getHours() - 18 + (i * 6));
        data.push({
          time: hour.toLocaleTimeString([], { hour: '2-digit' }),
          rate: (Math.random() * 5 + 2).toFixed(1), // 2-7% conversion rate
          visitors: Math.floor(Math.random() * 100) + 50,
          conversions: Math.floor(Math.random() * 10) + 1,
        });
      }
      break;
    
    case 'week':
      // Last 7 days, but only 3 data points
      for (let i = 0; i < 3; i++) {
        const day = new Date(now);
        day.setDate(now.getDate() - 6 + (i * 3));
        data.push({
          time: day.toLocaleDateString([], { weekday: 'short' }),
          rate: (Math.random() * 5 + 2).toFixed(1), // 2-7% conversion rate
          visitors: Math.floor(Math.random() * 500) + 200,
          conversions: Math.floor(Math.random() * 30) + 5,
        });
      }
      break;
    
    case 'month':
      // Last 30 days, but only 4 data points (weekly)
      for (let i = 0; i < 4; i++) {
        data.push({
          time: `W${i + 1}`,
          rate: (Math.random() * 5 + 2).toFixed(1), // 2-7% conversion rate
          visitors: Math.floor(Math.random() * 2000) + 1000,
          conversions: Math.floor(Math.random() * 100) + 30,
        });
      }
      break;
    
    case 'year':
      // Last 12 months, but only 4 data points (quarterly)
      const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
      for (let i = 0; i < 4; i++) {
        data.push({
          time: quarters[i],
          rate: (Math.random() * 5 + 2).toFixed(1), // 2-7% conversion rate
          visitors: Math.floor(Math.random() * 10000) + 5000,
          conversions: Math.floor(Math.random() * 500) + 100,
        });
      }
      break;
    
    case 'all':
      // Last 3 years
      const currentYear = now.getFullYear();
      for (let i = 0; i < 3; i++) {
        data.push({
          time: (currentYear - 2 + i).toString(),
          rate: (Math.random() * 5 + 2).toFixed(1), // 2-7% conversion rate
          visitors: Math.floor(Math.random() * 100000) + 50000,
          conversions: Math.floor(Math.random() * 5000) + 1000,
        });
      }
      break;
    
    default:
      // Default to monthly with 4 data points
      for (let i = 0; i < 4; i++) {
        data.push({
          time: `W${i + 1}`,
          rate: (Math.random() * 5 + 2).toFixed(1), // 2-7% conversion rate
          visitors: Math.floor(Math.random() * 2000) + 1000,
          conversions: Math.floor(Math.random() * 100) + 30,
        });
      }
  }
  
  return data;
};

// Calculate average conversion rate and growth
const calculateMetrics = (data: any[]) => {
  const totalRate = data.reduce((sum, item) => sum + parseFloat(item.rate), 0);
  const avgRate = totalRate / data.length;
  
  // Calculate growth (comparing first half to second half)
  const midpoint = Math.floor(data.length / 2);
  const firstHalfRate = data.slice(0, midpoint).reduce((sum, item) => sum + parseFloat(item.rate), 0) / midpoint;
  const secondHalfRate = data.slice(midpoint).reduce((sum, item) => sum + parseFloat(item.rate), 0) / (data.length - midpoint);
  
  const growthRate = ((secondHalfRate - firstHalfRate) / firstHalfRate) * 100;
  
  return { avgRate, growthRate };
};

interface ConversionRateChartProps {
  timeRange: string;
}

export function ConversionRateChart({ timeRange }: ConversionRateChartProps) {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [metrics, setMetrics] = useState({ avgRate: 0, growthRate: 0 });
  const [viewMode, setViewMode] = useState<'rate' | 'volume'>('rate');
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  
  // Memoize the data generation to prevent unnecessary recalculations
  const generateData = useCallback(() => {
    return generateConversionData(timeRange);
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

  // Memoize the CustomTooltip component to prevent unnecessary re-renders
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
            {viewMode === 'rate' ? (
              <Typography variant="body2" color="primary.main" fontSize="0.75rem"> {/* Smaller font */}
                Conversion Rate: {payload[0].value}%
              </Typography>
            ) : (
              <>
                <Typography variant="body2" color="primary.main" fontSize="0.75rem"> {/* Smaller font */}
                  Visitors: {payload[0].payload.visitors}
                </Typography>
                <Typography variant="body2" color="secondary.main" fontSize="0.75rem"> {/* Smaller font */}
                  Conversions: {payload[0].payload.conversions}
                </Typography>
              </>
            )}
          </Box>
        );
      }
      return null;
    };
  }, [viewMode]);

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
              <Typography variant="h6" fontSize="1rem">Conversion Rate</Typography> {/* Smaller font */}
              <Typography variant="body2" color="text.secondary" fontSize="0.75rem">{timeRangeLabel}</Typography> {/* Smaller font */}
            </Box>
            <ButtonGroup size="small">
              <Button 
                variant={viewMode === 'rate' ? 'contained' : 'outlined'} 
                onClick={(e) => {
                  e.stopPropagation();
                  setViewMode('rate');
                }}
                sx={{ py: 0.5, px: 1 }} // Smaller button
              >
                Rate
              </Button>
              <Button 
                variant={viewMode === 'volume' ? 'contained' : 'outlined'} 
                onClick={(e) => {
                  e.stopPropagation();
                  setViewMode('volume');
                }}
                sx={{ py: 0.5, px: 1 }} // Smaller button
              >
                Volume
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
                    {metrics.avgRate.toFixed(1)}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary" fontSize="0.75rem"> {/* Smaller font */}
                    Avg. Conversion
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
              {viewMode === 'rate' ? (
                <AreaChart
                  data={data}
                  margin={{ top: 5, right: 5, left: 0, bottom: 0 }} // Reduced margins
                >
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
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
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip content={CustomTooltip} />
                  <Area
                    type="monotone"
                    dataKey="rate"
                    stroke={theme.palette.primary.main}
                    fillOpacity={1}
                    fill="url(#colorRate)"
                  />
                </AreaChart>
              ) : (
                <AreaChart
                  data={data}
                  margin={{ top: 5, right: 5, left: 0, bottom: 0 }} // Reduced margins
                >
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={theme.palette.secondary.main} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={theme.palette.secondary.main} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
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
                  />
                  <Tooltip content={CustomTooltip} />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    name="Visitors"
                    stroke={theme.palette.primary.main}
                    fillOpacity={1}
                    fill="url(#colorVisitors)"
                  />
                  <Area
                    type="monotone"
                    dataKey="conversions"
                    name="Conversions"
                    stroke={theme.palette.secondary.main}
                    fillOpacity={1}
                    fill="url(#colorConversions)"
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          )}
        </Box>
      </Card>

      <DetailedReportDialog
        open={reportDialogOpen}
        onClose={() => setReportDialogOpen(false)}
        reportType="conversion"
        title="Conversion Rate"
      />
    </>
  );
}