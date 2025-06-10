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
  Chip,
  Grid,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { DataTable } from '@/global-components/common/DataTable';
import type { GridColDef } from '@mui/x-data-grid';
import type { ProductContent } from '@/types/productContent';

interface ProductContentsTableProps {
  contents: ProductContent[];
  onEdit: (content: ProductContent) => void;
  onDelete: (content: ProductContent) => void;
}

export function ProductContentsTable({ contents, onEdit, onDelete }: ProductContentsTableProps) {
  const [selectedContent, setSelectedContent] = useState<ProductContent | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleViewDetails = (content: ProductContent) => {
    setSelectedContent(content);
    setDetailsOpen(true);
  };

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'items',
      headerName: 'Items',
      width: 100,
      valueGetter: (params) => params.value.length,
      renderCell: (params) => (
        <Chip
          label={`${params.value} items`}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
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
      field: 'dateCreated',
      headerName: 'Created',
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
        rows={contents}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
          sorting: { sortModel: [{ field: 'dateCreated', sort: 'desc' }] },
        }}
      />

      <Dialog 
        open={detailsOpen} 
        onClose={() => setDetailsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Product Content Details
        </DialogTitle>
        <DialogContent dividers>
          {selectedContent && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  {selectedContent.title}
                </Typography>
                <Chip
                  label={selectedContent.status}
                  color={
                    selectedContent.status === 'Enabled' ? 'success' :
                    selectedContent.status === 'Disabled' ? 'warning' :
                    'error'
                  }
                  size="small"
                  sx={{ mb: 2 }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Items
                </Typography>
                {selectedContent.items.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      mb: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="subtitle1" gutterBottom>
                      {item.name}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Dimensions
                        </Typography>
                        <Typography variant="body1">
                          {item.dimensions.length} × {item.dimensions.width} × {item.dimensions.height} cm
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Weight
                        </Typography>
                        <Typography variant="body1">
                          {item.weight} g
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Grid>

              <Grid item xs={12}>
                <Typography variant="caption" color="text.secondary">
                  Created: {new Date(selectedContent.dateCreated).toLocaleString()}
                </Typography>
              </Grid>
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