'use client';

import { Box, Container, Typography, Grid, Card, CardContent, Button, Divider, useTheme, alpha } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { LandingHeader } from '@/global-components/layout/LandingHeader';
import { useRouter } from 'next/navigation';

const pricingPlans = [
  {
    title: 'Basic',
    price: '$29',
    period: 'per month',
    description: 'Perfect for small businesses just getting started',
    features: [
      'Up to 100 products',
      'Basic analytics',
      'Email support',
      '2 team members',
      'Basic inventory management',
      'Standard shipping options',
      'Basic customer management',
      'Simple reporting',
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
      'Up to 1000 products',
      'Advanced analytics',
      'Priority support',
      '5 team members',
      'Advanced inventory tracking',
      'Multiple shipping carriers',
      'Customer segmentation',
      'Advanced reporting',
      'API access',
      'Custom branding',
      'Multi-currency support',
      'Bulk import/export',
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
      'Unlimited products',
      'Custom analytics',
      '24/7 support',
      'Unlimited team members',
      'Advanced inventory management',
      'Custom shipping rules',
      'Advanced customer insights',
      'Custom reporting',
      'Advanced API access',
      'White-label options',
      'Multi-store management',
      'Priority feature requests',
      'Dedicated account manager',
      'Custom integrations',
      'SLA guarantees',
    ],
    buttonText: 'Contact Sales',
    highlighted: false,
  },
];

const features = [
  {
    title: 'Product Management',
    items: [
      'Product catalog management',
      'Inventory tracking',
      'Variant management',
      'Bulk product updates',
      'Product categories',
      'Product attributes',
      'Digital products support',
      'Product reviews & ratings',
    ]
  },
  {
    title: 'Order Management',
    items: [
      'Order processing',
      'Order tracking',
      'Automated fulfillment',
      'Return management',
      'Shipping integration',
      'Order notifications',
      'Invoice generation',
      'Order history',
    ]
  },
  {
    title: 'Customer Management',
    items: [
      'Customer profiles',
      'Customer groups',
      'Customer support',
      'Loyalty programs',
      'Customer analytics',
      'Communication history',
      'Custom fields',
      'Customer segmentation',
    ]
  },
  {
    title: 'Marketing Tools',
    items: [
      'Discount management',
      'Coupon codes',
      'Email marketing',
      'Social media integration',
      'SEO tools',
      'Abandoned cart recovery',
      'Product recommendations',
      'Marketing analytics',
    ]
  },
];

export function PricingPage() {
  const theme = useTheme();
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/register');
  };

  return (
    <>
      <LandingHeader onGetStarted={handleGetStarted} />
      <Box 
        sx={{ 
          pt: { xs: 8, sm: 12 },
          pb: { xs: 8, sm: 12 },
          bgcolor: theme.palette.mode === 'dark' ? 'background.default' : '#F8FAFC',
        }}
      >
        <Container maxWidth="lg">
          {/* Hero Section */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                fontWeight: 700,
                mb: 2,
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)'
                  : 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Simple, Transparent Pricing
            </Typography>
            <Typography 
              variant="h5" 
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              Choose the plan that works best for your business needs
            </Typography>
          </Box>

          {/* Pricing Plans */}
          <Grid container spacing={4} sx={{ mb: 12 }}>
            {pricingPlans.map((plan, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  elevation={plan.highlighted ? 8 : 0}
                  sx={{ 
                    height: '100%',
                    borderRadius: 3,
                    position: 'relative',
                    transform: plan.highlighted ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.3s ease-in-out',
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
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h4" component="h2" gutterBottom>
                        {plan.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ minHeight: 48 }}>
                        {plan.description}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 3 }}>
                      <Typography variant="h3" component="span" sx={{ fontWeight: 700 }}>
                        {plan.price}
                      </Typography>
                      <Typography variant="subtitle1" component="span" color="text.secondary" sx={{ ml: 1 }}>
                        {plan.period}
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box sx={{ mb: 3 }}>
                      {plan.features.map((feature, idx) => (
                        <Box 
                          key={idx} 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            mb: 1.5 
                          }}
                        >
                          <CheckCircle sx={{ color: 'success.main', mr: 1, fontSize: 20 }} />
                          <Typography variant="body2">{feature}</Typography>
                        </Box>
                      ))}
                    </Box>

                    <Button 
                      variant={plan.highlighted ? "contained" : "outlined"}
                      fullWidth
                      size="large"
                      onClick={handleGetStarted}
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

          {/* Features Grid */}
          <Box sx={{ mb: 8 }}>
            <Typography 
              variant="h3" 
              component="h2" 
              align="center" 
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Everything you need to succeed
            </Typography>
            <Typography 
              variant="h6" 
              align="center" 
              color="text.secondary" 
              sx={{ mb: 8 }}
            >
              Comprehensive features to help you grow your business
            </Typography>

            <Grid container spacing={4}>
              {features.map((category, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      p: 3,
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                      }
                    }}
                  >
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                      {category.title}
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 1 }}>
                      {category.items.map((item, idx) => (
                        <Box 
                          key={idx} 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            gap: 1,
                          }}
                        >
                          <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
                          <Typography variant="body2">{item}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* CTA Section */}
          <Box 
            sx={{ 
              textAlign: 'center',
              p: 6,
              borderRadius: 4,
              bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.primary.main, 0.05),
              border: '1px solid',
              borderColor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.2) : alpha(theme.palette.primary.main, 0.1),
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              Ready to get started?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Join thousands of businesses already using our platform
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleGetStarted}
              sx={{ 
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
              }}
            >
              Start Your Free Trial
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}