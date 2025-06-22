'use client';

import { useState } from 'react';
import { Box, Paper, Grid, useTheme } from '@mui/material';
import { ProductGrid } from './ProductGrid';
import { ProductTable } from './ProductTable';
import { ProductFilters } from './ProductFilters';
import { SelectedProducts } from './SelectedProducts';
import type { Product } from '@/types/product';

type SelectedProduct = Product & { quantity: number };

// Mock data - Move to a separate data file in production
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Nike Air Max',
    category: 'Shoes',
    price: 129.99,
    stock: 50,
    barcode: '123456789',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    sku: 'SKU-0001',
    status: 'active'
  },
  {
    id: '2',
    name: "Levi's 501",
    category: 'Clothing',
    price: 89.99,
    stock: 30,
    barcode: '987654321',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0',
    sku: 'SKU-0002',
    status: 'active'
  },
  {
    id: '3',
    name: 'Samsung Galaxy S21',
    category: 'Electronics',
    price: 799.99,
    stock: 15,
    barcode: '123789456',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c',
    sku: 'SKU-0003',
    status: 'active'
  },
  {
    id: '4',
    name: 'Apple AirPods Pro',
    category: 'Electronics',
    price: 249.99,
    stock: 25,
    barcode: '456123789',
    image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5',
    sku: 'SKU-0004',
    status: 'active'
  },
  {
    id: '5',
    name: 'Adidas Ultraboost',
    category: 'Shoes',
    price: 179.99,
    stock: 40,
    barcode: '789456123',
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329',
    sku: 'SKU-0005',
    status: 'active'
  },
  {
    id: '6',
    name: 'Sony WH-1000XM4',
    category: 'Electronics',
    price: 349.99,
    stock: 20,
    barcode: '321654987',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb',
    sku: 'SKU-0006',
    status: 'active'
  },
  {
    id: '7',
    name: 'H&M Slim Fit Shirt',
    category: 'Clothing',
    price: 29.99,
    stock: 100,
    barcode: '654987321',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c',
    sku: 'SKU-0007',
    status: 'active'
  },
  {
    id: '8',
    name: 'Zara Leather Jacket',
    category: 'Clothing',
    price: 89.99,
    stock: 35,
    barcode: '987321654',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5',
    sku: 'SKU-0008',
    status: 'active'
  },
  {
    id: '9',
    name: 'Logitech MX Master 3',
    category: 'Electronics',
    price: 99.99,
    stock: 45,
    barcode: '159753456',
    image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3',
    sku: 'SKU-0009',
    status: 'active'
  },
  {
    id: '10',
    name: 'Casio G-Shock Watch',
    category: 'Accessories',
    price: 149.99,
    stock: 30,
    barcode: '753159456',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    sku: 'SKU-0010',
    status: 'active'
  },
  {
    id: '11',
    name: 'Ray-Ban Sunglasses',
    category: 'Accessories',
    price: 159.99,
    stock: 25,
    barcode: '456159753',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
    sku: 'SKU-0011',
    status: 'active'
  },
  {
    id: '12',
    name: 'North Face Backpack',
    category: 'Accessories',
    price: 89.99,
    stock: 40,
    barcode: '159456753',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
    sku: 'SKU-0012',
    status: 'active'
  },
  // Add more products as needed
];

export function ProductSelectionView() {
  const theme = useTheme();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name_asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [scanning, setScanning] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const handleProductSelect = (product: Product) => {
    setSelectedProducts(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => 
          p.id === product.id 
            ? { ...p, quantity: Math.min(p.quantity + 1, product.stock) }
            : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    // Update selected product IDs
    setSelectedProductIds(prev => {
      if (!prev.includes(product.id)) {
        return [...prev, product.id];
      }
      return prev;
    });
  };

  const handleSelectionChange = (productIds: string[]) => {
    setSelectedProductIds(productIds);
    
    // Update selected products based on the IDs
    const newSelectedProducts = productIds.map(id => {
      const product = mockProducts.find(p => p.id === id);
      const existing = selectedProducts.find(p => p.id === id);
      
      if (product) {
        return existing || { ...product, quantity: 1 };
      }
      return null;
    }).filter(Boolean) as SelectedProduct[];
    
    setSelectedProducts(newSelectedProducts);
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setSelectedProducts(prev =>
      prev.map(p => p.id === productId ? { ...p, quantity } : p)
    );
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
    setSelectedProductIds(prev => prev.filter(id => id !== productId));
  };

  const handleBarcodeScanner = async () => {
    setScanning(true);
    try {
      // Here you would integrate with a barcode scanning library
      // For now, we'll simulate a scan
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockBarcode = '123456789';
      setSearchTerm(mockBarcode);
    } catch (error) {
      console.error('Barcode scanning failed:', error);
    } finally {
      setScanning(false);
    }
  };

  const filteredProducts = mockProducts.filter(product => 
    (category === 'All' || product.category === category) &&
    (searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barcode?.includes(searchTerm)
    )
  ).sort((a, b) => {
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

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <ProductFilters
            viewMode={viewMode}
            category={category}
            sortBy={sortBy}
            searchTerm={searchTerm}
            onViewModeChange={setViewMode}
            onCategoryChange={setCategory}
            onSortByChange={setSortBy}
            onSearch={setSearchTerm}
            onBarcodeScanner={handleBarcodeScanner}
            scanning={scanning}
          />
        </Paper>
      </Grid>

      <Grid item xs={12} md={8}>
        {viewMode === 'grid' ? (
          <ProductGrid
            products={filteredProducts as Array<Omit<Product, 'image'> & { image: string }>}
            selectedProductIds={selectedProductIds}
            onSelectionChange={handleSelectionChange}
            page={1}
            onPageChange={() => {}}
            totalCount={filteredProducts.length}
          />
        ) : (
          <ProductTable
            products={filteredProducts as Array<Omit<Product, 'image'> & { image: string }>}
            selectedProductIds={selectedProductIds}
            onSelectionChange={handleSelectionChange}
            page={1}
            onPageChange={() => {}}
            totalCount={filteredProducts.length}
          />
        )}
      </Grid>

      <Grid item xs={12} md={4}>
        <SelectedProducts
          selectedProducts={selectedProducts}
          onQuantityChange={handleQuantityChange}
          onRemoveProduct={handleRemoveProduct}
        />
      </Grid>
    </Grid>
  );
}