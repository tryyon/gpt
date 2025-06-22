'use client';

import { useMemo } from 'react';
import { Card } from '@mui/material';
import { Typography, useTheme, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Simplified data with fewer months for a more compact display
const data = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 2000 },
  { month: 'Apr', sales: 2780 },
  { month: 'May', sales: 1890 },
  { month: 'Jun', sales: 2390 },
];

export function SalesChart() {
  const theme = useTheme();
  
  // Memoize the tooltip to prevent unnecessary re-renders
  const renderTooltip = useMemo(() => {
    return {
      contentStyle: {
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '4px',
        fontSize: '0.75rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      },
      formatter: (value: number) => [`$${value.toLocaleString()}`, 'Sales']
    };
  }, [theme.palette.background.paper, theme.palette.divider]);

  return (
    <Card sx={{ 
      height: '100%', 
      maxHeight: '300px', // Set a maximum height
      boxShadow: theme.palette.mode === 'dark' ? 'none' : '0px 2px 8px rgba(0, 0, 0, 0.08)',
      border: '1px solid',
      borderColor: theme.palette.divider,
      bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : '#ffffff',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        boxShadow: theme.palette.mode === 'dark' 
          ? '0px 5px 15px rgba(0, 0, 0, 0.3)' 
          : '0px 5px 15px rgba(0, 0, 0, 0.1)',
        transform: 'translateY(-4px)',
      },
      borderRadius: 2,
      overflow: 'hidden'
    }}>
      <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}> {/* Reduced padding */}
        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 1 }}>
          Sales Overview
        </Typography>
        <Box sx={{ flexGrow: 1, width: '100%', height: 'calc(100% - 30px)', minHeight: 0 }}> {/* Adjusted height calculation */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}> {/* Reduced margins */}
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={theme.palette.divider} 
                vertical={false}
              />
              <XAxis 
                dataKey="month" 
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
              <Tooltip
                contentStyle={renderTooltip.contentStyle}
                formatter={renderTooltip.formatter}
              />
              <Line
                type="monotone"
                dataKey="sales"
                name="Monthly Sales"
                stroke={theme.palette.primary.main}
                strokeWidth={2}
                dot={{ strokeWidth: 2, r: 3, fill: theme.palette.background.paper }} // Smaller dots
                activeDot={{ r: 5, stroke: theme.palette.primary.main, strokeWidth: 2 }} // Smaller active dots
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Card>
  );
}