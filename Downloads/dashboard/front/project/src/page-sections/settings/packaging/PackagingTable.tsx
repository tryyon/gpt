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
  Grid,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { DataTable } from '@/global-components/common/DataTable';
import type { GridColDef } from '@mui/x-data-grid';
import type { Packaging } from '@/types/packaging';

interface PackagingTableProps {
  packagingOptions: Packaging[];
  onEdit: (packaging: Packaging) => void;
  onDelete: (packaging: Packaging) => void;
}

export function PackagingTable({ packagingOptions, onEdit, onDelete }: PackagingTableProps) {
  const [selectedPackaging, setSelectedPackaging] = useState<Packaging | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleViewDetails = (packaging: Packaging) => {
    setSelectedPackaging(packaging);
    setDetailsOpen(true);
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight={500}>
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.type}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'dimensions',
      headerName: 'Dimensions',
      width: 150,
      valueGetter: (params) => 
        `${params.value.length} × ${params.value.width} × ${params.value.height} cm`,
    },
    {
      field: 'weight',
      headerName: 'Weight',
      width: 120,
      valueFormatter: (params) => `${params.value} g`,
    },
    {
      field: 'cost',
      headerName: 'Cost',
      width: 100,
      valueFormatter: (params) => `$${params.value.toFixed(2)}`,
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
      field: 'isDefault',
      headerName: 'Default',
      width: 100,
      renderCell: (params) => params.value && (
        <Chip
          label="Default"
          color="primary"
          size="small"
          variant="outlined"
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
        rows={packagingOptions}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
          sorting: { sortModel: [{ field: 'name', sort: 'asc' }] },
        }}
      />

      <Dialog 
        open={detailsOpen} 
        onClose={() => setDetailsOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Packaging Details
        </DialogTitle>
        <DialogContent dividers>
          {selectedPackaging && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Name
                </Typography>
                <Typography variant="body1">
                  {selectedPackaging.name}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Type
                </Typography>
                <Typography variant="body1">
                  {selectedPackaging.type}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Material
                </Typography>
                <Typography variant="body1">
                  {selectedPackaging.material}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Dimensions
                </Typography>
                <Typography variant="body1">
                  {selectedPackaging.dimensions.length} × {selectedPackaging.dimensions.width} × {selectedPackaging.dimensions.height} cm
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Weight
                </Typography>
                <Typography variant="body1">
                  {selectedPackaging.weight} g
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Cost
                </Typography>
                <Typography variant="body1">
                  ${selectedPackaging.cost.toFixed(2)}
                </Typography>
              </Grid>

              {selectedPackaging.description && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Description
                  </Typography>
                  <Typography variant="body1">
                    {selectedPackaging.description}
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}