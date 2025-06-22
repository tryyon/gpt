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
import type { GridColDef } from '@mui/x-data-grid';

interface LoyaltyPointsTableProps {
  programs: any[];
  onEdit: (program: any) => void;
  onToggleStatus: (programId: string) => void;
  onDelete: (programId: string) => void;
}

export function LoyaltyPointsTable({ programs, onEdit, onToggleStatus, onDelete }: LoyaltyPointsTableProps) {
  const [selectedProgram, setSelectedProgram] = useState<any | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleViewDetails = (program: any) => {
    setSelectedProgram(program);
    setDetailsOpen(true);
  };

  const handleConfirmDelete = (programId: string) => {
    setConfirmDeleteOpen(false);
    onDelete(programId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Program Name',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={500}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'pointsPerDollar',
      headerName: 'Points Per $',
      width: 120,
      align: 'center',
    },
    {
      field: 'minimumPurchase',
      headerName: 'Min. Purchase',
      width: 130,
      renderCell: (params) => (
        <Typography>
          ${params.value > 0 ? params.value : '0'}
        </Typography>
      ),
    },
    {
      field: 'validity',
      headerName: 'Validity',
      width: 200,
      valueGetter: (params) => `${formatDate(params.row.startDate)} - ${formatDate(params.row.endDate)}`,
    },
    {
      field: 'expiryDays',
      headerName: 'Points Expiry',
      width: 120,
      renderCell: (params) => (
        <Typography>
          {params.value} days
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
                setSelectedProgram(params.row);
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
        rows={programs}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 10 } },
          sorting: { sortModel: [{ field: 'name', sort: 'asc' }] },
        }}
        onRowClick={(params) => handleViewDetails(params.row)}
      />

      {/* Program Details Dialog */}
      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Loyalty Program Details</DialogTitle>
        <DialogContent dividers>
          {selectedProgram && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  {selectedProgram.name}
                </Typography>
                <Chip
                  label={selectedProgram.isActive ? 'Active' : 'Inactive'}
                  color={selectedProgram.isActive ? 'success' : 'default'}
                  size="small"
                  sx={{ mb: 2 }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Points Per Dollar
                </Typography>
                <Typography variant="body1">
                  {selectedProgram.pointsPerDollar} points
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Minimum Purchase
                </Typography>
                <Typography variant="body1">
                  ${selectedProgram.minimumPurchase}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Points Valuation
                </Typography>
                <Typography variant="body1">
                  ${selectedProgram.pointsValuation} per point
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Points Expiry
                </Typography>
                <Typography variant="body1">
                  {selectedProgram.expiryDays} days
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Start Date
                </Typography>
                <Typography variant="body1">
                  {formatDate(selectedProgram.startDate)}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  End Date
                </Typography>
                <Typography variant="body1">
                  {formatDate(selectedProgram.endDate)}
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Description
                </Typography>
                <Typography variant="body1">
                  {selectedProgram.description || 'No description provided'}
                </Typography>
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
              if (selectedProgram) {
                onEdit(selectedProgram);
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
            Are you sure you want to delete the loyalty program <strong>{selectedProgram?.name}</strong>?
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
            onClick={() => selectedProgram && handleConfirmDelete(selectedProgram.id)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}