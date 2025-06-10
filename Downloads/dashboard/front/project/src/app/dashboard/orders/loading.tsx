'use client';

import { Box, Skeleton } from '@mui/material';

export default function OrdersLoading() {
  return (
    <Box sx={{ p: 3 }}>
      <Skeleton variant="text" sx={{ fontSize: '2rem', width: 200, mb: 3 }} />
      <Skeleton variant="rectangular" height={400} />
    </Box>
  );
}