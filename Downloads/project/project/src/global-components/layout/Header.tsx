'use client';

import { useState, memo } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, InputBase, alpha, useTheme, useMediaQuery, Badge } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, Close as CloseIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { HeaderActions } from './HeaderActions';
import { HEADER_HEIGHT } from './DashboardLayout';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header = memo(({ onToggleSidebar }: HeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <AppBar
      position="fixed"
       sx={{
         zIndex: (theme) => theme.zIndex.drawer + 1,
        height: HEADER_HEIGHT,
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.palette.mode === 'dark' 
          ? '0px 1px 3px rgba(0, 0, 0, 0.3)' 
          : '0px 1px 3px rgba(0, 0, 0, 0.1)',
        transition: 'var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-timing)',
      }}
    >
      <Toolbar sx={{ height: HEADER_HEIGHT, minHeight: HEADER_HEIGHT }}>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onToggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        {!isMobile || !searchActive ? (
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 0 }}>
            Admin Dashboard
          </Typography>
        ) : null}

        <Box sx={{ flexGrow: 1 }} />

        
          <Box
            sx={{
              position: 'relative',
              borderRadius: 1,
              bgcolor: (theme) => alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.15 : 0.04),
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.25 : 0.08),
              },
              mr: 2,
              width: 'auto',
              transition: 'background-color var(--theme-transition-duration) var(--theme-transition-timing)',
            }}
          >
            <Box 
              sx={{ 
                position: 'absolute',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                pl: 2,
                pointerEvents: 'none',
              }}
            >
              <SearchIcon sx={{ color: 'text.secondary' }} />
            </Box>
            <InputBase
              placeholder="Search..."
              sx={{
                pl: 6,
                pr: 2,
                py: 1,
                width: '300px',
                color: 'text.primary',
                '& .MuiInputBase-input': {
                  '&::placeholder': {
                    color: 'text.secondary',
                    opacity: 1,
                  },
                },
              }}
            />
          </Box>


        {isMobile && !searchActive && (
          <IconButton 
            color="inherit" 
            onClick={() => setSearchActive(true)}
            sx={{ mr: 1 }}
          >
            <SearchIcon />
          </IconButton>
        )}

        <HeaderActions />
      </Toolbar>
    </AppBar>
  );
});

Header.displayName = 'Header';