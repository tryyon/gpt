import { Box, Container, Typography, Grid, Card, CardContent, Button, Divider, useTheme, alpha } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

const pricingPlans = [
  {
    title: 'Starter',
    price: '$29',
    period: 'per month',
    description: 'Perfect for small businesses just getting started',
    features: [
      'Basic order management',
      'Inventory tracking',
      'Customer database',
      'Standard reports',
      'Email support',
    ],
    buttonText: 'Get Started',
    highlighted: false,
  },
  {
    title: 'Professional',
    price: '$79',
    period: 'per month',
    description: 'Ideal for growing businesses with expanding needs',
    features: [
      'Advanced order management',
      'Real-time inventory control',
      'Customer segmentation',
      'Custom analytics',
      'Priority support',
      'API access',
      'Multiple user accounts',
    ],
    buttonText: 'Try Professional',
    highlighted: true,
  },
  {
    title: 'Enterprise',
    price: '$199',
    period: 'per month',
    description: 'For large businesses with complex requirements',
    features: [
      'Enterprise-grade security',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced API access',
      'Unlimited users',
      'White-label options',
      '24/7 premium support',
    ],
    buttonText: 'Contact Sales',
    highlighted: false,
  },
];

interface PricingSectionProps {
  onPlanSelect: () => void;
}

export function PricingSection({ onPlanSelect }: PricingSectionProps) {
  const theme = useTheme();

  return (
    <Box 
      id="pricing"
      sx={{ 
        py: 10, 
        bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.05) : '#f5f9ff',
        scrollMarginTop: '64px', // Add scroll margin to account for fixed header
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              color: theme.palette.text.primary,
            }}
          >
            Simple, Transparent Pricing
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              maxWidth: 700, 
              mx: 'auto',
              color: theme.palette.text.secondary,
            }}
          >
            Choose the plan that works best for your business needs.
          </Typography>
        </Box>
        
        <Grid container spacing={4} justifyContent="center">
          {pricingPlans.map((plan, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                elevation={plan.highlighted ? 8 : 0}
                sx={{ 
                  height: '100%',
                  borderRadius: 3,
                  position: 'relative',
                  overflow: 'visible',
                  transform: plan.highlighted ? 'scale(1.05)' : 'scale(1)',
                  zIndex: plan.highlighted ? 2 : 1,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: plan.highlighted ? 'scale(1.08)' : 'scale(1.03)',
                    boxShadow: plan.highlighted ? theme.shadows[12] : theme.shadows[4],
                  },
                  border: plan.highlighted ? `2px solid ${theme.palette.primary.main}` : undefined,
                }}
              >
                {plan.highlighted && (
                  <Box 
                    sx={{ 
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      bgcolor: theme.palette.primary.main,
                      color: 'white',
                      py: 0.5,
                      px: 2,
                      borderRadius: 5,
                      fontWeight: 'bold',
                      fontSize: '0.875rem',
                    }}
                  >
                    Most Popular
                  </Box>
                )}
                <CardContent sx={{ p: 4 }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 1,
                      color: plan.highlighted ? theme.palette.primary.main : undefined,
                    }}
                  >
                    {plan.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                    <Typography 
                      variant="h3" 
                      component="span" 
                      sx={{ 
                        fontWeight: 700,
                        color: plan.highlighted ? theme.palette.primary.main : undefined,
                      }}
                    >
                      {plan.price}
                    </Typography>
                    <Typography 
                      variant="subtitle1" 
                      component="span" 
                      sx={{ 
                        ml: 1,
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {plan.period}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 3,
                      color: theme.palette.text.secondary,
                      minHeight: 40,
                    }}
                  >
                    {plan.description}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ mb: 3 }}>
                    {plan.features.map((feature, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CheckCircle sx={{ color: 'success.main', mr: 1, fontSize: 20 }} />
                        <Typography variant="body2">{feature}</Typography>
                      </Box>
                    ))}
                  </Box>
                  <Button 
                    variant={plan.highlighted ? "contained" : "outlined"} 
                    fullWidth
                    size="large"
                    onClick={onPlanSelect}
                    sx={{ 
                      mt: 2,
                      py: 1.5,
                    }}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}