'use client';

import { Typography, Box, useMediaQuery, useTheme } from '@mui/material';

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

export const PageTitle = ({ title, subtitle }: PageTitleProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ 
      mb: 3,
      // Add padding bottom on mobile to prevent overlap with bottom navigation
      pb: isMobile ? 2 : 0
    }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle1" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};