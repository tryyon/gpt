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
} from '@mui/material';
import { PhoneVerification } from '../registration/steps/PhoneVerification';
import { EmailRegistration } from '../registration/steps/EmailRegistration';
import { PackageSelection } from '../registration/steps/PackageSelection';
import { Payment } from '../registration/steps/Payment';

const steps = [
  'Phone Verification',
  'Account Setup',
  'Package Selection',
  'Payment',
];

export function TenantSignup() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    password: '',
    name: '',
    selectedPackage: null,
    paymentMethod: '',
  });

  const handleNext = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <PhoneVerification onNext={handleNext} />;
      case 1:
        return <EmailRegistration onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <PackageSelection onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <Payment onNext={handleNext} onBack={handleBack} />;
      default:
        return 'Unknown step';
    }
  };

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
          Create Your Account
        </Typography>
        <Typography 
          variant="subtitle1" 
          align="center" 
          color="text.secondary" 
          sx={{ mb: 4 }}
        >
          Complete the following steps to set up your tenant account
        </Typography>

        <Stepper 
          activeStep={activeStep} 
          sx={{ 
            mb: 4,
            '& .MuiStepLabel-root .Mui-completed': {
              color: 'success.main', // Change completed steps to green
            },
            '& .MuiStepLabel-label.Mui-completed': {
              color: 'success.main', // Change completed step labels to green
            },
            '& .MuiStepLabel-root .Mui-active': {
              color: 'primary.main', // Keep active step blue
            },
            '& .MuiStepConnector-root': {
              '& .MuiStepConnector-line': {
                borderColor: 'divider',
              },
              '&.Mui-active, &.Mui-completed': {
                '& .MuiStepConnector-line': {
                  borderColor: 'success.main', // Change completed connectors to green
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

        {activeStep === steps.length ? (
          <Box 
            sx={{ 
              textAlign: 'center',
              p: 4,
              bgcolor: 'rgba(33, 150, 243, 0.04)',
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" gutterBottom color="success.main">
              Registration Complete!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              You will be redirected to your dashboard shortly...
            </Typography>
          </Box>
        ) : (
          <Box>{getStepContent(activeStep)}</Box>
        )}
      </Paper>
    </Container>
  );
}