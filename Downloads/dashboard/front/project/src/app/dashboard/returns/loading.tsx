'use client';

import { Box, Skeleton, Paper } from '@mui/material';

export default function ReturnsLoading() {
  return (
    <Box sx={{ p: 3 }}>
      <Skeleton variant="text" sx={{ fontSize: '2rem', width: 200, mb: 3 }} />
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Skeleton variant="rectangular" height={400} />
      </Paper>
    </Box>
  );
}