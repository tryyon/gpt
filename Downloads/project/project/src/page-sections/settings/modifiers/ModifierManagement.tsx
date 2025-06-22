'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  Card,
  CardContent,
  IconButton,
  Typography,
  Grid,
  Chip,
  Alert,
  Snackbar,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { DefaultCard } from '@/global-components/common/DefaultCard';
import { ModifierForm } from './ModifierForm';

interface ModifierGroup {
  id: string;
  name: string;
  description: string;
  selectionType: 'single' | 'multiple';
  required: boolean;
  minSelections: number;
  maxSelections: number;
  isActive: boolean;
  displayOrder: number;
  dateCreated: Date;
  options: ModifierOption[];
}

interface ModifierOption {
  id: string;
  name: string;
  description: string;
  priceAdjustment: number;
  weightAdjustment: number;
  isAvailable: boolean;
  image?: string;
}

// Mock data - replace with API call in production
const mockModifierGroups: ModifierGroup[] = [
  {
    id: '1',
    name: 'Size Options',
    description: 'Available sizes for this product',
    selectionType: 'single',
    required: true,
    minSelections: 1,
    maxSelections: 1,
    isActive: true,
    displayOrder: 1,
    dateCreated: new Date(),
    options: [
      {
        id: '1-1',
        name: 'Small',
        description: 'Small size',
        priceAdjustment: 0,
        weightAdjustment: 0,
        isAvailable: true,
      },
      {
        id: '1-2',
        name: 'Medium',
        description: 'Medium size',
        priceAdjustment: 2,
        weightAdjustment: 0.2,
        isAvailable: true,
      },
      {
        id: '1-3',
        name: 'Large',
        description: 'Large size',
        priceAdjustment: 4,
        weightAdjustment: 0.4,
        isAvailable: true,
      },
    ],
  },
  {
    id: '2',
    name: 'Toppings',
    description: 'Extra toppings selection',
    selectionType: 'multiple',
    required: false,
    minSelections: 0,
    maxSelections: 5,
    isActive: true,
    displayOrder: 2,
    dateCreated: new Date(),
    options: [
      {
        id: '2-1',
        name: 'Extra Cheese',
        description: 'Add extra cheese',
        priceAdjustment: 1.5,
        weightAdjustment: 0.1,
        isAvailable: true,
        image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&q=80&w=200',
      },
      {
        id: '2-2',
        name: 'Mushrooms',
        description: 'Add mushrooms',
        priceAdjustment: 1,
        weightAdjustment: 0.05,
        isAvailable: true,
        image: 'https://images.unsplash.com/photo-1552825897-bb5efa86eab1?auto=format&fit=crop&q=80&w=200',
      },
    ],
  },
];

export function ModifierManagement() {
  const [modifierGroups, setModifierGroups] = useState<ModifierGroup[]>(mockModifierGroups);
  const [selectedGroup, setSelectedGroup] = useState<ModifierGroup | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleAddGroup = () => {
    setSelectedGroup(null);
    setIsFormOpen(true);
  };

  const handleEditGroup = (group: ModifierGroup) => {
    setSelectedGroup(group);
    setIsFormOpen(true);
  };

  const handleDeleteGroup = (groupId: string) => {
    setModifierGroups(prev => prev.filter(group => group.id !== groupId));
    setSnackbar({
      open: true,
      message: 'Modifier group deleted successfully',
      severity: 'success',
    });
  };

  type ModifierFormData = {
    options: {
      name: string;
      description: string;
      priceAdjustment: number;
      weightAdjustment: number;
      isAvailable: boolean;
      image?: string;
      id?: string;
    }[];
    name: string;
    description: string;
    selectionType: 'single' | 'multiple';
    required: boolean;
    minSelections: number;
    maxSelections: number;
    isActive: boolean;
  };

  const handleSaveGroup = (data: ModifierFormData) => {
    // Ensure all option ids are strings
    const optionsWithIds = data.options.map((option, idx) => ({
      ...option,
      id: option.id ?? `${Date.now()}-${idx}`,
    }));

    if (selectedGroup) {
      // Update existing group
      setModifierGroups(prev =>
        prev.map(group =>
          group.id === selectedGroup.id
            ? {
                ...group,
                ...data,
                options: optionsWithIds,
              }
            : group
        )
      );
    } else {
      // Add new group
      const newGroup: ModifierGroup = {
        id: Date.now().toString(),
        name: data.name,
        description: data.description,
        selectionType: data.selectionType,
        required: data.required,
        minSelections: data.minSelections,
        maxSelections: data.maxSelections,
        isActive: data.isActive,
        displayOrder: modifierGroups.length + 1,
        dateCreated: new Date(),
        options: optionsWithIds,
      };
      setModifierGroups(prev => [...prev, newGroup]);
    }

    setSnackbar({
      open: true,
      message: `Modifier group ${selectedGroup ? 'updated' : 'created'} successfully`,
      severity: 'success',
    });
    setIsFormOpen(false);
    setSelectedGroup(null);
  };

  return (
    <DefaultCard>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          Product Modifiers
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddGroup}
        >
          Add Modifier Group
        </Button>
      </Box>

      <Grid container spacing={3}>
        {modifierGroups.map((group) => (
          <Grid item xs={12} md={6} key={group.id}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {group.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {group.description}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleEditGroup(group)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteGroup(group.id)}
                      color="error"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip
                    label={group.selectionType === 'single' ? 'Single Choice' : 'Multiple Choice'}
                    color="primary"
                    size="small"
                  />
                  <Chip
                    label={group.required ? 'Required' : 'Optional'}
                    color={group.required ? 'error' : 'default'}
                    size="small"
                  />
                  <Chip
                    label={`${group.options.length} options`}
                    variant="outlined"
                    size="small"
                  />
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {group.options.map((option) => (
                    <Chip
                      key={option.id}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <span>{option.name}</span>
                          {option.priceAdjustment > 0 && (
                            <Typography variant="caption" color="primary">
                              +${option.priceAdjustment}
                            </Typography>
                          )}
                        </Box>
                      }
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedGroup(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <ModifierForm
          onSubmit={handleSaveGroup}
          initialData={selectedGroup}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedGroup(null);
          }}
        />
      </Dialog>

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
    </DefaultCard>
  );
}