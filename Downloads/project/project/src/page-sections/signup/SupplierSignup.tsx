'use client';

import { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Container,
  Paper,
  Alert,
  Button,
} from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { PhoneVerification } from '../registration/steps/PhoneVerification';
import { EmailRegistration } from '../registration/steps/EmailRegistration';
import { useRouter } from 'next/navigation';

const steps = [
  'Phone Verification',
  'Account Setup',
];

export function SupplierSignup() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    password: '',
    name: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [verificationComplete, setVerificationComplete] = useState({
    phone: false,
    email: false,
  });
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const handleNext = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    
    // Mark verification steps as complete
    if (activeStep === 0) {
      setVerificationComplete(prev => ({ ...prev, phone: true }));
      setActiveStep(prev => prev + 1);
    } else if (activeStep === 1) {
      setVerificationComplete(prev => ({ ...prev, email: true }));
      
      // Only show success state if all verifications are complete
      if (verificationComplete.phone) {
        setRegistrationComplete(true);
      } else {
        setError('Please complete phone verification first');
      }
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
    setError(null);
  };

  const handleSignIn = () => {
    router.push('/login');
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <PhoneVerification onNext={handleNext} userType="supplier" />;
      case 1:
        return <EmailRegistration onNext={handleNext} onBack={handleBack} />;
      default:
        return 'Unknown step';
    }
  };

  if (registrationComplete) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper 
          sx={{ 
            p: { xs: 3, sm: 4 }, 
            borderRadius: 2,
            bgcolor: 'background.paper',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #4caf50, #81c784)',
            },
          }}
        >
          <Box 
            sx={{ 
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: 'success.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main' }} />
          </Box>

          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              color: 'success.main',
            }}
          >
            Successfully Registered!
          </Typography>

          <Typography 
            variant="subtitle1" 
            color="text.secondary" 
            sx={{ mb: 4 }}
          >
            Thank you for registering as a supplier. Please sign in to access your account and complete your profile.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSignIn}
            sx={{ 
              py: 1.5,
              px: 4,
              fontSize: '1.1rem',
              fontWeight: 600,
              minWidth: 200,
            }}
          >
            Sign In
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper 
        sx={{ 
          p: { xs: 2, sm: 4 }, 
          borderRadius: 2,
          bgcolor: 'background.paper',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #2196f3, #64b5f6)',
          },
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          align="center" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(45deg, #2196f3, #64b5f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Create Supplier Account
        </Typography>
        <Typography 
          variant="subtitle1" 
          align="center" 
          color="text.secondary" 
          sx={{ mb: 4 }}
        >
          Complete the following steps to set up your supplier account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Stepper 
          activeStep={activeStep} 
          sx={{ 
            mb: 4,
            '& .MuiStepLabel-root .Mui-completed': {
              color: 'success.main',
            },
            '& .MuiStepLabel-label.Mui-completed': {
              color: 'success.main',
            },
            '& .MuiStepLabel-root .Mui-active': {
              color: 'primary.main',
            },
            '& .MuiStepConnector-root': {
              '& .MuiStepConnector-line': {
                borderColor: 'divider',
              },
              '&.Mui-active, &.Mui-completed': {
                '& .MuiStepConnector-line': {
                  borderColor: 'success.main',
                },
              },
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box>{getStepContent(activeStep)}</Box>
      </Paper>
    </Container>
  );
}