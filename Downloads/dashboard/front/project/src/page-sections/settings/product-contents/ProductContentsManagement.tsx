'use client';

import { useState } from 'react';
import { Box, Button, Dialog } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { ProductContentsTable } from './ProductContentsTable';
import { ProductContentsForm } from './ProductContentsForm';
import { DefaultCard } from '@/global-components/common/DefaultCard';
import { mockProductContents } from '@/lib/data/mockProductContents';
import type { ProductContent } from '@/lib/validations/productContent';

export function ProductContentsManagement() {
  const [contents, setContents] = useState<ProductContent[]>(mockProductContents);
  const [editingContent, setEditingContent] = useState<ProductContent | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ProductContent) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!data.id) {
        const newId = Math.max(...contents.map(p => p.id || 0), 0) + 1;
        setContents(prev => [...prev, { ...data, id: newId }]);
      } else {
        setContents(prev => prev.map(p => p.id === data.id ? data : p));
      }
      
      setIsFormOpen(false);
      setEditingContent(null);
    } catch (error) {
      console.error('Error saving product content:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (content: ProductContent) => {
    setContents(prev => prev.filter(p => p.id !== content.id));
  };

  return (
    <DefaultCard>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsFormOpen(true)}
        >
          Add Product Content
        </Button>
      </Box>

      <ProductContentsTable
        contents={contents}
        onEdit={(content) => {
          setEditingContent(content);
          setIsFormOpen(true);
        }}
        onDelete={handleDelete}
      />

      <Dialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingContent(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <ProductContentsForm
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingContent(null);
          }}
          initialData={editingContent}
          isSubmitting={isSubmitting}
        />
      </Dialog>
    </DefaultCard>
  );
}