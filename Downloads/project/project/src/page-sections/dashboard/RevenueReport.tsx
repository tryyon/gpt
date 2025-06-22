'use client';

import { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Tabs, 
  Tab, 
  TextField, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TablePagination,
  Chip,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  CircularProgress,
} from '@mui/material';
import { 
  ArrowUpward as ArrowUpwardIcon, 
  ArrowDownward as ArrowDownwardIcon,
  FileDownload as DownloadIcon,
  FilterList as FilterIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock data for revenue report
const generateMockData = (startDate: Date, endDate: Date) => {
  const data = [];
  const currentDate = new Date(startDate);
  const dayDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Generate daily data
  while (currentDate <= endDate) {
    const revenue = Math.floor(Math.random() * 5000) + 1000;
    const orders = Math.floor(Math.random() * 50) + 10;
    const avgOrderValue = revenue / orders;
    
    data.push({
      date: new Date(currentDate).toISOString().split('T')[0],
      revenue,
      orders,
      avgOrderValue: avgOrderValue.toFixed(2),
      refunds: Math.floor(Math.random() * 5),
      paymentMethod: Math.random() > 0.5 ? 'Credit Card' : Math.random() > 0.5 ? 'PayPal' : 'Bank Transfer',
      status: Math.random() > 0.9 ? 'Refunded' : Math.random() > 0.2 ? 'Completed' : 'Pending',
    });
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return data;
};

// Generate category data for pie chart
const generateCategoryData = () => {
  return [
    { name: 'Electronics', value: 4000 },
    { name: 'Clothing', value: 3000 },
    { name: 'Home & Kitchen', value: 2000 },
    { name: 'Books', value: 1500 },
    { name: 'Sports', value: 1000 },
  ];
};

// Generate payment method data for pie chart
const generatePaymentData = () => {
  return [
    { name: 'Credit Card', value: 5500 },
    { name: 'PayPal', value: 3500 },
    { name: 'Bank Transfer', value: 2000 },
    { name: 'Digital Wallet', value: 1500 },
  ];
};

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
      id={`revenue-tabpanel-${index}`}
      aria-labelledby={`revenue-tab-${index}`}
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

export function RevenueReport() {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState(0);
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [timeFrame, setTimeFrame] = useState('daily');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [salesData, setSalesData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [avgOrderValue, setAvgOrderValue] = useState(0);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [paymentData, setPaymentData] = useState<any[]>([]);

  // Colors for pie charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, timeFrame]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const start = new Date(startDate);
      const end = new Date(endDate);
      const data = generateMockData(start, end);
      
      // Calculate totals
      const revenue = data.reduce((sum, item) => sum + item.revenue, 0);
      const orders = data.reduce((sum, item) => sum + item.orders, 0);
      const avg = revenue / orders;
      
      setSalesData(data);
      setFilteredData(data);
      setTotalRevenue(revenue);
      setTotalOrders(orders);
      setAvgOrderValue(avg);
      setCategoryData(generateCategoryData());
      setPaymentData(generatePaymentData());
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleExport = () => {
    // Create CSV content
    const headers = ['Date', 'Revenue', 'Orders', 'Avg Order Value', 'Refunds', 'Payment Method', 'Status'];
    const rows = filteredData.map(item => [
      item.date,
      item.revenue,
      item.orders,
      item.avgOrderValue,
      item.refunds,
      item.paymentMethod,
      item.status
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `revenue_report_${startDate}_to_${endDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFilter = () => {
    fetchData();
  };

  // Aggregate data for charts based on timeframe
  const getChartData = () => {
    if (salesData.length === 0) return [];
    
    if (timeFrame === 'daily') {
      return salesData;
    }
    
    if (timeFrame === 'weekly') {
      const weeklyData: any = {};
      
      salesData.forEach(item => {
        const date = new Date(item.date);
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        const weekKey = weekStart.toISOString().split('T')[0];
        
        if (!weeklyData[weekKey]) {
          weeklyData[weekKey] = {
            date: `Week of ${weekKey}`,
            revenue: 0,
            orders: 0,
            refunds: 0,
          };
        }
        
        weeklyData[weekKey].revenue += item.revenue;
        weeklyData[weekKey].orders += item.orders;
        weeklyData[weekKey].refunds += item.refunds;
      });
      
      return Object.values(weeklyData).map((week: any) => ({
        ...week,
        avgOrderValue: (week.revenue / week.orders).toFixed(2),
      }));
    }
    
    if (timeFrame === 'monthly') {
      const monthlyData: any = {};
      
      salesData.forEach(item => {
        const monthKey = item.date.substring(0, 7); // YYYY-MM
        
        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = {
            date: monthKey,
            revenue: 0,
            orders: 0,
            refunds: 0,
          };
        }
        
        monthlyData[monthKey].revenue += item.revenue;
        monthlyData[monthKey].orders += item.orders;
        monthlyData[monthKey].refunds += item.refunds;
      });
      
      return Object.values(monthlyData).map((month: any) => ({
        ...month,
        avgOrderValue: (month.revenue / month.orders).toFixed(2),
      }));
    }
    
    return salesData;
  };

  const chartData = getChartData();

  return (
    <Box>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Revenue Report
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={3}>
              <TextField
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Time Frame</InputLabel>
                <Select
                  value={timeFrame}
                  label="Time Frame"
                  onChange={(e) => setTimeFrame(e.target.value)}
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ height: '56px' }}
                onClick={handleFilter}
                startIcon={<FilterIcon />}
              >
                Apply Filter
              </Button>
            </Grid>
          </Grid>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 2, 
                  textAlign: 'center',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                }}
              >
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Total Revenue
                </Typography>
                <Typography variant="h4" color="primary.main" sx={{ mb: 1 }}>
                  ${totalRevenue.toLocaleString()}
                </Typography>
                <Chip 
                  icon={<ArrowUpwardIcon />} 
                  label="12% vs. previous period" 
                  color="success" 
                  size="small"
                  variant="outlined"
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 2, 
                  textAlign: 'center',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                }}
              >
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Total Orders
                </Typography>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {totalOrders.toLocaleString()}
                </Typography>
                <Chip 
                  icon={<ArrowUpwardIcon />} 
                  label="8% vs. previous period" 
                  color="success" 
                  size="small"
                  variant="outlined"
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 2, 
                  textAlign: 'center',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                }}
              >
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Average Order Value
                </Typography>
                <Typography variant="h4" color="secondary.main" sx={{ mb: 1 }}>
                  ${avgOrderValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </Typography>
                <Chip 
                  icon={<ArrowUpwardIcon />} 
                  label="3% vs. previous period" 
                  color="success" 
                  size="small"
                  variant="outlined"
                />
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={handleTabChange} aria-label="revenue report tabs">
          <Tab label="Overview" />
          <Tab label="Sales Data" />
        </Tabs>
      </Box>

      <TabPanel value={currentTab} index={0}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Revenue Trend
                </Typography>
                <Box sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => {
                          if (timeFrame === 'monthly') {
                            return value.substring(5, 7) + '/' + value.substring(0, 4);
                          }
                          if (timeFrame === 'weekly') {
                            return value.substring(8, 10) + '/' + value.substring(5, 7);
                          }
                          return value.substring(5);
                        }}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <RechartsTooltip 
                        formatter={(value: any) => [`$${value}`, 'Revenue']}
                        labelFormatter={(label) => `Date: ${label}`}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke={theme.palette.primary.main} 
                        activeDot={{ r: 8 }}
                        name="Revenue"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  height: '100%',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Sales by Category
                </Typography>
                <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip formatter={(value: any) => [`$${value}`, 'Revenue']} />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  height: '100%',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Revenue by Payment Method
                </Typography>
                <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={paymentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {paymentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip formatter={(value: any) => [`$${value}`, 'Revenue']} />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Orders vs. Average Order Value
                </Typography>
                <Box sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => {
                          if (timeFrame === 'monthly') {
                            return value.substring(5, 7) + '/' + value.substring(0, 4);
                          }
                          if (timeFrame === 'weekly') {
                            return value.substring(8, 10) + '/' + value.substring(5, 7);
                          }
                          return value.substring(5);
                        }}
                      />
                      <YAxis 
                        yAxisId="left" 
                        orientation="left" 
                        stroke={theme.palette.primary.main}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        yAxisId="right" 
                        orientation="right" 
                        stroke={theme.palette.secondary.main}
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <RechartsTooltip />
                      <Legend />
                      <Bar 
                        yAxisId="left" 
                        dataKey="orders" 
                        fill={theme.palette.primary.main} 
                        name="Orders"
                      />
                      <Bar 
                        yAxisId="right" 
                        dataKey="avgOrderValue" 
                        fill={theme.palette.secondary.main} 
                        name="Avg Order Value"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}
      </TabPanel>

      <TabPanel value={currentTab} index={1}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleExport}
              >
                Export CSV
              </Button>
            </Box>
            
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Revenue</TableCell>
                    <TableCell align="right">Orders</TableCell>
                    <TableCell align="right">Avg Order Value</TableCell>
                    <TableCell align="right">Refunds</TableCell>
                    <TableCell>Payment Method</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.date}</TableCell>
                        <TableCell align="right">${row.revenue.toLocaleString()}</TableCell>
                        <TableCell align="right">{row.orders}</TableCell>
                        <TableCell align="right">${row.avgOrderValue}</TableCell>
                        <TableCell align="right">{row.refunds}</TableCell>
                        <TableCell>{row.paymentMethod}</TableCell>
                        <TableCell>
                          <Chip
                            label={row.status}
                            color={
                              row.status === 'Completed' ? 'success' :
                              row.status === 'Refunded' ? 'error' : 'warning'
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="View Details">
                            <IconButton size="small">
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Box>
        )}
      </TabPanel>
    </Box>
  );
}