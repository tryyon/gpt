'use client';

import { Box, Paper, useTheme } from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridRowSelectionModel,
  GridRowParams,
} from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';

interface PaginationModel {
  page: number;
  pageSize: number;
}

interface DataTableProps {
  rows: any[];
  columns: GridColDef[];
  initialState?: {
    pagination?: {
      paginationModel: PaginationModel;
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
  onRowClick?: (params: GridRowParams) => void; // <-- Added this line
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
  onRowClick, // <-- Added this line
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
        initialState={initialState}
        pageSizeOptions={pageSizeOptions}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick={disableRowSelectionOnClick}
        loading={loading}
        getRowHeight={getRowHeight}
        autoHeight={autoHeight}
        onRowClick={onRowClick} // <-- Added this line
        slots={{
          ...slots,
          toolbar: slots?.toolbar || CustomToolbar,
        }}
        onRowSelectionModelChange={onRowSelectionModelChange}
        disableColumnMenu
        disableColumnFilter
        density="comfortable"
        sx={{
          border: 'none',
          '& .MuiDataGrid-cell': {
            borderColor: theme.palette.divider,
            py: 1.5,
            px: 2,
          },
          '& .MuiDataGrid-columnHeaders': {
            bgcolor: theme.palette.background.paper,
            borderBottom: `1px solid ${theme.palette.divider}`,
            '& .MuiDataGrid-columnHeader': {
              py: 2,
              px: 2,
              '&:focus, &:focus-within': {
                outline: 'none',
              },
              '& .MuiDataGrid-menuIcon': {
                display: 'none',
              },
              '& .MuiDataGrid-columnHeaderTitleContainer': {
                padding: 0,
              },
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 600,
            },
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: `1px solid ${theme.palette.divider}`,
            bgcolor: theme.palette.background.paper,
          },
          '& .MuiDataGrid-virtualScroller': {
            bgcolor: theme.palette.background.paper,
          },
          '& .MuiDataGrid-row': {
            '&:hover': {
              bgcolor: theme.palette.action.hover,
            },
            '&.Mui-selected': {
              bgcolor: `${theme.palette.primary.main}15 !important`,
            },
          },
          '& .MuiCheckbox-root': {
            color: theme.palette.text.secondary,
          },
          '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
            outline: 'none',
          },
          '& .MuiDataGrid-toolbarContainer': {
            p: 2,
            gap: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
            bgcolor: theme.palette.background.paper,
          },
          '& .MuiButton-root': {
            color: theme.palette.text.secondary,
            '&:hover': {
              bgcolor: theme.palette.action.hover,
            },
          },
          '& .MuiFormControl-root': {
            minWidth: 200,
          },
          '& .MuiInputBase-root': {
            borderRadius: 1,
          },
        }}
      />
    </Paper>
  );
};
