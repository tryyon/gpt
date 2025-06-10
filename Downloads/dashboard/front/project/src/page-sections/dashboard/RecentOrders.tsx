'use client';

import { useMemo } from 'react';
import { Card } from '@mui/material';
import { Typography, List, ListItem, ListItemText, Chip, Box, useTheme, Avatar } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Reduced number of orders for a more compact display
const orders = [
  { id: 1, customer: 'John Doe', amount: '$156.00', status: 'completed' },
  { id: 2, customer: 'Jane Smith', amount: '$245.00', status: 'pending' },
  { id: 3, customer: 'Bob Johnson', amount: '$89.00', status: 'processing' },
];

// Memoize functions to prevent unnecessary re-renders
const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'pending':
      return 'warning';
    case 'processing':
      return 'info';
    default:
      return 'default';
  }
};

// Generate random avatar colors
const getAvatarColor = (name: string) => {
  const colors = ['#2196f3', '#4caf50', '#ff9800', '#9c27b0', '#e91e63', '#03a9f4'];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

export function RecentOrders() {
  const theme = useTheme();
  const { t } = useTranslation();

  // Memoize the order items to prevent unnecessary re-renders
  const orderItems = useMemo(() => orders.map((order) => ({
    ...order,
    statusColor: getStatusColor(order.status),
    avatarColor: getAvatarColor(order.customer)
  })), []);

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
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ p: 2, flexShrink: 0 }}> {/* Reduced padding */}
        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 1 }}>
          {t('recentOrders')}
        </Typography>
      </Box>
      <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
        <List disablePadding>
          {orderItems.map((order) => (
            <ListItem
              key={order.id}
              sx={{
                borderBottom: `1px solid ${theme.palette.divider}`,
                px: 2,
                py: 1, // Reduced padding
                '&:last-child': {
                  borderBottom: 'none',
                },
              }}
              secondaryAction={
                <Chip
                  label={order.status}
                  color={order.statusColor as any}
                  size="small"
                  sx={{ 
                    textTransform: 'capitalize',
                    fontSize: '0.7rem', // Smaller font
                    height: '20px', // Smaller height
                    fontWeight: 500
                  }}
                />
              }
            >
              <Avatar 
                sx={{ 
                  mr: 1.5, // Reduced margin
                  bgcolor: order.avatarColor,
                  width: 30, // Smaller avatar
                  height: 30, // Smaller avatar
                  fontSize: '0.75rem' // Smaller font
                }}
              >
                {order.customer.charAt(0)}
              </Avatar>
              <ListItemText
                primary={order.customer}
                secondary={order.amount}
                primaryTypographyProps={{
                  variant: 'body2',
                  fontWeight: 'medium',
                  fontSize: '0.85rem', // Smaller font
                }}
                secondaryTypographyProps={{
                  variant: 'caption',
                  color: 'primary',
                  fontSize: '0.75rem' // Smaller font
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Card>
  );
}