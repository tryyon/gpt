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
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { DataTable } from '@/global-components/common/DataTable';
import type { GridColDef } from '@mui/x-data-grid';

// Mock data
const mockDomains = [
  {
    id: '1',
    domain: 'example.com',
    type: 'primary',
    status: 'verified',
    ssl: true,
    createdAt: '2024-03-15T10:30:00',
  },
  {
    id: '2',
    domain: 'store.example.com',
    type: 'subdomain',
    status: 'pending',
    ssl: false,
    createdAt: '2024-03-14T15:45:00',
  },
];

interface DomainsTableProps {
  onEdit?: (domain: any) => void;
  onDelete?: (domainId: string) => void;
}

export function DomainsTable({ onEdit, onDelete }: DomainsTableProps) {
  const theme = useTheme();
  const [domains] = useState(mockDomains);

  const columns: GridColDef[] = [
    {
      field: 'domain',
      headerName: 'Domain',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight={500}>
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.type === 'primary' ? 'Primary Domain' : 'Subdomain'}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          icon={params.value === 'verified' ? <CheckCircleIcon /> : <ErrorIcon />}
          label={params.value === 'verified' ? 'Verified' : 'Pending'}
          color={params.value === 'verified' ? 'success' : 'warning'}
          size="small"
        />
      ),
    },
    {
      field: 'ssl',
      headerName: 'SSL',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Active' : 'Not Active'}
          color={params.value ? 'success' : 'default'}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Added On',
      width: 180,
      valueFormatter: ({ value }) => new Date(value).toLocaleString(),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="View DNS">
            <IconButton size="small" sx={{ color: theme.palette.primary.main }}>
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {onEdit && (
            <Tooltip title="Edit">
              <IconButton 
                size="small" 
                onClick={() => onEdit(params.row)}
                sx={{ color: theme.palette.text.secondary }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          {onDelete && (
            <Tooltip title="Delete">
              <IconButton 
                size="small" 
                onClick={() => onDelete(params.row.id)}
                sx={{ color: theme.palette.error.main }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      ),
    },
  ];

  return (
    <DataTable
      rows={domains}
      columns={columns}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
        sorting: { sortModel: [{ field: 'createdAt', sort: 'desc' }] },
      }}
    />
  );
}