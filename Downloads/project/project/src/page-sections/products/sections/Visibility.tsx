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
type PaletteColorKey = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

const visibilitySections: {
  id: string;
  label: string;
  description: string;
  icon: JSX.Element;
  color: PaletteColorKey;
}[] = [
  {
    id: 'shopByCategory',
    label: 'Shop by Category',
    description: 'Show in category browsing sections',
    icon: <CategoryIcon fontSize="small" />,
    color: 'primary',
  },
  {
    id: 'newArrivals',
    label: 'New Arrivals',
    description: 'Display in new arrivals section',
    icon: <NewReleasesIcon fontSize="small" />,
    color: 'success',
  },
  {
    id: 'topDeals',
    label: 'Top Deals',
    description: 'Feature in special deals section',
    icon: <LocalOfferIcon fontSize="small" />,
    color: 'error',
  },
  {
    id: 'trendingNow',
    label: 'Trending Now',
    description: 'Show in trending products section',
    icon: <TrendingUpIcon fontSize="small" />,
    color: 'warning',
  },
  {
    id: 'featuredCollection',
    label: 'Featured Collection',
    description: 'Include in featured collections',
    icon: <CollectionsIcon fontSize="small" />,
    color: 'info',
  },
  {
    id: 'featuredCategories',
    label: 'Featured Categories',
    description: 'Show in featured category sections',
    icon: <CategoryIcon fontSize="small" />,
    color: 'secondary',
  },
  {
    id: 'featuredProducts',
    label: 'Featured Products',
    description: 'Display in featured products section',
    icon: <StarIcon fontSize="small" />,
    color: 'primary',
  },
  {
    id: 'hiddenGems',
    label: 'Hidden Gems',
    description: 'Include in hidden gems section',
    icon: <LightbulbIcon fontSize="small" />,
    color: 'warning',
  },
  {
    id: 'personalizedForYou',
    label: 'Personalized For You',
    description: 'Show in personalized recommendations',
    icon: <PersonIcon fontSize="small" />,
    color: 'info',
  },
  {
    id: 'luxuryCollection',
    label: 'Luxury Collection',
    description: 'Feature in luxury products section',
    icon: <DiamondIcon fontSize="small" />,
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
    visibilitySections.forEach(section => {
      if (watch(`visibility.${section.id}` as const) === undefined) {
        setValue(`visibility.${section.id}` as const, false);
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
            render={({ field }) => (
              <Switch
                {...field}
                checked={!!field.value}
                onChange={e => field.onChange(e.target.checked)}
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
                      render={({ field }) => (
                        <Card
                          variant="outlined"
                          sx={{
                            borderRadius: 2,
                            borderColor: field.value ? theme.palette[section.color].main : theme.palette.divider,
                            bgcolor: field.value ? alpha(theme.palette[section.color].main, 0.05) : theme.palette.background.paper,
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                              borderColor: theme.palette[section.color].main,
                              boxShadow: field.value ? 2 : 0,
                            },
                            position: 'relative',
                            overflow: 'visible',
                          }}
                        >
                          <CardActionArea
                            onClick={() => setValue(`visibility.${section.id}`, !field.value)}
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
                                borderColor: field.value ? theme.palette[section.color as PaletteColorKey].main : theme.palette.divider,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: field.value ? theme.palette[section.color as PaletteColorKey].main : theme.palette.background.paper,
                                transition: 'all 0.2s ease-in-out',
                                borderRadius: '50%',
                                border: '2px solid',
                                width: 40,
                                height: 40,
                                mb: 1.5,
                              }}
                            >
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: 32,
                                  height: 32,
                                  borderRadius: '50%',
                                  bgcolor: field.value
                                    ? alpha(theme.palette[section.color as PaletteColorKey].main, 0.1)
                                    : theme.palette.background.paper,
                                  color: theme.palette[section.color].main,
                                  transition: 'all 0.2s ease-in-out',
                                }}
                              >
                                {section.icon}
                              </Box>
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
                          marginLeft: '4px',
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