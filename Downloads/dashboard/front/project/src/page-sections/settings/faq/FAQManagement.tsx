'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  Button,
  Dialog,
  Alert,
  Snackbar,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { FAQForm } from './FAQForm';
import { FAQList } from './FAQList';
import { DefaultCard } from '@/global-components/common/DefaultCard';
import type { FAQ } from '@/types/content';
import { mockQA } from '@/lib/data/mockFAQ';

export function FAQManagement() {
  const [faqs, setFaqs] = useState(mockQA);
  const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null);
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

  const handleSaveFAQ = (data: any) => {
    try {
      if (selectedFAQ?.id) {
        setFaqs(prev => prev.map(faq => 
          faq.id === selectedFAQ.id ? { ...data, id: faq.id } : faq
        ));
      } else {
        const newFAQ = {
          ...data,
          id: Math.max(...faqs.map(f => f.id)) + 1,
          dateCreated: new Date(),
          lastUpdated: new Date(),
        };
        setFaqs(prev => [...prev, newFAQ]);
      }

      setSnackbar({
        open: true,
        message: `FAQ ${selectedFAQ ? 'updated' : 'added'} successfully`,
        severity: 'success',
      });
      setIsFormOpen(false);
      setSelectedFAQ(null);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error saving FAQ',
        severity: 'error',
      });
    }
  };

  const handleDelete = (faqId: string) => {
    setFaqs(prev => prev.filter(faq => faq.id !== parseInt(faqId)));
    setSnackbar({
      open: true,
      message: 'FAQ deleted successfully',
      severity: 'success',
    });
  };

  return (
    <DefaultCard>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsFormOpen(true)}
        >
          Add Q&A Section
        </Button>
      </Box>

      <FAQList
        faqs={faqs}
        onEdit={(faq) => {
          setSelectedFAQ(faq);
          setIsFormOpen(true);
        }}
        onDelete={handleDelete}
      />

      <Dialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedFAQ(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <FAQForm
          onSubmit={handleSaveFAQ}
          initialData={selectedFAQ}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedFAQ(null);
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