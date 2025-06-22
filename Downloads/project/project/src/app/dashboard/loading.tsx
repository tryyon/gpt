'use client';

import { Box, Skeleton } from '@mui/material';

export default function DashboardLoading() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Stats Loading */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 3 }}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} variant="rectangular" height={100} />
          ))}
        </Box>
        
        {/* Charts Loading */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Skeleton variant="rectangular" height={400} sx={{ flex: 2 }} />
          <Skeleton variant="rectangular" height={400} sx={{ flex: 1 }} />
        </Box>
      </Box>
    </Box>
  );
}