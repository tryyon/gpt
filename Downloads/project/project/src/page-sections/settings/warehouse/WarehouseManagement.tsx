'use client';

import { useState } from 'react';
import { Box, Button, Dialog } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { WarehouseTable } from './WarehouseTable';
import { WarehouseForm } from './WarehouseForm';
import { DefaultCard } from '@/global-components/common/DefaultCard';

export function WarehouseManagement() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<any>(null);

  const handleAddWarehouse = (data: any) => {
    console.log('Adding warehouse:', data);
    setIsFormOpen(false);
    setSelectedWarehouse(null);
  };

  const handleEditWarehouse = (warehouse: any) => {
    setSelectedWarehouse(warehouse);
    setIsFormOpen(true);
  };

  return (
    <DefaultCard>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsFormOpen(true)}
        >
          Add Warehouse
        </Button>
      </Box>

      <WarehouseTable onEditWarehouse={handleEditWarehouse} />

      <Dialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedWarehouse(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <WarehouseForm
          onSubmit={handleAddWarehouse}
          initialData={selectedWarehouse}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedWarehouse(null);
          }}
        />
      </Dialog>
    </DefaultCard>
  );
}