'use client';

import { useState } from 'react';
import {
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import type { Collection } from '@/types/collection';
import { DataTable } from '@/global-components/common/DataTable';
import type { GridColDef } from '@mui/x-data-grid';

interface CollectionsTableProps {
  collections: Collection[];
  onEdit: (collection: Collection) => void;
  onDelete: (collection: Collection) => void;
}

export function CollectionsTable({
  collections,
  onEdit,
  onDelete,
}: CollectionsTableProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, collection: Collection) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedCollection(collection);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCollection(null);
  };

  const handleEdit = () => {
    if (selectedCollection) {
      onEdit(selectedCollection);
    }
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedCollection) {
      onDelete(selectedCollection);
    }
    handleMenuClose();
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
    },
    {
      field: 'title',
      headerName: 'Collection Title',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'dateCreated',
      headerName: 'Date Created',
      flex: 1,
      minWidth: 150,
      valueFormatter: ({ value }) => new Date(value).toLocaleDateString(),
    },
    {
      field: 'status',
      headerName: 'Collection Status',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === 'Enabled' ? 'success' :
            params.value === 'Disabled' ? 'warning' :
            'error'
          }
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={(event) => handleMenuOpen(event as any, params.row)}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <DataTable
        rows={collections}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
          sorting: {
            sortModel: [{ field: 'dateCreated', sort: 'desc' }],
          },
        }}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <EditIcon sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>
    </>
  );
}