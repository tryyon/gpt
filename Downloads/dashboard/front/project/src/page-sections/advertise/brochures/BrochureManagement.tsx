'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Divider,
  Alert,
  Snackbar,
  Tooltip,
  CircularProgress,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Upload as UploadIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Link as LinkIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  MoreVert as MoreVertIcon,
  ContentCopy as CopyIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
  CropFree as CropFreeIcon,
} from '@mui/icons-material';
import { DefaultCard } from '@/global-components/common/DefaultCard';
import { BrochureEditor } from './BrochureEditor';
import { BrochureViewer } from './BrochureViewer';
import type { Brochure, ProductArea } from './types';

// Mock data for brochures
const mockBrochures: Brochure[] = [
  {
    id: '1',
    title: 'Summer Fruits Catalog',
    description: 'Seasonal fruits available for summer 2024',
    imageUrl: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-05-15').toISOString(),
    updatedAt: new Date('2024-05-15').toISOString(),
    productAreas: [
      {
        id: '1-1',
        x: 10,
        y: 20,
        width: 150,
        height: 150,
        productName: 'Fresh Strawberries',
        productUrl: '/products/strawberries',
        price: '$4.99/lb'
      },
      {
        id: '1-2',
        x: 200,
        y: 50,
        width: 180,
        height: 160,
        productName: 'Organic Blueberries',
        productUrl: '/products/blueberries',
        price: '$5.99/pint'
      }
    ]
  },
  {
    id: '2',
    title: 'Fresh Vegetables Collection',
    description: 'Farm-fresh vegetables available year-round',
    imageUrl: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=1000',
    createdAt: new Date('2024-04-10').toISOString(),
    updatedAt: new Date('2024-04-20').toISOString(),
    productAreas: [
      {
        id: '2-1',
        x: 50,
        y: 100,
        width: 200,
        height: 150,
        productName: 'Organic Carrots',
        productUrl: '/products/carrots',
        price: '$2.49/bunch'
      }
    ]
  }
];

