'use client';

import Link from 'next/link';
import { Box, Button, Typography } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        gap: 2,
        p: 3,
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button
        component={Link}
        href="/dashboard"
        variant="contained"
        startIcon={<HomeIcon />}
      >
        Back to Dashboard
      </Button>
    </Box>
  );
}