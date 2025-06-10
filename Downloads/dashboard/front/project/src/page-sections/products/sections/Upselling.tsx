'use client';

import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TableSortLabel,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { UseFormReturn } from 'react-hook-form';
import type { CreateProductInput } from '@/lib/validations/product';

interface UpsellingProps {
  form: UseFormReturn<CreateProductInput>;
}

// Mock data for upselling opportunities
const upsellingData = [
  {
    id: 1, 
    productName: 'Basic Laptop',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=200',
    sku: 'LAP-001',
    currentVersion: 'Standard Edition',
    upgradeOption: 'Pro Edition',
    additionalFeatures: 'SSD Storage, 16GB RAM, Dedicated GPU',
    priceDifference: 299.99,
    recommendedFor: 'Power Users, Professionals',
    successRate: 65,
    status: 'active',
  },
  {
    id: 2, 
    productName: 'Wireless Earbuds',
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&q=80&w=200',
    sku: 'EAR-002',
    currentVersion: 'Basic Model',
    upgradeOption: 'Premium Model',
    additionalFeatures: 'Active Noise Cancellation, Longer Battery Life',
    priceDifference: 79.99,
    recommendedFor: 'Music Enthusiasts, Commuters',
    successRate: 78,
    status: 'active',
  },
  {
    id: 3,
    productName: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=200',
    sku: 'PHN-003',
    currentVersion: 'Base Model',
    upgradeOption: 'Pro Model',
    additionalFeatures: 'Better Camera, More Storage, Faster Processor',
    priceDifference: 199.99,
    recommendedFor: 'Photography Enthusiasts, Gamers',
    successRate: 55,
    status: 'active',
  },
  {
    id: 4,
    productName: 'Fitness Tracker',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b5?auto=format&fit=crop&q=80&w=200',
    sku: 'FIT-004',
    currentVersion: 'Basic Tracker',
    upgradeOption: 'Advanced Health Monitor',
    additionalFeatures: 'Heart Rate Monitoring, Sleep Analysis, GPS',
    priceDifference: 49.99,
    recommendedFor: 'Fitness Enthusiasts, Health Conscious',
    successRate: 72,
    status: 'inactive',
  },
  {
    id: 5,
    productName: 'Coffee Maker',
    image: 'https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?auto=format&fit=crop&q=80&w=200',
    sku: 'COF-005',
    currentVersion: 'Basic Brewer',
    upgradeOption: 'Premium Espresso Machine',
    additionalFeatures: 'Multiple Brewing Options, Milk Frother, Programmable',
    priceDifference: 149.99,
    recommendedFor: 'Coffee Enthusiasts, Home Baristas',
    successRate: 60,
    status: 'active',
  },
];

// Mock data for cross-selling opportunities
const crossSellingData = [
  {
    id: 1, 
    mainProduct: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=200',
    sku: 'PHN-001',
    complementaryProducts: ['Phone Case', 'Screen Protector', 'Charger'],
    bundleSavings: 15.99,
    compatibility: 'All Models',
    customerSegment: 'New Phone Buyers',
    conversionRate: 72,
    priorityLevel: 'high',
    status: 'active',
  },
  {
    id: 2, 
    mainProduct: 'DSLR Camera',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=200',
    sku: 'CAM-002',
    complementaryProducts: ['Camera Bag', 'Memory Card', 'Tripod'],
    bundleSavings: 45.99,
    compatibility: 'Universal',
    customerSegment: 'Photography Enthusiasts',
    conversionRate: 65,
    priorityLevel: 'medium',
    status: 'active',
  },
  {
    id: 3,
    mainProduct: 'Gaming Console',
    image: 'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?auto=format&fit=crop&q=80&w=200',
    sku: 'GAM-003',
    complementaryProducts: ['Extra Controller', 'Games', 'Headset'],
    bundleSavings: 35.99,
    compatibility: 'Console Specific',
    customerSegment: 'Gamers',
    conversionRate: 80,
    priorityLevel: 'high',
    status: 'active',
  },
  {
    id: 4,
    mainProduct: 'Laptop',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=200',
    sku: 'LAP-004',
    complementaryProducts: ['Laptop Bag', 'External Mouse', 'USB-C Hub'],
    bundleSavings: 25.99,
    compatibility: 'All Laptops',
    customerSegment: 'Students, Professionals',
    conversionRate: 68,
    priorityLevel: 'medium',
    status: 'inactive',
  },
  {
    id: 5,
    mainProduct: 'Running Shoes',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200',
    sku: 'SHO-005',
    complementaryProducts: ['Socks', 'Fitness Tracker', 'Water Bottle'],
    bundleSavings: 18.99,
    compatibility: 'Universal',
    customerSegment: 'Fitness Enthusiasts',
    conversionRate: 55,
    priorityLevel: 'low',
    status: 'active',
  },
];