export function BrochureManagement() {
  const [brochures, setBrochures] = useState<Brochure[]>(mockBrochures);
  const [selectedBrochure, setSelectedBrochure] = useState<Brochure | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [brochureFile, setBrochureFile] = useState<File | null>(null);
  const [brochureTitle, setBrochureTitle] = useState('');
  const [brochureDescription, setBrochureDescription] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Clean up preview URL when component unmounts
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleBrochureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        setSnackbar({
          open: true,
          message: 'Please upload an image file (JPEG, PNG, etc.)',
          severity: 'error',
        });
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSnackbar({
          open: true,
          message: 'File size exceeds 5MB limit',
          severity: 'error',
        });
        return;
      }
      
      setBrochureFile(file);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUploadDialogOpen = () => {
    setBrochureFile(null);
    setBrochureTitle('');
    setBrochureDescription('');
    setPreviewUrl(null);
    setIsUploadDialogOpen(true);
  };

  const handleUploadDialogClose = () => {
    setIsUploadDialogOpen(false);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleSaveBrochure = async () => {
    if (!brochureFile || !brochureTitle) {
      setSnackbar({
        open: true,
        message: 'Please provide a title and upload an image',
        severity: 'error',
      });
      return;
    }

    setIsUploading(true);

    try {
      // Simulate API call to upload file
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real application, you would upload the file to a server
      // and get back a URL. For now, we'll use the preview URL.
      const newBrochure: Brochure = {
        id: Date.now().toString(),
        title: brochureTitle,
        description: brochureDescription,
        imageUrl: previewUrl || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        productAreas: []
      };
      
      setBrochures(prev => [newBrochure, ...prev]);
      setSnackbar({
        open: true,
        message: 'Brochure uploaded successfully',
        severity: 'success',
      });
      
      handleUploadDialogClose();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to upload brochure',
        severity: 'error',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditBrochure = (brochure: Brochure) => {
    setSelectedBrochure(brochure);
    setIsEditorOpen(true);
    handleMenuClose();
  };

  const handleViewBrochure = (brochure: Brochure) => {
    setSelectedBrochure(brochure);
    setIsViewerOpen(true);
    handleMenuClose();
  };

  const handleDeleteBrochure = (brochureId: string) => {
    setBrochures(prev => prev.filter(b => b.id !== brochureId));
    setSnackbar({
      open: true,
      message: 'Brochure deleted successfully',
      severity: 'success',
    });
    handleMenuClose();
  };

  const handleSaveProductAreas = (brochureId: string, productAreas: ProductArea[]) => {
    setBrochures(prev => 
      prev.map(brochure => 
        brochure.id === brochureId 
          ? { 
              ...brochure, 
              productAreas,
              updatedAt: new Date().toISOString()
            } 
          : brochure
      )
    );
    
    setSnackbar({
      open: true,
      message: 'Product areas saved successfully',
      severity: 'success',
    });
    
    setIsEditorOpen(false);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, brochure: Brochure) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedBrochure(brochure);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCopyLink = () => {
    if (selectedBrochure) {
      // In a real app, this would be a shareable link
      const link = `${window.location.origin}/brochures/${selectedBrochure.id}`;
      navigator.clipboard.writeText(link);
      setSnackbar({
        open: true,
        message: 'Link copied to clipboard',
        severity: 'success',
      });
    }
    handleMenuClose();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Product Brochures</Typography>
        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          onClick={handleUploadDialogOpen}
        >
          Upload Brochure
        </Button>
      </Box>

      {brochures.length === 0 ? (
        <DefaultCard>
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <UploadIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No brochures yet
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Upload your first brochure to showcase your products
            </Typography>
            <Button
              variant="contained"
              startIcon={<UploadIcon />}
              onClick={handleUploadDialogOpen}
            >
              Upload Brochure
            </Button>
          </Box>
        </DefaultCard>
      ) : (
        <Grid container spacing={3}>
          {brochures.map((brochure) => (
            <Grid item xs={12} sm={6} md={4} key={brochure.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                  }
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={brochure.imageUrl}
                    alt={brochure.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: 8, 
                      right: 8,
                      display: 'flex',
                      gap: 1,
                    }}
                  >
                    <Tooltip title="Edit Interactive Areas">
                      <IconButton 
                        onClick={() => handleEditBrochure(brochure)}
                        sx={{ bgcolor: 'background.paper', '&:hover': { bgcolor: 'background.default' } }}
                      >
                        <CropFreeIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="More Options">
                      <IconButton 
                        onClick={(e) => handleMenuOpen(e, brochure)}
                        sx={{ bgcolor: 'background.paper', '&:hover': { bgcolor: 'background.default' } }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  {brochure.productAreas.length > 0 && (
                    <Chip
                      label={`${brochure.productAreas.length} product${brochure.productAreas.length > 1 ? 's' : ''} tagged`}
                      size="small"
                      color="primary"
                      sx={{ position: 'absolute', bottom: 8, left: 8 }}
                    />
                  )}
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {brochure.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {brochure.description || 'No description provided'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Created: {new Date(brochure.createdAt).toLocaleDateString()}
                  </Typography>
                  {brochure.updatedAt !== brochure.createdAt && (
                    <Typography variant="caption" color="text.secondary" display="block">
                      Updated: {new Date(brochure.updatedAt).toLocaleDateString()}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Upload Dialog */}
      <Dialog
        open={isUploadDialogOpen}
        onClose={handleUploadDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Upload Brochure</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Brochure Title"
              fullWidth
              value={brochureTitle}
              onChange={(e) => setBrochureTitle(e.target.value)}
              required
            />
            
            <TextField
              label="Description (Optional)"
              fullWidth
              multiline
              rows={3}
              value={brochureDescription}
              onChange={(e) => setBrochureDescription(e.target.value)}
            />
            
            <Box sx={{ 
              border: '2px dashed',
              borderColor: 'divider',
              borderRadius: 1,
              p: 3,
              textAlign: 'center',
              bgcolor: 'background.default',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleBrochureUpload}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer',
                }}
              />
              <UploadIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
              <Typography variant="body1" gutterBottom>
                {brochureFile ? brochureFile.name : 'Drag and drop an image here or click to browse'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Supported formats: JPEG, PNG, GIF • Maximum file size: 5MB
              </Typography>
            </Box>
            
            {previewUrl && (
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Preview
                </Typography>
                <Box
                  component="img"
                  src={previewUrl}
                  alt="Brochure preview"
                  sx={{
                    width: '100%',
                    maxHeight: 300,
                    objectFit: 'contain',
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                />
              </Box>
            )}
            
            <Alert severity="info">
              After uploading, you'll be able to mark product areas on your brochure and link them to specific products.
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUploadDialogClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveBrochure}
            disabled={isUploading || !brochureFile || !brochureTitle}
            startIcon={isUploading && <CircularProgress size={20} />}
          >
            {isUploading ? 'Uploading...' : 'Upload Brochure'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Brochure Editor */}
      {selectedBrochure && (
        <BrochureEditor
          open={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          brochure={selectedBrochure}
          onSave={(productAreas) => handleSaveProductAreas(selectedBrochure.id, productAreas)}
        />
      )}

      {/* Brochure Viewer */}
      {selectedBrochure && (
        <BrochureViewer
          open={isViewerOpen}
          onClose={() => setIsViewerOpen(false)}
          brochure={selectedBrochure}
        />
      )}

      {/* Brochure Options Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => selectedBrochure && handleViewBrochure(selectedBrochure)}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Brochure</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => selectedBrochure && handleEditBrochure(selectedBrochure)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Product Areas</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleCopyLink}>
          <ListItemIcon>
            <CopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy Link</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Share</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Download</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem 
          onClick={() => selectedBrochure && handleDeleteBrochure(selectedBrochure.id)}
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon sx={{ color: 'error.main' }}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* Snackbar for notifications */}
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