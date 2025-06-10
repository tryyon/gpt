'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  FilterList as FilterListIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { DataTable } from '@/global-components/common/DataTable';
import { PageTitle } from '@/global-components/layout/PageTitle';
import type { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

// Mock data for commission rules
const mockCommissionRules = [
  {
    id: '1',
    name: 'Standard Commission',
    type: 'percentage',
    value: 10,
    minOrderValue: 0,
    maxOrderValue: null,
    applicableFor: 'all_products',
    status: 'active',
    createdAt: '2024-03-15T10:30:00',
  },
  {
    id: '2',
    name: 'Premium Products',
    type: 'percentage',
    value: 15,
    minOrderValue: 1000,
    maxOrderValue: null,
    applicableFor: 'category',
    category: 'Electronics',
    status: 'active',
    createdAt: '2024-03-14T15:45:00',
  },
  {
    id: '3',
    name: 'Bulk Orders',
    type: 'fixed',
    value: 50,
    minOrderValue: 5000,
    maxOrderValue: null,
    applicableFor: 'all_products',
    status: 'inactive',
    createdAt: '2024-03-13T09:15:00',
  },
  {
    id: '4',
    name: 'New Customers',
    type: 'percentage',
    value: 12,
    minOrderValue: 0,
    maxOrderValue: 2000,
    applicableFor: 'customer_group',
    customerGroup: 'New Customers',
    status: 'active',
    createdAt: '2024-03-12T14:20:00',
  },
  {
    id: '5',
    name: 'Seasonal Promotion',
    type: 'percentage',
    value: 20,
    minOrderValue: 0,
    maxOrderValue: null,
    applicableFor: 'product',
    product: 'Summer Collection',
    status: 'scheduled',
    startDate: '2024-06-01T00:00:00',
    endDate: '2024-08-31T23:59:59',
    createdAt: '2024-03-11T11:10:00',
  },
];

// Mock data for commission payouts
const mockCommissionPayouts = [
  {
    id: '1',
    reseller: 'John Doe',
    amount: 1250.75,
    ordersCount: 15,
    period: 'March 2024',
    status: 'paid',
    paymentDate: '2024-04-05T10:30:00',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: '2',
    reseller: 'Jane Smith',
    amount: 875.50,
    ordersCount: 10,
    period: 'March 2024',
    status: 'pending',
    paymentDate: null,
    paymentMethod: null,
  },
  {
    id: '3',
    reseller: 'Robert Johnson',
    amount: 2100.25,
    ordersCount: 23,
    period: 'February 2024',
    status: 'paid',
    paymentDate: '2024-03-05T14:15:00',
    paymentMethod: 'PayPal',
  },
  {
    id: '4',
    reseller: 'Emily Davis',
    amount: 1560.80,
    ordersCount: 18,
    period: 'February 2024',
    status: 'paid',
    paymentDate: '2024-03-05T16:45:00',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: '5',
    reseller: 'Michael Wilson',
    amount: 950.30,
    ordersCount: 12,
    period: 'January 2024',
    status: 'paid',
    paymentDate: '2024-02-05T09:20:00',
    paymentMethod: 'Bank Transfer',
  },
];

export function CommissionOverview() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('rules');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Filter commission rules based on search term and status
  const filteredRules = mockCommissionRules.filter(rule => {
    const matchesSearch = rule.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || rule.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Filter commission payouts based on search term
  const filteredPayouts = mockCommissionPayouts.filter(payout => {
    return payout.reseller.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Commission Rules columns
  const rulesColumns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Rule Name',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value === 'percentage' ? 'Percentage' : 'Fixed Amount'}
          color={params.value === 'percentage' ? 'primary' : 'secondary'}
          variant="outlined"
          size="small"
        />
      ),
    },
    {
      field: 'value',
      headerName: 'Value',
      width: 120,
      renderCell: (params) => (
        <Typography>
          {params.row.type === 'percentage' ? `${params.value}%` : `$${params.value}`}
        </Typography>
      ),
    },
    {
      field: 'applicableFor',
      headerName: 'Applicable For',
      width: 150,
      renderCell: (params) => {
        let label = 'All Products';
        if (params.value === 'category') label = `Category: ${params.row.category}`;
        if (params.value === 'product') label = `Product: ${params.row.product}`;
        if (params.value === 'customer_group') label = `Group: ${params.row.customerGroup}`;
        
        return <Typography variant="body2">{label}</Typography>;
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => {
        let color: 'success' | 'error' | 'warning' = 'success';
        if (params.value === 'inactive') color = 'error';
        if (params.value === 'scheduled') color = 'warning';
        
        return (
          <Chip
            label={params.value}
            color={color}
            size="small"
            sx={{ textTransform: 'capitalize' }}
          />
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
            <IconButton size="small" color="primary">
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" color="error">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  // Commission Payouts columns
  const payoutsColumns: GridColDef[] = [
    {
      field: 'reseller',
      headerName: 'Reseller',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 120,
      renderCell: (params) => (
        <Typography fontWeight={500} color="success.main">
          ${params.value.toFixed(2)}
        </Typography>
      ),
    },
    {
      field: 'ordersCount',
      headerName: 'Orders',
      width: 100,
      align: 'center',
    },
    {
      field: 'period',
      headerName: 'Period',
      width: 120,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'paid' ? 'success' : 'warning'}
          size="small"
          sx={{ textTransform: 'capitalize' }}
        />
      ),
    },
    {
      field: 'paymentMethod',
      headerName: 'Payment Method',
      width: 150,
      renderCell: (params) => (
        <Typography>
          {params.value || 'Not paid yet'}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="View Details">
            <IconButton size="small" color="primary">
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {params.row.status === 'pending' && (
            <Tooltip title="Process Payment">
              <IconButton size="small" color="success">
                <AddIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <PageTitle 
        title="Commission Management" 
        subtitle="Manage commission rules and payouts"
      />

      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant={activeTab === 'rules' ? 'contained' : 'outlined'}
              onClick={() => setActiveTab('rules')}
            >
              Commission Rules
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={activeTab === 'payouts' ? 'contained' : 'outlined'}
              onClick={() => setActiveTab('payouts')}
            >
              Commission Payouts
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Card>
        <CardContent>
          <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              placeholder={`Search ${activeTab === 'rules' ? 'rules' : 'payouts'}...`}
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
              }}
              sx={{ minWidth: 300, flex: 1 }}
            />

            {activeTab === 'rules' && (
              <>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    label="Status"
                   startAdornment={<FilterListIcon color="action" sx={{ mr: 1 }} />}

                  >
                    <MenuItem value="all">All Statuses</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                    <MenuItem value="scheduled">Scheduled</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                >
                  Add Rule
                </Button>
              </>
            )}

            {activeTab === 'payouts' && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
              >
                Process Payouts
              </Button>
            )}
          </Box>

          {activeTab === 'rules' && (
            <DataTable
              rows={filteredRules}
              columns={rulesColumns}
              checkboxSelection
              onRowSelectionModelChange={(newSelectionModel: GridRowSelectionModel) => {
                setSelectedIds(newSelectionModel.map(id => id.toString()));
              }}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
                sorting: { sortModel: [{ field: 'createdAt', sort: 'desc' }] },
              }}
            />
          )}

          {activeTab === 'payouts' && (
            <DataTable
              rows={filteredPayouts}
              columns={payoutsColumns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
                sorting: { sortModel: [{ field: 'period', sort: 'desc' }] },
              }}
            />
          )}

          {selectedIds.length > 0 && activeTab === 'rules' && (
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
              >
                Delete Selected
              </Button>
              <Button
                variant="outlined"
              >
                Change Status
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}