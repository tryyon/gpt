'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Chip,
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
import type { Policy } from '@/lib/validations/policy';

interface PolicyTableProps {
  policies: Policy[];
  onEdit: (policy: Policy) => void;
  onDelete: (policyId: string) => void;
}

export function PolicyTable({ policies, onEdit, onDelete }: PolicyTableProps) {
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleViewDetails = (policy: Policy) => {
    setSelectedPolicy(policy);
    setDetailsOpen(true);
  };

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Link 
          href={`/dashboard/settings/policies/${params.row.type}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Typography variant="body2" sx={{ '&:hover': { textDecoration: 'underline' } }}>
            {params.value}
          </Typography>
        </Link>
      ),
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 150,
      renderCell: (params) => (
        <Link 
          href={`/dashboard/settings/policies/${params.value}`}
          style={{ textDecoration: 'none' }}
        >
          <Chip
            label={params.value.charAt(0).toUpperCase() + params.value.slice(1)}
            color="primary"
            variant="outlined"
            size="small"
            sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
          />
        </Link>
      ),
    },
    {
      field: 'version',
      headerName: 'Version',
      width: 120,
    },
    {
      field: 'lastUpdated',
      headerName: 'Last Updated',
      width: 180,
      valueFormatter: ({ value }) => new Date(value).toLocaleDateString(),
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
          <Link 
            href={`/dashboard/settings/policies/${params.row.type}`}
            style={{ textDecoration: 'none' }}
          >
            <IconButton size="small" color="primary">
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Link>
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
              onClick={() => onDelete(params.row.id!)}
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
        rows={policies}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
          sorting: { sortModel: [{ field: 'lastUpdated', sort: 'desc' }] },
        }}
      />

      <Dialog 
        open={detailsOpen} 
        onClose={() => setDetailsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Policy Details
        </DialogTitle>
        <DialogContent dividers>
          {selectedPolicy && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  {selectedPolicy.title}
                </Typography>
                <Chip
                  label={selectedPolicy.type.charAt(0).toUpperCase() + selectedPolicy.type.slice(1)}
                  color="primary"
                  size="small"
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Content
                </Typography>
                <Typography variant="body1" paragraph>
                  {selectedPolicy.content}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Version
                </Typography>
                <Typography variant="body1">
                  {selectedPolicy.version}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Last Updated
                </Typography>
                <Typography variant="body1">
                  {new Date(selectedPolicy.lastUpdated).toLocaleDateString()}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Chip
                    label={selectedPolicy.isActive ? 'Active' : 'Inactive'}
                    color={selectedPolicy.isActive ? 'success' : 'default'}
                    size="small"
                  />
                  {selectedPolicy.isRequired && (
                    <Chip
                      label="Required"
                      color="warning"
                      size="small"
                    />
                  )}
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
              if (selectedPolicy) {
                onEdit(selectedPolicy);
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