'use client';

import { Card } from '@mui/material';
import { Typography, Box, useTheme } from '@mui/material';
import { TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon } from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  change?: string;
  trend?: 'up' | 'down';
  reportType?: 'revenue' | 'orders' | 'conversion' | null;
  onClick?: () => void;
}

export function StatCard({ title, value, icon, color, change, trend, reportType, onClick }: StatCardProps) {
  const theme = useTheme();

  return (
    <Card 
      sx={{ 
        width: '100%',
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
          cursor: reportType ? 'pointer' : 'default',
        },
        borderRadius: 2,
        overflow: 'hidden',
        minHeight: '120px', // Added minimum height
        display: 'flex', // Added flex display
        flexDirection: 'column', // Added column direction
        justifyContent: 'center' // Center content vertically
      }}
      onClick={onClick}
    >
      <Box sx={{ 
        p: 3, // Increased padding
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '4px',
          height: '100%',
          backgroundColor: color,
          opacity: 0.8
        }
      }}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: `${color}15`,
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 0,
            flexShrink: 0
          }}
        >
          {icon}
        </Box>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography variant="h5" component="div" fontWeight="bold" noWrap>
            {value}
          </Typography>
          <Typography color="text.secondary" variant="body2" noWrap>
            {title}
          </Typography>
          {change && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
              {trend === 'up' ? (
                <TrendingUpIcon fontSize="small" sx={{ color: 'success.main', fontSize: '1rem' }} />
              ) : (
                <TrendingDownIcon fontSize="small" sx={{ color: 'error.main', fontSize: '1rem' }} />
              )}
              <Typography 
                variant="caption" 
                sx={{ 
                  ml: 0.5, 
                  color: trend === 'up' ? 'success.main' : 'error.main',
                  fontWeight: 500
                }}
              >
                {change}
              </Typography>
            </Box>
          )}
        </Box>
        {reportType && (
          <Typography 
            variant="caption" 
            sx={{ 
              position: 'absolute',
              bottom: 4,
              right: 8,
              color: 'text.secondary',
              fontStyle: 'italic'
            }}
          >
            Click for details
          </Typography>
        )}
      </Box>
    </Card>
  );
}