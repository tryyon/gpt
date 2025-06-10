'use client';

import { useState, useCallback, memo, useEffect } from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Drawer, 
  Typography, 
  Avatar, 
  Divider, 
  useTheme,
  Collapse,
  ListItemButton,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard,
  ShoppingCart,
  People,
  Inventory,
  Store,
  AssignmentReturn,
  AccountBalanceWallet,
  Analytics,
  Settings,
  ExpandLess,
  ExpandMore,
  LocalOffer,
  ShoppingBag,
  StoreMallDirectory,
  Campaign,
  Person,
  CurrencyRupee,
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DRAWER_WIDTH, COLLAPSED_WIDTH, HEADER_HEIGHT } from './DashboardLayout';
import { useTranslation } from 'react-i18next';

interface MenuItem {
  text: string;
  icon: JSX.Element;
  href?: string;
  subItems?: MenuItem[];
}

const SidebarComponent = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const theme = useTheme();
  const pathname = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation();
  const [expandedItems, setExpandedItems] = useState<string[]>(() => {
    return [];
  });

  // Update expanded items when path changes
  useEffect(() => {
    const menuItems = getMenuItems();
    const currentItem = menuItems.find(item => 
      item.subItems?.some(subItem => pathname.startsWith(subItem.href || ''))
    );
    
    if (currentItem) {
      setExpandedItems(prev => 
        prev.includes(currentItem.text) ? prev : [...prev, currentItem.text]
      );
    }
  }, [pathname]);

  const handleItemClick = useCallback((text: string, href?: string) => {
    if (href) {
      if (isMobile) {
        onClose();
      }
      setExpandedItems([]);
    } else {
      setExpandedItems(prev => 
        prev.includes(text) 
          ? prev.filter(item => item !== text)
          : [...prev, text]
      );
    }
  }, [isMobile, onClose]);

  const isItemExpanded = (text: string) => expandedItems.includes(text);

  // Drawer variant based on screen size
  const drawerVariant = isMobile ? 'temporary' : 'permanent';

  // Get menu items with translations
  const getMenuItems = (): MenuItem[] => [
    { text: t('dashboard'), icon: <Dashboard />, href: '/dashboard' },
    { 
      text: t('products'), 
      icon: <Inventory />, 
      subItems: [
        { text: t('myProducts'), href: '/dashboard/products', icon: <span /> },
        { text: t('marketplaceProducts'), href: '/dashboard/products/marketplace', icon: <span /> },
        { text: t('createProduct'), href: '/dashboard/products/create', icon: <span /> },
      ]
    },
    { 
      text: t('orders'), 
      icon: <ShoppingCart />, 
      subItems: [
        { text: t('allOrders'), href: '/dashboard/orders', icon: <span /> },
        { text: t('createOrder'), href: '/dashboard/orders/create', icon: <span /> },
      ]
    },
    { text: t('customers'), icon: <People />, href: '/dashboard/customers' },
    { text: t('coupons'), icon: <LocalOffer />, href: '/dashboard/coupons' },
    { text: t('resellers'), icon: <Store />, href: '/dashboard/resellers' },
    { text: t('influencers'), icon: <Person />, href: '/dashboard/influencers' },
    { text: t('commission'), icon: <CurrencyRupee />, href: '/dashboard/commission' },
    { text: t('returns'), icon: <AssignmentReturn />, href: '/dashboard/returns' },
    { text: t('wallet'), icon: <AccountBalanceWallet />, href: '/dashboard/wallet' },
    { text: t('advertise'), icon: <Campaign />, href: '/dashboard/advertise' },
    { text: t('analytics'), icon: <Analytics />, href: '/dashboard/analytics' },
    { text: t('settings'), icon: <Settings />, href: '/dashboard/settings' },
  ];

  const menuItems = getMenuItems();

  return (
    <Drawer
      variant={drawerVariant}
      open={open}
      onClose={onClose}
      sx={{
        width: open ? DRAWER_WIDTH : COLLAPSED_WIDTH,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        display: { xs: 'block', md: 'block' },
        '& .MuiDrawer-paper': {
          width: open ? DRAWER_WIDTH : COLLAPSED_WIDTH,
          boxSizing: 'border-box',
          top: { xs: 0, md: '64px' },
          height: { xs: '100%', md: 'calc(100vh - 64px)' },
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
          overflowX: 'hidden',
          transition: theme.transitions.create(['width', 'transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      {/* Profile section - show on mobile or when sidebar is open on desktop */}
      {(isMobile || open) && (
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{ 
              width: 40, 
              height: 40, 
              bgcolor: theme.palette.primary.main,
              fontSize: '1rem'
            }}
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          />
          {open && (
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="subtitle2" noWrap fontWeight={600}>
                John Doe
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                Admin
              </Typography>
            </Box>
          )}
        </Box>
      )}
      
      <Divider sx={{ my: 1 }} />

      <List sx={{ pt: 0 }}>
        {menuItems.map((item) => (
          <Box key={item.text}>
            <ListItem
              component={item.href && !item.subItems ? Link : 'div'}
              href={item.href || ''}
              onClick={() => handleItemClick(item.text, item.href)}
              sx={{
                minHeight: 48,
                px: 2.5,
                color: 'inherit',
                textDecoration: 'none',
                position: 'relative',
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  bottom: 4,
                  width: 3,
                  borderRadius: '0 2px 2px 0',
                  bgcolor: theme.palette.primary.main,
                  transform: item.href === pathname ? 'scaleY(1)' : 'scaleY(0)',
                  transition: 'transform var(--theme-transition-duration) var(--theme-transition-timing)',
                },
                '&:hover': {
                  bgcolor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.08)' 
                    : 'rgba(33, 150, 243, 0.04)',
                  '&:before': {
                    transform: 'scaleY(1)',
                  },
                  '& .MuiListItemIcon-root': {
                    color: theme.palette.primary.main,
                  },
                  '& .MuiTypography-root': {
                    color: theme.palette.primary.main,
                  },
                },
              }}
            >
              <ListItemIcon 
                sx={{ 
                   minWidth: 0,
                   mr: open ? 2 : 'auto',
                   justifyContent: 'center',
                  color: item.href === pathname 
                    ? theme.palette.primary.main 
                    : theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.7)' 
                      : 'rgba(0, 0, 0, 0.54)',
                  transition: 'color var(--theme-transition-duration) var(--theme-transition-timing)',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {open && (
                <>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{
                      color: item.href === pathname 
                        ? 'primary.main' 
                        : theme.palette.mode === 'dark' 
                          ? theme.palette.text.primary 
                          : 'rgba(0, 0, 0, 0.87)',
                      fontWeight: item.href === pathname ? 500 : 400,
                      noWrap: true,
                      fontSize: '0.875rem',
                    }}
                  />
                  {item.subItems && (
                    isItemExpanded(item.text) ? <ExpandLess /> : <ExpandMore />
                  )}
                </>
              )}
            </ListItem>
            {item.subItems && open && (
              <Collapse in={isItemExpanded(item.text)} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItem
                      key={subItem.text}
                      component={Link}
                      href={subItem.href || ''}
                      sx={{
                        pl: 4,
                        minHeight: 40,
                        color: 'inherit',
                        textDecoration: 'none',
                        position: 'relative',
                        '&:before': {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          bottom: 4,
                          width: 3,
                          borderRadius: '0 2px 2px 0',
                          bgcolor: theme.palette.primary.main,
                          transform: subItem.href === pathname ? 'scaleY(1)' : 'scaleY(0)',
                          transition: 'transform var(--theme-transition-duration) var(--theme-transition-timing)',
                        },
                        '&:hover': {
                          bgcolor: theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.08)' 
                            : 'rgba(33, 150, 243, 0.04)',
                          '&:before': {
                            transform: 'scaleY(1)',
                          },
                          '& .MuiTypography-root': {
                            color: theme.palette.primary.main,
                          },
                        },
                      }}
                    >
                      <ListItemText 
                        primary={subItem.text}
                        primaryTypographyProps={{
                          variant: 'body2',
                          color: subItem.href === pathname 
                            ? theme.palette.primary.main 
                            : theme.palette.mode === 'dark' 
                              ? theme.palette.text.primary 
                              : 'rgba(0, 0, 0, 0.87)',
                          fontWeight: subItem.href === pathname ? 500 : 400
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
      </List>
    </Drawer>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const Sidebar = memo(SidebarComponent);