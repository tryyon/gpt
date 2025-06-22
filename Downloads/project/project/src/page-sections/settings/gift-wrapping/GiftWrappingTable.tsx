'use client';

import { useState } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Avatar,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { DataTable } from '@/global-components/common/DataTable';
import type { GridColDef } from '@mui/x-data-grid';
import type { GiftWrapping } from '@/types/giftWrapping';

interface GiftWrappingTableProps {
  wrappingOptions: GiftWrapping[];
  onEdit: (wrapping: GiftWrapping) => void;
  onDelete: (wrapping: GiftWrapping) => void;
}

export function GiftWrappingTable({ wrappingOptions, onEdit, onDelete }: GiftWrappingTableProps) {
  const [selectedWrapping, setSelectedWrapping] = useState<GiftWrapping | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleViewDetails = (wrapping: GiftWrapping) => {
    setSelectedWrapping(wrapping);
    setDetailsOpen(true);
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {params.row.imageUrl ? (
            <Avatar
              src={params.row.imageUrl}
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
              {params.row.type}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'color',
      headerName: 'Color',
      width: 120,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      valueFormatter: (params) => `$${params.value.toFixed(2)}`,
    },
    {
      field: 'maxDimensions',
      headerName: 'Max Size',
      width: 150,
      valueGetter: (params) => 
        `${params.value.length} × ${params.value.width} × ${params.value.height} cm`,
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
          <Tooltip title="View Details">
            <IconButton 
              size="small" 
              onClick={() => handleViewDetails(params.row)}
              color="primary"
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton 
              size="small" 
              onClick={() => onEdit(params.row)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton 
              size="small" 
              onClick={() => onDelete(params.row)}
              color="error"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <>
      <DataTable
        rows={wrappingOptions}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 10 } },
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
          Gift Wrapping Details
        </DialogTitle>
        <DialogContent>
          {selectedWrapping && (
            <Grid container spacing={2} sx={{ pt: 2 }}>
              {selectedWrapping.imageUrl && (
                <Grid item xs={12}>
                  <Box
                    component="img"
                    src={selectedWrapping.imageUrl}
                    alt={selectedWrapping.name}
                    sx={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                      borderRadius: 1,
                    }}
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Name
                </Typography>
                <Typography variant="body1">
                  {selectedWrapping.name}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Type
                </Typography>
                <Typography variant="body1">
                  {selectedWrapping.type}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Color
                </Typography>
                <Typography variant="body1">
                  {selectedWrapping.color}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Maximum Dimensions
                </Typography>
                <Typography variant="body1">
                  {selectedWrapping.maxDimensions.length} × {selectedWrapping.maxDimensions.width} × {selectedWrapping.maxDimensions.height} cm
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Price
                </Typography>
                <Typography variant="body1">
                  ${selectedWrapping.price.toFixed(2)}
                </Typography>
              </Grid>

              {selectedWrapping.description && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Description
                  </Typography>
                  <Typography variant="body1">
                    {selectedWrapping.description}
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}