'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Collapse,
  Alert,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Add as AddIcon,
  Close as CloseIcon,
  Link as LinkIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  CropFree as CropFreeIcon,
} from '@mui/icons-material';
import type { Brochure, ProductArea } from './types';

interface BrochureEditorProps {
  open: boolean;
  onClose: () => void;
  brochure: Brochure;
  onSave: (productAreas: ProductArea[]) => void;
}

export function BrochureEditor({ open, onClose, brochure, onSave }: BrochureEditorProps) {
  const [productAreas, setProductAreas] = useState<ProductArea[]>(brochure.productAreas || []);
  const [currentArea, setCurrentArea] = useState<ProductArea | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [isEditingArea, setIsEditingArea] = useState(false);
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [showHelp, setShowHelp] = useState(true);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Reset state when brochure changes
  useEffect(() => {
    setProductAreas(brochure.productAreas || []);
    setCurrentArea(null);
    setIsDrawing(false);
    setStartPoint({ x: 0, y: 0 });
    setIsEditingArea(false);
    setSelectedAreaId(null);
    setZoom(1);
  }, [brochure]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isEditingArea || !canvasRef.current || !imageRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    
    // Calculate coordinates relative to the canvas, accounting for zoom
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;
    
    setIsDrawing(true);
    setStartPoint({ x, y });
    
    // Create a new area
    const newArea: ProductArea = {
      id: Date.now().toString(),
      x,
      y,
      width: 0,
      height: 0,
      productName: '',
      productUrl: '',
      price: ''
    };
    
    setCurrentArea(newArea);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing || !currentArea || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    
    // Calculate coordinates relative to the canvas, accounting for zoom
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;
    
    // Calculate width and height
    const width = Math.abs(x - startPoint.x);
    const height = Math.abs(y - startPoint.y);
    
    // Calculate top-left corner
    const newX = Math.min(startPoint.x, x);
    const newY = Math.min(startPoint.y, y);
    
    setCurrentArea({
      ...currentArea,
      x: newX,
      y: newY,
      width,
      height
    });
  };

  const handleMouseUp = () => {
    if (!isDrawing || !currentArea) return;
    
    // Only add the area if it has a reasonable size
    if (currentArea.width > 10 && currentArea.height > 10) {
      setIsEditingArea(true);
      setSelectedAreaId(currentArea.id);
    } else {
      setCurrentArea(null);
    }
    
    setIsDrawing(false);
  };

  const handleSaveArea = () => {
    if (!currentArea) return;
    
    // Add the new area to the list
    setProductAreas(prev => [...prev, currentArea]);
    setCurrentArea(null);
    setIsEditingArea(false);
    setSelectedAreaId(null);
  };

  const handleCancelArea = () => {
    setCurrentArea(null);
    setIsEditingArea(false);
    setSelectedAreaId(null);
  };

  const handleEditArea = (area: ProductArea) => {
    setCurrentArea({ ...area });
    setIsEditingArea(true);
    setSelectedAreaId(area.id);
  };

  const handleUpdateArea = () => {
    if (!currentArea) return;
    
    setProductAreas(prev => 
      prev.map(area => 
        area.id === currentArea.id ? currentArea : area
      )
    );
    
    setCurrentArea(null);
    setIsEditingArea(false);
    setSelectedAreaId(null);
  };

  const handleDeleteArea = (areaId: string) => {
    setProductAreas(prev => prev.filter(area => area.id !== areaId));
    
    if (currentArea?.id === areaId) {
      setCurrentArea(null);
      setIsEditingArea(false);
      setSelectedAreaId(null);
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleSaveAll = () => {
    onSave(productAreas);
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
            Edit Product Areas - {brochure.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
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
          </Box>
        </Box>
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 0, overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
          {/* Canvas Area */}
          <Box 
            sx={{ 
              flexGrow: 1, 
              position: 'relative', 
              overflow: 'auto',
              bgcolor: '#f5f5f5',
              cursor: isDrawing ? 'crosshair' : 'default'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
              <div
                ref={canvasRef}
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  transform: `scale(${zoom})`,
                  transformOrigin: 'top center',
                  lineHeight: 0
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <img 
                  ref={imageRef}
                  src={brochure.imageUrl} 
                  alt={brochure.title}
                  style={{ 
                    display: 'block',
                    maxWidth: '100%',
                    margin: 0,
                    padding: 0
                  }}
                />
                
                {/* Existing product areas */}
                {productAreas.map((area) => (
                  <div
                    key={area.id}
                    style={{
                      position: 'absolute',
                      left: `${area.x}px`,
                      top: `${area.y}px`,
                      width: `${area.width}px`,
                      height: `${area.height}px`,
                      border: '2px solid',
                      borderColor: selectedAreaId === area.id ? '#2196f3' : '#4caf50',
                      backgroundColor: 'rgba(76, 175, 80, 0.1)',
                      cursor: 'pointer',
                      boxSizing: 'border-box'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditArea(area);
                    }}
                  >
                    <div 
                      style={{ 
                        position: 'absolute', 
                        bottom: 0, 
                        left: 0, 
                        right: 0, 
                        backgroundColor: 'rgba(0, 0, 0, 0.6)', 
                        color: 'white',
                        padding: '4px',
                        fontSize: '0.75rem',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {area.productName}
                    </div>
                  </div>
                ))}
                
                {/* Currently drawing area */}
                {currentArea && !isEditingArea && (
                  <div
                    style={{
                      position: 'absolute',
                      left: `${currentArea.x}px`,
                      top: `${currentArea.y}px`,
                      width: `${currentArea.width}px`,
                      height: `${currentArea.height}px`,
                      border: '2px dashed #2196f3',
                      backgroundColor: 'rgba(33, 150, 243, 0.1)',
                      boxSizing: 'border-box'
                    }}
                  />
                )}
              </div>
            </Box>
          </Box>
          
          {/* Sidebar */}
          <Box 
            sx={{ 
              width: 300, 
              borderLeft: '1px solid', 
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle1" gutterBottom>
                Product Areas
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {productAreas.length} area{productAreas.length !== 1 ? 's' : ''} defined
              </Typography>
            </Box>
            
            <Collapse in={showHelp}>
              <Box sx={{ p: 2, bgcolor: 'info.light', color: 'info.contrastText' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="subtitle2">How to use:</Typography>
                  <IconButton size="small" onClick={() => setShowHelp(false)}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  1. Click and drag on the image to create a product area
                </Typography>
                <Typography variant="body2">
                  2. Enter product details in the form
                </Typography>
                <Typography variant="body2">
                  3. Click "Add Product Area" to save
                </Typography>
                <Typography variant="body2">
                  4. Click on existing areas to edit them
                </Typography>
              </Box>
            </Collapse>
            
            {/* Product Area Form */}
            {isEditingArea && currentArea && (
              <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle2" gutterBottom>
                  {selectedAreaId && productAreas.some(a => a.id === selectedAreaId) 
                    ? 'Edit Product Area' 
                    : 'New Product Area'
                  }
                </Typography>
                
                <TextField
                  label="Product Name"
                  value={currentArea.productName}
                  onChange={(e) => setCurrentArea({ ...currentArea, productName: e.target.value })}
                  margin="dense"
                  fullWidth
                  required
                />
                
                <TextField
                  label="Product URL"
                  value={currentArea.productUrl}
                  onChange={(e) => setCurrentArea({ ...currentArea, productUrl: e.target.value })}
                  margin="dense"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: <LinkIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} />,
                  }}
                />
                
                <TextField
                  label="Price (Optional)"
                  value={currentArea.price}
                  onChange={(e) => setCurrentArea({ ...currentArea, price: e.target.value })}
                  margin="dense"
                  fullWidth
                  placeholder="e.g. $9.99"
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    onClick={handleCancelArea}
                    startIcon={<CloseIcon />}
                  >
                    Cancel
                  </Button>
                  {selectedAreaId && productAreas.some(a => a.id === selectedAreaId) ? (
                    <Button 
                      variant="contained" 
                      onClick={handleUpdateArea}
                      startIcon={<SaveIcon />}
                      disabled={!currentArea.productName || !currentArea.productUrl}
                    >
                      Update
                    </Button>
                  ) : (
                    <Button 
                      variant="contained" 
                      onClick={handleSaveArea}
                      startIcon={<AddIcon />}
                      disabled={!currentArea.productName || !currentArea.productUrl}
                    >
                      Add
                    </Button>
                  )}
                </Box>
              </Box>
            )}
            
            {/* Product Areas List */}
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
              {productAreas.length > 0 ? (
                <List dense>
                  {productAreas.map((area) => (
                    <ListItem 
                      key={area.id}
                      selected={selectedAreaId === area.id}
                      sx={{ 
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        '&.Mui-selected': {
                          bgcolor: 'action.selected',
                        }
                      }}
                    >
                      <ListItemText
                        primary={area.productName}
                        secondary={
                          <>
                            <Typography variant="caption" component="span" color="text.secondary">
                              {area.price && `${area.price} • `}
                              {new URL(area.productUrl, window.location.origin).pathname}
                            </Typography>
                          </>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Tooltip title="Edit">
                          <IconButton 
                            edge="end" 
                            size="small"
                            onClick={() => handleEditArea(area)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton 
                            edge="end" 
                            size="small"
                            onClick={() => handleDeleteArea(area.id)}
                            sx={{ ml: 1 }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <CropFreeIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    No product areas defined yet.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Click and drag on the image to create one.
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSaveAll}
          startIcon={<SaveIcon />}
        >
          Save All Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}