'use client';

import { Box } from '@mui/material';
import { OrdersTable } from './OrdersTable';

export function OrdersOverview() {
  return (
    <Box sx={{ mt: 2 }}>
      <OrdersTable />
    </Box>
  );
}