'use client';

import { useState } from 'react';
import { 
  Grid, 
  TextField, 
  Typography,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
} from '@mui/material';
import { 
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  FilePresent as FileIcon,
} from '@mui/icons-material';
import { UseFormReturn, Controller } from 'react-hook-form';
import type { OrganizationData } from '../schema';

interface LegalInformationProps {
  form: UseFormReturn<OrganizationData>;
}

export function LegalInformation({ form }: LegalInformationProps) {
  const { control, formState: { errors }, watch } = form;
  const [gstCertificates, setGstCertificates] = useState<File[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      if (gstCertificates.length + newFiles.length <= 5) {
        setGstCertificates(prev => [...prev, ...newFiles]);
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    setGstCertificates(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <Typography variant="subtitle1" gutterBottom fontWeight={500} sx={{ mt: 2 }}>
        Legal Information
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Controller
            name="registrationNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Company Registration Number"
                fullWidth
                error={!!errors.registrationNumber}
                helperText={errors.registrationNumber?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="taxId"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Tax ID"
                fullWidth
                error={!!errors.taxId}
                helperText={errors.taxId?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="panNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="PAN Number"
                fullWidth
                error={!!errors.panNumber}
                helperText={errors.panNumber?.message || 'Optional: Enter 10-digit PAN number'}
                placeholder="ABCDE1234F"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="vatNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="VAT Number (Optional)"
                fullWidth
                error={!!errors.vatNumber}
                helperText={errors.vatNumber?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="incorporationDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Date of Incorporation"
                type="date"
                fullWidth
                error={!!errors.incorporationDate}
                helperText={errors.incorporationDate?.message}
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="legalAddress"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Registered Legal Address"
                fullWidth
                multiline
                rows={3}
                error={!!errors.legalAddress}
                helperText={errors.legalAddress?.message}
              />
            )}
          />
        </Grid>

        {/* GST Certificate Upload */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            GST Certificates
          </Typography>
          
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Box sx={{ mb: 2 }}>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="gst-certificate-upload"
                disabled={gstCertificates.length >= 5}
              />
              <label htmlFor="gst-certificate-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  disabled={gstCertificates.length >= 5}
                >
                  Upload GST Certificate
                </Button>
              </label>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                Upload up to 5 GST certificates (PDF, JPG, PNG)
              </Typography>
            </Box>

            <List>
              {gstCertificates.map((file, index) => (
                <ListItem
                  key={index}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <FileIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <ListItemText
                    primary={file.name}
                    secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleRemoveFile(index)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}