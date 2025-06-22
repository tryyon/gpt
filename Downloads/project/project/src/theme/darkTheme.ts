import { ThemeOptions } from '@mui/material/styles';

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      light: '#e3f2fd',
      dark: '#42a5f5',
      contrastText: '#000000',
    },
    secondary: {
      main: '#ce93d8',
      light: '#f3e5f5',
      dark: '#ab47bc',
      contrastText: '#000000',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: '#ffffff',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    action: {
      active: '#ffffff',
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(255, 255, 255, 0.16)',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#121212',
          color: '#fff',
          transition: 'var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-timing)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          transition: 'var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-timing)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1e1e1e',
          borderRight: '1px solid rgba(255, 255, 255, 0.12)',
          transition: 'var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-timing)',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          borderColor: 'rgba(255, 255, 255, 0.12)',
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.23)',
          },
          transition: 'var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-timing)',
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          borderColor: 'rgba(255, 255, 255, 0.12)',
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.23)',
          },
          transition: 'var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-timing)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          transition: 'var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-timing)',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          transition: 'var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-timing)',
          '&.MuiChip-filledSuccess': {
            backgroundColor: '#388e3c',
          },
          '&.MuiChip-filledError': {
            backgroundColor: '#d32f2f',
          },
          '&.MuiChip-filledWarning': {
            backgroundColor: '#f57c00',
          },
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
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          transition: 'var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-timing)',
          '&.Mui-selected': {
            backgroundColor: 'rgba(144, 202, 249, 0.16)',
            '&:hover': {
              backgroundColor: 'rgba(144, 202, 249, 0.24)',
            },
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          transition: 'var(--theme-transition-properties) var(--theme-transition-duration) var(--theme-transition-timing)',
          '&.Mui-selected': {
            backgroundColor: 'rgba(144, 202, 249, 0.16)',
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          transition: 'color var(--theme-transition-duration) var(--theme-transition-timing)',
          '&.Mui-checked': {
            color: '#90caf9',
            '& + .MuiSwitch-track': {
              backgroundColor: '#90caf9',
              transition: 'background-color var(--theme-transition-duration) var(--theme-transition-timing)',
            },
          },
        },
        track: {
          transition: 'background-color var(--theme-transition-duration) var(--theme-transition-timing)',
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
    MuiCheckbox: {
      styleOverrides: {
        root: {
          transition: 'color var(--theme-transition-duration) var(--theme-transition-timing)',
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          transition: 'color var(--theme-transition-duration) var(--theme-transition-timing)',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          transition: 'background-color var(--theme-transition-duration) var(--theme-transition-timing)',
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          transition: 'background-color var(--theme-transition-duration) var(--theme-transition-timing)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          transition: 'background-color var(--theme-transition-duration) var(--theme-transition-timing)',
        },
      },
    },
  },
};