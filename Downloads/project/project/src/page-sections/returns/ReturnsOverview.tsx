'use client';

import { Box } from '@mui/material';
import { ReturnsTable } from './ReturnsTable';
import { PageTitle } from '@/global-components/layout/PageTitle';
import { ReturnsStats } from './ReturnsStats';
import { ReturnsFilters } from './ReturnsFilters';

export function ReturnsOverview() {
  return (
    <Box>
      <PageTitle 
        title="Returns Management" 
        subtitle="Track and manage product returns"
      />
      
      {/* Returns Statistics */}
      <ReturnsStats />
      
      {/* Returns Filters */}
      <Box sx={{ mt: 3, mb: 3 }}>
        <ReturnsFilters />
      </Box>
      
      {/* Returns Table */}
      <Box sx={{ mt: 2 }}>
        <ReturnsTable />
      </Box>
    </Box>
  );
}