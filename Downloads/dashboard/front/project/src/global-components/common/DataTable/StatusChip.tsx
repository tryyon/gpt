'use client';

import { Chip, ChipProps, useTheme } from '@mui/material';

type StatusType = 'active' | 'inactive' | 'pending' | 'processing' | 'completed' | 'cancelled' | 'error' | 'warning' | 'success' | 'info' | string;

interface StatusConfig {
  label: string;
  color: 'success' | 'error' | 'warning' | 'info' | 'default';
  variant?: 'filled' | 'outlined';
}

interface StatusChipProps extends Omit<ChipProps, 'color'> {
  status: StatusType;
  size?: 'small' | 'medium';
  variant?: 'filled' | 'outlined';
  colorMap?: Record<string, StatusConfig>;
  capitalize?: boolean;
  showDot?: boolean;
}

const defaultColorMap: Record<string, StatusConfig> = {
  active: { label: 'Active', color: 'success', variant: 'filled' },
  inactive: { label: 'Inactive', color: 'default', variant: 'filled' },
  pending: { label: 'Pending', color: 'warning', variant: 'filled' },
  processing: { label: 'Processing', color: 'info', variant: 'filled' },
  completed: { label: 'Completed', color: 'success', variant: 'filled' },
  cancelled: { label: 'Cancelled', color: 'error', variant: 'filled' },
  error: { label: 'Error', color: 'error', variant: 'filled' },
  warning: { label: 'Warning', color: 'warning', variant: 'filled' },
  success: { label: 'Success', color: 'success', variant: 'filled' },
  info: { label: 'Info', color: 'info', variant: 'filled' },
  default: { label: 'Unknown', color: 'default', variant: 'filled' },
};

export function StatusChip({ 
  status,
  size = 'small',
  variant: propVariant,
  colorMap,
  capitalize = true,
  showDot = false,
  sx,
  ...props 
}: StatusChipProps) {
  const theme = useTheme();
  const statusKey = status.toLowerCase();
  const config = (colorMap?.[statusKey] || defaultColorMap[statusKey] || defaultColorMap.default);
  const variant = propVariant || config.variant;

  const getStatusColor = (color: StatusConfig['color']) => {
    switch (color) {
      case 'success':
        return theme.palette.success;
      case 'error':
        return theme.palette.error;
      case 'warning':
        return theme.palette.warning;
      case 'info':
        return theme.palette.info;
      default:
        // For 'default' and unknown, return a string color
        return '#bdbdbd';
    }
  };

  const statusColor = getStatusColor(config.color);

  return (
    <Chip
      label={capitalize ? config.label : config.label.toLowerCase()}
      color={config.color}
      size={size}
      variant={variant}
      sx={{
        fontWeight: 500,
        textTransform: capitalize ? 'capitalize' : 'none',
        minWidth: 72,
        height: size === 'small' ? 24 : 32,
        '& .MuiChip-label': {
          px: showDot ? 1.5 : undefined,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        },
        ...(showDot && {
          '& .MuiChip-label::before': {
            content: '""',
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: variant === 'outlined' ? (typeof statusColor === 'string' ? statusColor : statusColor.main) : 'currentColor',
          },
        }),
        ...(variant === 'outlined' && {
          borderColor: typeof statusColor === 'string' ? statusColor : statusColor.main,
          color: typeof statusColor === 'string' ? statusColor : statusColor.main,
          backgroundColor: (typeof statusColor === 'string' ? statusColor : statusColor.main) + '10',
          '&:hover': {
            backgroundColor: (typeof statusColor === 'string' ? statusColor : statusColor.main) + '20',
          },
        }),
        ...sx,
      }}
      {...props}
    />
  );
}