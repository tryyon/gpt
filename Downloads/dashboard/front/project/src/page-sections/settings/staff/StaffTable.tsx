'use client';

import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from '@mui/material';
import {
  Edit as EditIcon,
  Block as BlockIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { DataTable } from '@/global-components/common/DataTable';
import type { GridColDef } from '@mui/x-data-grid';
import type { StaffMember } from './types';
import { useState } from 'react';

interface StaffTableProps {
  staff: StaffMember[];
  onEdit: (staff: StaffMember) => void;
  onDeactivate: (staffId: string) => void;
}

export function StaffTable({ staff, onEdit, onDeactivate }: StaffTableProps) {
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleViewDetails = (staffMember: StaffMember) => {
    setSelectedStaff(staffMember);
    setDetailsOpen(true);
  };

  const columns: GridColDef[] = [
    {
      field: 'fullName',
      headerName: 'Staff Member',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={params.row.profilePhoto}
            alt={params.value}
          />
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {params.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color="primary"
          variant="outlined"
          size="small"
        />
      ),
    },
    {
      field: 'department',
      headerName: 'Department',
      width: 150,
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      width: 120,
      valueFormatter: ({ value }) => new Date(value).toLocaleDateString(),
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
          {params.row.status === 'active' && (
            <Tooltip title="Deactivate">
              <IconButton
                size="small"
                onClick={() => onDeactivate(params.row.id)}
                color="error"
              >
                <BlockIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      ),
    },
  ];

  return (
    <>
      <DataTable
        rows={staff}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
          sorting: { sortModel: [{ field: 'fullName', sort: 'asc' }] },
        }}
      />

      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Staff Member Details</DialogTitle>
        <DialogContent dividers>
          {selectedStaff && (
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Avatar
                  src={selectedStaff.profilePhoto}
                  alt={selectedStaff.fullName}
                  sx={{ width: 100, height: 100 }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography color="text.secondary" variant="caption">
                  Full Name
                </Typography>
                <Typography variant="body1">
                  {selectedStaff.fullName}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography color="text.secondary" variant="caption">
                  Email
                </Typography>
                <Typography variant="body1">
                  {selectedStaff.email}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography color="text.secondary" variant="caption">
                  Contact Number
                </Typography>
                <Typography variant="body1">
                  {selectedStaff.contactNumber}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography color="text.secondary" variant="caption">
                  Role
                </Typography>
                <Typography variant="body1">
                  {selectedStaff.role}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography color="text.secondary" variant="caption">
                  Department
                </Typography>
                <Typography variant="body1">
                  {selectedStaff.department}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography color="text.secondary" variant="caption">
                  Start Date
                </Typography>
                <Typography variant="body1">
                  {new Date(selectedStaff.startDate).toLocaleDateString()}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography color="text.secondary" variant="caption">
                  Status
                </Typography>
                <Box sx={{ mt: 0.5 }}>
                  <Chip
                    label={selectedStaff.status}
                    color={selectedStaff.status === 'active' ? 'success' : 'default'}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography color="text.secondary" variant="caption">
                  Permissions
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 0.5 }}>
                  {selectedStaff.permissions.map((permission, index) => (
                    <Chip
                      key={index}
                      label={permission}
                      size="small"
                      variant="outlined"
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
              if (selectedStaff) {
                onEdit(selectedStaff);
              }
            }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}