'use client';

import { useState } from 'react';
import { Box, Paper, Grid, Typography, useTheme, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProductSchema, type CreateProductInput } from '@/lib/validations/product';
import { GeneralDetails } from './sections/GeneralDetails';
import { Description } from './sections/Description';
import { Instructions } from './sections/Instructions';
import { Visibility } from './sections/Visibility';
import { Inventory } from './sections/Inventory';
import { GiftWrapping } from './sections/GiftWrapping';
import { ModifierOptions } from './sections/ModifierOptions';
import { Upselling } from './sections/Upselling';
import { Variants } from './sections/Variants';
import { Shipping } from './sections/Shipping';

const menuItems = [
  { id: 0, label: 'General Details' },
  { id: 1, label: 'Variants' },
  { id: 2, label: 'Description' },
  { id: 3, label: 'Shipping' },
  { id: 4, label: 'Instructions' },
  { id: 5, label: 'Visibility' },
  { id: 6, label: 'Inventory' },
  { id: 7, label: 'Gift Wrapping' },
  { id: 8, label: 'Modifier Options' },
  { id: 9, label: 'Upselling' },
];

export function CreateProduct() {
  const theme = useTheme();
  const [currentSection, setCurrentSection] = useState(0);

  const form = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      category: '',
      sku: '',
      mrp: 0,
      sellingPrice: 0,
      taxRate: 0,
      stock: 0,
      description: '',
    },
  });

  const { handleSubmit, formState: { isSubmitting } } = form;

  const onSubmit = async (data: CreateProductInput) => {
    try {
      console.log('Product data:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleNext = () => {
    if (currentSection < menuItems.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSave = () => {
    form.handleSubmit(onSubmit)();
  };

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return <GeneralDetails form={form} />;
      case 1:
        return <Variants form={form} />;
      case 2:
        return <Description form={form} />;
      case 3:
        return <Shipping form={form} />;
      case 4:
        return <Instructions form={form} />;
      case 5:
        return <Visibility form={form} />;
      case 6:
        return <Inventory form={form} />;
      case 7:
        return <GiftWrapping form={form} />;
      case 8:
        return <ModifierOptions form={form} />;
      case 9:
        return <Upselling form={form} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
      {/* Left Sidebar Menu */}
      <Paper
        variant="outlined"
        sx={{
          width: 280,
          flexShrink: 0,
          height: 'calc(100vh - 180px)',
          overflow: 'auto',
          position: 'sticky',
          top: 24,
          bgcolor: 'background.paper', // Changed to white background
        }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6">Create Product</Typography>
          <Typography variant="body2" color="text.secondary">
            Complete all sections to create your product
          </Typography>
        </Box>
        <Box 
          component="nav" 
          sx={{ 
            py: 1,
            '& > div': {
              px: 2,
              py: 1.5,
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            },
          }}
        >
          {menuItems.map((item) => (
            <Box
              key={item.id}
              onClick={() => setCurrentSection(item.id)}
              sx={{
                borderRadius: 1,
                bgcolor: currentSection === item.id ? 
                  theme.palette.mode === 'dark' ? 
                    'rgba(255, 255, 255, 0.08)' : 
                    'rgba(0, 0, 0, 0.04)' 
                  : 'transparent',
                color: currentSection === item.id ? 'primary.main' : 'text.primary',
              }}
            >
              <Typography variant="body2">
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1 }}>
        <Paper 
          variant="outlined" 
          sx={{ 
            p: { xs: 2, sm: 3 },
            bgcolor: 'background.paper',
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {renderSection()}

            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                mt: 4,
                pt: 3,
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Button
                variant="outlined"
                onClick={handlePrevious}
                disabled={currentSection === 0}
              >
                Previous
              </Button>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleSave}
                  disabled={isSubmitting}
                >
                  Save Draft
                </Button>
                {currentSection === menuItems.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : 'Save & Publish'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  );
}