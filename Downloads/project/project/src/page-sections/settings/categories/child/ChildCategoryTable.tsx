'use client';

import { useState } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Chip,
  Avatar,
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
const mockCategories = [
  {
    id: '1',
    name: 'Android Phones',
    rootCategory: 'Electronics',
    mainCategory: 'Smartphones',
    description: 'Android smartphones and accessories',
    logo: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
    isActive: true,
    displayOrder: 1,
  },
  // Add more mock data as needed
];

interface ChildCategoryTableProps {
  onEditCategory: (category: any) => void;
}

export function ChildCategoryTable({ onEditCategory }: ChildCategoryTableProps) {
  const theme = useTheme();
  const [categories] = useState(mockCategories);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Category',
      flex: 1.2,
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
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {params.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.mainCategory} • {params.row.rootCategory}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'displayOrder',
      headerName: 'Order',
      width: 100,
      align: 'center',
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Active' : 'Inactive'}
          color={params.value ? 'success' : 'default'}
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
              onClick={() => onEditCategory(params.row)}
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
      rows={categories}
      columns={columns}
      initialState={{
        pagination: { paginationModel: { page: 0, pageSize: 10 } },
        sorting: { sortModel: [{ field: 'displayOrder', sort: 'asc' }] },
      }}
    />
  );
}