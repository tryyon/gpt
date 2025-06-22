'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Button,
  Alert,
  Dialog,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { LanguageTable } from './LanguageTable';
import { LanguageForm } from './LanguageForm';
import type { Language } from '@/lib/validations/language';

const mockLanguages: Language[] = [
  {
    id: '1',
    code: 'en',
    name: 'English',
    nativeName: 'English',
    isDefault: true,
    isActive: true,
    direction: 'ltr',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: 'hh:mm A',
  },
  {
    id: '2',
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    isDefault: false,
    isActive: true,
    direction: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
  },
];

export function LanguageManagement() {
  const [languages, setLanguages] = useState<Language[]>(mockLanguages);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddLanguage = () => {
    setSelectedLanguage(null);
    setIsFormOpen(true);
  };

  const handleEditLanguage = (language: Language) => {
    setSelectedLanguage(language);
    setIsFormOpen(true);
  };

  const handleDeleteLanguage = (languageId: string) => {
    setLanguages(prev => prev.filter(lang => lang.id !== languageId));
    setSuccessMessage('Language deleted successfully');
    setShowSuccess(true);
  };

  const handleSubmit = async (data: Language) => {
    try {
      if (selectedLanguage) {
        // Update existing language
        setLanguages(prev => prev.map(lang => 
          lang.id === selectedLanguage.id ? { ...data, id: lang.id } : lang
        ));
        setSuccessMessage('Language updated successfully');
      } else {
        // Add new language
        const newLanguage = {
          ...data,
          id: String(languages.length + 1),
        };
        setLanguages(prev => [...prev, newLanguage]);
        setSuccessMessage('Language added successfully');
      }
      setIsFormOpen(false);
      setShowSuccess(true);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddLanguage}
            >
              Add Language
            </Button>
          </Box>

          <LanguageTable
            languages={languages}
            onEdit={handleEditLanguage}
            onDelete={handleDeleteLanguage}
          />
        </CardContent>
      </Card>

      <Dialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <LanguageForm
          onSubmit={handleSubmit}
          initialData={selectedLanguage}
          onCancel={() => setIsFormOpen(false)}
          existingLanguages={languages}
        />
      </Dialog>

      {showSuccess && (
        <Alert 
          severity="success" 
          sx={{ mt: 2 }}
          onClose={() => setShowSuccess(false)}
        >
          {successMessage}
        </Alert>
      )}
    </Box>
  );
}