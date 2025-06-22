'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Box, 
  BottomNavigation, 
  BottomNavigationAction, 
  Paper, 
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  Collapse,
  AppBar,
  Toolbar,
  TextField,
  InputAdornment,
  Button,
  Badge,
  Fab
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  ShoppingCart as OrdersIcon,
  People as CustomersIcon,
  Inventory as ProductsIcon,
  Settings as SettingsIcon,
  LocalOffer as CouponsIcon,
  Store as ResellersIcon,
  AssignmentReturn as ReturnsIcon,
  AccountBalanceWallet as WalletIcon,
  Analytics as AnalyticsIcon,
  ExpandLess,
  ExpandMore,
  ShoppingBag as MarketplaceIcon,
  Add as AddIcon,
  Category as CategoryIcon,
  Tune as AttributesIcon,
  ArrowBack as ArrowBackIcon,
  Campaign as CampaignIcon,
  Person as InfluencerIcon,
} from '@mui/icons-material';
import { MOBILE_NAV_HEIGHT } from './DashboardLayout';
import { useTranslation } from 'react-i18next';

export function MobileNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [value, setValue] = useState(0);
  const { t } = useTranslation();

  // Update bottom nav value when path changes
  useEffect(() => {
    const index = mainNavItems.findIndex(item => item.path && pathname.startsWith(item.path));
    if (index >= 0) {
      setValue(index);
    }
  }, [pathname]);

  // Main navigation items for the bottom bar
  const mainNavItems = [
    { label: t('dashboard'), icon: <DashboardIcon />, path: '/dashboard' },
    { label: t('search'), icon: <SearchIcon />, path: null }, // Special case for search
    { label: t('profile'), icon: <PersonIcon />, path: null }, // Special case for profile
    { label: t('menu'), icon: <MenuIcon />, path: null }, // Special case for menu
  ];

  // Menu items for the drawer with submenus
  const menuItems = [
    { 
      label: t('dashboard'), 
      icon: <DashboardIcon />, 
      path: '/dashboard',
      subItems: []
    },
    { 
      label: t('products'), 
      icon: <ProductsIcon />, 
      path: '/dashboard/products',
      subItems: [
        { label: t('myProducts'), icon: <ProductsIcon />, path: '/dashboard/products' },
        { label: t('marketplaceProducts'), icon: <MarketplaceIcon />, path: '/dashboard/products/marketplace' },
        { label: t('createProduct'), icon: <AddIcon />, path: '/dashboard/products/create' },
        { label: t('categories'), icon: <CategoryIcon />, path: '/dashboard/products/categories' },
        { label: t('attributes'), icon: <AttributesIcon />, path: '/dashboard/products/attributes' },
      ]
    },
    { 
      label: t('orders'), 
      icon: <OrdersIcon />, 
      path: '/dashboard/orders',
      subItems: [
        { label: t('allOrders'), icon: <OrdersIcon />, path: '/dashboard/orders' },
        { label: t('createOrder'), icon: <AddIcon />, path: '/dashboard/orders/create' },
      ]
    },
    { 
      label: t('customers'), 
      icon: <CustomersIcon />, 
      path: '/dashboard/customers',
      subItems: []
    },
    { 
      label: t('coupons'), 
      icon: <CouponsIcon />, 
      path: '/dashboard/coupons',
      subItems: []
    },
    { 
      label: t('resellers'), 
      icon: <ResellersIcon />, 
      path: '/dashboard/resellers',
      subItems: []
    },
    { 
      label: t('influencers'), 
      icon: <InfluencerIcon />, 
      path: '/dashboard/influencers',
      subItems: []
    },
    { 
      label: t('returns'), 
      icon: <ReturnsIcon />, 
      path: '/dashboard/returns',
      subItems: []
    },
    { 
      label: t('wallet'), 
      icon: <WalletIcon />, 
      path: '/dashboard/wallet',
      subItems: []
    },
    { 
      label: t('analytics'), 
      icon: <AnalyticsIcon />, 
      path: '/dashboard/analytics',
      subItems: []
    },
    { 
      label: t('advertise'), 
      icon: <CampaignIcon />, 
      path: '/dashboard/advertise',
      subItems: []
    },
    { 
      label: t('settings'), 
      icon: <SettingsIcon />, 
      path: '/dashboard/settings',
      subItems: []
    },
  ];

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    
    // Handle special cases
    if (newValue === 1) { // Search
      setSearchOpen(true);
      return;
    }
    
    if (newValue === 2) { // Profile
      setProfileOpen(true);
      return;
    }
    
    if (newValue === 3) { // Menu
      setMenuOpen(true);
      return;
    }
    
    // Navigate to path for regular items
    const path = mainNavItems[newValue].path;
    if (path) {
      router.push(path);
    }
  };

  const handleMenuItemClick = (path: string) => {
    router.push(path);
    setMenuOpen(false);
  };

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isExpanded = (label: string) => expandedItems.includes(label);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Implement search functionality here
    setSearchOpen(false);
  };

  return (
    <>
      {/* Fixed Bottom Navigation */}
      <Paper 
        sx={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          zIndex: 1100,
          borderTop: 1,
          borderColor: 'divider',
          boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
        }}
        elevation={3}
      >
        <BottomNavigation
          value={value}
          onChange={handleChange}
          showLabels
          sx={{ 
            height: MOBILE_NAV_HEIGHT,
            bgcolor: theme => theme.palette.background.paper,
          }}
        >
          {mainNavItems.map((item, index) => (
            <BottomNavigationAction 
              key={index}
              label={item.label}
              icon={
                index === 1 && searchOpen ? 
                <Badge color="primary" variant="dot">
                  <SearchIcon />
                </Badge> : 
                index === 2 && profileOpen ? 
                <Badge color="primary" variant="dot">
                  <PersonIcon />
                </Badge> : 
                index === 3 && menuOpen ? 
                <Badge color="primary" variant="dot">
                  <MenuIcon />
                </Badge> : 
                item.icon
              }
              sx={{
                color: value === index ? 'primary.main' : 'text.secondary',
                '& .MuiBottomNavigationAction-label': {
                  fontSize: '0.7rem',
                },
              }}
            />
          ))}
        </BottomNavigation>
      </Paper>

      {/* Menu Drawer */}
      <Drawer
        anchor="left"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '85%',
            maxWidth: 320,
            height: '100%',
          },
        }}
      >
        {/* Fixed Drawer Header with Close Button */}
        <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6">{t('menu')}</Typography>
            <IconButton 
              edge="end" 
              onClick={() => setMenuOpen(false)} 
              aria-label="close menu"
              sx={{ 
                color: 'text.secondary',
                bgcolor: 'action.hover',
                '&:hover': { bgcolor: 'action.selected' }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        
        {/* Scrollable Content Area */}
        <Box 
          sx={{ 
            flexGrow: 1, 
            overflow: 'auto',
            // Important: Add padding at the bottom to prevent content from being hidden behind the bottom nav
            pb: `${MOBILE_NAV_HEIGHT + 24}px`,
          }}
        >
          <List component="nav">
            {menuItems.map((item) => (
              <Box key={item.label}>
                <ListItem disablePadding>
                  <ListItemButton 
                    onClick={() => {
                      if (item.subItems && item.subItems.length > 0) {
                        toggleExpanded(item.label);
                      } else {
                        handleMenuItemClick(item.path);
                      }
                    }}
                    selected={pathname === item.path}
                    sx={{
                      borderLeft: 3,
                      borderColor: pathname === item.path ? 'primary.main' : 'transparent',
                    }}
                  >
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                    {item.subItems && item.subItems.length > 0 && (
                      isExpanded(item.label) ? <ExpandLess /> : <ExpandMore />
                    )}
                  </ListItemButton>
                </ListItem>
                
                {/* Submenu items */}
                {item.subItems && item.subItems.length > 0 && (
                  <Collapse in={isExpanded(item.label)} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem) => (
                        <ListItem key={subItem.label} disablePadding>
                          <ListItemButton 
                            onClick={() => handleMenuItemClick(subItem.path)}
                            selected={pathname === subItem.path}
                            sx={{ 
                              pl: 4,
                              borderLeft: 3,
                              borderColor: pathname === subItem.path ? 'primary.main' : 'transparent',
                            }}
                          >
                            <ListItemIcon>
                              {subItem.icon}
                            </ListItemIcon>
                            <ListItemText primary={subItem.label} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
                <Divider />
              </Box>
            ))}
          </List>
        </Box>

        {/* Floating close button for better visibility */}
        <Fab
          color="primary"
          size="medium"
          onClick={() => setMenuOpen(false)}
          sx={{
            position: 'fixed',
            bottom: MOBILE_NAV_HEIGHT + 16,
            right: 16,
            zIndex: 1200,
          }}
        >
          <CloseIcon />
        </Fab>
      </Drawer>

      {/* Search Drawer */}
      <Drawer
        anchor="top"
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        PaperProps={{
          sx: {
            height: '100%',
          }
        }}
      >
        {/* Search Header with Close Button */}
        <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Toolbar>
            <IconButton 
              edge="start" 
              onClick={() => setSearchOpen(false)} 
              aria-label="back"
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>{t('search')}</Typography>
            <IconButton 
              edge="end" 
              onClick={() => setSearchOpen(false)} 
              aria-label="close search"
              sx={{ 
                color: 'text.primary',
                bgcolor: 'action.hover',
                '&:hover': { bgcolor: 'action.selected' }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        
        <Box sx={{ p: 2 }}>
          <Box 
            component="form" 
            onSubmit={handleSearch}
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <TextField
              fullWidth
              placeholder={`${t('search')}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchTerm ? (
                  <InputAdornment position="end">
                    <IconButton 
                      onClick={() => setSearchTerm('')}
                      edge="end"
                      size="small"
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null
              }}
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              aria-label="search"
              sx={{ height: '56px', minWidth: '56px' }}
            >
              <SearchIcon />
            </Button>
          </Box>
          
          {/* Recent searches or search suggestions could go here */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Recent Searches
            </Typography>
            <List>
              {['products', 'orders', 'customers'].map((term) => (
                <ListItem key={term} disablePadding>
                  <ListItemButton onClick={() => setSearchTerm(term)}>
                    <ListItemIcon>
                      <SearchIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={term} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>

        {/* Floating close button for better visibility */}
        <Fab
          color="primary"
          size="medium"
          onClick={() => setSearchOpen(false)}
          sx={{
            position: 'fixed',
            bottom: MOBILE_NAV_HEIGHT + 16,
            right: 16,
            zIndex: 1200,
          }}
        >
          <CloseIcon />
        </Fab>
      </Drawer>

      {/* Profile Drawer */}
      <Drawer
        anchor="right"
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        PaperProps={{
          sx: {
            width: '85%',
            maxWidth: 320,
          }
        }}
      >
        {/* Profile Header with Close Button */}
        <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6">{t('profile')}</Typography>
            <IconButton 
              edge="end" 
              onClick={() => setProfileOpen(false)} 
              aria-label="close profile"
              sx={{ 
                color: 'text.primary',
                bgcolor: 'action.hover',
                '&:hover': { bgcolor: 'action.selected' }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              sx={{ width: 60, height: 60, borderRadius: '50%' }}
            />
            <Box>
              <Typography variant="subtitle1">John Doe</Typography>
              <Typography variant="body2" color="text.secondary">Admin</Typography>
            </Box>
          </Box>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={t('profile')} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={t('settings')} />
              </ListItemButton>
            </ListItem>
            <Divider sx={{ my: 1 }} />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={t('logout')} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        {/* Floating close button for better visibility */}
        <Fab
          color="primary"
          size="medium"
          onClick={() => setProfileOpen(false)}
          sx={{
            position: 'fixed',
            bottom: MOBILE_NAV_HEIGHT + 16,
            right: 16,
            zIndex: 1200,
          }}
        >
          <CloseIcon />
        </Fab>
      </Drawer>
    </>
  );
}