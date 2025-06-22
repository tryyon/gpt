'use client';

import { useState, useCallback, memo } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  Paper,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  useTheme,
  alpha,
} from '@mui/material';
import {
  GridView as GridViewIcon,
  ViewList as ListViewIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  QrCodeScanner as QrCodeScannerIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const categories = [
  'All',
  'Electronics',
  'Clothing',
  'Shoes',
  'Accessories',
  'Home & Living',
];

const sortOptions = [
  { value: 'name_asc', label: 'Name (A-Z)' },
  { value: 'name_desc', label: 'Name (Z-A)' },
  { value: 'price_asc', label: 'Price (Low to High)' },
  { value: 'price_desc', label: 'Price (High to Low)' },
  { value: 'stock_asc', label: 'Stock (Low to High)' },
  { value: 'stock_desc', label: 'Stock (High to Low)' },
];

interface ProductFiltersProps {
  viewMode: 'grid' | 'table';
  category: string;
  sortBy: string;
  searchTerm: string;
  scanning?: boolean;
  onViewModeChange: (mode: 'grid' | 'table') => void;
  onCategoryChange: (category: string) => void;
  onSortByChange: (sortBy: string) => void;
  onSearch: (term: string) => void;
  onBarcodeScanner?: () => void;
}

function ProductFiltersComponent({
  viewMode,
  category,
  sortBy,
  searchTerm,
  scanning = false,
  onViewModeChange,
  onCategoryChange,
  onSortByChange,
  onSearch,
  onBarcodeScanner,
}: ProductFiltersProps) {
  const theme = useTheme();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const isDarkMode = theme.palette.mode === 'dark';
  const { t } = useTranslation();

  const handleViewChange = useCallback((_: React.MouseEvent<HTMLElement>, newView: 'grid' | 'table' | null) => {
    if (newView !== null) {
      onViewModeChange(newView);
    }
  }, [onViewModeChange]);

  const handleCategoryChange = useCallback((event: SelectChangeEvent) => {
    onCategoryChange(event.target.value);
  }, [onCategoryChange]);

  const handleSortChange = useCallback((event: SelectChangeEvent) => {
    onSortByChange(event.target.value);
  }, [onSortByChange]);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(event.target.value);
  }, []);

  const handleSearchSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    onSearch(localSearchTerm);
  }, [localSearchTerm, onSearch]);

  const handleClearSearch = useCallback(() => {
    setLocalSearchTerm('');
    onSearch('');
  }, [onSearch]);

  // Translate sort options
  const translatedSortOptions = sortOptions.map(option => ({
    ...option,
    label: t(option.label)
  }));

  return (
    <Paper 
      variant="outlined" 
      sx={{ 
        p: 2,
        bgcolor: theme.palette.background.paper,
        borderColor: theme.palette.divider,
        transition: 'background-color 0.1s ease-out, border-color 0.1s ease-out',
      }}
    >
      <Stack spacing={2}>
        <Box component="form" onSubmit={handleSearchSubmit}>
          <TextField
            fullWidth
            placeholder={t('searchPlaceholder')}
            value={localSearchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {localSearchTerm && (
                    <IconButton onClick={handleClearSearch} edge="end">
                      <ClearIcon />
                    </IconButton>
                  )}
                  {onBarcodeScanner && (
                    <IconButton 
                      onClick={onBarcodeScanner} 
                      disabled={scanning}
                      color={scanning ? "primary" : "default"}
                    >
                      <QrCodeScannerIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.divider,
                  transition: 'border-color 0.1s ease-out',
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.action.hover,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main,
                },
              },
              transition: 'background-color 0.1s ease-out',
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>{t('category')}</InputLabel>
            <Select
              value={category}
              onChange={handleCategoryChange}
              label={t('category')}
              size="small"
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.divider,
                  transition: 'border-color 0.1s ease-out',
                },
                transition: 'background-color 0.1s ease-out',
              }}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{t(cat)}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>{t('sortBy')}</InputLabel>
            <Select
              value={sortBy}
              onChange={handleSortChange}
              label={t('sortBy')}
              size="small"
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.divider,
                  transition: 'border-color 0.1s ease-out',
                },
                transition: 'background-color 0.1s ease-out',
              }}
            >
              {translatedSortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: { xs: 'none', sm: 'block' }, ml: 'auto' }}>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewChange}
              aria-label="view mode"
              size="small"
              sx={{
                '& .MuiToggleButton-root': {
                  color: theme.palette.text.secondary,
                  borderColor: theme.palette.divider,
                  transition: 'color 0.1s ease-out, background-color 0.1s ease-out, border-color 0.1s ease-out',
                  '&.Mui-selected': {
                    color: theme.palette.primary.main,
                    backgroundColor: isDarkMode 
                      ? 'rgba(144, 202, 249, 0.16)' 
                      : 'rgba(33, 150, 243, 0.08)',
                  },
                },
              }}
            >
              <ToggleButton value="grid" aria-label="grid view">
                <GridViewIcon />
              </ToggleButton>
              <ToggleButton value="table" aria-label="table view">
                <ListViewIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
}

// Export memoized component to prevent unnecessary re-renders
export const ProductFilters = memo(ProductFiltersComponent);