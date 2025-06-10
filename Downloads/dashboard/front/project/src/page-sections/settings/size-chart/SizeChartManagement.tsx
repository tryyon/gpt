'use client';

import { useState } from 'react';
import { Box, Button, Dialog, Alert, Snackbar } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { SizeChartTable } from './SizeChartTable';
import { SizeChartForm } from './SizeChartForm';
import { DefaultCard } from '@/global-components/common/DefaultCard';
import { mockSizeCharts } from '@/lib/data/mockSizeCharts';
import type { SizeChart } from '@/lib/validations/sizeChart';

export function SizeChartManagement() {
  const [charts, setCharts] = useState<SizeChart[]>(mockSizeCharts);
  const [editingChart, setEditingChart] = useState<SizeChart | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSubmit = async (data: SizeChart) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!data.id) {
        const newId = Math.max(...charts.map(p => p.id || 0), 0) + 1;
        setCharts(prev => [...prev, { ...data, id: newId }]);
      } else {
        setCharts(prev => prev.map(p => p.id === data.id ? data : p));
      }
      
      setIsFormOpen(false);
      setEditingChart(null);
      setSnackbar({ open: true, message: 'Size chart saved successfully', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error saving size chart', severity: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (chart: SizeChart) => {
    setCharts(prev => prev.filter(p => p.id !== chart.id));
    setSnackbar({ open: true, message: 'Size chart deleted successfully', severity: 'success' });
  };

  return (
    <DefaultCard>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsFormOpen(true)}
        >
          Add Size Chart
        </Button>
      </Box>

      <SizeChartTable
        charts={charts}
        onEdit={(chart) => {
          setEditingChart(chart);
          setIsFormOpen(true);
        }}
        onDelete={handleDelete}
      />

      <Dialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingChart(null);
        }}
        maxWidth="lg"
        fullWidth
      >
        <SizeChartForm
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingChart(null);
          }}
          initialData={editingChart}
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