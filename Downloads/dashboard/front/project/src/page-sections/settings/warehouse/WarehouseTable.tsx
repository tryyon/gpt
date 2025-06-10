'use client';

import { useState } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { DataTable } from '@/global-components/common/DataTable';
import type { GridColDef } from '@mui/x-data-grid';

// Mock data
const mockWarehouses = [
  {
    id: '1',
    warehousePincode: '400001',
    warehouseGSTIN: 'GST123456',
    city: 'Mumbai',
    state: 'Maharashtra',
    status: 'active',
    warehouseContactNumber: '1234567890',
    warehouseEmailID: 'warehouse1@example.com',
    organizations: [
      { name: 'Org 1', status: 'approved' },
      { name: 'Org 2', status: 'pending' },
    ],
  },
  // Add more mock data as needed
];

interface WarehouseTableProps {
  onEditWarehouse: (warehouse: any) => void;
}

export function WarehouseTable({ onEditWarehouse }: WarehouseTableProps) {
  const theme = useTheme();
  const [warehouses] = useState(mockWarehouses);

  const columns: GridColDef[] = [
    {
      field: 'warehousePincode',
      headerName: 'Warehouse',
      flex: 1.2,
      minWidth: 180,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight={500}>
            {params.row.city} - {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            GSTIN: {params.row.warehouseGSTIN}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'contact',
      headerName: 'Contact',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2">
            {params.row.warehouseContactNumber}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.warehouseEmailID}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'organizations',
      headerName: 'Organizations',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {params.value.map((org: any, index: number) => (
            <Chip
              key={index}
              label={org.name}
              size="small"
              color={org.status === 'approved' ? 'success' : 'warning'}
              variant="outlined"
            />
          ))}
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'active' ? 'success' : 'default'}
          size="small"
          sx={{ textTransform: 'capitalize' }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="View Details">
            <IconButton size="small" sx={{ color: theme.palette.primary.main }}>
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton 
              size="small" 
              onClick={() => onEditWarehouse(params.row)}
              sx={{ color: theme.palette.text.secondary }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" sx={{ color: theme.palette.error.main }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <DataTable
      rows={warehouses}
      columns={columns}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
        sorting: { sortModel: [{ field: 'warehousePincode', sort: 'asc' }] },
      }}
    />
  );
}