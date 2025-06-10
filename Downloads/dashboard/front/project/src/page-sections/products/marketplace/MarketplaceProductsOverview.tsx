'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  Paper,
  useTheme,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  ArrowOutward as ArrowOutwardIcon
} from '@mui/icons-material';
import { ProductGrid } from '../ProductGrid';
import { ProductTable } from '../ProductTable';
import { ProductFilters } from '../ProductFilters';

// Mock data for marketplace products
const mockMarketplaceProducts = [
  {
    id: 'm1',
    name: 'Premium Leather Wallet',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93',
    sku: 'MKT-LW-001',
    category: 'Accessories',
    price: 49.99,
    stock: 50,
    status: 'in_stock',
  },
  {
    id: 'm2',
    name: 'Handmade Ceramic Mug',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d',
    sku: 'MKT-CM-002',
    category: 'Home & Living',
    price: 24.99,
    stock: 30,
    status: 'in_stock',
  },
  {
    id: 'm3',
    name: 'Organic Cotton T-Shirt',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    sku: 'MKT-TS-003',
    category: 'Clothing',
    price: 29.99,
    stock: 100,
    status: 'in_stock',
  },
  {
    id: 'm4',
    name: 'Handcrafted Wooden Bowl',
    image: 'https://images.unsplash.com/photo-1578903300721-98f1bb4b9b84',
    sku: 'MKT-WB-004',
    category: 'Home & Living',
    price: 39.99,
    stock: 15,
    status: 'in_stock',
  },
  {
    id: 'm5',
    name: 'Natural Soy Candle',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59',
    sku: 'MKT-SC-005',
    category: 'Home & Living',
    price: 19.99,
    stock: 25,
    status: 'in_stock',
  },
  {
    id: 'm6',
    name: 'Handmade Leather Journal',
    image: 'https://images.unsplash.com/photo-1518893494097-2ac6bf3f8d4c',
    sku: 'MKT-LJ-006',
    category: 'Stationery',
    price: 34.99,
    stock: 20,
    status: 'in_stock',
  },
  {
    id: 'm7',
    name: 'Artisan Soap Set',
    image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec',
    sku: 'MKT-AS-007',
    category: 'Bath & Beauty',
    price: 22.99,
    stock: 40,
    status: 'in_stock',
  },
  {
    id: 'm8',
    name: 'Handwoven Basket',
    image: 'https://images.unsplash.com/photo-1595397551849-e7e4d41e1ff6',
    sku: 'MKT-HB-008',
    category: 'Home & Living',
    price: 44.99,
    stock: 10,
    status: 'low_stock',
  },
  {
    id: 'm9',
    name: 'Macrame Wall Hanging',
    image: 'https://images.unsplash.com/photo-1582643381669-c05be8b9a81f',
    sku: 'MKT-MWH-009',
    category: 'Home Decor',
    price: 59.99,
    stock: 5,
    status: 'low_stock',
  },
  {
    id: 'm10',
    name: 'Handmade Silver Earrings',
    image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584',
    sku: 'MKT-SE-010',
    category: 'Jewelry',
    price: 64.99,
    stock: 15,
    status: 'in_stock',
  },
  {
    id: 'm11',
    name: 'Knitted Wool Scarf',
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9',
    sku: 'MKT-KWS-011',
    category: 'Clothing',
    price: 37.99,
    stock: 0,
    status: 'out_of_stock',
  },
  {
    id: 'm12',
    name: 'Handmade Ceramic Planter',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411',
    sku: 'MKT-CP-012',
    category: 'Home & Garden',
    price: 32.99,
    stock: 8,
    status: 'low_stock',
  },
  {
    id: 'm13',
    name: 'Vintage Style Sunglasses',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083',
    sku: 'MKT-VSS-013',
    category: 'Accessories',
    price: 28.99,
    stock: 20,
    status: 'in_stock',
  },
  {
    id: 'm14',
    name: 'Handcrafted Wooden Cutting Board',
    image: 'https://images.unsplash.com/photo-1541188495627-4b4e1e0184f9',
    sku: 'MKT-WCB-014',
    category: 'Kitchen',
    price: 54.99,
    stock: 12,
    status: 'in_stock',
  },
  {
    id: 'm15',
    name: 'Artisan Chocolate Box',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b',
    sku: 'MKT-ACB-015',
    category: 'Food',
    price: 29.99,
    stock: 0,
    status: 'out_of_stock',
  },
  {
    id: 'm16',
    name: 'Handwoven Wool Rug',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
    sku: 'MKT-HWR-016',
    category: 'Home & Living',
    price: 129.99,
    stock: 5,
    status: 'low_stock',
  },
];

