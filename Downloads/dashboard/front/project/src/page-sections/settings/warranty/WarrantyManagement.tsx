'use client';

import { useState } from 'react';
import { Box, Card, CardContent, Alert, Snackbar, Button, Dialog } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Warranty } from '@/lib/validations/warranty';
import { WarrantyForm } from './WarrantyForm';
import { WarrantyTable } from './WarrantyTable';
import { mockWarranties } from '@/lib/data/mockWarranties';

export function WarrantyManagement() {
  const [warranties, setWarranties] = useState<Warranty[]>(mockWarranties);
  const [editingWarranty, setEditingWarranty] = useState<Warranty | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSubmit = async (data: Warranty) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!data.id) {
        const newId = Math.max(...warranties.map(p => p.id || 0), 0) + 1;
        setWarranties(prev => [...prev, { ...data, id: newId }]);
      } else {
        setWarranties(prev => prev.map(p => p.id === data.id ? data : p));
      }
      
      setIsFormOpen(false);
      setEditingWarranty(null);
      setSnackbar({ open: true, message: 'Warranty saved successfully', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error saving warranty', severity: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (warranty: Warranty) => {
    setWarranties(prev => prev.filter(p => p.id !== warranty.id));
    setSnackbar({ open: true, message: 'Warranty deleted successfully', severity: 'success' });
  };

  const handleEdit = (warranty: Warranty) => {
    setEditingWarranty(warranty);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingWarranty(null);
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setEditingWarranty({
                  title: '',
                  type: 'Warranty',
                  duration: {
                    value: 1,
                    unit: 'Years',
                  },
                  description: '',
                  conditions: [''],
                  isActive: true,
                  dateCreated: new Date(),
                });
                setIsFormOpen(true);
              }}
            >
              Add Policy
            </Button>
          </Box>

          <WarrantyTable
            warranties={warranties}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <Dialog
        open={isFormOpen}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <WarrantyForm
          onSubmit={handleSubmit}
          onCancel={handleClose}
          initialData={editingWarranty}
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
    </Box>
  );
}