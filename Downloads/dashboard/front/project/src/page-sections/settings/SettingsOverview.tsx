'use client';

import { useState } from 'react';
import { 
  Grid, 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  InputBase, 
  InputAdornment,
  Paper,
  Divider,
  useTheme,
  alpha,
  IconButton
} from '@mui/material';
import {
  Language,
  Security,
  Notifications,
  Payment,
  LocalShipping,
  Category,
  Collections,
  Group,
  Store,
  AccountBalance,
  Business,
  Domain,
  Settings,
  Inventory,
  CardGiftcard,
  QuestionAnswer,
  Search as SearchIcon,
  AttachMoney,
  Public,
  Translate,
  Policy,
  ShoppingCart,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { PageTitle } from '@/global-components/layout/PageTitle';

const settingsGroups = [
  {
    title: 'General Settings',
    description: 'Configure basic store information and preferences',
    icon: <Settings sx={{ fontSize: 24 }} />,
    color: '#2196f3',
    items: [
      { name: 'Domains', icon: <Domain />, path: '/dashboard/settings/domains', description: 'Manage custom domains' },
      { name: 'General', icon: <Settings />, path: '/dashboard/settings/general', description: 'Basic store settings' },
      { name: 'Organisation Details', icon: <Business />, path: '/dashboard/settings/organization', description: 'Company information' },
      { name: 'Bank Details', icon: <AccountBalance />, path: '/dashboard/settings/bank', description: 'Payment account details' },
      { name: 'Warehouse', icon: <Store />, path: '/dashboard/settings/warehouse', description: 'Inventory locations' },
    ]
  },
  {
    title: 'Category Management',
    description: 'Organize your products with categories and collections',
    icon: <Category sx={{ fontSize: 24 }} />,
    color: '#ff9800',
    items: [
      { name: 'Root Category', icon: <Category />, path: '/dashboard/settings/root-category', description: 'Top-level categories' },
      { name: 'Main Category', icon: <Category />, path: '/dashboard/settings/main-category', description: 'Second-level categories' },
      { name: 'Child Category', icon: <Category />, path: '/dashboard/settings/child-category', description: 'Third-level categories' },
      { name: 'Collections', icon: <Collections />, path: '/dashboard/settings/collections', description: 'Product collections' },
      { name: 'Groups', icon: <Group />, path: '/dashboard/settings/groups', description: 'Customer groups' },
    ]
  },
  {
    title: 'Product Settings',
    description: 'Configure product-related options and features',
    icon: <Inventory sx={{ fontSize: 24 }} />,
    color: '#4caf50',
    items: [
      { name: 'Product Contents', icon: <Inventory />, path: '/dashboard/settings/product-contents', description: 'Manage product contents' },
      { name: 'Size Chart', icon: <Category />, path: '/dashboard/settings/size-chart', description: 'Size guides' },
      { name: 'Warranty & Guarantee', icon: <Security />, path: '/dashboard/settings/warranty', description: 'Product warranties' },
      { name: 'Packaging', icon: <Inventory />, path: '/dashboard/settings/packaging', description: 'Packaging options' },
      { name: 'Gift Wrapping', icon: <CardGiftcard />, path: '/dashboard/settings/gift-wrapping', description: 'Gift options' },
      { name: 'Q&A', icon: <QuestionAnswer />, path: '/dashboard/settings/qa', description: 'Product questions' },
    ]
  },
  {
    title: 'Commerce Settings',
    description: 'Configure payment, shipping, and checkout options',
    icon: <ShoppingCart sx={{ fontSize: 24 }} />,
    color: '#e91e63',
    items: [
      { name: 'Shipping', icon: <LocalShipping />, path: '/dashboard/settings/shipping', description: 'Delivery options' },
      { name: 'Payments', icon: <Payment />, path: '/dashboard/settings/payments', description: 'Payment methods' },
      { name: 'Checkout', icon: <ShoppingCart />, path: '/dashboard/settings/checkout', description: 'Checkout process' },
      { name: 'Tax', icon: <AttachMoney />, path: '/dashboard/settings/tax', description: 'Tax configuration' },
    ]
  },
  {
    title: 'System Settings',
    description: 'Configure system-wide preferences and integrations',
    icon: <Security sx={{ fontSize: 24 }} />,
    color: '#9c27b0',
    items: [
      { name: 'Security', icon: <Security />, path: '/dashboard/settings/security', description: 'Security settings' },
      { name: 'Notifications', icon: <Notifications />, path: '/dashboard/settings/notifications', description: 'Alert preferences' },
      { name: 'Social', icon: <Public />, path: '/dashboard/settings/social', description: 'Social media links' },
      { name: 'SEO', icon: <SearchIcon />, path: '/dashboard/settings/seo', description: 'Search optimization' },
      { name: 'Languages', icon: <Translate />, path: '/dashboard/settings/languages', description: 'Store languages' },
      { name: 'Currencies', icon: <Language />, path: '/dashboard/settings/currencies', description: 'Currency options' },
      { name: 'Policies', icon: <Policy />, path: '/dashboard/settings/policies', description: 'Legal documents' },
    ]
  },
];

export function SettingsOverview() {
  const theme = useTheme();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGroups = searchTerm 
    ? settingsGroups.map(group => ({
        ...group,
        items: group.items.filter(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(group => group.items.length > 0)
    : settingsGroups;

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <Box>
      <PageTitle 
        title="Settings" 
        subtitle="Manage your store settings and configurations"
      />

      {/* Search Bar */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 0.5, 
          display: 'flex', 
          alignItems: 'center', 
          width: '100%', 
          mb: 4,
          border: '1px solid',
          borderColor: theme.palette.divider,
          borderRadius: 2,
          '&:hover': {
            borderColor: theme.palette.action.active,
          },
        }}
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search settings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          inputProps={{ 'aria-label': 'search settings' }}
        />
        <InputAdornment position="end">
          <SearchIcon color="action" sx={{ mr: 2 }} />
        </InputAdornment>
      </Paper>

      {/* Settings Groups */}
      {filteredGroups.map((group, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box 
              sx={{ 
                mr: 2, 
                p: 1, 
                borderRadius: 2, 
                bgcolor: alpha(group.color, 0.1),
                color: group.color,
                display: 'flex',
              }}
            >
              {group.icon}
            </Box>
            <Box>
              <Typography variant="h6">{group.title}</Typography>
              <Typography variant="body2" color="text.secondary">{group.description}</Typography>
            </Box>
          </Box>
          
          <Grid container spacing={2}>
            {group.items.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.path}>
                <Card 
                  onClick={() => handleNavigate(item.path)}
                  sx={{ 
                    cursor: 'pointer',
                    height: '100%',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 3,
                    }
                  }}
                >
                  <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box 
                      sx={{ 
                        mb: 2, 
                        p: 1.5, 
                        borderRadius: 2, 
                        bgcolor: alpha(group.color, 0.1),
                        color: group.color,
                        display: 'inline-flex',
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography variant="subtitle1" gutterBottom>{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                      {item.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto' }}>
                      <IconButton size="small" color="primary">
                        <ArrowForwardIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {index < filteredGroups.length - 1 && (
            <Divider sx={{ my: 4 }} />
          )}
        </Box>
      ))}

      {/* No Results */}
      {searchTerm && filteredGroups.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" gutterBottom>No settings found</Typography>
          <Typography variant="body2" color="text.secondary">
            Try a different search term or browse the categories
          </Typography>
        </Box>
      )}
    </Box>
  );
}