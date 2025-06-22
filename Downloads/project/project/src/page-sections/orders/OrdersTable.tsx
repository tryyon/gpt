'use client';

import { useState } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { DataTable } from '@/global-components/common/DataTable';
import type { GridColDef } from '@mui/x-data-grid';
import type { Order } from '@/types/order';
import { useRouter } from 'next/navigation';
import { mockOrders } from './mockData';
import { OrdersToolbar } from './OrdersToolbar';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export function OrdersTable() {
  const [orders, setOrders] = useState(mockOrders);
  const [timeRange, setTimeRange] = useState('24h');
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState('');
  const router = useRouter();

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    // Here you would typically fetch orders for the selected time range
    console.log('Fetching orders for range:', range);
  };

  const columns: GridColDef[] = [
    {
      field: 'orderNumber',
      headerName: 'Order',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" fontWeight={500}>
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.orderBy}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'customer',
      headerName: 'Customer',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2">
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.email}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2">
          ${params.value.toFixed(2)}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => {
        const statusConfig: Record<string, { color: 'success' | 'warning' | 'error' | 'default', label: string }> = {
          completed: { color: 'success', label: 'Completed' },
          processing: { color: 'warning', label: 'Processing' },
          pending: { color: 'warning', label: 'Pending' },
          cancelled: { color: 'error', label: 'Cancelled' },
        };

        const status = params.value.toLowerCase();
        const config = statusConfig[status] || { color: 'default', label: status };

        return (
          <Chip
            label={config.label}
            color={config.color}
            size="small"
          />
        );
      },
    },
    {
      field: 'paymentStatus',
      headerName: 'Payment',
      width: 130,
      renderCell: (params) => {
        const statusConfig: Record<string, { color: 'success' | 'warning' | 'error', label: string }> = {
          paid: { color: 'success', label: 'Paid' },
          pending: { color: 'warning', label: 'Pending' },
          refunded: { color: 'error', label: 'Refunded' },
        };

        const status = params.value.toLowerCase();
        const config = statusConfig[status];

        return (
          <Chip
            label={config.label}
            color={config.color}
            size="small"
            variant="outlined"
          />
        );
      },
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 180,
      renderCell: (params) => {
        const date = new Date(params.value);
        return (
          <Box>
            <Typography variant="body2">
              {date.toLocaleDateString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {date.toLocaleTimeString()}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="View Details">
            <IconButton size="small" color="primary" onClick={() => router.push(`/dashboard/orders/${params.row.orderNumber}`)}>
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton 
              size="small" 
              onClick={() => {
                setSelectedOrder(params.row);
                setNewStatus(params.row.status);
                setOpenEditModal(true);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedOrder(null);
    setNewStatus('');
  };

  const handleSaveStatus = () => {
    if (selectedOrder && newStatus) {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.orderNumber === selectedOrder.orderNumber
            ? { ...order, status: newStatus } 
            : order
        )
      );
      handleCloseEditModal();
    }
  };

  return (
    <>
      <DataTable
        rows={orders}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
          sorting: {
            sortModel: [{ field: 'date', sort: 'desc' }],
          },
        }}
        slots={{
          toolbar: () => (
            <OrdersToolbar
              onTimeRangeChange={handleTimeRangeChange}
              orders={orders}
            />
          ),
        }}
      />

      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>Edit Order Status</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                value={newStatus}
                label="Status"
                onChange={(e) => setNewStatus(e.target.value as string)}
              >
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="processing">Processing</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal}>Cancel</Button>
          <Button onClick={handleSaveStatus} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}