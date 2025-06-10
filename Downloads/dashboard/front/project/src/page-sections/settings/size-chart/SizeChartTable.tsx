'use client';

import { useState } from 'react';
import {
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { DataTable } from '@/global-components/common/DataTable';
import type { GridColDef } from '@mui/x-data-grid';
import type { SizeChart } from '@/types/sizeChart';

interface SizeChartTableProps {
  charts: SizeChart[];
  onEdit: (chart: SizeChart) => void;
  onDelete: (chart: SizeChart) => void;
}

export function SizeChartTable({ charts, onEdit, onDelete }: SizeChartTableProps) {
  const [selectedChart, setSelectedChart] = useState<SizeChart | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleExportCsv = (chart: SizeChart) => {
    const csvContent = [
      chart.columns.join(','),
      ...chart.rows.map(row => row.cells.map(cell => cell.value).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${chart.title.toLowerCase().replace(/\s+/g, '-')}-size-chart.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewDetails = (chart: SizeChart) => {
    setSelectedChart(chart);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedChart(null);
  };

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'categories',
      headerName: 'Categories',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {params.value.map((category: string) => (
            <Chip
              key={category}
              label={category}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>
      ),
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Active' : 'Inactive'}
          color={params.value ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      field: 'dateCreated',
      headerName: 'Created',
      width: 180,
      valueFormatter: ({ value }) => {
        return new Date(value).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton 
            size="small" 
            onClick={() => handleViewDetails(params.row)}
            color="primary"
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={() => handleExportCsv(params.row)}
            color="primary"
          >
            <DownloadIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={() => onEdit(params.row)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={() => onDelete(params.row)}
            color="error"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <>
      <DataTable
        rows={charts}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
          sorting: { sortModel: [{ field: 'dateCreated', sort: 'desc' }] },
        }}
      />

      <Dialog 
        open={detailsOpen} 
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedChart?.title} - Size Chart Details
        </DialogTitle>
        <DialogContent dividers>
          {selectedChart && (
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {selectedChart.columns.map((column, index) => (
                      <TableCell key={index}>{column}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedChart.rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {row.cells.map((cell, cellIndex) => (
                        <TableCell key={cellIndex}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>Close</Button>
          {selectedChart && (
            <Button
              onClick={() => handleExportCsv(selectedChart)}
              startIcon={<DownloadIcon />}
            >
              Export CSV
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}