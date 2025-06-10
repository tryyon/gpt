'use client';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: 'var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-timing)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#2d3748',
          transition: 'var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-timing)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e2e8f0',
          transition: 'var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-timing)',
        },
      },
    },
    MuiCard: {
      defaultProps: {
        variant: 'outlined',
        elevation: 0,
      },
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.12)',
          '&:hover': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
          transition: 'var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-timing)',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        variant: 'outlined',
        elevation: 0,
      },
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.12)',
          '&:hover': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
          transition: 'var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-timing)',
        },
      },
    },
    MuiDialog: {
      defaultProps: {
        PaperProps: {
          elevation: 0,
          variant: 'outlined',
        },
      },
    },
    MuiPopover: {
      defaultProps: {
        PaperProps: {
          elevation: 0,
          variant: 'outlined',
        },
      },
    },
    MuiMenu: {
      defaultProps: {
        PaperProps: {
          elevation: 0,
          variant: 'outlined',
        },
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        PaperProps: {
          elevation: 0,
          variant: 'outlined',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '16px',
          '&:last-child': {
            paddingBottom: '16px',
          },
          '@media (min-width: 600px)': {
            padding: '24px',
            '&:last-child': {
              paddingBottom: '24px',
            },
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '16px',
          '@media (min-width: 600px)': {
            padding: '24px',
          },
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '16px',
          '@media (min-width: 600px)': {
            padding: '24px',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          transition: 'var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-timing)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          transition: 'var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-timing)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          transition: 'var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-timing)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-timing)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          transition: 'var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-timing)',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          transition: 'color var(--theme-transition-duration) var(--theme-transition-timing)',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          transition: 'color var(--theme-transition-duration) var(--theme-transition-timing)',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          transition: 'var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-timing)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          transition: 'border-color var(--theme-transition-duration) var(--theme-transition-timing)',
          '& .MuiOutlinedInput-notchedOutline': {
            transition: 'border-color var(--theme-transition-duration) var(--theme-transition-timing)',
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          '& .MuiDataGrid-cell': {
            transition: 'var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-timing)',
          },
          '& .MuiDataGrid-columnHeaders': {
            transition: 'var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-timing)',
          },
          '& .MuiDataGrid-footerContainer': {
            transition: 'var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-timing)',
          },
          '& .MuiDataGrid-row': {
            transition: 'background-color var(--theme-transition-duration) var(--theme-transition-timing)',
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
});