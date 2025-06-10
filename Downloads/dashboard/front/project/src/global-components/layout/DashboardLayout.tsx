'use client';

import { useState, useCallback, useEffect } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MobileNavigation } from './MobileNavigation';

export const DRAWER_WIDTH = 240;
export const COLLAPSED_WIDTH = 64;
export const HEADER_HEIGHT = 64;
export const MOBILE_NAV_HEIGHT = 56;

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close sidebar on mobile by default
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const handleToggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        minHeight: '100vh',
        bgcolor: theme.palette.mode === 'dark' ? 'background.default' : '#F1F4F7',
        overflow: 'hidden',
        transition: 'var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-timing)',
      }}
    >
      <Header onToggleSidebar={handleToggleSidebar} />
      {!isMobile && <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            xs: '100%',
            md: `calc(100% - ${sidebarOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH}px)`
          },
          mt: `${HEADER_HEIGHT}px`,
          mb: { xs: `${MOBILE_NAV_HEIGHT}px`, md: 0 }, // Add bottom margin for mobile navigation
          p: { xs: 2, sm: 3 },
          bgcolor: theme.palette.mode === 'dark' ? 'background.default' : '#F1F4F7',
          transition: theme => ({
            xs: 'var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-timing)',
            md: `width var(--theme-transition-duration) var(--theme-transition-timing), 
                margin var(--theme-transition-duration) var(--theme-transition-timing), 
                var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-timing)`
          }),
        }}
      >
        {children}
      </Box>
      
      {/* Mobile Bottom Navigation */}
      {isMobile && <MobileNavigation />}
    </Box>
  );
};