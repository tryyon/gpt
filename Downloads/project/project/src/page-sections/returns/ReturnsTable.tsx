'use client';

import { useState } from 'react';
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
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Divider,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  Tabs,
  Tab,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  InputAdornment,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  CheckCircle as ApproveIcon,
  Cancel as DeclineIcon,
  LocalShipping as ShippingIcon,
  Inventory as ProductIcon,
  Person as CustomerIcon,
  PlayArrow as PlayIcon,
  Timeline as TimelineIcon,
  Image as ImageIcon,
  Email as EmailIcon,
  Print as PrintIcon,
  Assignment as AssignmentIcon,
  AttachMoney as RefundIcon,
} from '@mui/icons-material';
import { DataTable } from '@/global-components/common/DataTable';
import type { GridColDef } from '@mui/x-data-grid';

// Mock data with media
const mockReturns = [
  {
    id: 'RET001',
    orderId: 'ORD123',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      address: '123 Main St, Mumbai, 400001',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    product: {
      name: 'Nike Air Max',
      sku: 'NKE-AM-001',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    },
    reason: 'Wrong Size',
    description: 'Ordered size 10, need size 11',
    requestDate: '2024-03-15T10:30:00',
    status: 'pending',
    returnShipping: {
      method: 'Standard',
      trackingNumber: null,
      estimatedDelivery: null,
      returnAddress: 'Warehouse 1, Industrial Area, Mumbai, 400001',
    },
    media: {
      productImages: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
        'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
      ],
      unboxingVideo: 'https://example.com/video.mp4', // This would be a real video URL in production
    },
    timeline: [
      { date: '2024-03-15T10:30:00', status: 'Return Requested', comment: 'Customer initiated return request' },
      { date: '2024-03-15T10:35:00', status: 'Under Review', comment: 'Return request is being reviewed' },
    ],
  },
  {
    id: 'RET002',
    orderId: 'ORD124',
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '9876543210',
      address: '456 Park Ave, Delhi, 110001',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    product: {
      name: "Levi's 501",
      sku: 'LEV-501-002',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0',
    },
    reason: 'Defective',
    description: 'Seam is coming apart on the right side',
    requestDate: '2024-03-14T15:45:00',
    status: 'approved',
    returnShipping: {
      method: 'Express',
      trackingNumber: 'TRK123456789',
      estimatedDelivery: '2024-03-18',
      returnAddress: 'Warehouse 1, Industrial Area, Mumbai, 400001',
    },
    media: {
      productImages: [
        'https://images.unsplash.com/photo-1576995853123-5a10305d93c0',
        'https://images.unsplash.com/photo-1582552938357-32b906df40cb',
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246',
      ],
      unboxingVideo: 'https://example.com/video2.mp4',
    },
    timeline: [
      { date: '2024-03-14T15:45:00', status: 'Return Requested', comment: 'Customer initiated return request' },
      { date: '2024-03-14T16:00:00', status: 'Under Review', comment: 'Return request is being reviewed' },
      { date: '2024-03-14T16:30:00', status: 'Approved', comment: 'Return request approved' },
    ],
  },
  {
    id: 'RET003',
    orderId: 'ORD125',
    customer: {
      name: 'Robert Johnson',
      email: 'robert@example.com',
      phone: '5551234567',
      address: '789 Oak St, Bangalore, 560001',
      avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    product: {
      name: "Wireless Headphones",
      sku: 'WH-003',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    },
    reason: 'Not As Described',
    description: 'Battery life is much shorter than advertised',
    requestDate: '2024-03-13T09:15:00',
    status: 'rejected',
    returnShipping: {
      method: 'N/A',
      trackingNumber: null,
      estimatedDelivery: null,
      returnAddress: 'N/A',
    },
    media: {
      productImages: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944',
      ],
      unboxingVideo: null,
    },
    timeline: [
      { date: '2024-03-13T09:15:00', status: 'Return Requested', comment: 'Customer initiated return request' },
      { date: '2024-03-13T10:30:00', status: 'Under Review', comment: 'Return request is being reviewed' },
      { date: '2024-03-13T14:45:00', status: 'Rejected', comment: 'Return request rejected - product was used beyond trial period' },
    ],
  },
  {
    id: 'RET004',
    orderId: 'ORD126',
    customer: {
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      phone: '7778889999',
      address: '321 Pine St, Chennai, 600001',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    product: {
      name: "Smart Watch",
      sku: 'SW-004',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    },
    reason: 'Changed Mind',
    description: 'Found a better option elsewhere',
    requestDate: '2024-03-12T11:20:00',
    status: 'completed',
    returnShipping: {
      method: 'Standard',
      trackingNumber: 'TRK987654321',
      estimatedDelivery: '2024-03-16',
      returnAddress: 'Warehouse 1, Industrial Area, Mumbai, 400001',
    },
    media: {
      productImages: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      ],
      unboxingVideo: null,
    },
    timeline: [
      { date: '2024-03-12T11:20:00', status: 'Return Requested', comment: 'Customer initiated return request' },
      { date: '2024-03-12T12:00:00', status: 'Under Review', comment: 'Return request is being reviewed' },
      { date: '2024-03-12T13:30:00', status: 'Approved', comment: 'Return request approved' },
      { date: '2024-03-14T09:45:00', status: 'Item Received', comment: 'Return item received at warehouse' },
      { date: '2024-03-14T14:20:00', status: 'Refund Processed', comment: 'Refund of $199.99 processed to customer' },
      { date: '2024-03-14T14:25:00', status: 'Completed', comment: 'Return process completed' },
    ],
  },
];

