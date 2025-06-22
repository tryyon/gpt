'use client';

import { useState, useEffect, memo } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Tooltip,
  useTheme,
  Button,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  ContentCopy as DuplicateIcon,
  Image as ImageIcon,
  AddShoppingCart as AddToCartIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

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

interface ProductTableProps {
  products: Product[];
  selectedProductIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  page: number;
  onPageChange: (page: number) => void;
  rowsPerPage?: number;
  onRowsPerPageChange?: (pageSize: number) => void;
  totalCount: number;
  isMarketplace?: boolean;
}

// Memoized TableRow component to prevent unnecessary re-renders
const ProductTableRow = memo(({
  product,
  isSelected,
  onCheckboxClick,
  onRowClick,
  onMenuOpen,
  onEditClick,
  theme,
  isMarketplace = false,
  t
}: { 
  product: Product, 
  isSelected: boolean, 
  onCheckboxClick: (event: React.MouseEvent<HTMLButtonElement>) => void, 
  onRowClick: () => void, 
  onMenuOpen: (event: React.MouseEvent<HTMLElement>) => void,
  onEditClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  theme: any,
  isMarketplace?: boolean,
  t: any
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
        return t('inStock');
      case 'low_stock':
        return t('lowStock');
      case 'out_of_stock':
        return t('outOfStock');
      default:
        return status;
    }
  };

  return (
    <TableRow 
      hover
      onClick={onRowClick}
      role="checkbox"
      aria-checked={isSelected}
      selected={isSelected}
      sx={{ 
        cursor: 'pointer',
        '&.Mui-selected': {
          backgroundColor: isDarkMode 
            ? 'rgba(144, 202, 249, 0.16)' 
            : 'rgba(33, 150, 243, 0.08)',
          transition: 'background-color 0.1s ease-out',
        },
        '&.Mui-selected:hover': {
          backgroundColor: isDarkMode 
            ? 'rgba(144, 202, 249, 0.24)' 
            : 'rgba(33, 150, 243, 0.12)',
        },
        transition: 'background-color 0.1s ease-out',
      }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={isSelected}
          onClick={onCheckboxClick}
          sx={{ transition: 'color 0.1s ease-out' }}
        />
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {product.image ? (
            <Avatar
              src={product.image}
              alt={product.name}
              variant="rounded"
              sx={{ width: 40, height: 40 }}
            />
          ) : (
            <Avatar
              variant="rounded"
              sx={{ 
                width: 40, 
                height: 40, 
                bgcolor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'action.hover',
                transition: 'background-color 0.1s ease-out',
              }}
            >
              <ImageIcon color="action" />
            </Avatar>
          )}
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {product.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {t('sku')}: {product.sku}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell align="right">${product.price.toFixed(2)}</TableCell>
      <TableCell align="right">{product.stock}</TableCell>
      <TableCell>
        <Chip
          label={getStatusLabel(product.status)}
          color={getStatusColor(product.status) as any}
          size="small"
          sx={{ 
            textTransform: 'capitalize',
            transition: 'background-color 0.1s ease-out, color 0.1s ease-out',
          }}
        />
      </TableCell>
      <TableCell align="right">
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {isMarketplace ? (
            isSelected && (
              <Button
                size="small"
                variant="outlined"
                color="primary"
                startIcon={<AddToCartIcon />}
                onClick={(e) => {
                  e.stopPropagation();
                  // This is handled by the parent component's "Add to My Website" button
                }}
              >
                {t('selected')}
              </Button>
            )
          ) : (
            <>
              <Tooltip title={t('edit')}>
                <IconButton
                  size="small"
                  onClick={onEditClick}
                  sx={{ transition: 'color 0.1s ease-out' }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <IconButton
                size="small"
                onClick={onMenuOpen}
                sx={{ transition: 'color 0.1s ease-out' }}
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </Box>
      </TableCell>
    </TableRow>
  );
});

ProductTableRow.displayName = 'ProductTableRow';

function ProductTableComponent({ 
  products, 
  selectedProductIds, 
  onSelectionChange,
  page,
  onPageChange,
  rowsPerPage = 10,
  onRowsPerPageChange,
  totalCount,
  isMarketplace = false
}: ProductTableProps) {
  const router = useRouter();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [localSelection, setLocalSelection] = useState<string[]>(selectedProductIds);
  const { t } = useTranslation();

  // Sync local selection with parent component
  useEffect(() => {
    setLocalSelection(selectedProductIds);
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

  const handleChangePage = (_: unknown, newPage: number) => {
    onPageChange(newPage + 1); // Convert from 0-based to 1-based for parent component
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    if (onRowsPerPageChange) {
      onRowsPerPageChange(newRowsPerPage);
    }
    onPageChange(1); // Reset to first page when changing rows per page
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

  const handleRowClick = (product: Product) => {
    router.push(`/dashboard/products/${product.id}`);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = products.map(product => product.id);
      setLocalSelection(newSelected);
      onSelectionChange(newSelected);
    } else {
      setLocalSelection([]);
      onSelectionChange([]);
    }
  };

  const handleCheckboxClick = (event: React.MouseEvent<HTMLButtonElement>, productId: string) => {
    event.stopPropagation();
    
    const selectedIndex = localSelection.indexOf(productId);
    let newSelected: string[] = [];
    
    if (selectedIndex === -1) {
      newSelected = [...localSelection, productId];
    } else {
      newSelected = localSelection.filter(id => id !== productId);
    }
    
    setLocalSelection(newSelected);
    onSelectionChange(newSelected);
  };

  const isSelected = (productId: string) => localSelection.indexOf(productId) !== -1;

  return (
    <Paper 
      sx={{ 
        bgcolor: theme.palette.background.paper, 
        borderRadius: 2, 
        overflow: 'hidden',
        borderColor: theme.palette.divider,
        transition: 'background-color 0.1s ease-out, border-color 0.1s ease-out',
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={localSelection.length > 0 && localSelection.length < products.length}
                  checked={products.length > 0 && localSelection.length === products.length}
                  onChange={handleSelectAllClick}
                  sx={{ transition: 'color 0.1s ease-out' }}
                />
              </TableCell>
              <TableCell>{t('product')}</TableCell>
              <TableCell>{t('category')}</TableCell>
              <TableCell align="right">{t('price')}</TableCell>
              <TableCell align="right">{t('stock')}</TableCell>
              <TableCell>{t('status')}</TableCell>
              <TableCell align="right">{t('actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => {
              const isItemSelected = isSelected(product.id);
              
              return (
                <ProductTableRow
                  key={product.id}
                  product={product}
                  isSelected={isItemSelected}
                  onCheckboxClick={(event) => handleCheckboxClick(event, product.id)}
                  onRowClick={() => handleRowClick(product)}
                  onMenuOpen={(e) => handleMenuOpen(e, product)}
                  onEditClick={(e) => {
                    e.stopPropagation();
                    router.push(`/dashboard/products/edit/${product.id}`);
                  }}
                  theme={theme}
                  isMarketplace={isMarketplace}
                  t={t}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page - 1} // Convert from 1-based to 0-based for MUI component
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          borderTop: `1px solid ${theme.palette.divider}`,
          '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
            color: theme.palette.text.secondary,
          },
          transition: 'background-color 0.1s ease-out, border-color 0.1s ease-out',
        }}
      />

      {!isMarketplace && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              bgcolor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              borderColor: theme.palette.divider,
              transition: 'background-color 0.1s ease-out',
            }
          }}
        >
          <MenuItem onClick={handleView}>
            <ListItemIcon>
              <VisibilityIcon fontSize="small" color="inherit" />
            </ListItemIcon>
            <ListItemText>{t('viewDetails')}</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <EditIcon fontSize="small" color="inherit" />
            </ListItemIcon>
            <ListItemText>{t('edit')}</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDuplicate}>
            <ListItemIcon>
              <DuplicateIcon fontSize="small" color="inherit" />
            </ListItemIcon>
            <ListItemText>{t('duplicate')}</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText sx={{ color: 'error.main' }}>{t('delete')}</ListItemText>
          </MenuItem>
        </Menu>
      )}
    </Paper>
  );
}

// Export memoized component to prevent unnecessary re-renders
export const ProductTable = memo(ProductTableComponent);