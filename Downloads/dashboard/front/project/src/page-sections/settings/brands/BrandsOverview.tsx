'use client';

import { useState } from 'react';
import { Box, Button, Dialog } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { BrandsTable } from './BrandsTable';
import { BrandForm } from './BrandForm';
import { DefaultCard } from '@/global-components/common/DefaultCard';

export function BrandsOverview() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<any>(null);

  const handleAddBrand = (data: any) => {
    console.log('Adding brand:', data);
    setIsFormOpen(false);
    setSelectedBrand(null);
  };

  const handleEditBrand = (brand: any) => {
    setSelectedBrand(brand);
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
          Add Brand
        </Button>
      </Box>

      <BrandsTable onEditBrand={handleEditBrand} />

      <Dialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedBrand(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <BrandForm
          onSubmit={handleAddBrand}
          initialData={selectedBrand}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedBrand(null);
          }}
        />
      </Dialog>
    </DefaultCard>
  );
}