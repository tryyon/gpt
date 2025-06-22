'use client';

import { useState } from 'react';
import {
  Box,
  Paper,
  Grid,
  TextField,
  InputAdornment,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  CalendarToday as CalendarIcon,
  Clear as ClearIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

// Return status options
const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'completed', label: 'Completed' },
];

// Return reason options
const reasonOptions = [
  { value: 'all', label: 'All Reasons' },
  { value: 'wrong_size', label: 'Wrong Size' },
  { value: 'defective', label: 'Defective' },
  { value: 'not_as_described', label: 'Not As Described' },
  { value: 'wrong_item', label: 'Wrong Item' },
  { value: 'damaged', label: 'Damaged' },
  { value: 'changed_mind', label: 'Changed Mind' },
];

// Date range options
const dateRangeOptions = [
  { value: '7days', label: 'Last 7 Days' },
  { value: '30days', label: 'Last 30 Days' },
  { value: '90days', label: 'Last 90 Days' },
  { value: 'custom', label: 'Custom Range' },
];

export function ReturnsFilters() {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('all');
  const [reason, setReason] = useState('all');
  const [dateRange, setDateRange] = useState('30days');
  const [showCustomDateRange, setShowCustomDateRange] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event: any) => {
    const value = event.target.value;
    setStatus(value);
    updateActiveFilters('status', value);
  };

  const handleReasonChange = (event: any) => {
    const value = event.target.value;
    setReason(value);
    updateActiveFilters('reason', value);
  };

  const handleDateRangeChange = (event: any) => {
    const value = event.target.value;
    setDateRange(value);
    setShowCustomDateRange(value === 'custom');
    updateActiveFilters('dateRange', value);
  };

  const updateActiveFilters = (type: string, value: string) => {
    if (value === 'all' || value === '30days') {
      setActiveFilters(prev => prev.filter(filter => !filter.startsWith(type)));
      return;
    }

    const filterLabel = `${type}:${
      type === 'status' 
        ? statusOptions.find(option => option.value === value)?.label 
        : type === 'reason'
          ? reasonOptions.find(option => option.value === value)?.label
          : dateRangeOptions.find(option => option.value === value)?.label
    }`;

    setActiveFilters(prev => {
      const newFilters = prev.filter(filter => !filter.startsWith(type));
      return [...newFilters, filterLabel];
    });
  };

  const handleRemoveFilter = (filter: string) => {
    const [type] = filter.split(':');
    
    if (type === 'status') setStatus('all');
    if (type === 'reason') setReason('all');
    if (type === 'dateRange') {
      setDateRange('30days');
      setShowCustomDateRange(false);
    }
    
    setActiveFilters(prev => prev.filter(f => f !== filter));
  };

  const handleClearAll = () => {
    setSearchTerm('');
    setStatus('all');
    setReason('all');
    setDateRange('30days');
    setShowCustomDateRange(false);
    setStartDate('');
    setEndDate('');
    setActiveFilters([]);
  };

  const handleApplyFilters = () => {
    console.log('Applying filters:', { searchTerm, status, reason, dateRange, startDate, endDate });
    // Here you would typically fetch data with these filters
  };

  return (
    <Paper elevation={0} sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            placeholder="Search by return ID, order ID, or customer..."
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchTerm('')}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={handleStatusChange}
            >
              {statusOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel>Reason</InputLabel>
            <Select
              value={reason}
              label="Reason"
              onChange={handleReasonChange}
            >
              {reasonOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel>Date Range</InputLabel>
            <Select
              value={dateRange}
              label="Date Range"
              onChange={handleDateRangeChange}
            >
              {dateRangeOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={2}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<FilterIcon />}
              onClick={handleApplyFilters}
            >
              Apply
            </Button>
            <Tooltip title="Reset Filters">
              <IconButton onClick={handleClearAll} sx={{ border: `1px solid ${theme.palette.divider}` }}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
        
        {showCustomDateRange && (
          <>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </>
        )}
      </Grid>
      
      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
          {activeFilters.map((filter) => (
            <Chip
              key={filter}
              label={filter}
              onDelete={() => handleRemoveFilter(filter)}
              color="primary"
              variant="outlined"
              size="small"
            />
          ))}
          <Chip
            label="Clear All"
            onClick={handleClearAll}
            color="default"
            variant="outlined"
            size="small"
          />
        </Box>
      )}
    </Paper>
  );
}