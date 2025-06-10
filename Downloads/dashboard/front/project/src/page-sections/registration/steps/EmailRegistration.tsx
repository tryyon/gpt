import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Divider,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Link,
} from '@mui/material';
import { Google as GoogleIcon, Visibility, VisibilityOff } from '@mui/icons-material';

interface EmailRegistrationProps {
  onNext: (data: { email: string; password: string; name: string }) => void;
  onBack: () => void;
}

export function EmailRegistration({ onNext, onBack }: EmailRegistrationProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = async () => {
    if (!name) {
      setError('Please enter your full name');
      return;
    }

    if (!acceptTerms) {
      setError('Please accept the terms and conditions');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      onNext({ email, password, name });
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    if (!name) {
      setError('Please enter your full name');
      return;
    }

    if (!acceptTerms) {
      setError('Please accept the terms and conditions');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      onNext({ email: 'google-auth', password: '', name });
    } catch (err) {
      setError('Failed to sign up with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Create Your Account
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter your details to create your account
      </Typography>

      <TextField
        fullWidth
        label="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
        sx={{ mb: 2 }}
        required
        autoComplete="name"
        name="name"
        inputProps={{
          autoCapitalize: 'words'
        }}
        error={!name && error !== ''}
        helperText={!name && error !== '' ? 'Full name is required' : ''}
      />

      <TextField
        fullWidth
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        sx={{ mb: 2 }}
        required
        autoComplete="email"
        name="email"
      />

      <TextField
        fullWidth
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        sx={{ mb: 3 }}
        required
        autoComplete="new-password"
        name="new-password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={acceptTerms}
            onChange={(e) => {
              setAcceptTerms(e.target.checked);
              if (e.target.checked) {
                setError('');
              }
            }}
            color="primary"
          />
        }
        label={
          <Typography variant="body2">
            I agree to the{' '}
            <Link href="#" color="primary" onClick={(e) => e.preventDefault()}>
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="#" color="primary" onClick={(e) => e.preventDefault()}>
              Privacy Policy
            </Link>
          </Typography>
        }
        sx={{ mb: 2 }}
      />

      <Button
        fullWidth
        variant="contained"
        onClick={handleSubmit}
        disabled={!name || !email || !password || loading || !acceptTerms}
        sx={{ mb: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Continue'}
      </Button>

      <Divider sx={{ my: 2 }}>OR</Divider>

      <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        onClick={handleGoogleSignUp}
        disabled={loading || !name || !acceptTerms}
        sx={{ mb: 2 }}
      >
        Sign up with Google
      </Button>

      <Button
        fullWidth
        onClick={onBack}
        disabled={loading}
      >
        Back
      </Button>

      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}