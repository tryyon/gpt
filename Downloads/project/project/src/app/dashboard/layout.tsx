import { Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { DashboardLayout as MainDashboardLayout } from '@/global-components/layout/DashboardLayout';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainDashboardLayout>
      <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>}>
        {children}
      </Suspense>
    </MainDashboardLayout>
  );
}