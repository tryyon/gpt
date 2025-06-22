'use client';

import { useState } from 'react';
import {
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Circle as CircleIcon,
} from '@mui/icons-material';
import { DataTable } from '@/global-components/common/DataTable';
import type { GridColDef } from '@mui/x-data-grid';
import type { Warranty } from '@/types/warranty';

interface WarrantyTableProps {
  warranties: Warranty[];
  onEdit: (warranty: Warranty) => void;
  onDelete: (warranty: Warranty) => void;
}

export function WarrantyTable({ warranties, onEdit, onDelete }: WarrantyTableProps) {
  const [selectedWarranty, setSelectedWarranty] = useState<Warranty | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleViewDetails = (warranty: Warranty) => {
    setSelectedWarranty(warranty);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedWarranty(null);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Warranty':
        return 'primary';
      case 'Guarantee':
        return 'secondary';
      case 'Refund & Exchange':
        return 'success';
      default:
        return 'default';
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getTypeColor(params.value)}
          variant="outlined"
          size="small"
        />
      ),
    },
    {
      field: 'duration',
      headerName: 'Duration',
      width: 120,
      valueGetter: (params) => `${params.value.value} ${params.value.unit}`,
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
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton 
            size="small" 
            onClick={() => handleViewDetails(params.row)}
            color="primary"
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={() => onEdit(params.row)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={() => onDelete(params.row)}
            color="error"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <>
      <DataTable
        rows={warranties}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 10 } },
          sorting: { sortModel: [{ field: 'dateCreated', sort: 'desc' }] },
        }}
      />

      <Dialog 
        open={detailsOpen} 
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedWarranty?.title}
        </DialogTitle>
        <DialogContent dividers>
          {selectedWarranty && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedWarranty.title}
              </Typography>

              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Description
              </Typography>
              <Typography paragraph>
                {selectedWarranty.description}
              </Typography>

              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Duration
              </Typography>
              <Typography paragraph>
                {selectedWarranty.duration.value} {selectedWarranty.duration.unit}
              </Typography>

              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Conditions
              </Typography>
              <List dense>
                {selectedWarranty.conditions.map((condition, index) => (
                  <ListItem key={index}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CircleIcon sx={{ fontSize: 8 }} />
                    </ListItemIcon>
                    <ListItemText primary={condition} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}