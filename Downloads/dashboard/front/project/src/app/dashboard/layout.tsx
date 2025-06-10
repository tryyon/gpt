import { Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F1F4F7', overflow: 'hidden' }}>
      <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>}>
        {children}
      </Suspense>
    </Box>
  );
}