// Simulate server-side pagination and filtering
const fetchMarketplaceProducts = (
  page: number,
  rowsPerPage: number,
  searchTerm: string,
  category: string,
  sortBy: string
) => {
  // Filter products based on search term and category
  const filteredProducts = mockMarketplaceProducts.filter(product => {
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

export function MarketplaceProductsOverview() {
  const theme = useTheme();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name_asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [addToWebsiteDialogOpen, setAddToWebsiteDialogOpen] = useState(false);
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

  // Memoize the fetch function to prevent unnecessary re-renders
  const fetchData = useCallback(() => {
    const result = fetchMarketplaceProducts(page, rowsPerPage, searchTerm, category, sortBy);
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

  const handleAddToWebsite = useCallback(() => {
    setAddToWebsiteDialogOpen(true);
  }, []);

  const confirmAddToWebsite = useCallback(() => {
    // In a real application, you would make an API call to add the selected products to your website
    // Here we're just showing a success message
    setAddToWebsiteDialogOpen(false);
    setSnackbar({
      open: true,
      message: `Successfully added ${selectedProductIds.length} product(s) to your website`,
      severity: 'success',
    });
    setSelectedProductIds([]);
  }, [selectedProductIds]);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleRowsPerPageChange = useCallback((newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1); // Reset to first page when changing rows per page
  }, []);

  const handleExportProducts = useCallback(() => {
    // Implement export functionality
    console.log('Export marketplace products');
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

  // Create a modified version of the marketplace products without edit/delete options
  const MarketplaceProductGrid = useMemo(() => {
    const MarketplaceGrid = (props: any) => (
      <ProductGrid 
        {...props}
        isMarketplace={true} // Pass a flag to indicate this is the marketplace view
      />
    );
    return MarketplaceGrid;
  }, []);

  const MarketplaceProductTable = useMemo(() => {
    const MarketplaceTable = (props: any) => (
      <ProductTable 
        {...props}
        isMarketplace={true} // Pass a flag to indicate this is the marketplace view
      />
    );
    return MarketplaceTable;
  }, []);

  // Memoize the ProductGrid and ProductTable components to prevent unnecessary re-renders
  const memoizedProductView = useMemo(() => {
    return viewMode === 'grid' ? (
      <MarketplaceProductGrid 
        products={products} 
        selectedProductIds={selectedProductIds}
        onSelectionChange={handleSelectionChange}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        totalCount={totalCount}
      />
    ) : (
      <MarketplaceProductTable 
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
    handleRowsPerPageChange,
    MarketplaceProductGrid,
    MarketplaceProductTable
  ]);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {selectedProductIds.length > 0 && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToWebsite}
            >
              Add to My Website ({selectedProductIds.length})
            </Button>
          )}
          <Button
            variant="outlined"
            startIcon={<ArrowOutwardIcon />}
            onClick={handleExportProducts}
          >
            Export
          </Button>
        </Box>
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

      {/* Confirmation Dialog for Adding to Website */}
      <Dialog
        open={addToWebsiteDialogOpen}
        onClose={() => setAddToWebsiteDialogOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            transition: 'background-color 0.1s ease-out',
          }
        }}
      >
        <DialogTitle>Add to My Website</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: theme.palette.text.secondary }}>
            Are you sure you want to add {selectedProductIds.length} selected product(s) to your website?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddToWebsiteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmAddToWebsite} color="primary" variant="contained">
            Add to Website
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