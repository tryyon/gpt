'use client';

import { useState, useEffect, memo } from 'react';
import { 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Pagination,
  Paper,
  Stack,
  Button,
  CardActions,
  Divider,
  Checkbox,
  useTheme,
  Badge,
  CardActionArea,
  Rating,
  Skeleton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  ContentCopy as DuplicateIcon,
  ShoppingCart as CartIcon,
  Image as ImageIcon,
  AddShoppingCart as AddToCartIcon,
  ShoppingBag as ShoppingBagIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  image: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: string;
}

interface ProductGridProps {
  products: Product[];
  selectedProductIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  page: number;
  onPageChange: (page: number) => void;
  rowsPerPage?: number;
  totalCount: number;
  isMarketplace?: boolean;
}

// Memoized ProductCard component to prevent unnecessary re-renders
const ProductCard = memo(({ 
  product, 
  isSelected, 
  onCheckboxChange, 
  onCardClick, 
  onMenuOpen, 
  theme,
  isMarketplace = false,
  onQuantityChange,
  quantity = 1,
  isCreateOrder = false,
}: { 
  product: Product, 
  isSelected: boolean, 
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
  onCardClick: () => void, 
  onMenuOpen: (e: React.MouseEvent<HTMLElement>) => void,
  theme: any,
  isMarketplace?: boolean,
  onQuantityChange?: (id: string, quantity: number) => void,
  quantity?: number,
  isCreateOrder?: boolean,
}) => {
  const isDarkMode = theme.palette.mode === 'dark';
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock':
        return 'success';
      case 'low_stock':
        return 'warning';
      case 'out_of_stock':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'in_stock':
        return 'In Stock';
      case 'low_stock':
        return 'Low Stock';
      case 'out_of_stock':
        return 'Out of Stock';
      default:
        return status;
    }
  };

  // Adjust card height for create order view
  const cardHeight = isCreateOrder ? '100%' : '100%';
  const imageHeight = isCreateOrder ? 120 : 200;
  const contentPadding = isCreateOrder ? { pt: 1, pb: 0.5, px: 1.5 } : { pt: 1.5, pb: 1, px: 2 };
  const actionsPadding = isCreateOrder ? { p: 1, pt: 0 } : { p: 2, pt: 0 };
  const nameHeight = isCreateOrder ? '2rem' : '2.4rem';
  const nameLineClamp = isCreateOrder ? 1 : 2;
  const chipSize = isCreateOrder ? 'small' : 'small';
  const fontSizes = isCreateOrder ? {
    name: '0.875rem',
    price: '0.95rem',
    stock: '0.7rem',
    sku: '0.65rem'
  } : {
    name: '1rem',
    price: '1.1rem',
    stock: '0.75rem',
    sku: '0.7rem'
  };

  return (
    <Card 
      sx={{ 
        height: cardHeight, 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isSelected 
          ? `0 8px 16px ${theme.palette.primary.main}30` 
          : theme.shadows[1],
        position: 'relative',
        overflow: 'visible',
        borderRadius: 2,
        border: isSelected ? `2px solid ${theme.palette.primary.main}` : 'none',
        bgcolor: theme.palette.background.paper,
      }}
    >
      {/* Selected badge */}
      {isSelected && (
        <Box 
          sx={{ 
            position: 'absolute', 
            top: -10, 
            right: -10, 
            zIndex: 10,
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            borderRadius: '50%',
            width: 24,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: theme.shadows[3],
          }}
        >
          <CheckIcon fontSize="small" sx={{ fontSize: '0.8rem' }} />
        </Box>
      )}
      
      {/* Status badge */}
      <Box sx={{ 
        position: 'absolute', 
        top: 8, 
        left: 8, 
        zIndex: 2,
      }}>
        <Chip
          label={getStatusLabel(product.status)}
          color={getStatusColor(product.status) as any}
          size={chipSize}
          sx={{ 
            fontWeight: 'medium',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            fontSize: fontSizes.stock
          }}
        />
      </Box>
      
      {/* Product image with hover effect */}
      <CardActionArea onClick={onCardClick}>
        <Box 
          sx={{ 
            position: 'relative',
            overflow: 'hidden',
            height: imageHeight,
            bgcolor: theme.palette.background.default,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {product.image ? (
            <CardMedia
              component="img"
              height={imageHeight}
              image={product.image}
              alt={product.name}
              sx={{ 
                objectFit: 'contain',
                transition: 'transform 0.5s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                },
                p: 2,
              }}
              loading="lazy"
            />
          ) : (
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
                bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'action.hover',
                color: 'text.secondary',
                p: 2,
                textAlign: 'center',
              }}
            >
              <ImageIcon sx={{ fontSize: 40, mb: 1, opacity: 0.5 }} />
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: fontSizes.stock }}>
                No image
              </Typography>
            </Box>
          )}
        </Box>
      </CardActionArea>
      
      {/* Content area */}
      <CardContent 
        sx={{ 
          flexGrow: 1, 
          ...contentPadding,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Category tag */}
        {product.category && !isCreateOrder && (
          <Chip 
            label={product.category} 
            size={chipSize} 
            variant="outlined"
            sx={{ mb: 1, alignSelf: 'flex-start', fontSize: fontSizes.stock }}
          />
        )}
        
        {/* Product name */}
        <Typography 
          variant="h6" 
          component="h3" 
          sx={{ 
            fontWeight: 600,
            fontSize: fontSizes.name,
            mb: 0.5,
            lineHeight: 1.2,
            height: nameHeight,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: nameLineClamp,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.name}
        </Typography>
        
        {/* SKU */}
        <Typography 
          variant="caption" 
          color="text.secondary" 
          sx={{ 
            display: 'block', 
            mb: isCreateOrder ? 0.5 : 1,
            fontFamily: 'monospace',
            letterSpacing: '0.5px',
            fontSize: fontSizes.sku
          }}
        >
          SKU: {product.sku}
        </Typography>
        
        {/* Price and stock */}
        <Box sx={{ mt: 'auto' }}>
          <Stack 
            direction="row" 
            justifyContent="space-between" 
            alignItems="center" 
            spacing={1}
          >
            <Typography 
              variant="h6" 
              color="primary" 
              sx={{ 
                fontWeight: 700,
                fontSize: fontSizes.price
              }}
            >
              ${product.price.toFixed(2)}
            </Typography>
            
            <Typography 
              variant="caption" 
              sx={{ 
                color: product.stock > 10 
                  ? 'success.main' 
                  : product.stock > 0 
                    ? 'warning.main' 
                    : 'error.main',
                fontWeight: 500,
                fontSize: fontSizes.stock
              }}
            >
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </Typography>
          </Stack>
        </Box>
      </CardContent>

      {/* Action area */}
      <CardActions sx={{ ...actionsPadding, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            checked={isSelected}
            onChange={onCheckboxChange}
            color="primary"
            sx={{ 
              ml: -1,
              color: theme.palette.primary.main,
              '&.Mui-checked': {
                color: theme.palette.primary.main,
              },
              p: isCreateOrder ? 0.5 : 1
            }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: fontSizes.stock }}>
            Select
          </Typography>
        </Box>
        
        {isSelected && onQuantityChange && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton 
              size="small" 
              onClick={(e) => {
                e.stopPropagation();
                onQuantityChange(product.id, Math.max(1, quantity - 1));
              }}
              disabled={quantity <= 1}
              sx={{ 
                bgcolor: 'action.hover',
                '&:hover': { bgcolor: 'action.selected' },
                p: isCreateOrder ? 0.5 : undefined
              }}
            >
              <RemoveIcon fontSize="small" sx={{ fontSize: isCreateOrder ? '0.8rem' : '1rem' }} />
            </IconButton>
            <Typography variant="body2" sx={{ minWidth: 20, textAlign: 'center', fontSize: fontSizes.stock }}>
              {quantity}
            </Typography>
            <IconButton 
              size="small" 
              onClick={(e) => {
                e.stopPropagation();
                onQuantityChange(product.id, Math.min(product.stock, quantity + 1));
              }}
              disabled={quantity >= product.stock}
              sx={{ 
                bgcolor: 'action.hover',
                '&:hover': { bgcolor: 'action.selected' },
                p: isCreateOrder ? 0.5 : undefined
              }}
            >
              <AddIcon fontSize="small" sx={{ fontSize: isCreateOrder ? '0.8rem' : '1rem' }} />
            </IconButton>
          </Box>
        )}
      </CardActions>
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';

function ProductGridComponent({ 
  products, 
  selectedProductIds, 
  onSelectionChange,
  page,
  onPageChange,
  rowsPerPage = 8,
  totalCount,
  isMarketplace = false
}: ProductGridProps) {
  const router = useRouter();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [localSelection, setLocalSelection] = useState<string[]>(selectedProductIds || []);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  
  // Detect if we're in the create order view
  const isCreateOrder = window.location.pathname.includes('/orders/create');

  // Adjust grid columns based on create order view
  const gridColumns = isCreateOrder ? { xs: 6, sm: 4, md: 3, lg: 3 } : { xs: 12, sm: 6, md: 4, lg: 3 };

  // Simulate loading state
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [products]);

  // Sync local selection with parent component
  useEffect(() => {
    setLocalSelection(selectedProductIds || []);
  }, [selectedProductIds]);

  // Initialize quantities for selected products
  useEffect(() => {
    const newQuantities: Record<string, number> = {};
    selectedProductIds?.forEach(id => {
      newQuantities[id] = quantities[id] || 1;
    });
    setQuantities(newQuantities);
  }, [selectedProductIds]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, product: Product) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProduct(null);
  };

  const handleEdit = () => {
    if (selectedProduct) {
      router.push(`/dashboard/products/edit/${selectedProduct.id}`);
    }
    handleMenuClose();
  };

  const handleView = () => {
    if (selectedProduct) {
      router.push(`/dashboard/products/${selectedProduct.id}`);
    }
    handleMenuClose();
  };

  const handleDuplicate = () => {
    // Implement duplicate functionality
    handleMenuClose();
  };

  const handleDelete = () => {
    // Implement delete functionality
    handleMenuClose();
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  const isValidCategory = (product: any): boolean => {
    return product.category && typeof product.category === 'string';
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, productId: string) => {
    event.stopPropagation();
    
    const newSelection = event.target.checked
      ? [...localSelection, productId]
      : localSelection.filter(id => id !== productId);
    
    setLocalSelection(newSelection);
    onSelectionChange(newSelection);
    
    // Initialize quantity for newly selected product
    if (event.target.checked && !quantities[productId]) {
      setQuantities(prev => ({
        ...prev,
        [productId]: 1
      }));
    }
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: newQuantity
    }));
  };

  const handleCardClick = (productId: string) => {
    // Toggle selection instead of navigating
    const isCurrentlySelected = localSelection?.includes(productId);
    const newSelection = isCurrentlySelected
      ? localSelection.filter(id => id !== productId)
      : [...(localSelection || []), productId];
    
    setLocalSelection(newSelection);
    onSelectionChange(newSelection);
    
    // Initialize quantity for newly selected product
    if (!isCurrentlySelected && !quantities[productId]) {
      setQuantities(prev => ({
        ...prev,
        [productId]: 1
      }));
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / rowsPerPage);

  return (
    <Box sx={{ p: 3 }}>
      {loading ? (
        // Loading skeleton
        <Grid container spacing={2}>
          {Array.from(new Array(8)).map((_, index) => (
            <Grid item {...gridColumns} key={index}>
              <Card sx={{ height: '100%' }}>
                <Skeleton variant="rectangular" height={isCreateOrder ? 120 : 200} />
                <CardContent>
                  <Skeleton variant="text" width="40%" height={24} />
                  <Skeleton variant="text" width="70%" height={20} sx={{ mt: 1 }} />
                  <Skeleton variant="text" width="30%" height={16} sx={{ mt: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Skeleton variant="text" width="30%" height={24} />
                    <Skeleton variant="text" width="20%" height={24} />
                  </Box>
                </CardContent>
                <CardActions>
                  <Skeleton variant="rectangular" width={100} height={36} />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item {...gridColumns} key={product.id}>
              <ProductCard 
                product={product}
                isSelected={localSelection?.includes(product.id)}
                onCheckboxChange={(e) => handleCheckboxChange(e, product.id)}
                onCardClick={() => handleCardClick(product.id)}
                onMenuOpen={(e) => handleMenuOpen(e, product)}
                theme={theme}
                isMarketplace={isMarketplace}
                onQuantityChange={handleQuantityChange}
                quantity={quantities[product.id] || 1}
                isCreateOrder={isCreateOrder}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {totalPages > 1 && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 4,
          '& .MuiPaginationItem-root': {
            color: theme.palette.text.primary,
            transition: 'color 0.1s ease-out, background-color 0.1s ease-out',
          }
        }}>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange} 
            color="primary" 
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}

      {!isMarketplace && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          elevation={3}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              bgcolor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              transition: 'background-color 0.1s ease-out',
            }
          }}
        >
          <MenuItem onClick={handleView}>
            <ListItemIcon>
              <VisibilityIcon fontSize="small" color="inherit" />
            </ListItemIcon>
            <ListItemText>View Details</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <EditIcon fontSize="small" color="inherit" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDuplicate}>
            <ListItemIcon>
              <DuplicateIcon fontSize="small" color="inherit" />
            </ListItemIcon>
            <ListItemText>Duplicate</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>
      )}
    </Box>
  );
}

// Export memoized component to prevent unnecessary re-renders
export const ProductGrid = memo(ProductGridComponent);