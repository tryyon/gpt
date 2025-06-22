'use client';

import { Box, Container, Typography, Grid, Card, CardContent, Avatar, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'E-commerce Manager',
    company: 'Fashion Trends Inc.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content: 'This dashboard has transformed how we manage our online store. The intuitive interface and powerful features have increased our efficiency by 40%.',
  },
  {
    name: 'Michael Chen',
    role: 'Operations Director',
    company: 'Tech Solutions Ltd.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content: 'The analytics capabilities are outstanding. We can now make data-driven decisions that have significantly improved our inventory management and sales strategies.',
  },
  {
    name: 'Priya Sharma',
    role: 'Supply Chain Manager',
    company: 'Global Distributors',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654cc6?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    content: 'As a supplier, this platform has streamlined our entire process. The integration capabilities and real-time updates have made collaboration with retailers seamless.',
  },
];

const MotionCard = motion(Card);
const MotionTypography = motion(Typography);

export function TestimonialsSection() {
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

  return (
    <Box 
      id="testimonials"
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
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              color: theme.palette.mode === 'dark' ? 'white' : theme.palette.text.primary,
            }}
          >
            What Our Users Say
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              maxWidth: 700, 
              mx: 'auto',
              color: theme.palette.text.secondary,
            }}
          >
            Hear from businesses that have transformed their operations with our platform.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
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
                  position: 'relative',
                  overflow: 'visible',
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography 
                    variant="body1" 
                    paragraph
                    sx={{ 
                      fontStyle: 'italic',
                      mb: 3,
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {testimonial.content}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      sx={{ width: 50, height: 50 }}
                    />
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}, {testimonial.company}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}