'use client';

import { useState, useEffect } from 'react';
import { 
  Grid, 
  FormControlLabel, 
  Switch, 
  Box, 
  Typography,
  Paper,
  Alert,
  Divider,
  Chip,
  FormGroup,
  Tooltip,
  Card,
  CardActionArea,
  useTheme,
  alpha,
  Button,
  Snackbar,
} from '@mui/material';
import { 
  Info as InfoIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  LocalOffer as LocalOfferIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  NewReleases as NewReleasesIcon,
  Category as CategoryIcon,
  Collections as CollectionsIcon,
  Diamond as DiamondIcon,
  Person as PersonIcon,
  Lightbulb as LightbulbIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { UseFormReturn, Controller } from 'react-hook-form';
import type { CreateProductInput } from '@/lib/validations/product';

interface VisibilityProps {
  form: UseFormReturn<CreateProductInput>;
}

// Define visibility sections with their icons and descriptions
const visibilitySections = [
  {
    id: 'shopByCategory',
    label: 'Shop by Category',
    description: 'Show in category browsing sections',
    icon: <CategoryIcon />,
    color: 'primary',
  },
  {
    id: 'newArrivals',
    label: 'New Arrivals',
    description: 'Display in new arrivals section',
    icon: <NewReleasesIcon />,
    color: 'success',
  },
  {
    id: 'topDeals',
    label: 'Top Deals',
    description: 'Feature in special deals section',
    icon: <LocalOfferIcon />,
    color: 'error',
  },
  {
    id: 'trendingNow',
    label: 'Trending Now',
    description: 'Show in trending products section',
    icon: <TrendingUpIcon />,
    color: 'warning',
  },
  {
    id: 'featuredCollection',
    label: 'Featured Collection',
    description: 'Include in featured collections',
    icon: <CollectionsIcon />,
    color: 'info',
  },
  {
    id: 'featuredCategories',
    label: 'Featured Categories',
    description: 'Show in featured category sections',
    icon: <CategoryIcon />,
    color: 'secondary',
  },
  {
    id: 'featuredProducts',
    label: 'Featured Products',
    description: 'Display in featured products section',
    icon: <StarIcon />,
    color: 'primary',
  },
  {
    id: 'hiddenGems',
    label: 'Hidden Gems',
    description: 'Include in hidden gems section',
    icon: <LightbulbIcon />,
    color: 'warning',
  },
  {
    id: 'personalizedForYou',
    label: 'Personalized For You',
    description: 'Show in personalized recommendations',
    icon: <PersonIcon />,
    color: 'info',
  },
  {
    id: 'luxuryCollection',
    label: 'Luxury Collection',
    description: 'Feature in luxury products section',
    icon: <DiamondIcon />,
    color: 'secondary',
  },
];

export function Visibility({ form }: VisibilityProps) {
  const theme = useTheme();
  const { register, formState: { errors }, control, watch, setValue } = form;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  // Watch the isVisible field to conditionally render sections
  const isVisible = watch('isVisible');

  // Initialize visibility section values when component mounts
  useEffect(() => {
    // Initialize isVisible if it's undefined
    if (watch('isVisible') === undefined) {
      setValue('isVisible', true);
    }
    
    // Initialize all visibility section values
    visibilitySections.forEach(section => {
      if (watch(`visibility.${section.id}`) === undefined) {
        setValue(`visibility.${section.id}`, false);
      }
    });
  }, [watch, setValue]);

  const handleSaveVisibility = () => {
    // Here you would typically make an API call to save the visibility settings
    // For now, we'll just show a success message
    setSnackbarOpen(true);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper 
          variant="outlined" 
          sx={{ 
            p: 3,
            borderRadius: 2,
            boxShadow: theme.shadows[1],
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Product Visibility
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Control where and how your product appears on the store
            </Typography>
          </Box>

          <Controller
            name="isVisible"
            control={control}
            defaultValue={true}
            render={({ field: { value, ...field } }) => (
              <FormControlLabel
                control={
                  <Switch 
                    checked={value} 
                    {...field} 
                    color="primary"
                    sx={{ 
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: theme.palette.success.main,
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.success.main, 0.08),
                        },
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: theme.palette.success.main,
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {value ? (
                      <>
                        <VisibilityIcon color="success" fontSize="small" />
                        <Typography fontWeight={500}>Product is visible in store</Typography>
                      </>
                    ) : (
                      <>
                        <VisibilityOffIcon color="error" fontSize="small" />
                        <Typography fontWeight={500}>Product is hidden from store</Typography>
                      </>
                    )}
                  </Box>
                }
              />
            )}
          />
        </Paper>
      </Grid>

      {/* Visibility Sections */}
      {isVisible && (
        <Grid item xs={12}>
          <Paper 
            variant="outlined" 
            sx={{ 
              p: 3,
              borderRadius: 2,
              boxShadow: theme.shadows[1],
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                Visibility Sections
              </Typography>
              <Tooltip title="Control where this product appears throughout your store">
                <InfoIcon fontSize="small" color="action" />
              </Tooltip>
            </Box>

            <Alert 
              severity="info" 
              sx={{ 
                mb: 3,
                borderRadius: 1,
                '& .MuiAlert-icon': {
                  alignItems: 'center',
                },
              }}
            >
              <Typography variant="body2">
                Select the sections where you want this product to appear. This helps increase product visibility and sales.
              </Typography>
            </Alert>

            <FormGroup>
              <Grid container spacing={2}>
                {visibilitySections.map((section) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={section.id}>
                    <Controller
                      name={`visibility.${section.id}`}
                      control={control}
                      defaultValue={false}
                      render={({ field: { value, ...field } }) => (
                        <Card 
                          variant="outlined" 
                          sx={{ 
                            borderRadius: 2,
                            borderColor: value ? `${section.color}.main` : 'divider',
                            bgcolor: value ? alpha(theme.palette[section.color].main, 0.05) : 'background.paper',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                              borderColor: `${section.color}.main`,
                              boxShadow: value ? 2 : 0,
                            },
                            position: 'relative',
                            overflow: 'visible',
                          }}
                        >
                          <CardActionArea 
                            onClick={() => setValue(`visibility.${section.id}`, !value)}
                            sx={{ 
                              p: 2,
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                            }}
                          >
                            <Box 
                              sx={{ 
                                position: 'absolute',
                                top: 12,
                                right: 12,
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                border: '2px solid',
                                borderColor: value ? `${section.color}.main` : 'divider',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: value ? `${section.color}.main` : 'background.paper',
                                transition: 'all 0.2s ease-in-out',
                              }}
                            >
                              {value && (
                                <Box
                                  component="span"
                                  sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    bgcolor: 'common.white',
                                  }}
                                />
                              )}
                            </Box>
                            
                            <Box 
                              sx={{ 
                                color: `${section.color}.main`,
                                mb: 1.5,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 1,
                                borderRadius: '50%',
                                bgcolor: alpha(theme.palette[section.color].main, 0.1),
                              }}
                            >
                              {section.icon}
                            </Box>
                            
                            <Typography 
                              variant="subtitle2" 
                              fontWeight={600}
                              gutterBottom
                            >
                              {section.label}
                            </Typography>
                            
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              sx={{ 
                                display: 'block',
                                lineHeight: 1.4,
                              }}
                            >
                              {section.description}
                            </Typography>
                          </CardActionArea>
                        </Card>
                      )}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>

            <Divider sx={{ my: 3 }} />

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Selected Visibility Sections:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {visibilitySections.map((section) => {
                  const isSelected = watch(`visibility.${section.id}`);
                  return isSelected ? (
                    <Chip
                      key={section.id}
                      label={section.label}
                      color={section.color as any}
                      size="small"
                      icon={section.icon}
                      sx={{ 
                        fontWeight: 500,
                        '& .MuiChip-icon': {
                          color: 'inherit',
                        },
                      }}
                    />
                  ) : null;
                })}
                {!visibilitySections.some(section => watch(`visibility.${section.id}`)) && (
                  <Typography variant="body2" color="text.secondary">
                    No visibility sections selected
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Save Button */}
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSaveVisibility}
                size="large"
                sx={{
                  px: 4,
                  py: 1,
                  borderRadius: 2,
                  boxShadow: theme.shadows[2],
                  '&:hover': {
                    boxShadow: theme.shadows[4],
                  },
                }}
              >
                Save Visibility Settings
              </Button>
            </Box>
          </Paper>
        </Grid>
      )}

      {/* Hidden Product Alert */}
      {!isVisible && (
        <Grid item xs={12}>
          <Alert 
            severity="warning" 
            icon={<VisibilityOffIcon />}
            sx={{ 
              mt: 2,
              borderRadius: 2,
            }}
          >
            <Typography variant="body2">
              This product will be hidden from your store. Customers will not be able to see or purchase it.
            </Typography>
          </Alert>
        </Grid>
      )}

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message="Visibility settings saved successfully"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </Grid>
  );
}