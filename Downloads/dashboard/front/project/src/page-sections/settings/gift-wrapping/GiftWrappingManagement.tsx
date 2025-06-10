'use client';

import { useState } from 'react';
import { Box, Button, Dialog, Alert, Snackbar } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { GiftWrappingTable } from './GiftWrappingTable';
import { GiftWrappingForm } from './GiftWrappingForm';
import { DefaultCard } from '@/global-components/common/DefaultCard';
import { mockGiftWrapping } from '@/lib/data/mockGiftWrapping';
import type { GiftWrapping } from '@/lib/validations/giftWrapping';

export function GiftWrappingManagement() {
  const [wrappingOptions, setWrappingOptions] = useState<GiftWrapping[]>(mockGiftWrapping);
  const [editingWrapping, setEditingWrapping] = useState<GiftWrapping | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSubmit = async (data: GiftWrapping) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!data.id) {
        const newId = Math.max(...wrappingOptions.map(p => p.id || 0), 0) + 1;
        setWrappingOptions(prev => [...prev, { ...data, id: newId }]);
      } else {
        setWrappingOptions(prev => prev.map(p => p.id === data.id ? data : p));
      }
      
      setIsFormOpen(false);
      setEditingWrapping(null);
      setSnackbar({ open: true, message: 'Gift wrapping saved successfully', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error saving gift wrapping', severity: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (wrapping: GiftWrapping) => {
    setWrappingOptions(prev => prev.filter(p => p.id !== wrapping.id));
    setSnackbar({ open: true, message: 'Gift wrapping deleted successfully', severity: 'success' });
  };

  return (
    <DefaultCard>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsFormOpen(true)}
        >
          Add Gift Wrapping
        </Button>
      </Box>

      <GiftWrappingTable
        wrappingOptions={wrappingOptions}
        onEdit={(wrapping) => {
          setEditingWrapping(wrapping);
          setIsFormOpen(true);
        }}
        onDelete={handleDelete}
      />

      <Dialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingWrapping(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <GiftWrappingForm
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingWrapping(null);
          }}
          initialData={editingWrapping}
          isSubmitting={isSubmitting}
        />
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </DefaultCard>
  );
}