'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
  TextField,
  InputAdornment,
  Chip,
  Menu,
  MenuItem,
  Button,
  Checkbox,
} from '@mui/material';
import { 
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Search as SearchIcon,
  ViewColumn as ViewColumnIcon,
} from '@mui/icons-material';
import { CustomersToolbar } from './CustomersToolbar';

// Mock data - Move to a separate file in production
const mockCustomers = [
  {
    id: '1',
    name: 'John Doe',
    gstNumber: 'GST123456789',
    gstType: 'Regular',
    address: {
      street: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India'
    },
    phone: '1234567890',
    email: 'john@example.com',
    registrationDate: '2024-03-15T10:30:00',
    status: 'active',
    totalOrders: 15,
    totalSpent: 2499.99,
  },
  {
    id: '2',
    name: 'Jane Smith',
    gstNumber: 'GST987654321',
    gstType: 'Composition',
    address: {
      street: '456 Park Ave',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
      country: 'India'
    },
    phone: '9876543210',
    email: 'jane@example.com',
    registrationDate: '2024-03-14T15:45:00',
    status: 'active',
    totalOrders: 8,
    totalSpent: 1299.99,
  },
];

interface Column {
  id: string;
  label: string;
  visible: boolean;
}

const defaultColumns: Column[] = [
  { id: 'name', label: 'Customer Name', visible: true },
  { id: 'gst', label: 'GST Information', visible: true },
  { id: 'contact', label: 'Contact Information', visible: true },
  { id: 'address', label: 'Address', visible: true },
  { id: 'orders', label: 'Orders & Revenue', visible: true },
  { id: 'status', label: 'Status', visible: true },
  { id: 'actions', label: 'Actions', visible: true },
];

interface CustomersTableProps {
  onEditCustomer: (customer: any) => void;
}

export function CustomersTable({ onEditCustomer }: CustomersTableProps) {
  const theme = useTheme();
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string>('registrationDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [columns, setColumns] = useState(defaultColumns);
  const [columnMenuAnchor, setColumnMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleColumnToggle = (columnId: string) => {
    setColumns(prev => 
      prev.map(col => 
        col.id === columnId ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const handleViewDetails = (customerId: string) => {
    router.push(`/dashboard/customers/${customerId}`);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = filteredAndSortedCustomers.map(customer => customer.id);
      setSelectedCustomers(newSelected);
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleSelectCustomer = (customerId: string) => {
    const selectedIndex = selectedCustomers.indexOf(customerId);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selectedCustomers, customerId];
    } else {
      newSelected = selectedCustomers.filter(id => id !== customerId);
    }

    setSelectedCustomers(newSelected);
  };

  const isSelected = (customerId: string) => selectedCustomers.indexOf(customerId) !== -1;

  const filteredAndSortedCustomers = mockCustomers
    .filter(customer => 
      Object.values(customer).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a: any, b: any) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      if (typeof a[sortBy] === 'string') {
        return multiplier * a[sortBy].localeCompare(b[sortBy]);
      }
      return multiplier * (a[sortBy] - b[sortBy]);
    });

  const paginatedCustomers = filteredAndSortedCustomers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const formatAddress = (address: any) => {
    return [
      address.street,
      address.city,
      address.state,
      address.pincode,
      address.country
    ].filter(Boolean).join(', ');
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            startIcon={<ViewColumnIcon />}
            onClick={(e) => setColumnMenuAnchor(e.currentTarget)}
          >
            Columns
          </Button>
        </Box>
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedCustomers.length > 0 && selectedCustomers.length < filteredAndSortedCustomers.length}
                    checked={filteredAndSortedCustomers.length > 0 && selectedCustomers.length === filteredAndSortedCustomers.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                {columns.filter(col => col.visible).map((column) => (
                  <TableCell key={column.id}>
                    <TableSortLabel
                      active={sortBy === column.id}
                      direction={sortBy === column.id ? sortOrder : 'asc'}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCustomers.map((customer) => {
                const isItemSelected = isSelected(customer.id);
                
                return (
                  <TableRow 
                    hover 
                    key={customer.id}
                    onClick={() => handleViewDetails(customer.id)}
                    sx={{ cursor: 'pointer' }}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectCustomer(customer.id);
                        }}
                      />
                    </TableCell>
                    {columns.find(col => col.id === 'name')?.visible && (
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              bgcolor: theme.palette.primary.main,
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 500,
                              fontSize: '1rem',
                            }}
                          >
                            {customer.name.charAt(0)}
                          </Box>
                          <Box>
                            <Typography variant="subtitle2">
                              {customer.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Registered: {new Date(customer.registrationDate).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                    )}

                    {columns.find(col => col.id === 'gst')?.visible && (
                      <TableCell>
                        <Typography variant="body2">
                          {customer.gstNumber}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Type: {customer.gstType}
                        </Typography>
                      </TableCell>
                    )}

                    {columns.find(col => col.id === 'contact')?.visible && (
                      <TableCell>
                        <Typography variant="body2">
                          {customer.phone}
                        </Typography>
                        <Typography variant="body2">
                          {customer.email}
                        </Typography>
                      </TableCell>
                    )}

                    {columns.find(col => col.id === 'address')?.visible && (
                      <TableCell>
                        <Typography variant="body2">
                          {formatAddress(customer.address)}
                        </Typography>
                      </TableCell>
                    )}

                    {columns.find(col => col.id === 'orders')?.visible && (
                      <TableCell>
                        <Typography variant="body2">
                          {customer.totalOrders} orders
                        </Typography>
                        <Typography variant="body2" color="primary">
                          ${customer.totalSpent.toFixed(2)} total spent
                        </Typography>
                      </TableCell>
                    )}

                    {columns.find(col => col.id === 'status')?.visible && (
                      <TableCell>
                        <Chip
                          label={customer.status}
                          color={customer.status === 'active' ? 'success' : 'default'}
                          size="small"
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </TableCell>
                    )}

                    {columns.find(col => col.id === 'actions')?.visible && (
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="View Details">
                            <IconButton 
                              size="small" 
                              color="primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewDetails(customer.id);
                              }}
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton 
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                onEditCustomer(customer);
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredAndSortedCustomers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>

      <Menu
        anchorEl={columnMenuAnchor}
        open={Boolean(columnMenuAnchor)}
        onClose={() => setColumnMenuAnchor(null)}
      >
        {columns.map((column) => (
          <MenuItem 
            key={column.id}
            onClick={() => handleColumnToggle(column.id)}
          >
            <Checkbox 
              checked={column.visible}
              size="small"
            />
            {column.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}