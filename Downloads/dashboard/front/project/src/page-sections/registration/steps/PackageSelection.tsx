import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  useTheme,
} from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';

interface Package {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  recommended?: boolean;
  description: string;
}

const packages: Package[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 29,
    period: '/month',
    description: 'Perfect for small businesses just getting started',
    features: [
      'Up to 100 products',
      'Basic analytics',
      'Email support',
      '2 team members',
    ],
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 79,
    period: '/month',
    description: 'Ideal for growing businesses with expanding needs',
    features: [
      'Up to 1000 products',
      'Advanced analytics',
      'Priority support',
      '5 team members',
      'API access',
    ],
    recommended: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    period: '/month',
    description: 'For large businesses with complex requirements',
    features: [
      'Unlimited products',
      'Custom analytics',
      '24/7 support',
      'Unlimited team members',
      'API access',
      'Custom integrations',
    ],
  },
];

interface PackageSelectionProps {
  onNext: (data: { selectedPackage: string }) => void;
  onBack: () => void;
}

export function PackageSelection({ onNext, onBack }: PackageSelectionProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const theme = useTheme();

  const handleContinue = () => {
    if (selectedPackage) {
      onNext({ selectedPackage });
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Choose Your Package
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Select the plan that best fits your business needs
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {packages.map((pkg) => (
          <Grid item xs={12} md={4} key={pkg.id}>
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                cursor: 'pointer',
                position: 'relative',
                transform: pkg.recommended ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  borderColor: 'primary.main',
                  transform: pkg.recommended ? 'scale(1.08)' : 'scale(1.03)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
                },
                border: selectedPackage === pkg.id || pkg.recommended ? '2px solid' : '1px solid',
                borderColor: selectedPackage === pkg.id 
                  ? 'primary.main' 
                  : pkg.recommended 
                    ? 'primary.main' 
                    : 'divider',
                bgcolor: selectedPackage === pkg.id ? 'action.selected' : 'background.paper',
                overflow: 'visible',
              }}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              {pkg.recommended && (
                <Chip
                  label="Recommended"
                  color="primary"
                  sx={{
                    position: 'absolute',
                    top: -12,
                    right: 20,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontSize: '0.75rem',
                  }}
                />
              )}
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    {pkg.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ minHeight: 48 }}>
                    {pkg.description}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 3 }}>
                  <Typography variant="h3" component="span" sx={{ fontWeight: 700 }}>
                    ${pkg.price}
                  </Typography>
                  <Typography variant="subtitle1" component="span" color="text.secondary" sx={{ ml: 1 }}>
                    {pkg.period}
                  </Typography>
                </Box>

                <List disablePadding>
                  {pkg.features.map((feature, index) => (
                    <ListItem 
                      key={index} 
                      disablePadding 
                      sx={{ 
                        py: 0.5,
                        px: 0,
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={feature}
                        primaryTypographyProps={{
                          variant: 'body2',
                          color: 'text.secondary',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>

                <Button
                  fullWidth
                  variant={selectedPackage === pkg.id ? "contained" : "outlined"}
                  sx={{ 
                    mt: 3,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  {selectedPackage === pkg.id ? 'Selected' : 'Select Plan'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          onClick={onBack}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleContinue}
          disabled={!selectedPackage}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}