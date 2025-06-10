'use client';

import { useState } from 'react';
import { 
  Box, 
  Typography, 
  FormControlLabel, 
  Checkbox, 
  Paper,
  Link,
  Alert,
} from '@mui/material';

const STORAGE_KEY = 'supplier_registration_data';

export default function TermsPage() {
  const [accepted, setAccepted] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        return parsedData.formData?.termsAccepted || false;
      }
    }
    return false;
  });

  const handleAcceptTerms = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isAccepted = event.target.checked;
    setAccepted(isAccepted);
    
    // Save to localStorage
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...parsedData,
        formData: {
          ...parsedData.formData,
          termsAccepted: isAccepted
        }
      }));
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Terms and Conditions
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        Please read and accept our terms and conditions to complete your registration
      </Alert>

      <Paper 
        variant="outlined" 
        sx={{ 
          p: 3, 
          mb: 3, 
          maxHeight: 400, 
          overflow: 'auto' 
        }}
      >
        <Typography variant="h6" gutterBottom>
          Supplier Agreement
        </Typography>
        
        <Typography paragraph>
          This Supplier Agreement ("Agreement") is entered into between the Platform ("we," "us," or "our") and the Supplier ("you" or "your").
        </Typography>

        <Typography variant="h6" gutterBottom>
          1. Registration and Account
        </Typography>
        <Typography paragraph>
          1.1. You must provide accurate and complete information during registration.
          <br />
          1.2. You are responsible for maintaining the confidentiality of your account.
          <br />
          1.3. You must notify us immediately of any unauthorized use of your account.
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. Products and Services
        </Typography>
        <Typography paragraph>
          2.1. You agree to provide accurate product information and pricing.
          <br />
          2.2. You are responsible for maintaining inventory accuracy.
          <br />
          2.3. You must comply with all applicable laws and regulations.
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. Payments and Fees
        </Typography>
        <Typography paragraph>
          3.1. You agree to our commission structure and payment terms.
          <br />
          3.2. Payments will be processed according to the agreed schedule.
          <br />
          3.3. All applicable taxes are your responsibility.
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. Termination
        </Typography>
        <Typography paragraph>
          4.1. Either party may terminate this agreement with written notice.
          <br />
          4.2. We reserve the right to suspend or terminate accounts that violate our policies.
        </Typography>
      </Paper>

      <FormControlLabel
        control={
          <Checkbox 
            checked={accepted}
            onChange={handleAcceptTerms}
            color="primary"
          />
        }
        label={
          <Typography>
            I have read and agree to the{' '}
            <Link href="/terms" target="_blank">
              Terms and Conditions
            </Link>
            {' '}and{' '}
            <Link href="/privacy" target="_blank">
              Privacy Policy
            </Link>
          </Typography>
        }
      />
    </Box>
  );
}