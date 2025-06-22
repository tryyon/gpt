'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Divider,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

interface ProductItem {
  name: string;
  description: string;
  checked: boolean;
  dimensions: {
    length: string;
    width: string;
    height: string;
    weight: string;
  };
}

interface ProductContentsDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (items: ProductItem[]) => void;
}

const defaultItems: ProductItem[] = [
  {
    name: 'Necklace',
    description: 'A decorative chain or string of beads, pearls, or links worn around the neck.',
    checked: false,
    dimensions: {
      length: '',
      width: '',
      height: '',
      weight: '',
    },
  },
  {
    name: 'Earrings',
    description: 'Ornaments worn on the ears, typically attached to the earlobes.',
    checked: false,
    dimensions: {
      length: '',
      width: '',
      height: '',
      weight: '',
    },
  },
  {
    name: 'Maang Tika',
    description: 'A traditional South Asian head ornament that is worn on the forehead and extends into the hair.',
    checked: false,
    dimensions: {
      length: '',
      width: '',
      height: '',
      weight: '',
    },
  },
];

export function ProductContentsDialog({ open, onClose, onSave }: ProductContentsDialogProps) {
  const [items, setItems] = useState<ProductItem[]>(defaultItems);

  const handleCheckItem = (index: number) => {
    setItems(prev => prev.map((item, i) => 
      i === index ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleDimensionChange = (index: number, dimension: keyof ProductItem['dimensions'], value: string) => {
    setItems(prev => prev.map((item, i) => 
      i === index ? {
        ...item,
        dimensions: {
          ...item.dimensions,
          [dimension]: value,
        },
      } : item
    ));
  };

  const handleSave = () => {
    onSave(items.filter(item => item.checked));
    onClose();
  };

  const handleEraseItem = (index: number) => {
    setItems(prev => prev.map((item, i) => 
      i === index ? {
        ...item,
        checked: false,
        dimensions: {
          length: '',
          width: '',
          height: '',
          weight: '',
        },
      } : item
    ));
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Manage Product Contents</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          {items.map((item, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={item.checked}
                    onChange={() => handleCheckItem(index)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="subtitle2">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Box>
                }
              />
              
              {item.checked && (
                <Paper variant="outlined" sx={{ mt: 1, p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Dimensions & Weight
                    </Typography>
                    <IconButton 
                      size="small" 
                      color="error" 
                      onClick={() => handleEraseItem(index)}
                      title="Erase dimensions"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                      label="Length"
                      value={item.dimensions.length}
                      onChange={(e) => handleDimensionChange(index, 'length', e.target.value)}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                      }}
                      size="small"
                    />
                    <TextField
                      label="Width"
                      value={item.dimensions.width}
                      onChange={(e) => handleDimensionChange(index, 'width', e.target.value)}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                      }}
                      size="small"
                    />
                    <TextField
                      label="Height"
                      value={item.dimensions.height}
                      onChange={(e) => handleDimensionChange(index, 'height', e.target.value)}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                      }}
                      size="small"
                    />
                    <TextField
                      label="Weight"
                      value={item.dimensions.weight}
                      onChange={(e) => handleDimensionChange(index, 'weight', e.target.value)}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">g</InputAdornment>,
                      }}
                      size="small"
                    />
                  </Box>
                </Paper>
              )}

              {index < items.length - 1 && <Divider sx={{ my: 2 }} />}
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Done</Button>
      </DialogActions>
    </Dialog>
  );
}