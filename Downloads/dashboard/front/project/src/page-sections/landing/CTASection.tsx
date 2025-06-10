'use client';

import { Box, Container, Typography, Stack, Button, useTheme, alpha } from '@mui/material';
import { useRouter } from 'next/navigation';

interface CTASectionProps {
  onGetStarted: () => void;
}

export function CTASection({ onGetStarted }: CTASectionProps) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Box 
      sx={{ 
        py: 10, 
        bgcolor: theme.palette.mode === 'dark' 
          ? 'background.paper' 
          : 'primary.main',
        color: theme.palette.mode === 'dark' ? 'text.primary' : 'white',
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              fontWeight: 700, 
              mb: 3,
            }}
          >
            Ready to Transform Your Business?
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 4,
              opacity: 0.9,
              maxWidth: 700,
              mx: 'auto',
            }}
          >
            Join thousands of businesses that are already using our platform to streamline their operations and boost their growth.
          </Typography>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2}
            justifyContent="center"
          >
            <Button 
              variant="contained" 
              size="large"
              onClick={onGetStarted}
              sx={{ 
                bgcolor: theme.palette.mode === 'dark' ? 'primary.main' : 'white', 
                color: theme.palette.mode === 'dark' ? 'white' : 'primary.main',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : 'rgba(255, 255, 255, 0.9)',
                }
              }}
            >
              Get Started Now
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              onClick={() => router.push('/dashboard')}
              sx={{ 
                borderColor: theme.palette.mode === 'dark' ? 'primary.main' : 'white', 
                color: theme.palette.mode === 'dark' ? 'primary.main' : 'white',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                '&:hover': {
                  borderColor: theme.palette.mode === 'dark' ? 'primary.main' : 'white',
                  bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.1) : 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              Explore Dashboard
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}