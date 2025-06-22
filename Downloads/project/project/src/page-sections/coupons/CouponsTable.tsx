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

interface CouponsTableProps {
  coupons: any[];
  onEdit: (coupon: any) => void;
  onToggleStatus: (couponId: string) => void;
  onDelete: (couponId: string) => void;
}

export function CouponsTable({ coupons, onEdit, onToggleStatus, onDelete }: CouponsTableProps) {
  const [selectedCoupon, setSelectedCoupon] = useState<any | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleViewDetails = (coupon: any) => {
    setSelectedCoupon(coupon);
    setDetailsOpen(true);
  };

  const handleConfirmDelete = (couponId: string) => {
    setConfirmDeleteOpen(false);
    onDelete(couponId);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const columns: GridColDef[] = [
    {
      field: 'code',
      headerName: 'Coupon Code',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={500}>
          {params.value || (params.row.type === 'buyxgety' ? params.row.name : 'N/A')}
        </Typography>
      ),
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 150,
      renderCell: (params) => {
        let label = 'Unknown';
        let color: 'primary' | 'secondary' | 'info' = 'primary';
        
        switch(params.value) {
          case 'percentage':
            label = 'Percentage';
            color = 'primary';
            break;
          case 'fixed':
            label = 'Fixed Amount';
            color = 'secondary';
            break;
          case 'buyxgety':
            label = 'Buy X Get Y';
            color = 'info';
            break;
        }
        
        return (
          <Chip
            label={label}
            color={color}
            size="small"
            variant="outlined"
          />
        );
      },
    },
    {
      field: 'value',
      headerName: 'Value',
      width: 120,
      renderCell: (params) => {
        if (params.row.type === 'buyxgety') {
          return (
            <Typography>
              Buy {params.row.buyQuantity}, Get {params.row.getQuantity}
            </Typography>
          );
        }
        return (
          <Typography>
            {params.row.type === 'percentage' ? `${params.value}%` : `$${params.value}`}
          </Typography>
        );
      },
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
          {params.value} / {params.row.maxUsageCount || params.row.usageLimit || '∞'}
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
                setSelectedCoupon(params.row);
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
        rows={coupons}
        columns={columns}
        initialState={{
          pagination: { paginationModel: {page: 0, pageSize: 10 } },
          sorting: { sortModel: [{ field: 'code', sort: 'asc' }] },
        }}
        onRowClick={(params) => handleViewDetails(params.row)}
      />

      {/* Coupon Details Dialog */}
      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedCoupon?.type === 'buyxgety' ? 'Promotion Details' : 'Coupon Details'}
        </DialogTitle>
        <DialogContent dividers>
          {selectedCoupon && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  {selectedCoupon.type === 'buyxgety' ? 'Promotion Name' : 'Coupon Code'}
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {selectedCoupon.type === 'buyxgety' ? selectedCoupon.name : selectedCoupon.code}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={selectedCoupon.isActive ? 'Active' : 'Inactive'}
                  color={selectedCoupon.isActive ? 'success' : 'default'}
                  size="small"
                />
              </Grid>
              
              {selectedCoupon.type === 'buyxgety' ? (
                // Buy X Get Y specific fields
                <>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Promotion Type
                    </Typography>
                    <Typography variant="body1">
                      Buy {selectedCoupon.buyQuantity} Get {selectedCoupon.getQuantity} Free
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Validity Period
                    </Typography>
                    <Typography variant="body1">
                      {formatDate(selectedCoupon.startDate)} - {formatDate(selectedCoupon.endDate)}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Usage Limit Per Customer
                    </Typography>
                    <Typography variant="body1">
                      {selectedCoupon.usageLimit || 'Unlimited'}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Usage
                    </Typography>
                    <Typography variant="body1">
                      {selectedCoupon.usageCount} / {selectedCoupon.maxUsageCount || 'Unlimited'}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Description
                    </Typography>
                    <Typography variant="body1">
                      {selectedCoupon.description || 'No description provided'}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Applicable Products
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                      {selectedCoupon.selectedProducts?.map((product: any) => (
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
                      {selectedCoupon.freeProducts?.map((product: any) => (
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
                </>
              ) : (
                // Regular coupon fields
                <>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Discount Type
                    </Typography>
                    <Typography variant="body1">
                      {selectedCoupon.type === 'percentage' ? 'Percentage' : 'Fixed Amount'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Discount Value
                    </Typography>
                    <Typography variant="body1">
                      {selectedCoupon.type === 'percentage' ? `${selectedCoupon.value}%` : `$${selectedCoupon.value}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Minimum Purchase
                    </Typography>
                    <Typography variant="body1">
                      {selectedCoupon.minPurchase > 0 ? `$${selectedCoupon.minPurchase}` : 'None'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Minimum Order Quantity
                    </Typography>
                    <Typography variant="body1">
                      {selectedCoupon.minOrderQuantity > 0 ? selectedCoupon.minOrderQuantity : 'None'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Maximum Discount
                    </Typography>
                    <Typography variant="body1">
                      {selectedCoupon.maxDiscount > 0 ? `$${selectedCoupon.maxDiscount}` : 'Unlimited'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Start Date & Time
                    </Typography>
                    <Typography variant="body1">
                      {formatDateTime(selectedCoupon.startDate)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      End Date & Time
                    </Typography>
                    <Typography variant="body1">
                      {formatDateTime(selectedCoupon.endDate)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Usage Limit Per Customer
                    </Typography>
                    <Typography variant="body1">
                      {selectedCoupon.usageLimit || 'Unlimited'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Max Coupon Usage Count
                    </Typography>
                    <Typography variant="body1">
                      {selectedCoupon.maxUsageCount || 'Unlimited'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Current Usage
                    </Typography>
                    <Typography variant="body1">
                      {selectedCoupon.usageCount}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Description
                    </Typography>
                    <Typography variant="body1">
                      {selectedCoupon.description || 'No description provided'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Coupon Functionality
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                      {selectedCoupon.showToCustomer && (
                        <Chip label="Visible to customers" size="small" color="primary" />
                      )}
                      {selectedCoupon.onlinePaymentsOnly && (
                        <Chip label="Online payments only" size="small" />
                      )}
                      {selectedCoupon.newCustomersOnly && (
                        <Chip label="New customers only" size="small" />
                      )}
                      {selectedCoupon.autoApply && (
                        <Chip label="Auto-applied" size="small" color="success" />
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Applicable Products
                    </Typography>
                    <Typography variant="body1">
                      {selectedCoupon.applicableProducts === 'all' ? 'All Products' : 'Selected Products'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Applicable Categories
                    </Typography>
                    <Typography variant="body1">
                      {selectedCoupon.applicableCategories === 'all' ? 'All Categories' : 'Selected Categories'}
                    </Typography>
                  </Grid>
                </>
              )}
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
              if (selectedCoupon) {
                onEdit(selectedCoupon);
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
            Are you sure you want to delete 
            {selectedCoupon?.type === 'buyxgety' 
              ? ` the promotion "${selectedCoupon?.name}"` 
              : ` the coupon "${selectedCoupon?.code}"`}?
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
            onClick={() => selectedCoupon && handleConfirmDelete(selectedCoupon.id)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}