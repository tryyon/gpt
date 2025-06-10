'use client';

import { useState } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Tooltip,
  Paper,
  Popover,
  Chip,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Drawer,
} from '@mui/material';
import {
  Close as CloseIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
  ViewList as ViewListIcon,
} from '@mui/icons-material';
import type { Brochure, ProductArea } from './types';

interface BrochureViewerProps {
  open: boolean;
  onClose: () => void;
  brochure: Brochure;
}

export function BrochureViewer({ open, onClose, brochure }: BrochureViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [hoveredArea, setHoveredArea] = useState<ProductArea | null>(null);
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);
  const [allProductsOpen, setAllProductsOpen] = useState(false);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleAreaHover = (area: ProductArea, event: React.MouseEvent<HTMLElement>) => {
    setHoveredArea(area);
    setPopoverAnchor(event.currentTarget);
  };

  const handleAreaLeave = () => {
    setHoveredArea(null);
    setPopoverAnchor(null);
  };

  const handleProductClick = (area: ProductArea) => {
    // In a real application, this would navigate to the product page
    window.open(area.productUrl, '_blank');
  };

  const toggleAllProducts = () => {
    setAllProductsOpen(!allProductsOpen);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          height: '90vh',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          margin: 0,
          width: '100%',
          maxWidth: '100%'
        }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {brochure.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="View All Products">
              <IconButton onClick={toggleAllProducts} size="small" color={allProductsOpen ? "primary" : "default"}>
                <ViewListIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Zoom In">
              <IconButton onClick={handleZoomIn} size="small">
                <ZoomInIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Zoom Out">
              <IconButton onClick={handleZoomOut} size="small">
                <ZoomOutIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share">
              <IconButton size="small">
                <ShareIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download">
              <IconButton size="small">
                <DownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Close">
              <IconButton onClick={onClose} size="small">
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </DialogTitle>
      
      <DialogContent sx={{ p: 0, overflow: 'auto', bgcolor: '#f5f5f5' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
          <div
            style={{
              position: 'relative',
              display: 'inline-block',
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
              lineHeight: 0
            }}
          >
            <img 
              src={brochure.imageUrl} 
              alt={brochure.title}
              style={{ 
                display: 'block',
                maxWidth: '100%',
                margin: 0,
                padding: 0
              }}
            />
            
            {/* Interactive product areas */}
            {brochure.productAreas.map((area) => (
              <div
                key={area.id}
                style={{
                  position: 'absolute',
                  left: `${area.x}px`,
                  top: `${area.y}px`,
                  width: `${area.width}px`,
                  height: `${area.height}px`,
                  border: '2px solid transparent',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
                onMouseEnter={(e) => handleAreaHover(area, e)}
                onMouseLeave={handleAreaLeave}
                onClick={() => handleProductClick(area)}
                className="interactive-area"
              />
            ))}
          </div>
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button 
          variant="outlined" 
          startIcon={<ViewListIcon />} 
          onClick={toggleAllProducts}
          sx={{ mr: 'auto' }}
        >
          {allProductsOpen ? 'Hide Products' : 'View All Products'}
        </Button>
        <Typography variant="body2" color="text.secondary" sx={{ pl: 2 }}>
          {brochure.productAreas.length} interactive product area{brochure.productAreas.length !== 1 ? 's' : ''}
        </Typography>
        <Button onClick={onClose}>
          Close
        </Button>
      </DialogActions>

      {/* Product Info Popover */}
      <Popover
        open={Boolean(popoverAnchor) && Boolean(hoveredArea)}
        anchorEl={popoverAnchor}
        onClose={handleAreaLeave}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{ pointerEvents: 'none' }}
      >
        {hoveredArea && (
          <Paper sx={{ p: 2, maxWidth: 300 }}>
            <Typography variant="subtitle1">{hoveredArea.productName}</Typography>
            {hoveredArea.price && (
              <Typography variant="body1" color="primary" fontWeight="bold">
                {hoveredArea.price}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              Click to view product details
            </Typography>
          </Paper>
        )}
      </Popover>

      {/* All Products Drawer */}
      <Drawer
        anchor="right"
        open={allProductsOpen}
        onClose={() => setAllProductsOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 400 },
            p: 2,
            overflow: 'auto'
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">All Products</Typography>
          <IconButton onClick={() => setAllProductsOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Grid container spacing={2}>
          {brochure.productAreas.map((area) => (
            <Grid item xs={12} key={area.id}>
              <Card 
                variant="outlined" 
                sx={{ 
                  display: 'flex', 
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 2,
                    borderColor: 'primary.main'
                  }
                }}
                onClick={() => handleProductClick(area)}
              >
                <Box sx={{ 
                  width: 100, 
                  height: 100, 
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'action.hover'
                }}>
                  <img 
                    src={brochure.imageUrl} 
                    alt={area.productName}
                    style={{
                      position: 'absolute',
                      clipPath: `polygon(
                        ${area.x}px ${area.y}px, 
                        ${area.x + area.width}px ${area.y}px, 
                        ${area.x + area.width}px ${area.y + area.height}px, 
                        ${area.x}px ${area.y + area.height}px
                      )`,
                      transform: `translate(-${area.x}px, -${area.y}px)`,
                      maxWidth: 'none'
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, flexGrow: 1 }}>
                  <Typography variant="subtitle1" component="div">
                    {area.productName}
                  </Typography>
                  {area.price && (
                    <Typography variant="body1" color="primary" fontWeight="bold">
                      {area.price}
                    </Typography>
                  )}
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto' }}>
                    Click to view details
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Drawer>

      <style jsx global>{`
        .interactive-area:hover {
          border: 2px solid #2196f3 !important;
          background-color: rgba(33, 150, 243, 0.1);
        }
      `}</style>
    </Dialog>
  );
}