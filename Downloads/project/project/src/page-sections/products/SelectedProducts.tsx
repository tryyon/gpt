'use client';

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Typography,
  Paper,
  Divider,
  Avatar,
  Chip,
  useTheme,
} from '@mui/material';
import { 
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';
import type { SelectedProduct } from '@/types/product';

interface SelectedProductsProps {
  selectedProducts: SelectedProduct[];
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemoveProduct: (productId: string) => void;
}

export function SelectedProducts({
  selectedProducts,
  onQuantityChange,
  onRemoveProduct
}: SelectedProductsProps) {
  const theme = useTheme();
  
  const subtotal = selectedProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  
  const tax = subtotal * 0.18; // 18% tax
  const shipping = subtotal > 500 ? 0 : 50; // Free shipping over $500
  const total = subtotal + tax + shipping;

  return (
    <Paper variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {selectedProducts.length} {selectedProducts.length === 1 ? 'item' : 'items'} selected
        </Typography>
      </Box>
      
      {selectedProducts.length === 0 ? (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          p: 4, 
          flexGrow: 1 
        }}>
          <Box 
            sx={{ 
              width: 80, 
              height: 80, 
              borderRadius: '50%', 
              bgcolor: 'action.hover', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mb: 2
            }}
          >
            <AddIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
          </Box>
          <Typography color="text.secondary" align="center">
            No products selected
          </Typography>
          <Typography variant="caption" color="text.secondary" align="center" sx={{ mt: 1 }}>
            Search and select products from the list on the left
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
            {selectedProducts.map((product) => (
              <Box 
                key={product.id} 
                sx={{ 
                  mb: 2, 
                  p: 2, 
                  border: '1px solid', 
                  borderColor: 'divider', 
                  borderRadius: 1,
                  '&:last-child': { mb: 0 }
                }}
              >
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Avatar 
                    variant="rounded" 
                    src={product.image} 
                    alt={product.name}
                    sx={{ width: 60, height: 60 }}
                  >
                    {product.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1">{product.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${product.price.toFixed(2)} each
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <IconButton 
                        size="small" 
                        onClick={() => onQuantityChange(product.id, Math.max(1, product.quantity - 1))}
                        disabled={product.quantity <= 1}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <TextField
                        size="small"
                        value={product.quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value) && value > 0 && value <= product.stock) {
                            onQuantityChange(product.id, value);
                          }
                        }}
                        inputProps={{
                          min: 1,
                          max: product.stock,
                          style: { 
                            textAlign: 'center',
                            width: '40px',
                            padding: '4px'
                          }
                        }}
                        variant="outlined"
                        sx={{ mx: 1 }}
                      />
                      <IconButton 
                        size="small" 
                        onClick={() => onQuantityChange(product.id, Math.min(product.stock, product.quantity + 1))}
                        disabled={product.quantity >= product.stock}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                      <Box sx={{ flexGrow: 1 }} />
                      <IconButton
                        size="small"
                        onClick={() => onRemoveProduct(product.id)}
                        color="error"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle1">
                      ${(product.price * product.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          
          <Divider />
          
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Subtotal</Typography>
              <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Tax (18%)</Typography>
              <Typography variant="body2">${tax.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Shipping</Typography>
              <Typography variant="body2">
                {shipping === 0 ? (
                  <Chip label="Free" size="small" color="success" />
                ) : (
                  `$${shipping.toFixed(2)}`
                )}
              </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1" fontWeight="bold">Total</Typography>
              <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
                ${total.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </Paper>
  );
}