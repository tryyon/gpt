'use client';

import { useState } from 'react';
import { Box, Button, Dialog, Alert, Snackbar } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { PackagingTable } from './PackagingTable';
import { PackagingForm } from './PackagingForm';
import { DefaultCard } from '@/global-components/common/DefaultCard';
import { mockPackaging } from '@/lib/data/mockPackaging';
import type { Packaging } from '@/lib/validations/packaging';

export function PackagingManagement() {
  const [packagingOptions, setPackagingOptions] = useState<Packaging[]>(mockPackaging);
  const [editingPackaging, setEditingPackaging] = useState<Packaging | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSubmit = async (data: Packaging) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!data.id) {
        const newId = Math.max(...packagingOptions.map(p => p.id || 0), 0) + 1;
        setPackagingOptions(prev => [...prev, { ...data, id: newId }]);
      } else {
        setPackagingOptions(prev => prev.map(p => p.id === data.id ? data : p));
      }
      
      setIsFormOpen(false);
      setEditingPackaging(null);
      setSnackbar({ open: true, message: 'Packaging option saved successfully', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error saving packaging option', severity: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (packaging: Packaging) => {
    setPackagingOptions(prev => prev.filter(p => p.id !== packaging.id));
    setSnackbar({ open: true, message: 'Packaging option deleted successfully', severity: 'success' });
  };

  return (
    <DefaultCard>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsFormOpen(true)}
        >
          Add Packaging Option
        </Button>
      </Box>

      <PackagingTable
        packagingOptions={packagingOptions}
        onEdit={(packaging) => {
          setEditingPackaging(packaging);
          setIsFormOpen(true);
        }}
        onDelete={handleDelete}
      />

      <Dialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingPackaging(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <PackagingForm
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingPackaging(null);
          }}
          initialData={editingPackaging}
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