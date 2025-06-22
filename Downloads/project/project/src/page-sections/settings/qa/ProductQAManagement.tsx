'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  Alert,
  Snackbar,
  Typography,
  Card,
  CardContent,
  IconButton,
  Grid,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { ProductQAForm } from './ProductQAForm';
import { DefaultCard } from '@/global-components/common/DefaultCard';
import type { ProductQA } from '@/lib/validations/productQA';

// Mock data
const mockQAs: ProductQA[] = [
  {
    question: 'What material is this product made of?',
    answer: 'This product is made of high-quality cotton blend material that is both durable and comfortable.',
    isPublished: true,
    isHighlighted: true,
    displayOrder: 1,
    dateCreated: new Date('2024-03-15'),
    lastUpdated: new Date('2024-03-15'),
  },
  {
    question: 'Is this product machine washable?',
    answer: 'Yes, this product is machine washable. We recommend washing in cold water and tumble dry on low heat.',
    isPublished: true,
    isHighlighted: false,
    displayOrder: 2,
    dateCreated: new Date('2024-03-15'),
    lastUpdated: new Date('2024-03-15'),
  },
];

export function ProductQAManagement() {
  const [qas, setQAs] = useState<ProductQA[]>(mockQAs);
  const [selectedQA, setSelectedQA] = useState<ProductQA | null>(null);
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

  const handleSaveQA = (data: ProductQA) => {
    try {
      if (selectedQA) {
        setQAs(prev => prev.map(qa => 
          qa === selectedQA ? { ...data, lastUpdated: new Date() } : qa
        ));
      } else {
        const newQA = {
          ...data,
          dateCreated: new Date(),
          lastUpdated: new Date(),
        };
        setQAs(prev => [...prev, newQA]);
      }

      setSnackbar({
        open: true,
        message: `Q&A ${selectedQA ? 'updated' : 'added'} successfully`,
        severity: 'success',
      });
      setIsFormOpen(false);
      setSelectedQA(null);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error saving Q&A',
        severity: 'error',
      });
    }
  };

  const handleDelete = (qa: ProductQA) => {
    setQAs(prev => prev.filter(item => item !== qa));
    setSnackbar({
      open: true,
      message: 'Q&A deleted successfully',
      severity: 'success',
    });
  };

  return (
    <DefaultCard>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          Product Q&A
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsFormOpen(true)}
        >
          Add Q&A
        </Button>
      </Box>

      {qas.length === 0 ? (
        <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
          No Q&As available. Click the "Add Q&A" button to create one.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {qas.map((qa, index) => (
            <Grid item xs={12} key={index}>
              <Accordion variant="outlined">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <Typography variant="subtitle1">
                      {qa.question}
                    </Typography>
                    <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
                      <Chip
                        label={qa.isPublished ? 'Published' : 'Draft'}
                        color={qa.isPublished ? 'success' : 'default'}
                        size="small"
                      />
                      {qa.isHighlighted && (
                        <Chip
                          label="Highlighted"
                          color="primary"
                          size="small"
                          variant="outlined"
                        />
                      )}
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedQA(qa);
                          setIsFormOpen(true);
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(qa);
                        }}
                        color="error"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {qa.answer}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Chip
                      label={`Order: ${qa.displayOrder}`}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      label={`Last Updated: ${new Date(qa.lastUpdated ?? qa.dateCreated ?? '').toLocaleDateString()}`}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedQA(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <ProductQAForm
          onSubmit={handleSaveQA}
          initialData={selectedQA}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedQA(null);
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