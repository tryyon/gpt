'use client';

import { useState } from 'react';
import { Box, Button, Dialog } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { ChildCategoryTable } from './ChildCategoryTable';
import { ChildCategoryForm } from './ChildCategoryForm';
import { DefaultCard } from '@/global-components/common/DefaultCard';

export function ChildCategoryManagement() {
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
          Add Child Category
        </Button>
      </Box>

      <ChildCategoryTable onEditCategory={handleEditCategory} />

      <Dialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedCategory(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <ChildCategoryForm
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