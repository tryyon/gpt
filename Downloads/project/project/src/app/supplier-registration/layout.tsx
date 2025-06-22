'use client';

import { Box, Container, Stepper, Step, StepLabel, Typography, Paper, Button } from '@mui/material';
import { LandingHeader } from '@/global-components/layout/LandingHeader';
import { useRouter, usePathname } from 'next/navigation';
import { ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { useState, useEffect } from 'react';

const steps = [
  { label: 'General Details', path: '/supplier-registration' },
  { label: 'Organization Details', path: '/supplier-registration/organization' },
  { label: 'Bank Details', path: '/supplier-registration/bank' },
  { label: 'Brand Details', path: '/supplier-registration/brands' },
  { label: 'Warehouse Details', path: '/supplier-registration/warehouse' },
  { label: 'Terms & Conditions', path: '/supplier-registration/terms' },
];

const STORAGE_KEY = 'supplier_registration_data';

interface FormData {
  generalDetails?: any;
  organizationDetails?: any;
  bankDetails?: any;
  brandDetails?: any;
  warehouseDetails?: any;
  termsAccepted?: boolean;
}

export default function SupplierRegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [completedSteps, setCompletedSteps] = useState<{[key: string]: boolean}>({});
  const [formData, setFormData] = useState<FormData>({});

  const activeStep = steps.findIndex(step => step.path === pathname);

  // Load saved form data on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData.formData || {});
        setCompletedSteps(parsedData.completedSteps || {});
      }
    }
  }, []);

  // Save form data when it changes
  useEffect(() => {
    if (Object.keys(formData).length > 0 || Object.keys(completedSteps).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        formData,
        completedSteps,
      }));
    }
  }, [formData, completedSteps]);

  const handleGetStarted = () => {
    router.push('/signup');
  };

  const updateFormData = (step: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [step]: data
    }));
    setCompletedSteps(prev => ({
      ...prev,
      [pathname]: true
    }));
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      router.push(steps[activeStep + 1].path);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      router.push(steps[activeStep - 1].path);
    }
  };

  const handleSubmit = () => {
    // Check if terms are accepted before submitting
    if (!formData.termsAccepted) {
      alert('Please accept the terms and conditions before submitting');
      return;
    }

    // Submit all collected data
    const allData = {
      ...formData,
      submittedAt: new Date().toISOString()
    };
    
    // Clear saved data after successful submission
    localStorage.removeItem(STORAGE_KEY);
    
    // Redirect to success page
    router.push('/signup/supplier');
  };

  const isStepComplete = (stepPath: string) => {
    if (stepPath === '/supplier-registration/terms') {
      return formData.termsAccepted || false;
    }
    return completedSteps[stepPath] || false;
  };

  return (
    <>
      <LandingHeader onGetStarted={handleGetStarted} />
      <Box 
        sx={{ 
          minHeight: '100vh',
          py: { xs: 12, sm: 12 },
          bgcolor: theme => theme.palette.mode === 'dark' ? 'background.default' : '#F1F4F7',
        }}
      >
        <Container maxWidth="lg">
          <Paper 
            sx={{ 
              p: { xs: 2, sm: 4 }, 
              mb: 4,
              borderRadius: 2,
              bgcolor: 'background.paper',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            }}
          >
            <Typography 
              variant="h4" 
              component="h1" 
              align="center" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                mb: 1,
              }}
            >
              Complete Your Profile
            </Typography>
            <Typography 
              variant="subtitle1" 
              align="center" 
              color="text.secondary" 
              sx={{ mb: 4 }}
            >
              Please complete all sections to activate your supplier account
            </Typography>

            <Stepper 
              activeStep={Math.max(0, activeStep)}
              alternativeLabel
              sx={{ 
                mb: 4,
                '& .MuiStepLabel-root .Mui-completed': {
                  color: isStepComplete(steps[activeStep]?.path) ? 'success.main' : 'primary.main',
                },
                '& .MuiStepLabel-label.Mui-completed': {
                  color: isStepComplete(steps[activeStep]?.path) ? 'success.main' : 'text.primary',
                },
                '& .MuiStepLabel-root .Mui-active': {
                  color: isStepComplete(steps[activeStep]?.path) ? 'success.main' : 'primary.main',
                },
                '& .MuiStepConnector-root': {
                  '& .MuiStepConnector-line': {
                    borderColor: theme => theme.palette.divider,
                  },
                  '&.Mui-active, &.Mui-completed': {
                    '& .MuiStepConnector-line': {
                      borderColor: theme => isStepComplete(steps[activeStep]?.path) ? theme.palette.success.main : theme.palette.primary.main,
                    },
                  },
                },
              }}
            >
              {steps.map((step, index) => (
                <Step 
                  key={step.label}
                  completed={isStepComplete(step.path)}
                >
                  <StepLabel 
                    StepIconProps={{
                      sx: {
                        '&.Mui-completed': {
                          color: isStepComplete(step.path) ? 'success.main' : 'primary.main',
                        },
                      }
                    }}
                  >
                    {step.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>

          <Paper
            sx={{ 
              p: { xs: 2, sm: 4 }, 
              borderRadius: 2,
              bgcolor: 'background.paper',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            }}
          >
            {children}

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              mt: 4,
              pt: 3,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                startIcon={<ArrowBackIcon />}
              >
                Back
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  endIcon={<ArrowForwardIcon />}
                  color={isStepComplete(steps[activeStep].path) ? 'success' : 'primary'}
                >
                  Submit Registration
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={<ArrowForwardIcon />}
                  color={isStepComplete(steps[activeStep].path) ? 'success' : 'primary'}
                >
                  Continue
                </Button>
              )}
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}