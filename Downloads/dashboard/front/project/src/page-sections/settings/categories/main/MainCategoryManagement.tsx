'use client';

import { useState } from 'react';
import { Box, Button, Dialog } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { MainCategoryTable } from './MainCategoryTable';
import { MainCategoryForm } from './MainCategoryForm';
import { DefaultCard } from '@/global-components/common/DefaultCard';

export function MainCategoryManagement() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const handleAddCategory = (data: any) => {
    console.log('Adding category:', data);
    setIsFormOpen(false);
    setSelectedCategory(null);
  };

  const handleEditCategory = (category: any) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  return (
    <DefaultCard>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsFormOpen(true)}
        >
          Add Main Category
        </Button>
      </Box>

      <MainCategoryTable onEditCategory={handleEditCategory} />

      <Dialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedCategory(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <MainCategoryForm
          onSubmit={handleAddCategory}
          initialData={selectedCategory}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedCategory(null);
          }}
        />
      </Dialog>
    </DefaultCard>
  );
}