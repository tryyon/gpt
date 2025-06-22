'use client';

import React from 'react';
import { Box, Paper, useTheme } from '@mui/material';
import { 
  DataGrid, 
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridRowSelectionModel,
} from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';

interface DataTableProps {
  rows: any[];
  columns: GridColDef[];
  initialState?: {
    pagination?: {
      paginationModel: { page: number; pageSize: number };
    };
    sorting?: {
      sortModel: { field: string; sort: 'asc' | 'desc' }[];
    };
  };
  slots?: {
    toolbar?: React.ComponentType<any>;
  };
  checkboxSelection?: boolean;
  disableRowSelectionOnClick?: boolean;
  loading?: boolean;
  getRowHeight?: () => number;
  autoHeight?: boolean;
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (pageSize: number) => void;
  sx?: any;
  onRowSelectionModelChange?: (selectionModel: GridRowSelectionModel) => void;
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>


      <Box sx={{ flex: 1 }} />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export const DataTable = ({
  rows,
  columns,
  initialState = {
    pagination: { paginationModel: { page: 0, pageSize: 10 } },
  },
  slots,
  checkboxSelection = true,
  disableRowSelectionOnClick = true,
  loading = false,
  getRowHeight,
  autoHeight = false,
  pageSizeOptions = [5, 10, 25, 50],
  onPageChange,
  onRowsPerPageChange,
  sx,
  onRowSelectionModelChange,
}: DataTableProps) => {
  const theme = useTheme();

  return (
    <Paper 
      elevation={0} 
      variant="outlined"
      sx={{ 
        width: '100%', 
        overflow: 'hidden',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        height: autoHeight ? 'auto' : 'calc(100vh - 200px)',
        ...sx,
      }}
    >
      <DataGrid

        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
          '& .MuiDataGrid-columnHeaderTitleContainer': {
            padding: 0,
          },
          '& .MuiDataGrid-columnHeader-checkbox': {
            width: '24px',
            boxSizing: 'border-box',
            paddingLeft: '0px',
            justifyContent: 'center',
          },
        }}

      />
    </Paper>
  );
};