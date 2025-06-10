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
  TextField,
  InputAdornment,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
import { DefaultCard } from '@/global-components/common/DefaultCard';

// Mock data for attributes
const mockAttributes = [
  {
    id: 1,
    name: 'Size',
    type: 'select',
    values: ['Small', 'Medium', 'Large', 'X-Large'],
    required: true,
    status: 'active',
    usedIn: 156,
  },
  {
    id: 2,
    name: 'Color',
    type: 'color',
    values: ['Red', 'Blue', 'Green', 'Black', 'White'],
    required: true,
    status: 'active',
    usedIn: 243,
  },
  {
    id: 3,
    name: 'Material',
    type: 'select',
    values: ['Cotton', 'Polyester', 'Wool', 'Silk'],
    required: false,
    status: 'active',
    usedIn: 89,
  },
];

export function ProductAttributes() {
  const [attributes, setAttributes] = useState(mockAttributes);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAttributes = attributes.filter(attr =>
    attr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attr.values.some(value => value.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <DefaultCard>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <TextField
            placeholder="Search attributes..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
          >
            Add Attribute
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {filteredAttributes.map((attribute) => (
          <Grid item xs={12} md={4} key={attribute.id}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box>
                    <Typography variant="h6">
                      {attribute.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Type: {attribute.type}
                    </Typography>
                  </Box>
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
                  {attribute.values.map((value, index) => (
                    <Chip
                      key={index}
                      label={value}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip
                      label={`${attribute.usedIn} products`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    {attribute.required && (
                      <Chip
                        label="Required"
                        size="small"
                        color="warning"
                        variant="outlined"
                      />
                    )}
                  </Box>
                  <Chip
                    label={attribute.status}
                    size="small"
                    color={attribute.status === 'active' ? 'success' : 'default'}
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