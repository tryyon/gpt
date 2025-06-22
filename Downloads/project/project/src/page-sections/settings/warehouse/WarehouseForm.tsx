'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { schema } from './schema';
import { BasicDetails } from './sections/BasicDetails';
import { ContactDetails } from './sections/ContactDetails';
import { OperationDetails } from './sections/OperationDetails';
import { DocumentUpload } from './sections/DocumentUpload';
import { OrganizationList } from './sections/OrganizationList';

interface WarehouseFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  onCancel: () => void;
}

export function WarehouseForm({ onSubmit, initialData, onCancel }: WarehouseFormProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      warehouses: initialData?.warehouses || [
        {
          warehousePincode: '',
          warehouseGSTIN: '',
          warehouseAddress: '',
          city: '',
          state: '',
          country: '',
          warehouseEmailID: '',
          warehouseContactNumber: '',
          operationStartTime: '',
          operationEndTime: '',
          perDayOrderProcessingCapacity: 0,
          documents: [],
          organizations: [],
        },
      ],
    },
  });

  return (
    <>
      <DialogTitle>
        {initialData ? 'Edit Warehouse' : 'Add New Warehouse'}
      </DialogTitle>
      <DialogContent dividers>
        <Box 
          component="form" 
          id="warehouse-form" 
          onSubmit={form.handleSubmit(onSubmit)}
          sx={{ display: 'flex', flexDirection: 'column', gap: 4, pt: 2 }}
        >
          <OrganizationList form={form} index={0} />
          <BasicDetails form={form} index={0} />
          <ContactDetails form={form} index={0} />
          <OperationDetails form={form} index={0} />
          <DocumentUpload form={form} index={0} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="warehouse-form"
          variant="contained"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Add Warehouse'}
        </Button>
      </DialogActions>
    </>
  );
}