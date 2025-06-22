'use client';

import { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box, 
  Grid, 
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Divider,
  LinearProgress
} from '@mui/material';
import { 
  Search as SearchIcon,
  FileDownload as DownloadIcon,
  FilterList as FilterIcon,
  Close as CloseIcon,
  TrendingUp as TrendingUpIcon,
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  Visibility as VisibilityIcon,
  AddShoppingCart as AddShoppingCartIcon
} from '@mui/icons-material';
import { RevenueReport } from './RevenueReport';

interface DetailedReportDialogProps {
  open: boolean;
  onClose: () => void;
  reportType: 'revenue' | 'orders' | 'conversion' | null;
  title: string;
}

export function DetailedReportDialog({ 
  open, 
  onClose, 
  reportType, 
  title 
}: DetailedReportDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{title} Analysis</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ p: 2 }}>
          {reportType === 'revenue' && <RevenueReport />}
          {reportType === 'orders' && <Typography>Orders report content will go here</Typography>}
          {reportType === 'conversion' && <Typography>Conversion report content will go here</Typography>}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Close
        </Button>
        <Button variant="contained" color="primary" onClick={() => {}}>
          Export Report
        </Button>
      </DialogActions>
    </Dialog>
  );
}