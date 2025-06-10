'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Snackbar, Alert, Paper, useTheme } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, ArrowDownward as ArrowDownwardIcon, ArrowOutward as ArrowOutwardIcon } from '@mui/icons-material';
import { ProductGrid } from './ProductGrid';
import { ProductTable } from './ProductTable';
import { ProductFilters } from './ProductFilters';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

// Mock data for products
const mockProducts = [
  {
    id: '1',
    name: 'Nike Air Max',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    sku: 'NKE-AM-001',
    category: 'Shoes',
    price: 129.99,
    stock: 50,
    status: 'in_stock',
  },
  {
    id: '2',
    name: "Levi's 501",
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0',
    sku: 'LEV-501-002',
    category: 'Jeans',
    price: 89.99,
    stock: 5,
    status: 'low_stock',
  },
  {
    id: '3',
    name: 'iPhone Case',
    image: 'https://images.unsplash.com/photo-1572157141188-6e4323d04175',
    sku: 'ACC-IPH-003',
    category: 'Accessories',
    price: 19.99,
    stock: 100,
    status: 'in_stock',
  },
  {
    id: '4',
    name: 'Samsung TV',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6',
    sku: 'SAM-TV-004',
    category: 'Electronics',
    price: 599.99,
    stock: 15,
    status: 'in_stock',
  },
  {
    id: '5',
    name: 'MacBook Pro',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4',
    sku: 'APL-MBP-005',
    category: 'Electronics',
    price: 1299.99,
    stock: 0,
    status: 'out_of_stock',
  },
  {
    id: '6',
    name: 'Wireless Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    sku: 'SNY-WH-006',
    category: 'Electronics',
    price: 149.99,
    stock: 25,
    status: 'in_stock',
  },
  {
    id: '7',
    name: 'Running Shoes',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    sku: 'ADI-RS-007',
    category: 'Shoes',
    price: 89.99,
    stock: 30,
    status: 'in_stock',
  },
  {
    id: '8',
    name: 'Smart Watch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    sku: 'APL-SW-008',
    category: 'Electronics',
    price: 299.99,
    stock: 10,
    status: 'low_stock',
  },
  {
    id: '9',
    name: 'Bluetooth Speaker',
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab',
    sku: 'JBL-BS-009',
    category: 'Electronics',
    price: 79.99,
    stock: 40,
    status: 'in_stock',
  },
  {
    id: '10',
    name: 'Denim Jacket',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0',
    sku: 'LEV-DJ-010',
    category: 'Clothing',
    price: 69.99,
    stock: 20,
    status: 'in_stock',
  },
  {
    id: '11',
    name: 'Mechanical Keyboard',
    image: 'https://images.unsplash.com/photo-1595225476474-63038da0e238',
    sku: 'LOG-KB-011',
    category: 'Electronics',
    price: 129.99,
    stock: 15,
    status: 'in_stock',
  },
  {
    id: '12',
    name: 'Gaming Mouse',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7',
    sku: 'LOG-MS-012',
    category: 'Electronics',
    price: 59.99,
    stock: 25,
    status: 'in_stock',
  },
  {
    id: '13',
    name: 'Desk Lamp',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c',
    sku: 'HOM-DL-013',
    category: 'Home & Living',
    price: 39.99,
    stock: 30,
    status: 'in_stock',
  },
  {
    id: '14',
    name: 'Coffee Mug',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38',
    sku: 'HOM-CM-014',
    category: 'Home & Living',
    price: 14.99,
    stock: 50,
    status: 'in_stock',
  },
  {
    id: '15',
    name: 'Sunglasses',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
    sku: 'ACC-SG-015',
    category: 'Accessories',
    price: 49.99,
    stock: 35,
    status: 'in_stock',
  },
  {
    id: '16',
    name: 'Backpack',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
    sku: 'ACC-BP-016',
    category: 'Accessories',
    price: 59.99,
    stock: 20,
    status: 'in_stock',
  },
];

// Simulate server-side pagination and filtering
const fetchProducts = (
  page: number,
  rowsPerPage: number,
  searchTerm: string,
  category: string,
  sortBy: string
) => {
  // Filter products based on search term and category
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      category === 'All' || 
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  // Sort products based on sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name_asc':
        return a.name.localeCompare(b.name);
      case 'name_desc':
        return b.name.localeCompare(a.name);
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'stock_asc':
        return a.stock - b.stock;
      case 'stock_desc':
        return b.stock - a.stock;
      default:
        return 0;
    }
  });

  // Calculate pagination
  const totalCount = sortedProducts.length;
  const paginatedProducts = sortedProducts.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return {
    products: paginatedProducts,
    totalCount
  };
};

