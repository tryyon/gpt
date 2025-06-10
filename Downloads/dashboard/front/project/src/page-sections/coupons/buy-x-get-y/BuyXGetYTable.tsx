'use client';

import { useState } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Chip,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { DataTable } from '@/global-components/common/DataTable';
import type { GridColDef, GridEventListener } from '@mui/x-data-grid';
import type { GridRowParams } from '@mui/x-data-grid';


interface BuyXGetYTableProps {
  promotions: any[];
  onEdit: (promotion: any) => void;
  onToggleStatus: (promotionId: string) => void;
  onDelete: (promotionId: string) => void;
}

export function BuyXGetYTable({ promotions, onEdit, onToggleStatus, onDelete }: BuyXGetYTableProps) {
  const [selectedPromotion, setSelectedPromotion] = useState<any | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleViewDetails = (promotion: any) => {
    setSelectedPromotion(promotion);
    setDetailsOpen(true);
  };

  const handleConfirmDelete = (promotionId: string) => {
    setConfirmDeleteOpen(false);
    onDelete(promotionId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Promotion Name',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={500}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'buyQuantity',
      headerName: 'Buy',
      width: 80,
      align: 'center',
    },
    {
      field: 'getQuantity',
      headerName: 'Get',
      width: 80,
      align: 'center',
    },
    {
      field: 'validity',
      headerName: 'Validity',
      width: 200,
      valueGetter: (params) => `${formatDate(params.row.startDate)} - ${formatDate(params.row.endDate)}`,
    },
    {
      field: 'usageCount',
      headerName: 'Usage',
      width: 120,
      renderCell: (params) => (
        <Typography>
          {params.value} / {params.row.maxUsageCount || '∞'}
        </Typography>
      ),
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Switch
          checked={params.value}
          onChange={() => onToggleStatus(params.row.id)}
          onClick={(e) => e.stopPropagation()}
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
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails(params.row);
              }}
              color="primary"
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(params.row);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPromotion(params.row);
                setConfirmDeleteOpen(true);
              }}
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
        rows={promotions}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 10 } },
          sorting: { sortModel: [{ field: 'name', sort: 'asc' }] },
        }}
        onRowClick={(params: GridRowParams) => handleViewDetails(params.row)}

      />

      {/* Promotion Details Dialog */}
      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Promotion Details</DialogTitle>
        <DialogContent dividers>
          {selectedPromotion && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  {selectedPromotion.name}
                </Typography>
                <Chip
                  label={selectedPromotion.isActive ? 'Active' : 'Inactive'}
                  color={selectedPromotion.isActive ? 'success' : 'default'}
                  size="small"
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Promotion Type
                </Typography>
                <Typography variant="body1">
                  Buy {selectedPromotion.buyQuantity} Get {selectedPromotion.getQuantity} Free
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Validity Period
                </Typography>
                <Typography variant="body1">
                  {formatDate(selectedPromotion.startDate)} - {formatDate(selectedPromotion.endDate)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Usage Limit Per Customer
                </Typography>
                <Typography variant="body1">
                  {selectedPromotion.usageLimit || 'Unlimited'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Usage
                </Typography>
                <Typography variant="body1">
                  {selectedPromotion.usageCount} / {selectedPromotion.maxUsageCount || 'Unlimited'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Description
                </Typography>
                <Typography variant="body1">
                  {selectedPromotion.description || 'No description provided'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Applicable Products
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {selectedPromotion.selectedProducts?.map((product: any) => (
                    <Chip
                      key={product.id}
                      label={product.name}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Free Products
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {selectedPromotion.freeProducts?.map((product: any) => (
                    <Chip
                      key={product.id}
                      label={product.name}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)}>
            Close
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setDetailsOpen(false);
              if (selectedPromotion) {
                onEdit(selectedPromotion);
              }
            }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the promotion <strong>{selectedPromotion?.name}</strong>?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => selectedPromotion && handleConfirmDelete(selectedPromotion.id)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
