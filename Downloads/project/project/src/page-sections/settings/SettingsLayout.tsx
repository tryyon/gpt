'use client';

import { useState, lazy, Suspense, useEffect } from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Paper, 
  Typography, 
  useTheme, 
  Skeleton, 
  Collapse, 
  ListItemButton,
  InputBase,
  alpha,
  Divider
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { settingsGroups } from './settingsConfig';
import { Search as SearchIcon, ExpandLess, ExpandMore } from '@mui/icons-material';

const SETTINGS_MENU_WIDTH = 280;

export function SettingsLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize expanded groups based on current path
  useEffect(() => {
    if (pathname) {
      const currentGroup = settingsGroups.find(group => 
        group.items.some(item => item.path === pathname) ||
        group.items.some(item => item.subItems?.some(subItem => subItem.path === pathname))
      );
      
      if (currentGroup) {
        setExpandedGroups(prev => 
          prev.includes(currentGroup.title) ? prev : [...prev, currentGroup.title]
        );
      }
    }
  }, [pathname]);

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title) 
        : [...prev, title]
    );
  };

  const filteredGroups = searchTerm 
    ? settingsGroups.map(group => ({
        ...group,
        items: group.items.filter(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.subItems?.some(subItem => 
            subItem.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        ),
      })).filter(group => group.items.length > 0)
    : settingsGroups;

  if (!mounted) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
      {/* Settings Menu */}
      <Paper
        sx={{
          width: SETTINGS_MENU_WIDTH,
          flexShrink: 0,
          height: 'calc(100vh - 180px)',
          overflow: 'hidden', // Changed from 'auto' to 'hidden'
          position: 'sticky',
          top: 24,
          bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : '#ffffff',
          borderColor: theme.palette.divider,
          boxShadow: 'none',
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Search Box */}
        <Box sx={{ p: 2, pb: 1 }}>
          <Box
            sx={{
              p: '2px 8px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: 1,
              bgcolor: alpha(theme.palette.primary.main, 0.08),
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.12),
              },
            }}
          >
            <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            <InputBase
              sx={{ ml: 2, flex: 1 }}
              placeholder="Search settings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              inputProps={{ 'aria-label': 'search settings' }}
            />
          </Box>
        </Box>

        {/* Scrollable List Container */}
        <Box sx={{ 
          flexGrow: 1, 
          overflow: 'auto', // Add scrollbar only to the list container
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
            borderRadius: '6px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
        }}>
          <List sx={{ py: 0 }}>
            {filteredGroups.map((group, index) => (
              <Box key={group.title}>
                {index > 0 && (
                  <Box sx={{ 
                    px: 3, 
                    py: 1.5, 
                    bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : '#ffffff',
                  }}>
                    <Typography
                      variant="overline"
                      sx={{ 
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        fontSize: '0.75rem',
                        lineHeight: '1.5',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {group.title}
                    </Typography>
                  </Box>
                )}
                {group.items.map((item) => (
                  <Box key={item.path}>
                    <ListItem
                      disablePadding
                      sx={{ display: 'block' }}
                    >
                      <ListItemButton
                        onClick={() => {
                          if (item.subItems && item.subItems.length > 0) {
                            toggleGroup(item.name);
                          } else {
                            router.push(item.path);
                          }
                        }}
                        sx={{
                          px: 2,
                          py: 1,
                          bgcolor: pathname === item.path ? 
                            (pathname.includes('/dashboard/products/create') ? '#e3f2fd' : alpha(theme.palette.primary.main, 0.08)) : 
                            'transparent',
                          color: pathname === item.path ? 'primary.main' : 'text.primary',
                          '&:hover': {
                            bgcolor: theme.palette.mode === 'dark' 
                              ? 'rgba(255, 255, 255, 0.08)' 
                              : 'rgba(33, 150, 243, 0.08)',
                          },
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
                            <ListItemIcon 
                              sx={{ 
                                minWidth: 36,
                                color: pathname === item.path 
                                  ? theme.palette.primary.main 
                                  : theme.palette.mode === 'dark' 
                                    ? 'rgba(255, 255, 255, 0.7)' 
                                    : 'rgba(0, 0, 0, 0.54)',
                              }}
                            >
                              {item.icon}
                            </ListItemIcon>
                            <ListItemText 
                              primary={item.name}
                              primaryTypographyProps={{
                                variant: 'body2',
                                color: pathname === item.path 
                                  ? 'primary.main' 
                                  : theme.palette.mode === 'dark' 
                                    ? '#fff' 
                                    : 'rgba(0, 0, 0, 0.87)',
                                fontWeight: pathname === item.path ? 500 : 400,
                                noWrap: true,
                                fontSize: '0.875rem',
                              }}
                              sx={{ minWidth: 0 }}
                            />
                          </Box>
                          
                          {item.subItems && item.subItems.length > 0 && (
                            <Box sx={{ ml: 1, flexShrink: 0 }}>
                              {expandedGroups.includes(item.name) ? <ExpandLess /> : <ExpandMore />}
                            </Box>
                          )}
                        </Box>
                      </ListItemButton>
                    </ListItem>

                    {/* Sub-items */}
                    {item.subItems && item.subItems.length > 0 && (
                      <Collapse in={expandedGroups.includes(item.name)} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {item.subItems.map((subItem) => (
                            <ListItem
                              key={subItem.path}
                              disablePadding
                              sx={{ display: 'block' }}
                            >
                              <ListItemButton
                                onClick={() => router.push(subItem.path)}
                                sx={{
                                  pl: 6,
                                  pr: 2,
                                  py: 0.75,
                                  bgcolor: pathname === subItem.path ? 
                                    (pathname.includes('/dashboard/products/create') ? '#e3f2fd' : alpha(theme.palette.primary.main, 0.08)) : 
                                    'transparent',
                                  color: pathname === subItem.path ? 'primary.main' : 'text.primary',
                                  '&:hover': {
                                    bgcolor: theme.palette.mode === 'dark' 
                                      ? 'rgba(255, 255, 255, 0.08)' 
                                      : 'rgba(33, 150, 243, 0.08)',
                                  },
                                }}
                              >
                                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', minWidth: 0 }}>
                                  <ListItemIcon 
                                    sx={{ 
                                      minWidth: 36,
                                      color: pathname === subItem.path 
                                        ? theme.palette.primary.main 
                                        : theme.palette.mode === 'dark' 
                                          ? 'rgba(255, 255, 255, 0.7)' 
                                          : 'rgba(0, 0, 0, 0.54)',
                                    }}
                                  >
                                    {subItem.icon}
                                  </ListItemIcon>
                                  <ListItemText 
                                    primary={subItem.name}
                                    primaryTypographyProps={{
                                      variant: 'body2',
                                      color: pathname === subItem.path 
                                        ? 'primary.main' 
                                        : theme.palette.mode === 'dark' 
                                          ? '#fff' 
                                          : 'rgba(0, 0, 0, 0.87)',
                                      fontWeight: pathname === subItem.path ? 500 : 400,
                                      noWrap: true,
                                      fontSize: '0.875rem',
                                    }}
                                    sx={{ minWidth: 0 }}
                                  />
                                </Box>
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    )}
                  </Box>
                ))}
              </Box>
            ))}
          </List>
        </Box>
      </Paper>

      {/* Content Area */}
      <Suspense fallback={<Skeleton variant="rectangular" height={600} width="100%" />}>
        <Box 
          sx={{ 
            flexGrow: 1, 
            minWidth: 0,
            bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : '#ffffff',
            borderRadius: 2,
            p: { xs: 2, sm: 3 },
            border: 1,
            borderColor: theme.palette.divider,
            boxShadow: theme.palette.mode === 'dark' ? 'none' : '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          {children}
        </Box>
      </Suspense>
    </Box>
  );
}