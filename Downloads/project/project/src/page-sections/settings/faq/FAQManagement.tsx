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
import { FAQ } from '@/lib/validations/content';
import { v4 as uuidv4 } from 'uuid';

interface FAQListProps {
  faqs: FAQ[];
  onEdit: (faq: FAQ) => void;
  onDelete: (faqId: string) => void;
}

const mockQA: FAQ[] = [
  {
    id: '1',
    title: 'General Questions',
    items: [
      {
        id: '1-1',
        question: 'What is your return policy?',
        answer: 'You can return any item within 30 days of purchase.',
        category: 'Returns',
        isPublished: true,
        isHighlighted: false,
        displayOrder: 1,
      },
    ],
    dateCreated: new Date(),
    lastUpdated: new Date(),
  },
  {
    id: '2',
    title: 'Order Related Questions',
    items: [
      {
        id: '2-1',
        question: 'How do I track my order?',
        answer: 'You can track your order using the tracking link sent to your email.',
        category: 'Orders',
        isPublished: true,
        isHighlighted: false,
        displayOrder: 1,
      },
    ],
    dateCreated: new Date(),
    lastUpdated: new Date(),
  },
];

export function FAQManagement() {
  const [faqs, setFaqs] = useState<FAQ[]>(mockQA);
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
          id: uuidv4(),
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
    setFaqs(prev => prev.filter(faq => faq.id !== faqId));
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
        faqs={faqs.map(faq => ({
          title: faq.title,
          items: faq.items.map(item => ({
            question: item.question,
            answer: item.answer,
            category: item.category || '',
            isPublished: item.isPublished || true,
            isHighlighted: item.isHighlighted || false,
            displayOrder: item.displayOrder || 0,
            id: item.id,
          }))
        }))}
        onEdit={(faq) => {
          setSelectedFAQ(faq);
          setIsFormOpen(true);
        }}
        onDelete={(id) => handleDelete(id)}
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