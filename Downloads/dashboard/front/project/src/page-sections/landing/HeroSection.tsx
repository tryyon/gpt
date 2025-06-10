'use client';

import { Box, Container, Grid, Typography, Button, Stack, useTheme } from '@mui/material';
import { PlayArrow as PlayIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { keyframes } from '@mui/material';

// Define animations
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.1); opacity: 0.7; }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)' 
          : 'linear-gradient(135deg, #2196f3 0%, #1565c0 100%)',
        pt: { xs: '96px', sm: '96px' },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=2000&h=1000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 150%, rgba(33, 150, 243, 0.4) 0%, rgba(33, 150, 243, 0) 50%)',
        }
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          animation: `${float} 6s ease-in-out infinite`,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          right: '10%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          animation: `${pulse} 4s ease-in-out infinite`,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '15%',
          width: '60px',
          height: '60px',
          background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
          animation: `${rotate} 10s linear infinite`,
          transform: 'rotate(45deg)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '20%',
          width: '40px',
          height: '40px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          animation: `${float} 5s ease-in-out infinite`,
          animationDelay: '-2s',
        }}
      />
      {/* Small particles */}
      {[...Array(6)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `${pulse} ${3 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `-${Math.random() * 2}s`,
          }}
        />
      ))}

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              color: '#fff',
              textAlign: { xs: 'center', md: 'left' },
            }}>
              <Typography 
                variant="h1" 
                component="h1" 
                sx={{ 
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
                  fontWeight: 800,
                  lineHeight: 1.2,
                  mb: 3,
                  background: 'linear-gradient(to right, #fff, #e3f2fd)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                }}
              >
                Transform Your Business with Our ecommerce solutions
              </Typography>
              
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4,
                  fontWeight: 400,
                  opacity: 0.9,
                  lineHeight: 1.6,
                  maxWidth: { xs: '100%', md: '80%' },
                  mx: { xs: 'auto', md: 0 }
                }}
              >
                Streamline operations, boost productivity, and make data-driven decisions with our comprehensive management solution.
              </Typography>

              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
              >
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={onGetStarted}
                  sx={{ 
                    bgcolor: 'white', 
                    color: 'primary.main',
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Get Started Now
                </Button>
                
                <Button 
                  variant="outlined" 
                  size="large"
                  startIcon={<PlayIcon />}
                  sx={{ 
                    borderColor: 'rgba(255,255,255,0.5)', 
                    color: 'white',
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    backdropFilter: 'blur(4px)',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Watch Demo
                </Button>
              </Stack>

              <Box sx={{ 
                mt: 6, 
                pt: 4, 
                borderTop: '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 4,
                justifyContent: { xs: 'center', md: 'flex-start' }
              }}>
                <Box>
                  <Typography variant="h3" fontWeight="bold" color="white">
                    50K+
                  </Typography>
                  <Typography variant="body1" color="rgba(255,255,255,0.8)">
                    Active Users
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h3" fontWeight="bold" color="white">
                    95%
                  </Typography>
                  <Typography variant="body1" color="rgba(255,255,255,0.8)">
                    Satisfaction Rate
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h3" fontWeight="bold" color="white">
                    24/7
                  </Typography>
                  <Typography variant="body1" color="rgba(255,255,255,0.8)">
                    Support
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box 
              sx={{ 
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -40,
                  left: -40,
                  right: 40,
                  bottom: 40,
                  border: '2px solid rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  animation: `${float} 6s ease-in-out infinite`,
                },
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2000"
                alt="Dashboard Preview"
                sx={{
                  width: '100%',
                  borderRadius: 4,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'perspective(1000px) rotateY(-2deg) rotateX(2deg) translateY(-5px)',
                  }
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}