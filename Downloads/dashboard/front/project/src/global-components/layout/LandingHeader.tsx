'use client';

import { useState, useCallback } from 'react';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Box, 
  Button, 
  Container,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Tooltip,
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Close as CloseIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useColorMode } from '@/hooks/useColorMode';
import { LanguageSwitcher } from '@/i18n/LanguageSwitcher';
import Link from 'next/link';

interface LandingHeaderProps {
  onGetStarted: () => void;
}

export function LandingHeader({ onGetStarted }: LandingHeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();
  const { mode, toggleColorMode } = useColorMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const handleLogin = (userType: 'tenant' | 'supplier') => {
    router.push(`/login?type=${userType}`);
  };

  const handleNavClick = (href: string) => {
    if (pathname === '/') {
      // If on home page, scroll to section
      if (href.startsWith('#')) {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        router.push(href);
      }
    } else {
      // If on another page, navigate
      if (href.startsWith('#')) {
        router.push(`/${href}`);
      } else {
        router.push(href);
      }
    }
    
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <AppBar 
        position="fixed" 
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar 
            sx={{ 
              height: 64,
              px: { xs: 2, sm: 3 },
              gap: 2,
            }}
          >
            <Typography 
              variant="h6" 
              component={Link}
              href="/"
              sx={{ 
                flexGrow: 0,
                fontWeight: 700,
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)'
                  : 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              Marketplace
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 3 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    color="inherit"
                    sx={{ 
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: 'primary.main',
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {!isMobile && (
                <>
                  <LanguageSwitcher />
                  <Tooltip title={mode === 'dark' ? t('lightMode') : t('darkMode')}>
                    <IconButton onClick={toggleColorMode} color="inherit">
                      {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                  </Tooltip>
                </>
              )}
              
              <Button 
                variant="outlined" 
                color="inherit"
                onClick={() => handleLogin('tenant')}
                sx={{ 
                  ml: 2,
                  borderColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.23)' 
                    : 'rgba(0, 0, 0, 0.23)',
                  '&:hover': {
                    borderColor: theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.4)' 
                      : 'rgba(0, 0, 0, 0.4)',
                  }
                }}
              >
                {t('login')}
              </Button>
              
              <Button 
                variant="contained"
                onClick={onGetStarted}
                sx={{ 
                  bgcolor: theme.palette.mode === 'dark' ? 'primary.main' : 'primary.main',
                  color: theme.palette.mode === 'dark' ? 'common.black' : 'common.white',
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.dark',
                  }
                }}
              >
                {t('getStarted')}
              </Button>

              {isMobile && (
                <IconButton
                  color="inherit"
                  edge="end"
                  onClick={handleMobileMenuToggle}
                >
                  {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        PaperProps={{
          sx: {
            width: '80%',
            maxWidth: 360,
            bgcolor: theme.palette.mode === 'dark' 
              ? 'background.paper' 
              : 'common.white',
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Menu
          </Typography>
          <Divider />
          <List>
            {navItems.map((item) => (
              <ListItem 
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                sx={{ 
                  py: 1.5,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: theme.palette.action.hover,
                  }
                }}
              >
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: 500,
                  }}
                />
              </ListItem>
            ))}
            <Divider sx={{ my: 1 }} />
            <ListItem>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <LanguageSwitcher />
                <Tooltip title={mode === 'dark' ? t('lightMode') : t('darkMode')}>
                  <IconButton onClick={toggleColorMode} color="inherit">
                    {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                  </IconButton>
                </Tooltip>
              </Box>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}