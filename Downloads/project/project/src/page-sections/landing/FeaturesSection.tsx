'use client';

import { Box, Container, Typography, Grid, Card, CardContent, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  BarChart, 
  Settings, 
  TrendingUp,
  Inventory as Package,
  People as Users,
} from '@mui/icons-material';

const features = [
  {
    icon: <ShoppingCart />,
    title: 'Order Management',
    description: 'Streamline your order processing with our intuitive interface. Track, manage, and fulfill orders efficiently.',
  },
  {
    icon: <Package />,
    title: 'Inventory Control',
    description: 'Keep track of your inventory in real-time. Get alerts for low stock and manage product variants with ease.',
  },
  {
    icon: <Users />,
    title: 'Customer Management',
    description: 'Build stronger relationships with your customers. Access customer data and purchase history instantly.',
  },
  {
    icon: <BarChart />,
    title: 'Advanced Analytics',
    description: 'Make data-driven decisions with comprehensive analytics and customizable reports.',
  },
  {
    icon: <TrendingUp />,
    title: 'Sales Tracking',
    description: 'Monitor your sales performance with real-time dashboards and detailed metrics.',
  },
  {
    icon: <Settings />,
    title: 'Customizable Settings',
    description: 'Tailor the platform to your specific business needs with flexible configuration options.',
  },
];

const MotionCard = motion(Card);
const MotionTypography = motion(Typography);

export function FeaturesSection() {
  const theme = useTheme();

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: (index: number) => ({ 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }),
    hover: { 
      y: -8,
      scale: 1.02,
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: delay * 0.2,
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    })
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 10
      }
    },
    hover: { 
      rotate: 360,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Box 
      id="features"
      sx={{ 
        py: 10, 
        bgcolor: theme.palette.background.default,
        scrollMarginTop: '64px', // Add scroll margin to account for fixed header
      }}
    >
      <Container maxWidth="lg">
        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          sx={{ textAlign: 'center', mb: 8 }}
        >
          <MotionTypography 
            variant="h3" 
            custom={0}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              color: theme.palette.text.primary,
            }}
          >
            Powerful Features for Your Business
          </MotionTypography>
          <MotionTypography 
            variant="h6"
            custom={1}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            sx={{ 
              maxWidth: 700, 
              mx: 'auto',
              color: theme.palette.text.secondary,
            }}
          >
            Our comprehensive dashboard provides all the tools you need to manage your business efficiently.
          </MotionTypography>
        </Box>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <MotionCard 
                elevation={0}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                custom={index}
                sx={{ 
                  height: '100%',
                  borderRadius: 3,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box 
                    component={motion.div}
                    variants={iconVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true }}
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <MotionTypography 
                    variant="h5" 
                    custom={index + 2}
                    variants={textVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    gutterBottom 
                    sx={{ fontWeight: 600 }}
                  >
                    {feature.title}
                  </MotionTypography>
                  <MotionTypography 
                    variant="body1" 
                    color="text.secondary"
                    custom={index + 3}
                    variants={textVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {feature.description}
                  </MotionTypography>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}