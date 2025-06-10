'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  Button,
  Dialog,
  Alert,
  Snackbar,
  Typography,
  Divider,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { CareerForm } from './CareerForm';
import { CareerList } from './CareerList';
import { BannerSection } from './BannerSection';
import { BenefitsForm } from './BenefitsForm';
import { BenefitsList } from './BenefitsList';
import { DefaultCard } from '@/global-components/common/DefaultCard';
import type { Career, Banner } from '@/types/content';

// Mock data
const mockCareers: Career[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'full-time',
    description: 'We are looking for a Senior Software Engineer to join our team...',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '5+ years of experience in software development',
      'Strong knowledge of React and Node.js',
      'Experience with cloud platforms (AWS/GCP)',
    ],
    responsibilities: [
      'Lead development of key platform features',
      'Mentor junior developers',
      'Contribute to system architecture decisions',
      'Write clean, maintainable code',
    ],
    isActive: true,
    postedDate: new Date('2024-03-15'),
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Hybrid',
    type: 'full-time',
    description: 'Join our engineering team as a Full Stack Developer to help build and maintain our e-commerce platform...',
    requirements: [
      'Bachelor\'s degree in Computer Science or equivalent experience',
      '3+ years of full stack development experience',
      'Proficiency in React, TypeScript, and Node.js',
      'Experience with RESTful APIs and GraphQL',
      'Strong understanding of database design and optimization',
    ],
    responsibilities: [
      'Develop and maintain full stack web applications',
      'Collaborate with product and design teams',
      'Optimize application performance',
      'Write unit tests and integration tests',
      'Participate in code reviews and technical discussions',
    ],
    isActive: true,
    postedDate: new Date('2024-03-16'),
  },
  {
    id: '3',
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    type: 'full-time',
    description: 'Seeking an experienced Product Manager to drive product strategy...',
    requirements: [
      'Bachelor\'s degree in Business, Technology, or related field',
      '3+ years of product management experience',
      'Strong analytical and problem-solving skills',
      'Excellent communication abilities',
    ],
    responsibilities: [
      'Define product vision and strategy',
      'Work with stakeholders to gather requirements',
      'Prioritize features and create roadmaps',
      'Monitor product metrics and KPIs',
    ],
    isActive: true,
    postedDate: new Date('2024-03-14'),
  },
];

const mockBanner: Banner = {
  title: 'Join Our Team',
  subtitle: 'Build the future of e-commerce with us',
  image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000',
  isActive: true,
  displayOrder: 1,
};

const mockBenefits = [
  {
    title: 'Health & Wellness',
    points: [
      'Comprehensive health insurance coverage',
      'Dental and vision plans',
      'Mental health support',
      'Annual wellness stipend',
    ],
  },
  {
    title: 'Work-Life Balance',
    points: [
      'Flexible working hours',
      'Remote work options',
      'Unlimited PTO',
      'Paid parental leave',
    ],
  },
  {
    title: 'Professional Growth',
    points: [
      'Learning and development budget',
      'Conference attendance',
      'Career mentorship program',
      'Internal mobility opportunities',
    ],
  },
  {
    title: 'Office Perks',
    points: [
      'Free lunch and snacks',
      'Modern office space',
      'Team building events',
      'Pet-friendly workplace',
    ],
  },
];

export function CareersManagement() {
  const [careers, setCareers] = useState<Career[]>(mockCareers);
  const [banner, setBanner] = useState<Banner>(mockBanner);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBenefitsFormOpen, setIsBenefitsFormOpen] = useState(false);
  const [benefits, setBenefits] = useState(mockBenefits);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSaveCareer = (data: Career) => {
    try {
      if (selectedCareer?.id) {
        setCareers(prev => prev.map(career => 
          career.id === selectedCareer.id ? { ...data, id: career.id } : career
        ));
      } else {
        const newCareer = {
          ...data,
          id: String(Date.now()),
        };
        setCareers(prev => [...prev, newCareer]);
      }

      setSnackbar({
        open: true,
        message: `Career ${selectedCareer ? 'updated' : 'added'} successfully`,
        severity: 'success',
      });
      setIsFormOpen(false);
      setSelectedCareer(null);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error saving career',
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

  const handleDelete = (careerId: string) => {
    setCareers(prev => prev.filter(career => career.id !== careerId));
    setSnackbar({
      open: true,
      message: 'Career deleted successfully',
      severity: 'success',
    });
  };

  const handleSaveBenefits = (data: any) => {
    try {
      setBenefits(data.benefits);
      setSnackbar({
        open: true,
        message: 'Benefits updated successfully',
        severity: 'success',
      });
      setIsBenefitsFormOpen(false);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error updating benefits',
        severity: 'error',
      });
    }
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
              Add Career
            </Button>
          </Box>

          <CareerList
            careers={careers}
            onEdit={(career) => {
              setSelectedCareer(career);
              setIsFormOpen(true);
            }}
            onDelete={handleDelete}
          />
        </DefaultCard>
      </Grid>

      <Grid item xs={12}>
        <DefaultCard>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">
              Benefits & Perks
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setIsBenefitsFormOpen(true)}
            >
              Edit Benefits
            </Button>
          </Box>

          <BenefitsList
            benefits={benefits}
            onEdit={() => setIsBenefitsFormOpen(true)}
            onDelete={() => {
              setBenefits([]);
              setSnackbar({
                open: true,
                message: 'Benefits deleted successfully',
                severity: 'success',
              });
            }}
          />
        </DefaultCard>
      </Grid>

      <Dialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedCareer(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <CareerForm
          onSubmit={handleSaveCareer}
          initialData={selectedCareer}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedCareer(null);
          }}
        />
      </Dialog>

      <Dialog
        open={isBenefitsFormOpen}
        onClose={() => setIsBenefitsFormOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <BenefitsForm
          onSubmit={handleSaveBenefits}
          initialData={{ benefits }}
          onCancel={() => setIsBenefitsFormOpen(false)}
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