'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { DefaultCard } from '@/global-components/common/DefaultCard';

// Mock data - Replace with API data in production
const mockCategories = [
  {
    id: 1,
    name: 'Electronics',
    subcategories: ['Smartphones', 'Laptops', 'Accessories'],
    productCount: 156,
    status: 'active',
  },
  {
    id: 2,
    name: 'Fashion',
    subcategories: ['Men\'s Wear', 'Women\'s Wear', 'Kids'],
    productCount: 243,
    status: 'active',
  },
  {
    id: 3,
    name: 'Home & Living',
    subcategories: ['Furniture', 'Decor', 'Kitchen'],
    productCount: 89,
    status: 'active',
  },
];

export function ProductCategories() {
  const [categories] = useState(mockCategories);

  return (
    <DefaultCard>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add Category
        </Button>
      </Box>

      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} md={4} key={category.id}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">
                    {category.name}
                  </Typography>
                  <Box>
                    <IconButton size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  {category.subcategories.map((sub, index) => (
                    <Chip
                      key={index}
                      label={sub}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip
                    label={`${category.productCount} products`}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    label={category.status}
                    size="small"
                    color={category.status === 'active' ? 'success' : 'default'}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DefaultCard>
  );
}