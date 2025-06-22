'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  CheckCircle as ApprovedIcon,
  Pending as PendingIcon,
  Payments as PaidIcon,
  Cancel as RejectedIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';

interface CommissionFiltersProps {
  userTypeFilter: string;
  statusFilter: string;
  onUserTypeFilterChange: (type: string) => void;
  onStatusFilterChange: (status: string) => void;
}

export function CommissionFilters({
  userTypeFilter,
  statusFilter,
  onUserTypeFilterChange,
  onStatusFilterChange,
}: CommissionFiltersProps) {
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterMenuAnchor(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterMenuAnchor(null);
  };

  const handleUserTypeFilter = (type: string) => {
    onUserTypeFilterChange(type);
    updateActiveFilters('User Type', type);
    handleFilterClose();
  };

  const handleStatusFilter = (status: string) => {
    onStatusFilterChange(status);
    updateActiveFilters('Status', status);
    handleFilterClose();
  };

  const updateActiveFilters = (filterType: string, value: string) => {
    if (value === 'all') {
      setActiveFilters(prev => prev.filter(filter => !filter.startsWith(filterType)));
      return;
    }

    const filterLabel = `${filterType}: ${value}`;
    
    setActiveFilters(prev => {
      const newFilters = prev.filter(filter => !filter.startsWith(filterType));
      return [...newFilters, filterLabel];
    });
  };

  const handleClearFilter = (filter: string) => {
    if (filter.startsWith('User Type')) {
      onUserTypeFilterChange('all');
    } else if (filter.startsWith('Status')) {
      onStatusFilterChange('all');
    }
    
    setActiveFilters(prev => prev.filter(f => f !== filter));
  };

  const handleClearAllFilters = () => {
    onUserTypeFilterChange('all');
    onStatusFilterChange('all');
    setActiveFilters([]);
  };

  return (
    <Box>
      <Button
        variant="outlined"
        startIcon={<FilterIcon />}
        onClick={handleFilterClick}
        size="small"
      >
        Filter
      </Button>
      
      <Menu
        anchorEl={filterMenuAnchor}
        open={Boolean(filterMenuAnchor)}
        onClose={handleFilterClose}
      >
        <MenuItem disabled>
          <ListItemText primary="User Type" />
        </MenuItem>
        <MenuItem onClick={() => handleUserTypeFilter('all')} selected={userTypeFilter === 'all'}>
          <ListItemText primary="All Users" />
        </MenuItem>
        <MenuItem onClick={() => handleUserTypeFilter('influencer')} selected={userTypeFilter === 'influencer'}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Influencers" />
        </MenuItem>
        <MenuItem onClick={() => handleUserTypeFilter('reseller')} selected={userTypeFilter === 'reseller'}>
          <ListItemIcon>
            <GroupIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Resellers" />
        </MenuItem>
        
        <Divider />
        
        <MenuItem disabled>
          <ListItemText primary="Status" />
        </MenuItem>
        <MenuItem onClick={() => handleStatusFilter('all')} selected={statusFilter === 'all'}>
          <ListItemText primary="All Statuses" />
        </MenuItem>
        <MenuItem onClick={() => handleStatusFilter('pending')} selected={statusFilter === 'pending'}>
          <ListItemIcon>
            <PendingIcon fontSize="small" color="warning" />
          </ListItemIcon>
          <ListItemText primary="Pending" />
        </MenuItem>
        <MenuItem onClick={() => handleStatusFilter('approved')} selected={statusFilter === 'approved'}>
          <ListItemIcon>
            <ApprovedIcon fontSize="small" color="success" />
          </ListItemIcon>
          <ListItemText primary="Approved" />
        </MenuItem>
        <MenuItem onClick={() => handleStatusFilter('paid')} selected={statusFilter === 'paid'}>
          <ListItemIcon>
            <PaidIcon fontSize="small" color="info" />
          </ListItemIcon>
          <ListItemText primary="Paid" />
        </MenuItem>
        <MenuItem onClick={() => handleStatusFilter('rejected')} selected={statusFilter === 'rejected'}>
          <ListItemIcon>
            <RejectedIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primary="Rejected" />
        </MenuItem>
      </Menu>
      
      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
          {activeFilters.map((filter) => (
            <Chip
              key={filter}
              label={filter}
              onDelete={() => handleClearFilter(filter)}
              size="small"
            />
          ))}
          {activeFilters.length > 1 && (
            <Chip
              icon={<ClearIcon />}
              label="Clear All"
              onClick={handleClearAllFilters}
              size="small"
              variant="outlined"
            />
          )}
        </Box>
      )}
    </Box>
  );
}