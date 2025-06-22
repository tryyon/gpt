'use client';

import { useState } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Chip,
  Avatar,
  useTheme,
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
    name: 'Electronics',
    slug: 'electronics',
    description: 'Electronic devices and accessories',
    logo: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4',
    isActive: true,
    displayOrder: 1,
    mainCategories: [
      { id: 'mc1', name: 'Smartphones' },
      { id: 'mc2', name: 'Laptops' },
      { id: 'mc3', name: 'Audio Devices' },
      { id: 'mc4', name: 'Gaming' },
    ],
  },
  {
    id: '2',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Clothing and accessories',
    logo: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
    isActive: true,
    displayOrder: 2,
    mainCategories: [
      { id: 'mc5', name: "Men's Wear" },
      { id: 'mc6', name: "Women's Wear" },
      { id: 'mc7', name: 'Kids Wear' },
      { id: 'mc8', name: 'Accessories' },
    ],
  },
];

interface RootCategoryTableProps {
  onEditCategory: (category: any) => void;
}

export function RootCategoryTable({ onEditCategory }: RootCategoryTableProps) {
  const theme = useTheme();
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
          {params.row.logo ? (
            <Avatar
              src={params.row.logo}
              alt={params.value}
              variant="rounded"
              sx={{ width: 40, height: 40 }}
            />
          ) : (
            <Avatar variant="rounded" sx={{ width: 40, height: 40 }}>
              {params.value.charAt(0)}
            </Avatar>
          )}
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {params.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.slug}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'mainCategories',
      headerName: 'Main Categories',
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
            <IconButton size="small" sx={{ color: theme.palette.primary.main }}>
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton 
              size="small" 
              onClick={() => onEditCategory(params.row)}
              sx={{ color: theme.palette.text.secondary }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" sx={{ color: theme.palette.error.main }}>
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
          Main Categories - {selectedCategory?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1, 
            pt: 2,
          }}>
            {selectedCategory?.mainCategories.map((category: any) => (
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