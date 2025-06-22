'use client';

import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

interface PhoneVerificationProps {
  onNext: (data: { phone: string }) => void;
  userType?: 'tenant' | 'supplier';
}

// Country codes data
const countryCodes = [
  { code: '+1', country: 'USA' },
  { code: '+44', country: 'UK' },
  { code: '+91', country: 'India' },
  { code: '+61', country: 'Australia' },
  { code: '+86', country: 'China' },
  { code: '+81', country: 'Japan' },
  { code: '+49', country: 'Germany' },
  { code: '+33', country: 'France' },
  { code: '+39', country: 'Italy' },
  { code: '+7', country: 'Russia' },
];

export function PhoneVerification({ onNext, userType = 'tenant' }: PhoneVerificationProps) {
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState(userType === 'supplier' ? '+91' : '+1');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);

  const startTimer = () => {
    setTimer(90);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSendOtp = async () => {
    if (!phone) {
      setError('Please enter a phone number');
      return;
    }

    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setOtpSent(true);
      startTimer();
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }

    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      onNext({ phone: `${countryCode}${phone}` });
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError('');
    setOtp('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      startTimer();
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Verify Your Phone Number
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter your phone number to receive a verification code
      </Typography>

      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        {userType === 'supplier' ? (
          <TextField
            disabled
            value="+91"
            sx={{ width: '100px' }}
            size="small"
          />
        ) : (
          <FormControl sx={{ width: '150px' }}>
            <InputLabel id="country-code-label">Code</InputLabel>
            <Select
              labelId="country-code-label"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              size="small"
              label="Code"
              disabled={otpSent || loading}
            >
              {countryCodes.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {`${country.code} ${country.country}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <TextField
          fullWidth
          type="tel"
          label="Phone Number"
          value={phone}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            if (value.length <= 10) {
              setPhone(value);
            }
          }}
          disabled={otpSent || loading}
          size="small"
          autoComplete="tel-national"
          placeholder="Enter 10-digit number"
        />
      </Box>

      {!otpSent ? (
        <Button
          fullWidth
          variant="contained"
          onClick={handleSendOtp}
          disabled={!phone || loading || phone.length !== 10}
          sx={{
            py: 1.5,
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          {loading ? <CircularProgress size={24} /> : 'Send OTP'}
        </Button>
      ) : (
        <>
          <TextField
            fullWidth
            label="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              if (value.length <= 6) {
                setOtp(value);
              }
            }}
            disabled={loading}
            sx={{ mb: 2 }}
            placeholder="Enter 6-digit OTP"
            inputProps={{
              maxLength: 6,
              pattern: '[0-9]*',
              inputMode: 'numeric',
            }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleVerifyOtp}
            disabled={!otp || loading || otp.length !== 6}
            sx={{
              py: 1.5,
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            {loading ? <CircularProgress size={24} /> : 'Verify OTP'}
          </Button>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            {timer > 0 ? (
              <Typography variant="body2" color="text.secondary">
                Resend OTP in {formatTime(timer)}
              </Typography>
            ) : (
              <Button
                variant="text"
                onClick={handleResendOtp}
                disabled={loading}
                sx={{ textTransform: 'none' }}
              >
                Didn't receive OTP? Resend
              </Button>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}