'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Fade,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { Collection } from '@/lib/validations/collection';
import { CollectionForm } from './CollectionForm';
import { CollectionsTable } from './CollectionsTable';
import { DefaultCard } from '@/global-components/common/DefaultCard';

export function CollectionsManagement() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [collections, setCollections] = useState<Collection[]>([]);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: Collection) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!data.id) {
        const newId = Math.max(...collections.map(p => p.id || 0), 0) + 1;
        setCollections(prev => [...prev, { ...data, id: newId }]);
      } else {
        setCollections(prev => prev.map(p => p.id === data.id ? data : p));
      }
      
      handleClose();
    } catch (error) {
      console.error('Error saving collection:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (collection: Collection) => {
    setCollections(prev => prev.filter(p => p.id !== collection.id));
  };

  const handleEdit = (collection: Collection) => {
    setEditingCollection(collection);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingCollection(null);
  };

  // Handle escape key
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <DefaultCard>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditingCollection({
              id: 0,
              title: '',
              items: [{ description: '' }],
              dateCreated: new Date(),
              status: 'Enabled',
            });
            setIsFormOpen(true);
          }}
        >
          Add Collection
        </Button>
      </Box>

      <CollectionsTable
        collections={collections}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Dialog
        open={isFormOpen}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        fullScreen={fullScreen}
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 300 }}
        onKeyDown={handleKeyDown}
        aria-labelledby="collection-dialog-title"
        PaperProps={{
          sx: {
            m: 2,
            maxHeight: 'calc(100% - 64px)',
            borderRadius: theme.shape.borderRadius,
          },
        }}
      >
        <DialogTitle 
          id="collection-dialog-title"
          sx={{ 
            pr: 6, // Make room for close button
            pb: 0,
          }}
        >
          {editingCollection?.id ? 'Edit Collection' : 'Add Collection'}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'text.secondary',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent 
          sx={{ 
            pt: 3,
            pb: 3,
            px: { xs: 2, sm: 3 },
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CollectionForm
            onSubmit={handleSubmit}
            onCancel={handleClose}
            initialData={editingCollection}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </DefaultCard>
  );
}