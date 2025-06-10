'use client';

import { Card, CardContent, CardHeader, CardProps, styled, Box, Typography, IconButton, Divider } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

interface DefaultCardProps extends CardProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  showMoreOptions?: boolean;
  onMoreClick?: () => void;
  headerDivider?: boolean;
  contentPadding?: boolean;
  children: React.ReactNode;
  customHeader?: React.ReactNode;
}

const StyledCard = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
  height: '100%',
  transition: theme.transitions.create(['border-color', 'box-shadow']),
  '&:hover': {
    borderColor: theme.palette.action.hover,
  },
  '& .MuiCardHeader-root': {
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
    },
  },
  '& .MuiCardContent-root': {
    height: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
    },
  },
}));

export const DefaultCard = ({ 
  title,
  subtitle,
  action,
  showMoreOptions,
  onMoreClick,
  headerDivider = true,
  contentPadding = true,
  children,
  customHeader,
  ...props 
}: DefaultCardProps) => {
  const hasHeader = title || subtitle || action || showMoreOptions || customHeader;

  const renderHeader = () => (
    customHeader ? customHeader : (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          p: { xs: 2, sm: 3 },
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {title && (
            <Typography variant="h6" gutterBottom={!!subtitle}>
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {action}
          {showMoreOptions && (
            <IconButton onClick={onMoreClick} size="small">
              <MoreVertIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    )
  );

  return (
    <StyledCard {...props}>
      {hasHeader && (
        <>
          {renderHeader()}
          {headerDivider && <Divider />}
        </>
      )}
      <CardContent 
        sx={{ 
          p: contentPadding ? undefined : '0 !important',
          height: '100%',
        }}
      >
        {children}
      </CardContent>
    </StyledCard>
  );
};