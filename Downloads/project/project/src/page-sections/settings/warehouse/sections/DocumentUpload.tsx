'use client';

import { Box, Button, Typography, Input } from '@mui/material';
import { UseFormReturn, Controller } from 'react-hook-form';
import { Upload as UploadIcon } from '@mui/icons-material';
import type { FormData } from '../schema';

interface DocumentUploadProps {
  form: UseFormReturn<FormData>;
  index: number;
}

export function DocumentUpload({ form, index }: DocumentUploadProps) {
  const { control, formState: { errors } } = form;

  return (
    <Controller
      name={`warehouses.${index}.documents`}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Box>
          <Input
            type="file"
            inputProps={{ multiple: true }}
            onChange={(e) => {
              const input = e.target as HTMLInputElement;
              const files = Array.from(input.files || []);
              onChange(files);
            }}
            style={{ display: 'none' }}
            id={`document-upload-${index}`}
          />
          <label htmlFor={`document-upload-${index}`}>
            <Button
              variant="outlined"
              component="span"
              startIcon={<UploadIcon />}
              fullWidth
            >
              Upload Documents
            </Button>
          </label>
          {value && value.length > 0 && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              {value.length} file(s) selected
            </Typography>
          )}
          {errors.warehouses?.[index]?.documents && (
            <Typography color="error" variant="caption">
              {errors.warehouses[index]?.documents?.message}
            </Typography>
          )}
        </Box>
      )}
    />
  );
}