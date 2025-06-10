'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Alert,
  Snackbar,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Paper,
  Autocomplete,
} from '@mui/material';
import {
  Campaign as CampaignIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as MoneyIcon,
  BarChart as BarChartIcon,
  Category as CategoryIcon,
  Inventory as ProductIcon,
  MenuBook as MenuBookIcon,
} from '@mui/icons-material';
import { DataTable } from '@/global-components/common/DataTable';
import type { GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';

// Mock data for campaigns
const mockCampaigns = [
  {
    id: '1',
    name: 'Summer Sale Promotion',
    type: 'display',
    status: 'active',
    budget: 500,
    spent: 320.45,
    impressions: 15420,
    clicks: 423,
    ctr: 2.74,
    startDate: '2024-06-01',
    endDate: '2024-06-30',
    targetAudience: ['all', 'returning'],
    productScope: 'all',
    selectedCategories: [],
    selectedProducts: [],
  },
  {
    id: '2',
    name: 'New Product Launch',
    type: 'search',
    status: 'active',
    budget: 1000,
    spent: 645.78,
    impressions: 28750,
    clicks: 892,
    ctr: 3.10,
    startDate: '2024-05-15',
    endDate: '2024-06-15',
    targetAudience: ['new'],
    productScope: 'specific_products',
    selectedCategories: [],
    selectedProducts: ['New Summer Collection T-Shirt', 'Designer Sunglasses'],
  },
  {
    id: '3',
    name: 'Holiday Special',
    type: 'display',
    status: 'scheduled',
    budget: 750,
    spent: 0,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    startDate: '2024-12-01',
    endDate: '2024-12-25',
    targetAudience: ['all'],
    productScope: 'categories',
    selectedCategories: ['Holiday Gifts', 'Winter Collection'],
    selectedProducts: [],
  },
  {
    id: '4',
    name: 'Clearance Sale',
    type: 'remarketing',
    status: 'ended',
    budget: 300,
    spent: 300,
    impressions: 12540,
    clicks: 378,
    ctr: 3.01,
    startDate: '2024-04-01',
    endDate: '2024-04-15',
    targetAudience: ['cart_abandoners'],
    productScope: 'all',
    selectedCategories: [],
    selectedProducts: [],
  },
];

// Mock data for campaign stats
const campaignStats = [
  { title: 'Active Campaigns', value: 2, icon: <CampaignIcon />, color: 'primary.main' },
  { title: 'Total Impressions', value: '44.2K', icon: <VisibilityIcon />, color: 'success.main' },
  { title: 'Total Clicks', value: '1.3K', icon: <TrendingUpIcon />, color: 'warning.main' },
  { title: 'Total Spent', value: '$966.23', icon: <MoneyIcon />, color: 'error.main' },
];

// Mock data for product categories
const mockCategories = [
  'Electronics',
  'Clothing',
  'Home & Kitchen',
  'Beauty & Personal Care',
  'Sports & Outdoors',
  'Toys & Games',
  'Books',
  'Jewelry',
  'Automotive',
  'Health & Wellness',
  'Office Supplies',
  'Pet Supplies',
  'Holiday Gifts',
  'Winter Collection',
  'Summer Collection',
];

// Mock data for products
const mockProducts = [
  'Smartphone X Pro',
  'Wireless Headphones',
  'Smart Watch Series 5',
  'Laptop Pro 16"',
  'Men\'s Casual T-Shirt',
  'Women\'s Running Shoes',
  'Kitchen Blender',
  'Organic Face Cream',
  'Yoga Mat',
  'Board Game Collection',
  'Bestselling Novel',
  'Sterling Silver Necklace',
  'Car Phone Mount',
  'Multivitamin Supplements',
  'Ergonomic Office Chair',
  'Dog Food Premium',
  'New Summer Collection T-Shirt',
  'Designer Sunglasses',
];

// Mock data for brochures
const mockBrochures = [
  {
    id: '1',
    title: 'Summer Catalog 2024',
    pages: 12,
    imageUrl: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-05-15',
    displayDays: 30
  },
  {
    id: '2',
    title: 'New Arrivals - Spring Collection',
    pages: 8,
    imageUrl: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-04-10',
    displayDays: 15
  },
  {
    id: '3',
    title: 'Holiday Gift Guide',
    pages: 16,
    imageUrl: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&q=80&w=1000',
    createdAt: '2024-03-20',
    displayDays: 45
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`campaign-tabpanel-${index}`}
      aria-labelledby={`campaign-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export function AdvertiseOverview() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any | null>(null);
  const [targetAudience, setTargetAudience] = useState<string[]>([]);
  const [productScope, setProductScope] = useState('all');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedBrochure, setSelectedBrochure] = useState<string | null>(null);
  const [displayDays, setDisplayDays] = useState<number>(7);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleCreateCampaign = () => {
    setSelectedCampaign(null);
    setTargetAudience([]);
    setProductScope('all');
    setSelectedCategories([]);
    setSelectedProducts([]);
    setSelectedBrochure(null);
    setIsFormOpen(true);
  };

  const handleAddBrochure = () => {
    router.push('/dashboard/advertise/brochures');
  };

  const calculateBrochurePrice = (brochureId: string | null, days: number) => {
    if (!brochureId) return 0;
    
    const brochure = mockBrochures.find(b => b.id === brochureId);
    if (!brochure) return 0;
    
    // Base price: $10 per page per day
    const basePrice = 10;
    return brochure.pages * days * basePrice;
  };

  const handleDaysChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const days = parseInt(event.target.value) || 7;
    setDisplayDays(days);
  };

  const handleEditCampaign = (campaign: any) => {
    setSelectedCampaign(campaign);
    setTargetAudience(campaign.targetAudience || []);
    setProductScope(campaign.productScope || 'all');
    setSelectedCategories(campaign.selectedCategories || []);
    setSelectedProducts(campaign.selectedProducts || []);
    setSelectedBrochure(campaign.brochureId || null);
    setIsFormOpen(true);
  };

  const handleDeleteCampaign = (campaignId: string) => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== campaignId));
    setSnackbar({
      open: true,
      message: 'Campaign deleted successfully',
      severity: 'success',
    });
  };

  const handleSaveCampaign = (formData: any) => {
    const campaignData = {
      ...formData,
      targetAudience,
      productScope,
      selectedCategories,
      selectedProducts,
      brochureId: selectedBrochure,
    };

    if (selectedCampaign) {
      // Update existing campaign
      setCampaigns(prev => prev.map(campaign => 
        campaign.id === selectedCampaign.id ? { ...campaign, ...campaignData } : campaign
      ));
      setSnackbar({
        open: true,
        message: 'Campaign updated successfully',
        severity: 'success',
      });
    } else {
      // Create new campaign
      const newCampaign = {
        id: Date.now().toString(),
        ...campaignData,
        spent: 0,
        impressions: 0,
        clicks: 0,
        ctr: 0,
      };
      setCampaigns(prev => [...prev, newCampaign]);
      setSnackbar({
        open: true,
        message: 'Campaign created successfully',
        severity: 'success',
      });
    }
    setIsFormOpen(false);
  };

  const handleTargetAudienceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetAudience(event.target.value as unknown as string[]);
  };

  const handleProductScopeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductScope(event.target.value);
    // Reset selections when changing scope
    if (event.target.value === 'all') {
      setSelectedCategories([]);
      setSelectedProducts([]);
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    if (currentTab === 0) return true; // All campaigns
    if (currentTab === 1) return campaign.status === 'active';
    if (currentTab === 2) return campaign.status === 'scheduled';
    if (currentTab === 3) return campaign.status === 'ended';
    return true;
  }).filter(campaign => 
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Campaign',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight={500}>
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
            {params.row.type} campaign
          </Typography>
        </Box>
      ),
    },
    {
      field: 'budget',
      headerName: 'Budget',
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2">
          ${params.value}
        </Typography>
      ),
    },
    {
      field: 'spent',
      headerName: 'Spent',
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2">
          ${params.value.toFixed(2)}
        </Typography>
      ),
    },
    {
      field: 'impressions',
      headerName: 'Impressions',
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.value.toLocaleString()}
        </Typography>
      ),
    },
    {
      field: 'clicks',
      headerName: 'Clicks',
      width: 100,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.value.toLocaleString()}
        </Typography>
      ),
    },
    {
      field: 'ctr',
      headerName: 'CTR',
      width: 80,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.value.toFixed(2)}%
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => {
        const statusColors: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
          active: 'success',
          scheduled: 'warning',
          ended: 'error',
          paused: 'default',
        };
        
        return (
          <Chip
            label={params.value}
            color={statusColors[params.value] || 'default'}
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
          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={() => handleEditCampaign(params.row)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              onClick={() => handleDeleteCampaign(params.row.id)}
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
    <Box>
      {/* Campaign Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {campaignStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box 
                    sx={{ 
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: `${stat.color}15`, 
                      color: stat.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="caption" color="text.secondary">
                      {/* Removed stat.change since it's not defined in the stat type */}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextField
            placeholder="Search campaigns..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<MenuBookIcon />}
              onClick={handleAddBrochure}
            >
              Manage Brochures
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateCampaign}
            >
              Create Campaign
            </Button>
          </Box>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab label="All Campaigns" />
            <Tab label="Active" />
            <Tab label="Scheduled" />
            <Tab label="Ended" />
          </Tabs>
        </Box>

        <TabPanel value={currentTab} index={0}>
          <DataTable
            rows={filteredCampaigns}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 10 } },
              sorting: { sortModel: [{ field: 'startDate', sort: 'desc' }] },
            }}
          />
        </TabPanel>

        <TabPanel value={currentTab} index={1}>
          <DataTable
            rows={filteredCampaigns}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 10 } },
              sorting: { sortModel: [{ field: 'startDate', sort: 'desc' }] },
            }}
          />
        </TabPanel>

        <TabPanel value={currentTab} index={2}>
          <DataTable
            rows={filteredCampaigns}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 10 } },
              sorting: { sortModel: [{ field: 'startDate', sort: 'desc' }] },
            }}
          />
        </TabPanel>

        <TabPanel value={currentTab} index={3}>
          <DataTable
            rows={filteredCampaigns}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 10 } },
              sorting: { sortModel: [{ field: 'startDate', sort: 'desc' }] },
            }}
          />
        </TabPanel>
      </Card>

      {/* Campaign Form Dialog */}
      <Dialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedCampaign ? 'Edit Campaign' : 'Create New Campaign'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Campaign Name"
              fullWidth
              defaultValue={selectedCampaign?.name || ''}
              required
            />

            <FormControl fullWidth required>
              <InputLabel>Campaign Type</InputLabel>
              <Select
                label="Campaign Type"
                defaultValue={selectedCampaign?.type || 'display'}
              >
                <MenuItem value="display">Display Campaign</MenuItem>
                <MenuItem value="search">Search Campaign</MenuItem>
                <MenuItem value="remarketing">Remarketing Campaign</MenuItem>
                <MenuItem value="social">Social Media Campaign</MenuItem>
              </Select>
            </FormControl>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Start Date"
                  type="date"
                  fullWidth
                  defaultValue={selectedCampaign?.startDate || new Date().toISOString().split('T')[0]}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="End Date"
                  type="date"
                  fullWidth
                  defaultValue={selectedCampaign?.endDate || ''}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
            </Grid>

            <TextField
              label="Budget"
              type="number"
              fullWidth
              defaultValue={selectedCampaign?.budget || ''}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              required
            />

            <FormControl fullWidth required>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                defaultValue={selectedCampaign?.status || 'scheduled'}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="scheduled">Scheduled</MenuItem>
                <MenuItem value="paused">Paused</MenuItem>
                <MenuItem value="ended">Ended</MenuItem>
              </Select>
            </FormControl>

            <Divider />

            <Typography variant="subtitle1">Campaign Targeting</Typography>

            <FormControl fullWidth>
              <InputLabel>Target Audience</InputLabel>
              <Select
                multiple
                value={targetAudience}
                onChange={(event) => setTargetAudience(event.target.value as string[])}
                label="Target Audience"
              >
                <MenuItem value="all">All Visitors</MenuItem>
                <MenuItem value="new">New Visitors</MenuItem>
                <MenuItem value="returning">Returning Visitors</MenuItem>
                <MenuItem value="cart_abandoners">Cart Abandoners</MenuItem>
                <MenuItem value="previous_buyers">Previous Customers</MenuItem>
              </Select>
            </FormControl>

            <Divider />

            <Typography variant="subtitle1">Brochure Selection</Typography>
            
            <FormControl fullWidth>
              <InputLabel>Select Brochure</InputLabel>
              <Select
                value={selectedBrochure || ''}
                onChange={(e) => setSelectedBrochure(e.target.value)}
                label="Select Brochure"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {mockBrochures.map((brochure) => (
                  <MenuItem key={brochure.id} value={brochure.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        component="img"
                        src={brochure.imageUrl}
                        alt={brochure.title}
                        sx={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 1 }}
                      />
                      <Box>
                        <Typography variant="body2">{brochure.title}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {brochure.pages} pages • Created: {new Date(brochure.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedBrochure && (
              <>
                <TextField
                  label="Display Duration (Days)"
                  type="number"
                  fullWidth
                  value={displayDays}
                  onChange={handleDaysChange}
                  InputProps={{ inputProps: { min: 1 } }}
                  helperText="How many days to display your brochure"
                />
                
                <Paper variant="outlined" sx={{ p: 3, bgcolor: 'background.default' }}>
                  <Typography variant="h6" gutterBottom>
                    Pricing Summary
                  </Typography>
                  {(() => {
                    const selectedBrochureData = mockBrochures.find(b => b.id === selectedBrochure);
                    const pages = selectedBrochureData?.pages || 0;
                    const price = calculateBrochurePrice(selectedBrochure, displayDays);
                    
                    return (
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Brochure:
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">
                            {selectedBrochureData?.title}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Number of Pages:
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">
                            {pages} {pages === 1 ? 'page' : 'pages'}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Display Duration:
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">
                            {displayDays} {displayDays === 1 ? 'day' : 'days'}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Price per Page per Day:
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">
                            $10.00
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider sx={{ my: 1 }} />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            Total Price:
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
                            ${price.toFixed(2)}
                          </Typography>
                        </Grid>
                      </Grid>
                    );
                  })()}
                </Paper>
              </>
            )}

            {!selectedBrochure && (
              <>
                <Divider />

                <Typography variant="subtitle1">Product Selection</Typography>
                
                <FormControl component="fieldset">
                  <RadioGroup
                    value={productScope}
                    onChange={handleProductScopeChange}
                  >
                    <FormControlLabel 
                      value="all" 
                      control={<Radio />} 
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography>All Products</Typography>
                          <Typography variant="caption" color="text.secondary">
                            (Campaign will apply to your entire catalog)
                          </Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel 
                      value="categories" 
                      control={<Radio />} 
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography>Specific Categories</Typography>
                          <CategoryIcon fontSize="small" color="action" />
                        </Box>
                      }
                    />
                    <FormControlLabel 
                      value="specific_products" 
                      control={<Radio />} 
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography>Specific Products</Typography>
                          <ProductIcon fontSize="small" color="action" />
                        </Box>
                      }
                    />
                  </RadioGroup>
                </FormControl>

                {productScope === 'categories' && (
                  <Autocomplete
                    multiple
                    options={mockCategories}
                    value={selectedCategories}
                    onChange={(_, newValue) => setSelectedCategories(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Categories"
                        placeholder="Search and select categories"
                        required
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          label={option}
                          {...getTagProps({ index })}
                          key={option}
                        />
                      ))
                    }
                  />
                )}

                {productScope === 'specific_products' && (
                  <Autocomplete
                    multiple
                    options={mockProducts}
                    value={selectedProducts}
                    onChange={(_, newValue) => setSelectedProducts(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Products"
                        placeholder="Search and select products"
                        required
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          label={option}
                          {...getTagProps({ index })}
                          key={option}
                        />
                      ))
                    }
                  />
                )}
              </>
            )}

            <Alert severity="info">
              Advanced targeting options like demographics, interests, and behavior are available in the campaign dashboard after creation.
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsFormOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => handleSaveCampaign({
              name: 'New Test Campaign',
              type: 'display',
              status: 'scheduled',
              budget: 500,
              startDate: new Date().toISOString().split('T')[0],
              endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            })}
          >
            {selectedCampaign ? 'Save Changes' : 'Create Campaign'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}