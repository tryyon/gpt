'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  Alert,
  Snackbar,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { CouponsTable } from './CouponsTable';
import { CouponForm } from './CouponForm';
import { CouponSummaryCards } from './CouponSummaryCards';
import { DefaultCard } from '@/global-components/common/DefaultCard';
import { BuyXGetYForm } from './buy-x-get-y/BuyXGetYForm';

// Mock data for coupons
const mockCoupons = [
  {
    id: '1',
    code: 'SUMMER25',
    type: 'percentage',
    value: 25,
    minPurchase: 100,
    minOrderQuantity: 2,
    maxDiscount: 50,
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    usageLimit: 1000,
    maxUsageCount: 5000,
    usageCount: 342,
    isActive: true,
    showToCustomer: true,
    onlinePaymentsOnly: false,
    newCustomersOnly: false,
    autoApply: false,
    applicableProducts: 'all',
    excludedProducts: [],
    applicableCategories: 'all',
    excludedCategories: [],
    description: 'Summer sale discount',
  },
  {
    id: '2',
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minPurchase: 0,
    minOrderQuantity: 0,
    maxDiscount: 0,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    usageLimit: 1,
    maxUsageCount: 10000,
    usageCount: 567,
    isActive: true,
    showToCustomer: true,
    onlinePaymentsOnly: false,
    newCustomersOnly: true,
    autoApply: true,
    applicableProducts: 'all',
    excludedProducts: [],
    applicableCategories: 'all',
    excludedCategories: [],
    description: 'New customer welcome discount',
  },
  {
    id: '3',
    code: 'FREESHIP',
    type: 'fixed',
    value: 15,
    minPurchase: 75,
    minOrderQuantity: 3,
    maxDiscount: 15,
    startDate: '2024-04-01',
    endDate: '2024-05-31',
    usageLimit: 500,
    maxUsageCount: 2000,
    usageCount: 123,
    isActive: true,
    showToCustomer: true,
    onlinePaymentsOnly: true,
    newCustomersOnly: false,
    autoApply: false,
    applicableProducts: 'all',
    excludedProducts: [],
    applicableCategories: 'all',
    excludedCategories: [],
    description: 'Free shipping on orders over $75',
  },
  {
    id: '4',
    code: 'BUY2GET1',
    type: 'buyxgety',
    buyQuantity: 2,
    getQuantity: 1,
    startDate: '2024-03-01',
    endDate: '2024-04-30',
    usageLimit: 1,
    maxUsageCount: 1000,
    usageCount: 234,
    isActive: true,
    selectedProducts: [
      { id: 'p1', name: 'Men\'s T-Shirt' },
      { id: 'p2', name: 'Women\'s T-Shirt' }
    ],
    freeProducts: [
      { id: 'p1', name: 'Men\'s T-Shirt' },
      { id: 'p2', name: 'Women\'s T-Shirt' }
    ],
    description: 'Buy 2 t-shirts and get 1 free',
  },
];

export function CouponsOverview() {
  const [coupons, setCoupons] = useState(mockCoupons);
  const [selectedCoupon, setSelectedCoupon] = useState<any | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBuyXGetYFormOpen, setIsBuyXGetYFormOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    // Listen for the custom event to open the coupon form
    const handleOpenCouponForm = () => {
      setSelectedCoupon(null);
      setIsFormOpen(true);
    };

    // Listen for the custom event to open the buy x get y form
    const handleOpenBuyXGetYForm = () => {
      setSelectedCoupon(null);
      setIsBuyXGetYFormOpen(true);
    };

    window.addEventListener('openCouponForm', handleOpenCouponForm);
    window.addEventListener('openBuyXGetYForm', handleOpenBuyXGetYForm);

    return () => {
      window.removeEventListener('openCouponForm', handleOpenCouponForm);
      window.removeEventListener('openBuyXGetYForm', handleOpenBuyXGetYForm);
    };
  }, []);

  const handleAddCoupon = () => {
    setSelectedCoupon(null);
    setIsFormOpen(true);
  };

  const handleEditCoupon = (coupon: any) => {
    setSelectedCoupon(coupon);
    if (coupon.type === 'buyxgety') {
      setIsBuyXGetYFormOpen(true);
    } else {
      setIsFormOpen(true);
    }
  };

  const handleSaveCoupon = (couponData: any) => {
    try {
      if (selectedCoupon) {
        // Update existing coupon
        setCoupons(prev => prev.map(coupon => 
          coupon.id === selectedCoupon.id ? { ...couponData, id: coupon.id } : coupon
        ));
        setSnackbar({
          open: true,
          message: 'Coupon updated successfully',
          severity: 'success',
        });
      } else {
        // Add new coupon
        const newCoupon = {
          ...couponData,
          id: Date.now().toString(),
          usageCount: 0,
        };
        setCoupons(prev => [...prev, newCoupon]);
        setSnackbar({
          open: true,
          message: 'Coupon created successfully',
          severity: 'success',
        });
      }
      setIsFormOpen(false);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error saving coupon',
        severity: 'error',
      });
    }
  };

  const handleSaveBuyXGetY = (promotionData: any) => {
    try {
      if (selectedCoupon) {
        // Update existing promotion
        setCoupons(prev => prev.map(coupon => 
          coupon.id === selectedCoupon.id ? { ...promotionData, id: coupon.id, type: 'buyxgety' } : coupon
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
          type: 'buyxgety',
          usageCount: 0,
        };
        setCoupons(prev => [...prev, newPromotion]);
        setSnackbar({
          open: true,
          message: 'Promotion created successfully',
          severity: 'success',
        });
      }
      setIsBuyXGetYFormOpen(false);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error saving promotion',
        severity: 'error',
      });
    }
  };

  const handleToggleCouponStatus = (couponId: string) => {
    setCoupons(prev => prev.map(coupon => 
      coupon.id === couponId ? { ...coupon, isActive: !coupon.isActive } : coupon
    ));
    setSnackbar({
      open: true,
      message: 'Coupon status updated',
      severity: 'success',
    });
  };

  const handleDeleteCoupon = (couponId: string) => {
    setCoupons(prev => prev.filter(coupon => coupon.id !== couponId));
    setSnackbar({
      open: true,
      message: 'Coupon deleted successfully',
      severity: 'success',
    });
  };

  return (
    <>
      <CouponSummaryCards />
      
      <DefaultCard>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddCoupon}
          >
            Create Coupon
          </Button>
        </Box>

        <CouponsTable
          coupons={coupons}
          onEdit={handleEditCoupon}
          onToggleStatus={handleToggleCouponStatus}
          onDelete={handleDeleteCoupon}
        />

        {/* Regular Coupon Form Dialog */}
        <Dialog
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <CouponForm
            initialData={selectedCoupon && selectedCoupon.type !== 'buyxgety' ? selectedCoupon : null}
            onSubmit={handleSaveCoupon}
            onCancel={() => setIsFormOpen(false)}
          />
        </Dialog>

        {/* Buy X Get Y Form Dialog */}
        <Dialog
          open={isBuyXGetYFormOpen}
          onClose={() => setIsBuyXGetYFormOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <BuyXGetYForm
            initialData={selectedCoupon && selectedCoupon.type === 'buyxgety' ? selectedCoupon : null}
            onSubmit={handleSaveBuyXGetY}
            onCancel={() => setIsBuyXGetYFormOpen(false)}
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