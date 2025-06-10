'use client';

import { Box, Skeleton } from '@mui/material';

export default function ProductsLoading() {
  return (
    <Box sx={{ p: 3 }}>
      <Skeleton variant="rectangular" height={400} />
    </Box>
  );
}