export function ProductsOverview() {
  const theme = useTheme();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name_asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8); // Default items per page for grid view
  const [totalCount, setTotalCount] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const isDarkMode = theme.palette.mode === 'dark';
  const { t } = useTranslation();

  // Memoize the fetch function to prevent unnecessary re-renders
  const fetchData = useCallback(() => {
    const result = fetchProducts(page, rowsPerPage, searchTerm, category, sortBy);
    setProducts(result.products);
    setTotalCount(result.totalCount);
  }, [page, rowsPerPage, searchTerm, category, sortBy]);

  // Initial fetch and refetch when dependencies change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCategoryChange = useCallback((newCategory: string) => {
    setCategory(newCategory);
    setPage(1); // Reset to first page when changing category
  }, []);

  const handleSortChange = useCallback((newSortBy: string) => {
    setSortBy(newSortBy);
  }, []);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setPage(1); // Reset to first page when searching
  }, []);

  const handleSelectionChange = useCallback((selectedIds: string[]) => {
    setSelectedProductIds(selectedIds);
  }, []);

  const handleDeleteSelected = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  const confirmDeleteSelected = useCallback(() => {
    // In a real application, you would make an API call to delete the selected products
    // Here we're just updating the local state
    const updatedProducts = products.filter(product => !selectedProductIds.includes(product.id));
    setProducts(updatedProducts);
    setSelectedProductIds([]);
    setDeleteDialogOpen(false);
    setSnackbar({
      open: true,
      message: `Successfully deleted ${selectedProductIds.length} product(s)`,
      severity: 'success',
    });
    fetchData(); // Refetch to update the list
  }, [products, selectedProductIds, fetchData]);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleRowsPerPageChange = useCallback((newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1); // Reset to first page when changing rows per page
  }, []);

  const handleImportProducts = useCallback(() => {
    // Implement import functionality
    console.log('Import products');
    setSnackbar({
      open: true,
      message: 'Import feature will be implemented soon',
      severity: 'info',
    });
  }, []);

  const handleExportProducts = useCallback(() => {
    // Implement export functionality
    console.log('Export products');
    setSnackbar({
      open: true,
      message: 'Products exported successfully',
      severity: 'success',
    });
  }, []);

  // Memoize the ProductFilters component to prevent unnecessary re-renders
  const memoizedFilters = useMemo(() => (
    <ProductFilters
      viewMode={viewMode}
      category={category}
      sortBy={sortBy}
      searchTerm={searchTerm}
      onViewModeChange={setViewMode}
      onCategoryChange={handleCategoryChange}
      onSortByChange={handleSortChange}
      onSearch={handleSearch}
    />
  ), [viewMode, category, sortBy, searchTerm, handleCategoryChange, handleSortChange, handleSearch]);

  // Memoize the ProductGrid and ProductTable components to prevent unnecessary re-renders
  const memoizedProductView = useMemo(() => {
    return viewMode === 'grid' ? (
      <ProductGrid 
        products={products} 
        selectedProductIds={selectedProductIds}
        onSelectionChange={handleSelectionChange}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        totalCount={totalCount}
      />
    ) : (
      <ProductTable 
        products={products} 
        selectedProductIds={selectedProductIds}
        onSelectionChange={handleSelectionChange}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        totalCount={totalCount}
      />
    );
  }, [
    viewMode, 
    products, 
    selectedProductIds, 
    page, 
    rowsPerPage, 
    totalCount, 
    handleSelectionChange, 
    handlePageChange, 
    handleRowsPerPageChange
  ]);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {selectedProductIds.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteSelected}
            >
              {t('delete')} {t('selected')} ({selectedProductIds.length})
            </Button>
          )}
          <Button
            variant="outlined"
            startIcon={<ArrowDownwardIcon />}
            onClick={handleImportProducts}
          >
            {t('importData')}
          </Button>
          <Button
            variant="outlined"
            startIcon={<ArrowOutwardIcon />}
            onClick={handleExportProducts}
          >
            {t('exportData')}
          </Button>
        </Box>
        <Button
          component={Link}
          href="/dashboard/products/create"
          variant="contained"
          startIcon={<AddIcon />}
        >
          {t('createProduct')}
        </Button>
      </Box>

      {memoizedFilters}

      <Box sx={{ mt: 3 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            bgcolor: theme.palette.background.paper, 
            borderRadius: 2, 
            overflow: 'hidden',
            boxShadow: isDarkMode 
              ? '0 1px 3px rgba(0,0,0,0.2)' 
              : '0 1px 3px rgba(0,0,0,0.05)',
            borderColor: theme.palette.divider,
            transition: 'background-color 0.1s ease-out, border-color 0.1s ease-out, box-shadow 0.1s ease-out',
          }}
        >
          {memoizedProductView}
        </Paper>
      </Box>

      {/* Confirmation Dialog for Bulk Delete */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            transition: 'background-color 0.1s ease-out',
          }
        }}
      >
        <DialogTitle>{t('confirmDelete')}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: theme.palette.text.secondary }}>
            {t('thisActionCannotBeUndone')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>{t('cancel')}</Button>
          <Button onClick={confirmDeleteSelected} color="error" variant="contained">
            {t('delete')}
          </Button>
        </DialogActions>
      </Dialog>

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