'use client';

import { Grid, Paper, Typography } from '@mui/material';
import { Control } from 'react-hook-form';
import { Image as ImageIcon, Description as FileIcon } from '@mui/icons-material';
import type { BrandFormData } from '@/lib/validations/brand';
import { FileUpload } from '@/global-components/common/FileUpload';

interface DocumentsProps {
  control: Control<BrandFormData>;
  errors: any;
}

export function Documents({ control, errors }: DocumentsProps) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="subtitle2" gutterBottom color="text.secondary">
        Documents & Media
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <FileUpload
            label="Brand Logo"
            accept="image/*"
            maxSize={2 * 1024 * 1024}
            error={errors.logo?.message}
            value={null}
            onChange={() => {}}
            icon={<ImageIcon />}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <FileUpload
            label="Brand Catalog"
            accept="image/*"
            maxSize={2 * 1024 * 1024}
            error={errors.catalog?.message}
            value={null}
            onChange={() => {}}
            icon={<FileIcon />}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <FileUpload
            label="Trademark Certificate"
            accept="image/*"
            maxSize={2 * 1024 * 1024}
            error={errors.trademarkCertificate?.message}
            value={null}
            onChange={() => {}}
            icon={<FileIcon />}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}