export function Upselling({ form }: UpsellingProps) {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState<string>('successRate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [crossSortBy, setCrossSortBy] = useState<string>('conversionRate');
  const [crossSortOrder, setCrossSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (field: string) => {
    if (currentTab === 0) {
      if (sortBy === field) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortBy(field);
        setSortOrder('asc');
      }
    } else {
      if (crossSortBy === field) {
        setCrossSortOrder(crossSortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setCrossSortBy(field);
        setCrossSortOrder('asc');
      }
    }
  };

  // Filter and sort data
  const filteredUpsellingData = upsellingData.filter(item =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.currentVersion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.upgradeOption.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    const multiplier = sortOrder === 'asc' ? 1 : -1;
    if (typeof a[sortBy as keyof typeof a] === 'string') {
      return multiplier * (a[sortBy as keyof typeof a] as string).localeCompare(b[sortBy as keyof typeof b] as string);
    }
    return multiplier * ((a[sortBy as keyof typeof a] as number) - (b[sortBy as keyof typeof b] as number));
  });

  const filteredCrossSellingData = crossSellingData.filter(item =>
    item.mainProduct.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.customerSegment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.complementaryProducts.some(product => product.toLowerCase().includes(searchTerm.toLowerCase()))
  ).sort((a, b) => {
    const multiplier = crossSortOrder === 'asc' ? 1 : -1;
    if (typeof a[crossSortBy as keyof typeof a] === 'string') {
      return multiplier * (a[crossSortBy as keyof typeof a] as string).localeCompare(b[crossSortBy as keyof typeof b] as string);
    }
    return multiplier * ((a[crossSortBy as keyof typeof a] as number) - (b[crossSortBy as keyof typeof b] as number));
  });

  const paginatedUpsellingData = filteredUpsellingData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const paginatedCrossSellingData = filteredCrossSellingData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      <Paper variant="outlined" sx={{ mb: 3, width: '100%', overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <TextField
            fullWidth
            placeholder="Search products by name, SKU, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            size="small"
          />
        </Box>

        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Upselling Opportunities" />
          <Tab label="Cross-selling Opportunities" />
        </Tabs>

        <Box sx={{ p: 0 }}>
          {currentTab === 0 && (
            <TableContainer sx={{ overflowX: 'auto', maxWidth: '100%' }}>
              <Table sx={{ minWidth: 800 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'productName'}
                        direction={sortBy === 'productName' ? sortOrder : 'asc'}
                        onClick={() => handleSort('productName')}
                      >
                        Product
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'upgradeOption'}
                        direction={sortBy === 'upgradeOption' ? sortOrder : 'asc'}
                        onClick={() => handleSort('upgradeOption')}
                      >
                        Upgrade Option
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">
                      <TableSortLabel
                        active={sortBy === 'priceDifference'}
                        direction={sortBy === 'priceDifference' ? sortOrder : 'asc'}
                        onClick={() => handleSort('priceDifference')}
                      >
                        Price Difference
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">
                      <TableSortLabel
                        active={sortBy === 'successRate'}
                        direction={sortBy === 'successRate' ? sortOrder : 'asc'}
                        onClick={() => handleSort('successRate')}
                      >
                        Success Rate
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'status'}
                        direction={sortBy === 'status' ? sortOrder : 'asc'}
                        onClick={() => handleSort('status')}
                      >
                        Status
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedUpsellingData.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar
                            src={row.image}
                            alt={row.productName}
                            variant="rounded"
                            sx={{ width: 40, height: 40 }}
                          />
                          <Box>
                            <Typography variant="body2" fontWeight={500}>
                              {row.productName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              SKU: {row.sku}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{row.upgradeOption}</TableCell>
                      <TableCell align="right">
                        <Typography color="primary">
                          +${row.priceDifference.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          label={`${row.successRate}%`}
                          color={row.successRate >= 70 ? 'success' : row.successRate >= 40 ? 'warning' : 'error'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={row.status}
                          color={row.status === 'active' ? 'success' : 'default'}
                          size="small"
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredUpsellingData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          )}

          {currentTab === 1 && (
            <TableContainer sx={{ overflowX: 'auto', maxWidth: '100%' }}>
              <Table sx={{ minWidth: 800 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={crossSortBy === 'mainProduct'}
                        direction={crossSortBy === 'mainProduct' ? crossSortOrder : 'asc'}
                        onClick={() => handleSort('mainProduct')}
                      >
                        Main Product
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Complementary Products</TableCell>
                    <TableCell align="right">
                      <TableSortLabel
                        active={crossSortBy === 'bundleSavings'}
                        direction={crossSortBy === 'bundleSavings' ? crossSortOrder : 'asc'}
                        onClick={() => handleSort('bundleSavings')}
                      >
                        Bundle Savings
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">
                      <TableSortLabel
                        active={crossSortBy === 'conversionRate'}
                        direction={crossSortBy === 'conversionRate' ? crossSortOrder : 'asc'}
                        onClick={() => handleSort('conversionRate')}
                      >
                        Conversion Rate
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={crossSortBy === 'status'}
                        direction={crossSortBy === 'status' ? crossSortOrder : 'asc'}
                        onClick={() => handleSort('status')}
                      >
                        Status
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedCrossSellingData.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar
                            src={row.image}
                            alt={row.mainProduct}
                            variant="rounded"
                            sx={{ width: 40, height: 40 }}
                          />
                          <Box>
                            <Typography variant="body2" fontWeight={500}>
                              {row.mainProduct}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              SKU: {row.sku}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                          {row.complementaryProducts.map((product, index) => (
                            <Chip
                              key={index}
                              label={product}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Typography color="success.main">
                          ${row.bundleSavings.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          label={`${row.conversionRate}%`}
                          color={row.conversionRate >= 70 ? 'success' : row.conversionRate >= 40 ? 'warning' : 'error'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={row.status}
                          color={row.status === 'active' ? 'success' : 'default'}
                          size="small"
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredCrossSellingData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          )}
        </Box>
      </Paper>
    </Box>
  );
}