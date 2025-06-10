'use client';

import { Box, Container } from '@mui/material';
import { LandingHeader } from '@/global-components/layout/LandingHeader';
import {useRouter} from 'next/navigation';
import { keyframes } from '@mui/system';

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

export function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/signup');
  };

  return (
    <>
      <LandingHeader onGetStarted={handleGetStarted} />
      <Box 
        sx={{ 
          minHeight: '100vh',
          position: 'relative',
          py: { xs: 12, sm: 12 },
          background: theme => theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)'
            : 'linear-gradient(135deg, #2196f3 0%, #1565c0 100%)',
          overflow: 'hidden', // Important for animations
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

        <Container 
          maxWidth="lg"
          sx={{ 
            position: 'relative',
            zIndex: 1,
          }}
        >
          {children}
        </Container>
      </Box>
    </>
  );
}