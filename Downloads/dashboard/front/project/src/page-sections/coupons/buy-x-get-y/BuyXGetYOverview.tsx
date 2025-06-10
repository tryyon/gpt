'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  Alert,
  Snackbar,
} from '@mui/material';
import { 
  Add as AddIcon,
  ArrowBack as ArrowBackIcon 
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { BuyXGetYTable } from './BuyXGetYTable';
import { BuyXGetYForm } from './BuyXGetYForm';
import { DefaultCard } from '@/global-components/common/DefaultCard';

// Mock data for Buy X Get Y promotions
const mockPromotions = [
  {
    id: '1',
    name: 'Buy 2 Get 1 Free T-Shirts',
    buyQuantity: 2,
    getQuantity: 1,
    applicableProducts: 'specific',
    selectedProducts: [
      { id: 'p1', name: 'Men\'s T-Shirt' },
      { id: 'p2', name: 'Women\'s T-Shirt' }
    ],
    freeProducts: [
      { id: 'p1', name: 'Men\'s T-Shirt' },
      { id: 'p2', name: 'Women\'s T-Shirt' }
    ],
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    usageLimit: 1,
    maxUsageCount: 1000,
    usageCount: 234,
    isActive: true,
    description: 'Buy any 2 t-shirts and get 1 free',
  },
  {
    id: '2',
    name: 'Buy 1 Get 1 Free Shoes',
    buyQuantity: 1,
    getQuantity: 1,
    applicableProducts: 'specific',
    selectedProducts: [
      { id: 'p3', name: 'Running Shoes' },
      { id: 'p4', name: 'Casual Shoes' }
    ],
    freeProducts: [
      { id: 'p3', name: 'Running Shoes' },
      { id: 'p4', name: 'Casual Shoes' }
    ],
    startDate: '2024-05-01',
    endDate: '2024-05-31',
    usageLimit: 1,
    maxUsageCount: 500,
    usageCount: 123,
    isActive: true,
    description: 'Buy one pair of shoes and get another pair free',
  },
];

export function BuyXGetYOverview() {
  const router = useRouter();
  const [promotions, setPromotions] = useState(mockPromotions);
  const [selectedPromotion, setSelectedPromotion] = useState<any | null>(null);
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

  const handleAddPromotion = () => {
    setSelectedPromotion(null);
    setIsFormOpen(true);
  };

  const handleEditPromotion = (promotion: any) => {
    setSelectedPromotion(promotion);
    setIsFormOpen(true);
  };

  const handleSavePromotion = (promotionData: any) => {
    try {
      if (selectedPromotion) {
        // Update existing promotion
        setPromotions(prev => prev.map(promotion => 
          promotion.id === selectedPromotion.id ? { ...promotionData, id: promotion.id } : promotion
        ));
        setSnackbar({
          open: true,
          message: 'Promotion updated successfully',
          severity: 'success',
        });
      } else {
        // Add new promotion
        const newPromotion = {
          ...promotionData,
          id: Date.now().toString(),
          usageCount: 0,
        };
        setPromotions(prev => [...prev, newPromotion]);
        setSnackbar({
          open: true,
          message: 'Promotion created successfully',
          severity: 'success',
        });
      }
      setIsFormOpen(false);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error saving promotion',
        severity: 'error',
      });
    }
  };

  const handleTogglePromotionStatus = (promotionId: string) => {
    setPromotions(prev => prev.map(promotion => 
      promotion.id === promotionId ? { ...promotion, isActive: !promotion.isActive } : promotion
    ));
    setSnackbar({
      open: true,
      message: 'Promotion status updated',
      severity: 'success',
    });
  };

  const handleDeletePromotion = (promotionId: string) => {
    setPromotions(prev => prev.filter(promotion => promotion.id !== promotionId));
    setSnackbar({
      open: true,
      message: 'Promotion deleted successfully',
      severity: 'success',
    });
  };

  const handleBackToCoupons = () => {
    router.push('/dashboard/coupons');
  };

  return (
    <DefaultCard>
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

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddPromotion}
        >
          Create Promotion
        </Button>
      </Box>

      <BuyXGetYTable
        promotions={promotions}
        onEdit={handleEditPromotion}
        onToggleStatus={handleTogglePromotionStatus}
        onDelete={handleDeletePromotion}
      />

      <Dialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <BuyXGetYForm
          initialData={selectedPromotion}
          onSubmit={handleSavePromotion}
          onCancel={() => setIsFormOpen(false)}
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