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
import { ContactInfoForm } from './ContactInfoForm';
import { ContactInfoList } from './ContactInfoList';
import { BannerSection } from './BannerSection';
import { DefaultCard } from '@/global-components/common/DefaultCard';
import type { ContactInfo, Banner } from '@/types/content';

// Mock data
const mockContactInfo: ContactInfo[] = [
  {
    id: '1',
    type: 'email',
    label: 'Customer Support',
    value: 'support@example.com',
    isActive: true,
    displayOrder: 1,
  },
  {
    id: '2',
    type: 'phone',
    label: 'Sales',
    value: '+1 (555) 123-4567',
    isActive: true,
    displayOrder: 2,
  },
];

const mockBanner: Banner = {
  title: 'Contact Us',
  subtitle: 'Get in touch with our team',
  image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=1000',
  isActive: true,
  displayOrder: 1,
};

export function ContactUsManagement() {
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>(mockContactInfo);
  const [banner, setBanner] = useState<Banner>(mockBanner);
  const [selectedInfo, setSelectedInfo] = useState<ContactInfo | null>(null);
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

  const handleSaveContactInfo = (data: ContactInfo) => {
    try {
      if (selectedInfo?.id) {
        setContactInfo(prev => prev.map(info => 
          info.id === selectedInfo.id ? { ...data, id: info.id } : info
        ));
      } else {
        const newInfo = {
          ...data,
          id: String(Date.now()),
        };
        setContactInfo(prev => [...prev, newInfo]);
      }

      setSnackbar({
        open: true,
        message: `Contact information ${selectedInfo ? 'updated' : 'added'} successfully`,
        severity: 'success',
      });
      setIsFormOpen(false);
      setSelectedInfo(null);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error saving contact information',
        severity: 'error',
      });
    }
  };

  const handleSaveBanner = (data: Banner) => {
    try {
      setBanner(data);
      setSnackbar({
        open: true,
        message: 'Banner updated successfully',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error updating banner',
        severity: 'error',
      });
    }
  };

  const handleDelete = (infoId: string) => {
    setContactInfo(prev => prev.filter(info => info.id !== infoId));
    setSnackbar({
      open: true,
      message: 'Contact information deleted successfully',
      severity: 'success',
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <BannerSection
          banner={banner}
          onSave={handleSaveBanner}
        />
      </Grid>

      <Grid item xs={12}>
        <DefaultCard>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setIsFormOpen(true)}
            >
              Add Contact Information
            </Button>
          </Box>

          <ContactInfoList
            contactInfo={contactInfo}
            onEdit={(info) => {
              setSelectedInfo(info);
              setIsFormOpen(true);
            }}
            onDelete={handleDelete}
          />
        </DefaultCard>
      </Grid>

      <Dialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedInfo(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <ContactInfoForm
          onSubmit={handleSaveContactInfo}
          initialData={selectedInfo}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedInfo(null);
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
    </Grid>
  );
}