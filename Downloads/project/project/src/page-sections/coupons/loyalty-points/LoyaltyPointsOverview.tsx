'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  Alert,
  Snackbar,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
} from '@mui/material';
import { 
  Add as AddIcon,
  ArrowBack as ArrowBackIcon 
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { LoyaltyPointsTable } from './LoyaltyPointsTable';
import { LoyaltyPointsForm } from './LoyaltyPointsForm';
import { LoyaltyPointsSettings } from './LoyaltyPointsSettings';
import { DefaultCard } from '@/global-components/common/DefaultCard';

// Mock data for loyalty programs
const mockLoyaltyPrograms = [
  {
    id: '1',
    name: 'Standard Points Program',
    pointsPerDollar: 10,
    minimumPurchase: 0,
    pointsValuation: 0.01, // $0.01 per point
    expiryDays: 365,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    isActive: true,
    description: 'Earn 10 points for every dollar spent',
  },
  {
    id: '2',
    name: 'Premium Customer Bonus',
    pointsPerDollar: 20,
    minimumPurchase: 100,
    pointsValuation: 0.01, // $0.01 per point
    expiryDays: 365,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    isActive: true,
    description: 'Earn 20 points for every dollar spent on purchases over $100',
  },
];

// Mock data for loyalty program settings
const mockSettings = {
  enabled: true,
  allowPointsRedemption: true,
  minimumPointsRedemption: 500,
  maximumPointsRedemption: 10000,
  displayPointsInCart: true,
  displayPointsInAccount: true,
  roundingMethod: 'up', // 'up', 'down', 'nearest'
  sendPointsNotifications: true,
};

export function LoyaltyPointsOverview() {
  const router = useRouter();
  const [loyaltyPrograms, setLoyaltyPrograms] = useState(mockLoyaltyPrograms);
  const [settings, setSettings] = useState(mockSettings);
  const [selectedProgram, setSelectedProgram] = useState<any | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Calculate total points issued and redeemed (mock data)
  const totalPointsIssued = 1250000;
  const totalPointsRedeemed = 750000;
  const activeCustomersWithPoints = 1250;

  const handleAddProgram = () => {
    setSelectedProgram(null);
    setIsFormOpen(true);
  };

  const handleEditProgram = (program: any) => {
    setSelectedProgram(program);
    setIsFormOpen(true);
  };

  const handleSaveProgram = (programData: any) => {
    try {
      if (selectedProgram) {
        // Update existing program
        setLoyaltyPrograms(prev => prev.map(program => 
          program.id === selectedProgram.id ? { ...programData, id: program.id } : program
        ));
        setSnackbar({
          open: true,
          message: 'Loyalty program updated successfully',
          severity: 'success',
        });
      } else {
        // Add new program
        const newProgram = {
          ...programData,
          id: Date.now().toString(),
        };
        setLoyaltyPrograms(prev => [...prev, newProgram]);
        setSnackbar({
          open: true,
          message: 'Loyalty program created successfully',
          severity: 'success',
        });
      }
      setIsFormOpen(false);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error saving loyalty program',
        severity: 'error',
      });
    }
  };

  const handleSaveSettings = (settingsData: any) => {
    try {
      setSettings(settingsData);
      setIsSettingsOpen(false);
      setSnackbar({
        open: true,
        message: 'Loyalty program settings updated successfully',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error saving settings',
        severity: 'error',
      });
    }
  };

  const handleToggleProgramStatus = (programId: string) => {
    setLoyaltyPrograms(prev => prev.map(program => 
      program.id === programId ? { ...program, isActive: !program.isActive } : program
    ));
    setSnackbar({
      open: true,
      message: 'Program status updated',
      severity: 'success',
    });
  };

  const handleDeleteProgram = (programId: string) => {
    setLoyaltyPrograms(prev => prev.filter(program => program.id !== programId));
    setSnackbar({
      open: true,
      message: 'Loyalty program deleted successfully',
      severity: 'success',
    });
  };

  const handleBackToCoupons = () => {
    router.push('/dashboard/coupons');
  };

  return (
    <>
      {/* Back Button */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBackToCoupons}
          variant="outlined"
        >
          Back to Coupons
        </Button>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Points Issued
              </Typography>
              <Typography variant="h3" color="primary">
                {totalPointsIssued.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Points earned by customers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Points Redeemed
              </Typography>
              <Typography variant="h3" color="secondary">
                {totalPointsRedeemed.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Points used for purchases
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Active Customers
              </Typography>
              <Typography variant="h3" color="success.main">
                {activeCustomersWithPoints.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Customers with active points
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <DefaultCard>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">Loyalty Programs</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setIsSettingsOpen(true)}
            >
              Program Settings
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddProgram}
            >
              Create Program
            </Button>
          </Box>
        </Box>

        <LoyaltyPointsTable
          programs={loyaltyPrograms}
          onEdit={handleEditProgram}
          onToggleStatus={handleToggleProgramStatus}
          onDelete={handleDeleteProgram}
        />

        <Dialog
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <LoyaltyPointsForm
            initialData={selectedProgram}
            onSubmit={handleSaveProgram}
            onCancel={() => setIsFormOpen(false)}
          />
        </Dialog>

        <Dialog
          open={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <LoyaltyPointsSettings
            initialData={settings}
            onSubmit={handleSaveSettings}
            onCancel={() => setIsSettingsOpen(false)}
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
    </>
  );
}