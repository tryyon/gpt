'use client';

import { Box, Skeleton, Paper } from '@mui/material';

export default function CreateProductLoading() {
  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Skeleton variant="text" sx={{ fontSize: '2rem', width: 200 }} />
        <Skeleton variant="rectangular" height={56} />
        <Skeleton variant="rectangular" height={56} />
        <Skeleton variant="rectangular" height={56} />
        <Skeleton variant="rectangular" height={120} />
      </Box>
    </Paper>
  );
}