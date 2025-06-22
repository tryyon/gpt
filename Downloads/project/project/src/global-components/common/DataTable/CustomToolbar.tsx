'use client';
import React from 'react';

import {
  Box,
  Button,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  FilterList as FilterIcon,
  ViewColumn as ViewColumnIcon,
  MoreVert as MoreIcon,
  Delete as DeleteIcon,
  Archive as ArchiveIcon,
} from '@mui/icons-material';


interface ToolbarAction {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  disabled?: boolean;
  hidden?: boolean;
  variant?: 'text' | 'outlined' | 'contained';
}

interface CustomToolbarProps {
  onAdd?: () => void;
  onImport?: () => void;
  onExport?: () => void;
  onSearch?: (value: string) => void;
  onFilter?: () => void;
  onColumnVisibility?: () => void;
  addLabel?: string;
  importLabel?: string;
  exportLabel?: string;
  searchPlaceholder?: string;
  hideAdd?: boolean;
  hideImport?: boolean;
  hideExport?: boolean;
  hideSearch?: boolean;
  hideDensity?: boolean;
  hideFilter?: boolean;
  hideColumnVisibility?: boolean;
  selectedCount?: number;
  bulkActions?: ToolbarAction[];
  additionalActions?: ToolbarAction[];
  searchValue?: string;
  searchDebounce?: number;
}

export function CustomToolbar({
  onAdd,
  onImport,
  onExport,
  onSearch,
  onFilter,
  onColumnVisibility,
  addLabel = 'Add New',
  importLabel = 'Import',
  exportLabel = 'Export',
  searchPlaceholder = 'Search...',
  hideAdd = false,
  hideImport = false,
  hideExport = false,
  hideSearch = false,
  hideDensity = false,
  hideFilter = false,
  hideColumnVisibility = false,
  selectedCount = 0,
  bulkActions = [],
  additionalActions = [],
  searchValue = '',
  searchDebounce = 300,
}: CustomToolbarProps) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [searchTerm, setSearchTerm] = React.useState(searchValue);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (onSearch) {
        onSearch(searchTerm);
      }
    }, searchDebounce);

    return () => clearTimeout(handler);
  }, [searchTerm, onSearch, searchDebounce]);

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderBulkActions = () => (
    <Stack direction="row" spacing={1} alignItems="center">
      <Button
        size="small"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={() => {}}
      >
        Delete Selected ({selectedCount})
      </Button>
      <Button
        size="small"
        startIcon={<ArchiveIcon />}
        onClick={() => {}}
      >
        Archive Selected
      </Button>
      {bulkActions.map((action, index) => (
        <Button
          key={index}
          size="small"
          color={action.color}
          startIcon={action.icon}
          onClick={action.onClick}
          disabled={action.disabled}
          variant={action.variant}
        >
          {action.label}
        </Button>
      ))}
    </Stack>
  );

  return (
    <Box sx={{ 
      p: 2, 
      display: 'flex', 
      gap: 2,
      flexDirection: { xs: 'column', sm: 'row' },
      alignItems: { xs: 'stretch', sm: 'center' },
      justifyContent: 'space-between',
      borderBottom: `1px solid ${theme.palette.divider}`,
    }}>
      {/* Left Side */}
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={2} 
        alignItems="center"
        width={{ xs: '100%', sm: 'auto' }}
      >
        {!hideSearch && (
          <TextField
            placeholder={searchPlaceholder}
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ minWidth: 240 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        )}

        {!hideFilter && (
          <Tooltip title="Filter">
            <IconButton onClick={onFilter}>
              <FilterIcon />
            </IconButton>
          </Tooltip>
        )}

        {!hideColumnVisibility && (
          <Tooltip title="Column Settings">
            <IconButton onClick={onColumnVisibility}>
              <ViewColumnIcon />
            </IconButton>
          </Tooltip>
        )}
      </Stack>

      {/* Right Side */}
      <Stack 
        direction="row" 
        spacing={1} 
        alignItems="center"
        justifyContent="flex-end"
        width={{ xs: '100%', sm: 'auto' }}
      >
        {selectedCount > 0 ? (
          renderBulkActions()
        ) : (
          <>
            {!hideAdd && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onAdd}
              >
                {addLabel}
              </Button>
            )}

            {!hideImport && (
              <Button
                variant="outlined"
                startIcon={<UploadIcon />}
                onClick={onImport}
              >
                {importLabel}
              </Button>
            )}

            {!hideDensity && (
              <></>
            )}

            {!hideExport && (
              <Button
                startIcon={<DownloadIcon />}
                onClick={onExport}
                sx={{ color: 'text.secondary' }}
              >
                {exportLabel}
              </Button>
            )}

            {additionalActions.length > 0 && (
              <>
                <Divider orientation="vertical" flexItem />
                <IconButton onClick={handleMoreClick}>
                  <MoreIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  onClick={handleClose}
                >
                  {additionalActions.map((action, index) => (
                    <MenuItem
                      key={index}
                      onClick={action.onClick}
                      disabled={action.disabled}
                    >
                      {action.icon && (
                        <ListItemIcon>{action.icon}</ListItemIcon>
                      )}
                      <ListItemText>{action.label}</ListItemText>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
}