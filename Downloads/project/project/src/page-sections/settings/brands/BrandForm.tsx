'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Typography,
  Paper,
} from '@mui/material';
import { brandSchema, type BrandFormData } from '@/lib/validations/brand';
import { Documents } from './sections/Documents';
import { OrganizationSelector } from './sections/OrganizationSelector';
import { CategorySelector } from './sections/CategorySelector';
import { BrandDetails } from './sections/BrandDetails';

interface BrandFormProps {
  onSubmit: (data: BrandFormData) => void;
  initialData?: any;
  onCancel: () => void;
}

export function BrandForm({ onSubmit, initialData, onCancel }: BrandFormProps) {
  const form = useForm<BrandFormData>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      brandName: initialData?.name || '',
      yearsOfOperation: initialData?.yearsOfOperation || 0,
      manufacturerName: initialData?.manufacturerName || '',
      manufacturerContactNumber: initialData?.manufacturerContactNumber || '',
      manufacturerAddress: initialData?.manufacturerAddress || '',
      earthFriendly: initialData?.earthFriendly || false,
      natureOfBusiness: initialData?.natureOfBusiness || 'manufacturer',
      categories: initialData?.categories || [],
      organizations: initialData?.organizations || [],
      description: initialData?.description || '',
      // packerAddressAndContactDetails: initialData?.packerAddressAndContactDetails || '', // Removed because it's not in BrandFormData
    },
  });

  return (
    <>
      <DialogTitle>
        {initialData ? 'Edit Brand' : 'Add Brand'}
      </DialogTitle>
      <DialogContent dividers>
        <Box 
          component="form" 
          id="brand-form" 
          onSubmit={form.handleSubmit(onSubmit)} 
          sx={{ display: 'flex', flexDirection: 'column', gap: 4, pt: 2 }}
        >
          <OrganizationSelector control={form.control} errors={form.formState.errors} />
          <BrandDetails form={form} />
          <Documents control={form.control} errors={form.formState.errors} />
          <CategorySelector form={form} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="brand-form"
          variant="contained"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Add Brand'}
        </Button>
      </DialogActions>
    </>
  );
}