'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  Card,
  CardContent,
  IconButton,
  Typography,
  Grid,
  Chip,
  Alert,
  Snackbar,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { DefaultCard } from '@/global-components/common/DefaultCard';
import { VisibilityForm } from './VisibilityForm';

interface VisibilitySection {
  id: string;
  name: string;
  description: string;
  color: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  isActive: boolean;
  displayOrder: number;
  dateCreated: Date;
}

// Mock data - replace with API call in production
const mockSections: VisibilitySection[] = [
  {
    id: '1',
    name: 'Featured Products',
    description: 'Products highlighted on the homepage',
    color: 'primary',
    isActive: true,
    displayOrder: 1,
    dateCreated: new Date(),
  },
  {
    id: '2',
    name: 'Trending Now',
    description: 'Currently popular products',
    color: 'secondary',
    isActive: true,
    displayOrder: 2,
    dateCreated: new Date(),
  },
  {
    id: '3',
    name: 'Budget Picks',
    description: 'Affordable product selection',
    color: 'success',
    isActive: true,
    displayOrder: 3,
    dateCreated: new Date(),
  },
];

export function VisibilityManagement() {
  const [sections, setSections] = useState<VisibilitySection[]>(mockSections);
  const [selectedSection, setSelectedSection] = useState<VisibilitySection | null>(null);
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

  const handleAddSection = () => {
    setSelectedSection(null);
    setIsFormOpen(true);
  };

  const handleEditSection = (section: VisibilitySection) => {
    setSelectedSection(section);
    setIsFormOpen(true);
  };

  const handleDeleteSection = (sectionId: string) => {
    setSections(prev => prev.filter(section => section.id !== sectionId));
    setSnackbar({
      open: true,
      message: 'Visibility section deleted successfully',
      severity: 'success',
    });
  };

  const handleSaveSection = (data: Partial<VisibilitySection>) => {
    if (selectedSection) {
      // Update existing section
      setSections(prev => prev.map(section =>
        section.id === selectedSection.id ? { ...section, ...data } : section
      ));
    } else {
      // Add new section
      const newSection: VisibilitySection = {
        id: Date.now().toString(),
        name: data.name!,
        description: data.description!,
        color: data.color!,
        isActive: data.isActive ?? true,
        displayOrder: sections.length + 1,
        dateCreated: new Date(),
      };
      setSections(prev => [...prev, newSection]);
    }

    setSnackbar({
      open: true,
      message: `Visibility section ${selectedSection ? 'updated' : 'created'} successfully`,
      severity: 'success',
    });
    setIsFormOpen(false);
    setSelectedSection(null);
  };

  return (
    <DefaultCard>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">
          Visibility Sections
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddSection}
        >
          Add Section
        </Button>
      </Box>

      <Grid container spacing={3}>
        {sections.map((section) => (
          <Grid item xs={12} md={4} key={section.id}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Chip
                    label={section.name}
                    color={section.color}
                    size="medium"
                  />
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleEditSection(section)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteSection(section.id)}
                      color="error"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" paragraph>
                  {section.description}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip
                    label={section.isActive ? 'Active' : 'Inactive'}
                    color={section.isActive ? 'success' : 'default'}
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label={`Order: ${section.displayOrder}`}
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedSection(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <VisibilityForm
          onSubmit={handleSaveSection}
          initialData={selectedSection}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedSection(null);
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