export function ReturnsTable() {
  const theme = useTheme();
  const [returns, setReturns] = useState(mockReturns);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string>('requestDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedReturn, setSelectedReturn] = useState<any | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [declineDialogOpen, setDeclineDialogOpen] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<string>('standard');
  const [refundAmount, setRefundAmount] = useState('');
  const [comments, setComments] = useState('');
  const [declineReason, setDeclineReason] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [alertMessage, setAlertMessage] = useState<{text: string, type: 'success' | 'error' | 'info'} | null>(null);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleViewDetails = (returnItem: any) => {
    setSelectedReturn(returnItem);
    setDetailsOpen(true);
    setCurrentTab(0);
  };

  const handleApproveReturn = (returnItem: any) => {
    setSelectedReturn(returnItem);
    setRefundAmount(returnItem.product.price.toString());
    setApproveDialogOpen(true);
  };

  const handleDeclineReturn = (returnItem: any) => {
    setSelectedReturn(returnItem);
    setDeclineDialogOpen(true);
  };

  const handleSubmitApproval = () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update the return status
      const updatedReturns = returns.map(item => 
        item.id === selectedReturn?.id 
          ? { 
              ...item, 
              status: 'approved',
              timeline: [
                ...item.timeline,
                { 
                  date: new Date().toISOString(), 
                  status: 'Approved', 
                  comment: comments || 'Return request approved' 
                }
              ]
            } 
          : item
      );
      
      setReturns(updatedReturns);
      setApproveDialogOpen(false);
      setAlertMessage({
        text: 'Return has been approved successfully',
        type: 'success'
      });
      setIsProcessing(false);
    }, 1500);
  };

  const handleSubmitDecline = () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update the return status
      const updatedReturns = returns.map(item => 
        item.id === selectedReturn?.id 
          ? { 
              ...item, 
              status: 'rejected',
              timeline: [
                ...item.timeline,
                { 
                  date: new Date().toISOString(), 
                  status: 'Rejected', 
                  comment: declineReason || 'Return request rejected' 
                }
              ]
            } 
          : item
      );
      
      setReturns(updatedReturns);
      setDeclineDialogOpen(false);
      setAlertMessage({
        text: 'Return has been declined',
        type: 'info'
      });
      setIsProcessing(false);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      case 'completed':
        return 'info';
      default:
        return 'default';
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Return ID',
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 500 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'orderId',
      headerName: 'Order ID',
      width: 120,
    },
    {
      field: 'customer',
      headerName: 'Customer',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={params.value.avatar} alt={params.value.name} />
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {params.value.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.value.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'product',
      headerName: 'Product',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            component="img"
            src={params.value.image}
            alt={params.value.name}
            sx={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 1 }}
          />
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {params.value.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ${params.value.price.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'reason',
      headerName: 'Reason',
      width: 150,
    },
    {
      field: 'requestDate',
      headerName: 'Date',
      width: 180,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2">
            {new Date(params.value).toLocaleDateString()}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(params.value).toLocaleTimeString()}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value)}
          size="small"
          sx={{ textTransform: 'capitalize' }}
        />
      ),
    },
    {
      field: 'media',
      headerName: 'Media',
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip
            label={`${params.value.productImages.length} Photos`}
            size="small"
            variant="outlined"
          />
          {params.value.unboxingVideo && (
            <Chip
              icon={<PlayIcon />}
              label="Video"
              size="small"
              variant="outlined"
              color="primary"
            />
          )}
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
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
          {params.row.status === 'pending' && (
            <>
              <Tooltip title="Approve Return">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApproveReturn(params.row);
                  }}
                  color="success"
                >
                  <ApproveIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Decline Return">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeclineReturn(params.row);
                  }}
                  color="error"
                >
                  <DeclineIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <DataTable
        rows={returns}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 10 } },
          sorting: { sortModel: [{ field: 'requestDate', sort: 'desc' }] },
        }}
      />

      {/* Return Details Dialog */}
      <Dialog 
        open={detailsOpen} 
        onClose={() => setDetailsOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Return Details - {selectedReturn?.id}
            </Typography>
            <Chip
              label={selectedReturn?.status}
              color={getStatusColor(selectedReturn?.status)}
              sx={{ textTransform: 'capitalize' }}
            />
          </Box>
        </DialogTitle>
        
        <Tabs
          value={currentTab}
          onChange={(_, newValue) => setCurrentTab(newValue)}
          sx={{ px: 3, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Overview" icon={<VisibilityIcon />} iconPosition="start" />
          <Tab label="Timeline" icon={<TimelineIcon />} iconPosition="start" />
          <Tab label="Media" icon={<ImageIcon />} iconPosition="start" />
          <Tab label="Actions" icon={<AssignmentIcon />} iconPosition="start" />
        </Tabs>
        
        <DialogContent dividers>
          {selectedReturn && (
            <>
              {/* Overview Tab */}
              {currentTab === 0 && (
                <Grid container spacing={3}>
                  {/* Customer Information */}
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <CustomerIcon color="primary" />
                          <Typography variant="h6">Customer Information</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Avatar 
                            src={selectedReturn.customer.avatar} 
                            alt={selectedReturn.customer.name}
                            sx={{ width: 64, height: 64 }}
                          />
                          <Box>
                            <Typography variant="subtitle1">{selectedReturn.customer.name}</Typography>
                            <Typography variant="body2">{selectedReturn.customer.email}</Typography>
                            <Typography variant="body2">{selectedReturn.customer.phone}</Typography>
                          </Box>
                        </Box>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Shipping Address
                        </Typography>
                        <Typography variant="body2">
                          {selectedReturn.customer.address}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Product Information */}
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <ProductIcon color="primary" />
                          <Typography variant="h6">Product Information</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 3 }}>
                          <Box
                            component="img"
                            src={selectedReturn.product.image}
                            alt={selectedReturn.product.name}
                            sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 1 }}
                          />
                          <Box>
                            <Typography variant="subtitle1">{selectedReturn.product.name}</Typography>
                            <Typography variant="body2">SKU: {selectedReturn.product.sku}</Typography>
                            <Typography variant="body2" color="primary.main" fontWeight="bold">
                              ${selectedReturn.product.price.toFixed(2)}
                            </Typography>
                            <Box sx={{ mt: 2 }}>
                              <Chip 
                                label={`Order: ${selectedReturn.orderId}`} 
                                size="small" 
                                variant="outlined"
                              />
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Return Details */}
                  <Grid item xs={12}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <AssignmentIcon color="primary" />
                          <Typography variant="h6">Return Details</Typography>
                        </Box>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Return Reason
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {selectedReturn.reason}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              {selectedReturn.description}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Request Date
                            </Typography>
                            <Typography variant="body1">
                              {new Date(selectedReturn.requestDate).toLocaleString()}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Shipping Information */}
                  <Grid item xs={12}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <ShippingIcon color="primary" />
                          <Typography variant="h6">Return Shipping</Typography>
                        </Box>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={4}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Method
                            </Typography>
                            <Typography variant="body1">
                              {selectedReturn.returnShipping.method}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Tracking Number
                            </Typography>
                            <Typography variant="body1">
                              {selectedReturn.returnShipping.trackingNumber || 'Not available'}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Estimated Delivery
                            </Typography>
                            <Typography variant="body1">
                              {selectedReturn.returnShipping.estimatedDelivery 
                                ? new Date(selectedReturn.returnShipping.estimatedDelivery).toLocaleDateString() 
                                : 'Not available'}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Return Address
                            </Typography>
                            <Typography variant="body1">
                              {selectedReturn.returnShipping.returnAddress}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}

              {/* Timeline Tab */}
              {currentTab === 1 && (
                <Box sx={{ maxWidth: 800, mx: 'auto' }}>
                  <Stepper orientation="vertical" activeStep={selectedReturn.timeline.length}>
                    {selectedReturn.timeline.map((event: any, index: number) => (
                      <Step key={index} completed={true}>
                        <StepLabel 
                          StepIconProps={{ 
                            sx: { 
                              color: event.status.toLowerCase().includes('reject') 
                                ? 'error.main' 
                                : event.status.toLowerCase().includes('approved') || event.status.toLowerCase().includes('completed')
                                  ? 'success.main'
                                  : 'primary.main'
                            } 
                          }}
                        >
                          <Typography variant="subtitle2">{event.status}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(event.date).toLocaleString()}
                          </Typography>
                        </StepLabel>
                        <StepContent>
                          <Typography variant="body2">{event.comment}</Typography>
                        </StepContent>
                      </Step>
                    ))}
                    
                    {selectedReturn.status !== 'completed' && selectedReturn.status !== 'rejected' && (
                      <Step>
                        <StepLabel>
                          <Typography variant="subtitle2" color="text.secondary">
                            {selectedReturn.status === 'approved' ? 'Waiting for Return' : 'Awaiting Decision'}
                          </Typography>
                        </StepLabel>
                      </Step>
                    )}
                  </Stepper>
                </Box>
              )}

              {/* Media Tab */}
              {currentTab === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Product Images
                  </Typography>
                  <Grid container spacing={2}>
                    {selectedReturn.media.productImages.map((image: string, index: number) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card 
                          variant="outlined" 
                          sx={{ 
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            '&:hover': {
                              transform: 'scale(1.02)',
                            }
                          }}
                          onClick={() => setSelectedImage(image)}
                        >
                          <CardMedia
                            component="img"
                            height="200"
                            image={image}
                            alt={`Return image ${index + 1}`}
                            sx={{ objectFit: 'cover' }}
                          />
                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  {selectedReturn.media.unboxingVideo && (
                    <Box sx={{ mt: 4 }}>
                      <Typography variant="h6" gutterBottom>
                        Unboxing Video
                      </Typography>
                      <Box
                        sx={{
                          position: 'relative',
                          width: '100%',
                          height: 0,
                          paddingBottom: '56.25%', // 16:9 aspect ratio
                          bgcolor: 'black',
                          borderRadius: 1,
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Typography color="white">
                            Video playback not available in this view
                          </Typography>
                          
                          <Button
                            variant="contained"
                            startIcon={<PlayIcon />}
                            sx={{ position: 'absolute' }}
                          >
                            Play Video
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
              )}

              {/* Actions Tab */}
              {currentTab === 3 && (
                <Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Communication
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Button
                              variant="outlined"
                              startIcon={<EmailIcon />}
                              fullWidth
                            >
                              Email Customer
                            </Button>
                            <Button
                              variant="outlined"
                              startIcon={<PrintIcon />}
                              fullWidth
                            >
                              Print Return Label
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Process Return
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {selectedReturn.status === 'pending' && (
                              <>
                                <Button
                                  variant="contained"
                                  color="success"
                                  startIcon={<ApproveIcon />}
                                  onClick={() => handleApproveReturn(selectedReturn)}
                                  fullWidth
                                >
                                  Approve Return
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  startIcon={<DeclineIcon />}
                                  onClick={() => handleDeclineReturn(selectedReturn)}
                                  fullWidth
                                >
                                  Decline Return
                                </Button>
                              </>
                            )}
                            
                            {selectedReturn.status === 'approved' && (
                              <Button
                                variant="contained"
                                color="primary"
                                startIcon={<RefundIcon />}
                                fullWidth
                              >
                                Process Refund
                              </Button>
                            )}
                            
                            {(selectedReturn.status === 'completed' || selectedReturn.status === 'rejected') && (
                              <Alert 
                                severity={selectedReturn.status === 'completed' ? 'success' : 'info'}
                                sx={{ width: '100%' }}
                              >
                                This return has been {selectedReturn.status}. No further action is required.
                              </Alert>
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </>
          )}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)}>
            Close
          </Button>
          {selectedReturn?.status === 'pending' && (
            <>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  setDetailsOpen(false);
                  handleApproveReturn(selectedReturn);
                }}
              >
                Approve Return
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setDetailsOpen(false);
                  handleDeclineReturn(selectedReturn);
                }}
              >
                Decline Return
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Image Preview Dialog */}
      <Dialog
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ p: 0 }}>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Return product"
              style={{ width: '100%', height: 'auto' }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedImage(null)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Approve Return Dialog */}
      <Dialog
        open={approveDialogOpen}
        onClose={() => setApproveDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Approve Return</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Shipping Method</InputLabel>
              <Select
                value={shippingMethod}
                onChange={(e) => setShippingMethod(e.target.value)}
                label="Shipping Method"
              >
                <MenuItem value="standard">Standard Shipping</MenuItem>
                <MenuItem value="express">Express Shipping</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              label="Refund Amount"
              type="number"
              value={refundAmount}
              onChange={(e) => setRefundAmount(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              fullWidth
            />
            
            <TextField
              label="Comments for Customer"
              multiline
              rows={3}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              fullWidth
              placeholder="Add any special instructions or notes for the customer..."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApproveDialogOpen(false)} disabled={isProcessing}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmitApproval}
            disabled={isProcessing || !refundAmount}
            startIcon={isProcessing ? <CircularProgress size={20} /> : null}
          >
            {isProcessing ? 'Processing...' : 'Approve Return'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Decline Return Dialog */}
      <Dialog
        open={declineDialogOpen}
        onClose={() => setDeclineDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Decline Return</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Reason for Declining"
              required
              multiline
              rows={3}
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              fullWidth
              placeholder="Explain why this return request is being declined..."
            />
            
            <TextField
              label="Additional Comments"
              multiline
              rows={2}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              fullWidth
              placeholder="Any additional information for the customer..."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeclineDialogOpen(false)} disabled={isProcessing}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleSubmitDecline}
            disabled={isProcessing || !declineReason}
            startIcon={isProcessing ? <CircularProgress size={20} /> : null}
          >
            {isProcessing ? 'Processing...' : 'Decline Return'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Alert Message */}
      {alertMessage && (
        <Alert 
          severity={alertMessage.type}
          sx={{ 
            position: 'fixed', 
            bottom: 16, 
            right: 16, 
            zIndex: 9999,
            boxShadow: 4,
            minWidth: 300
          }}
          onClose={() => setAlertMessage(null)}
        >
          {alertMessage.text}
        </Alert>
      )}
    </Box>
  );
}