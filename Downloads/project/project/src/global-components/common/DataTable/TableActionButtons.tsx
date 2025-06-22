'use client';
import React from 'react';

import {
  Box,
  IconButton,
  Tooltip,
  Stack,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  MoreVert as MoreIcon,
} from '@mui/icons-material';

interface Action {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  disabled?: boolean;
  hidden?: boolean;
}

interface TableActionButtonsProps {
  actions?: Action[];
  moreActions?: Action[];
  size?: 'small' | 'medium' | 'large';
  spacing?: number;
  showLabels?: boolean;
  direction?: 'row' | 'column';
  variant?: 'icon' | 'text' | 'menu';
}

export function TableActionButtons({
  actions = [],
  moreActions = [],
  size = 'small',
  spacing = 1,
  showLabels = false,
  direction = 'row',
  variant = 'icon',
}: TableActionButtonsProps) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleActionClick = (action: Action) => (event: React.MouseEvent) => {
    event.stopPropagation();
    action.onClick();
    handleCloseMenu();
  };

  const defaultActions: Action[] = [
    {
      label: 'View',
      icon: <ViewIcon fontSize={size} />,
      onClick: () => {},
      color: 'primary',
      hidden: true,
    },
    {
      label: 'Edit',
      icon: <EditIcon fontSize={size} />,
      onClick: () => {},
      color: 'inherit',
      hidden: true,
    },
    {
      label: 'Delete',
      icon: <DeleteIcon fontSize={size} />,
      onClick: () => {},
      color: 'error',
      hidden: true,
    },
  ];

  // Merge default actions with provided actions
  const mergedActions = defaultActions.map(defaultAction => {
    const providedAction = actions.find(action => action.label === defaultAction.label);
    return providedAction ? { ...defaultAction, ...providedAction, hidden: false } : defaultAction;
  });

  // Filter out hidden actions
  const visibleActions = mergedActions.filter(action => !action.hidden);

  if (variant === 'menu') {
    return (
      <>
        <IconButton
          size={size}
          onClick={handleOpenMenu}
          sx={{ color: theme.palette.text.secondary }}
        >
          <MoreIcon fontSize={size} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          onClick={(e) => e.stopPropagation()}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {[...visibleActions, ...moreActions].map((action, index) => (
            <MenuItem
              key={action.label}
              onClick={handleActionClick(action)}
              disabled={action.disabled}
              sx={{ 
                color: (action.color && ["primary","secondary","error","info","success","warning"].includes(action.color)) ? theme.palette[action.color as "primary"|"secondary"|"error"|"info"|"success"|"warning"].main : undefined,
                minWidth: 140,
              }}
            >
              {action.icon && (
                <ListItemIcon sx={{ color: 'inherit' }}>
                  {action.icon}
                </ListItemIcon>
              )}
              <ListItemText>{action.label}</ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }

  return (
    <Stack 
      direction={direction} 
      spacing={spacing}
      sx={{ 
        display: 'flex',
        alignItems: direction === 'row' ? 'center' : 'flex-start',
      }}
    >
      {visibleActions.map((action) => (
        <Tooltip key={action.label} title={showLabels ? '' : action.label}>
          <span>
            <IconButton
              size={size}
              onClick={handleActionClick(action)}
              disabled={action.disabled}
              sx={{ color: (action.color && ["primary","secondary","error","info","success","warning"].includes(action.color)) ? theme.palette[action.color as "primary"|"secondary"|"error"|"info"|"success"|"warning"].main : undefined }}
            >
              {action.icon}
            </IconButton>
          </span>
        </Tooltip>
      ))}
      {moreActions.length > 0 && (
        <>
          <IconButton
            size={size}
            onClick={handleOpenMenu}
            sx={{ color: theme.palette.text.secondary }}
          >
            <MoreIcon fontSize={size} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            onClick={(e) => e.stopPropagation()}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {moreActions.map((action) => (
              <MenuItem
                key={action.label}
                onClick={handleActionClick(action)}
                disabled={action.disabled}
                sx={{ 
                  color: (action.color && ["primary","secondary","error","info","success","warning"].includes(action.color)) ? theme.palette[action.color as "primary"|"secondary"|"error"|"info"|"success"|"warning"].main : undefined,
                  minWidth: 140,
                }}
              >
                {action.icon && (
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    {action.icon}
                  </ListItemIcon>
                )}
                <ListItemText>{action.label}</ListItemText>
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Stack>
  );
}