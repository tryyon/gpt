'use client';

import { Box, Container, Typography, Grid, Stack, useTheme } from '@mui/material';

export function FooterSection() {
  const theme = useTheme();

  return (
    <Box sx={{ py: 6, bgcolor: theme.palette.background.paper }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Admin Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Powerful admin dashboard for managing your e-commerce store.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Your Company Name. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Product
            </Typography>
            <Stack spacing={1}>
              {['Features', 'Pricing', 'Testimonials', 'FAQ'].map((item) => (
                <Typography key={item} variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                  {item}
                </Typography>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Company
            </Typography>
            <Stack spacing={1}>
              {['About Us', 'Careers', 'Blog', 'Contact'].map((item) => (
                <Typography key={item} variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                  {item}
                </Typography>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Legal
            </Typography>
            <Stack spacing={1}>
              {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'GDPR'].map((item) => (
                <Typography key={item} variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                  {item}
                </Typography>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Support
            </Typography>
            <Stack spacing={1}>
              {['Help Center', 'Documentation', 'Status', 'Contact Support'].map((item) => (
                <Typography key={item} variant="body2" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                  {item}
                </Typography>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}