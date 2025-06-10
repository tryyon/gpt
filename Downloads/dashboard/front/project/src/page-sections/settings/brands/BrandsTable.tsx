'use client';

import { useState } from 'react';
import {
  Box,
  Chip,
  IconButton,
  Tooltip,
  Typography,
  Avatar,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { DataTable } from '@/global-components/common/DataTable';
import type { GridColDef } from '@mui/x-data-grid';

export interface Brand {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  status: 'active' | 'inactive';
  productsCount: number;
  createdAt: string;
}

const mockBrands: Brand[] = [
  {
    id: '1',
    name: 'Nike',
    logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    website: 'https://nike.com',
    status: 'active',
    productsCount: 150,
    createdAt: '2024-03-15T10:30:00',
  },
  {
    id: '2',
    name: 'Adidas',
    logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    website: 'https://adidas.com',
    status: 'active',
    productsCount: 120,
    createdAt: '2024-03-15T11:45:00',
  },
];

interface BrandsTableProps {
  onEditBrand: (brand: Brand) => void;
}

export function BrandsTable({ onEditBrand }: BrandsTableProps) {
  const [brands] = useState<Brand[]>(mockBrands);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Brand',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {params.row.logo ? (
            <Avatar
              src={params.row.logo}
              alt={params.value}
              variant="rounded"
              sx={{ width: 40, height: 40 }}
            />
          ) : (
            <Avatar variant="rounded" sx={{ width: 40, height: 40 }}>
              {params.value.charAt(0)}
            </Avatar>
          )}
          <Typography variant="body2" fontWeight={500}>
            {params.value}
          </Typography>
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
        <Box>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => onEditBrand(params.row)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <DataTable
      rows={brands}
      columns={columns}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
        sorting: { sortModel: [{ field: 'createdAt', sort: 'desc' }] },
      }}
      hideToolbar
    />
  );
}