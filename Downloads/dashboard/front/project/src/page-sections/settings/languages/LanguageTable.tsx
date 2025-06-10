'use client';

import {
  Box,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { DataTable } from '@/global-components/common/DataTable';
import type { GridColDef } from '@mui/x-data-grid';
import type { Language } from '@/types/language';

interface LanguageTableProps {
  languages: Language[];
  onEdit: (language: Language) => void;
  onDelete: (languageId: string) => void;
}

export function LanguageTable({ languages, onEdit, onDelete }: LanguageTableProps) {
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Language',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {params.row.name}
          {params.row.isDefault && (
            <Chip 
              label="Default" 
              size="small" 
              color="primary" 
              variant="outlined" 
            />
          )}
        </Box>
      ),
    },
    {
      field: 'nativeName',
      headerName: 'Native Name',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'code',
      headerName: 'Code',
      width: 100,
    },
    {
      field: 'direction',
      headerName: 'Direction',
      width: 100,
      renderCell: (params) => params.value.toUpperCase(),
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
          <Tooltip title="Edit">
            <IconButton 
              size="small" 
              onClick={() => onEdit(params.row)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {!params.row.isDefault && (
            <Tooltip title="Delete">
              <IconButton 
                size="small" 
                onClick={() => onDelete(params.row.id)}
                color="error"
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
      rows={languages}
      columns={columns}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
        sorting: { sortModel: [{ field: 'name', sort: 'asc' }] },
      }}
    />
  );
}