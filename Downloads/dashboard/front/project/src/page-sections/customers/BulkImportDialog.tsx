'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Link,
  Alert,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  FileDownload as FileDownloadIcon,
} from '@mui/icons-material';
import { CustomerFormData } from '@/lib/validations/customer';

interface BulkImportDialogProps {
  open: boolean;
  onClose: () => void;
  onImportSuccess: (customers: CustomerFormData[]) => void;
}

export function BulkImportDialog({ open, onClose, onImportSuccess }: BulkImportDialogProps) {
  const theme = useTheme();
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [importResults, setImportResults] = useState<{
    success: number;
    errors: { row: number; message: string }[];
  } | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setError(null);
      setImportResults(null);
    } else {
      setError('Please select a valid CSV file');
      setFile(null);
    }
  };

  const downloadTemplate = () => {
    const template = 'Name,Phone,Email,GST Type,GST Number,Street,City,State,Pincode,Country\n';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customer_import_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    setError(null);
    setImportResults(null);

    try {
      const text = await file.text();
      const rows = text.split('\n').map(row => row.split(','));
      const headers = rows[0].map(h => h.trim().toLowerCase());

      const customers: CustomerFormData[] = [];
      const errors: { row: number; message: string }[] = [];

      // Process each row (skip header)
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row.length !== headers.length) {
          errors.push({ row: i, message: 'Invalid number of columns' });
          continue;
        }

        try {
          const customer: any = {
            name: row[headers.indexOf('name')].trim(),
            phone: row[headers.indexOf('phone')].trim(),
            email: row[headers.indexOf('email')].trim(),
            gstType: row[headers.indexOf('gst type')]?.trim().toLowerCase() || 'unregistered',
            gstNumber: row[headers.indexOf('gst number')]?.trim() || undefined,
            billingAddress: {
              street: row[headers.indexOf('street')]?.trim(),
              city: row[headers.indexOf('city')]?.trim(),
              state: row[headers.indexOf('state')]?.trim(),
              pincode: row[headers.indexOf('pincode')]?.trim(),
              country: row[headers.indexOf('country')]?.trim(),
            },
          };

          // Basic validation
          if (!customer.name || !customer.phone) {
            throw new Error('Name and phone are required');
          }

          customers.push(customer);
        } catch (err) {
          errors.push({ row: i, message: (err as Error).message });
        }
      }

      setImportResults({
        success: customers.length,
        errors,
      });

      if (customers.length > 0) {
        onImportSuccess(customers);
      }
    } catch (err) {
      setError('Failed to process the CSV file');
    } finally {
      setImporting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Import Customers</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" paragraph>
            Upload a CSV file containing customer information. Make sure to follow the required format.
          </Typography>
          <Button
            startIcon={<FileDownloadIcon />}
            onClick={downloadTemplate}
            size="small"
          >
            Download Template
          </Button>
        </Box>

        <Box
          sx={{
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 1,
            p: 3,
            textAlign: 'center',
            bgcolor: 'background.default',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
              cursor: 'pointer',
            }}
          />
          <CloudUploadIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
          <Typography variant="body1" gutterBottom>
            {file ? file.name : 'Drag and drop a CSV file here or click to browse'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Maximum file size: 5MB
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {importing && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Importing customers...
            </Typography>
            <LinearProgress />
          </Box>
        )}

        {importResults && (
          <Box sx={{ mt: 2 }}>
            <Alert 
              severity={importResults.errors.length > 0 ? 'warning' : 'success'}
              sx={{ mb: 2 }}
            >
              Successfully imported {importResults.success} customers
              {importResults.errors.length > 0 && ` with ${importResults.errors.length} errors`}
            </Alert>

            {importResults.errors.length > 0 && (
              <List dense>
                {importResults.errors.map((error, index) => (
                  <ListItem key={index}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <ErrorIcon color="error" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Row ${error.row}`}
                      secondary={error.message}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleImport}
          disabled={!file || importing}
        >
          Import
        </Button>
      </DialogActions>
    </Dialog>
  );
}