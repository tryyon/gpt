'use client';

import { useState } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { DataTable } from '@/global-components/common/DataTable';
import type { GridColDef } from '@mui/x-data-grid';

const mockCategories = [
  {
    id: '1',
    name: 'Smartphones',
    rootCategory: 'Electronics',
    description: 'Mobile phones and accessories',
    logo: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
    isActive: true,
    displayOrder: 1,
    childCategories: [
      { id: 'cc1', name: 'Android Phones' },
      { id: 'cc2', name: 'iPhones' },
      { id: 'cc3', name: 'Phone Cases' },
      { id: 'cc4', name: 'Screen Protectors' },
    ],
  },
  {
    id: '2',
    name: "Men's Wear",
    rootCategory: 'Fashion',
    description: 'Men\'s clothing and accessories',
    logo: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891',
    image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891',
    isActive: true,
    displayOrder: 2,
    childCategories: [
      { id: 'cc5', name: 'T-Shirts' },
      { id: 'cc6', name: 'Shirts' },
      { id: 'cc7', name: 'Pants' },
      { id: 'cc8', name: 'Jackets' },
    ],
  },
];

interface MainCategoryTableProps {
  onEditCategory: (category: any) => void;
}

export function MainCategoryTable({ onEditCategory }: MainCategoryTableProps) {
  const [categories] = useState(mockCategories);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = (category: any) => {
    setSelectedCategory(category);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedCategory(null);
    setDialogOpen(false);
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Category',
      flex: 1.2,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {params.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.rootCategory}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'childCategories',
      headerName: 'Child Categories',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            size="small"
            variant="text"
            onClick={() => handleOpenDialog(params.row)}
          >
            {params.value.length} Categories
          </Button>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {params.value.slice(0, 2).map((category: any) => (
              <Chip
                key={category.id}
                label={category.name}
                size="small"
                variant="outlined"
              />
            ))}
            {params.value.length > 2 && (
              <Chip
                label={`+${params.value.length - 2}`}
                size="small"
                variant="outlined"
              />
            )}
          </Box>
        </Box>
      ),
    },
    {
      field: 'displayOrder',
      headerName: 'Order',
      width: 100,
      align: 'center',
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Active' : 'Inactive'}
          color={params.value ? 'success' : 'default'}
          size="small"
          sx={{ textTransform: 'capitalize' }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="View Details">
            <IconButton size="small" color="primary">
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton 
              size="small" 
              onClick={() => onEditCategory(params.row)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" color="error">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <>
      <DataTable
        rows={categories}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 10 } },
          sorting: { sortModel: [{ field: 'displayOrder', sort: 'asc' }] },
        }}
      />

      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Child Categories - {selectedCategory?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1, 
            pt: 2,
          }}>
            {selectedCategory?.childCategories.map((category: any) => (
              <Chip
                key={category.id}
                label={category.name}
                variant="outlined"
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}