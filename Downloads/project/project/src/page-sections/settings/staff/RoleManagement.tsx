'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormLabel,
  Paper,
  Alert,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { Role, Module } from './types';

// Mock modules data
const modules: Module[] = [
  { id: 'products', name: 'Products', description: 'Manage products and inventory', permissions: ['view', 'create', 'edit', 'delete'] },
  { id: 'orders', name: 'Orders', description: 'Handle customer orders', permissions: ['view', 'create', 'edit', 'delete'] },
  { id: 'customers', name: 'Customers', description: 'Customer management', permissions: ['view', 'create', 'edit', 'delete'] },
  { id: 'analytics', name: 'Analytics', description: 'View and analyze data', permissions: ['view'] },
  { id: 'settings', name: 'Settings', description: 'System configuration', permissions: ['view', 'edit'] },
];

// Mock roles data
const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Administrator',
    description: 'Full system access',
    permissions: modules.map(module => ({
      module: module.id,
      actions: {
        view: true,
        create: true,
        edit: true,
        delete: true,
      },
    })),
    isActive: true,
    dateCreated: new Date(),
  },
  {
    id: '2',
    name: 'Store Manager',
    description: 'Manage store operations',
    permissions: modules.map(module => ({
      module: module.id,
      actions: {
        view: true,
        create: module.id !== 'settings',
        edit: module.id !== 'settings',
        delete: false,
      },
    })),
    isActive: true,
    dateCreated: new Date(),
  },
];

export function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: modules.map(module => ({
      module: module.id,
      actions: {
        view: false,
        create: false,
        edit: false,
        delete: false,
      },
    })),
  });

  const handleAddRole = () => {
    setSelectedRole(null);
    setFormData({
      name: '',
      description: '',
      permissions: modules.map(module => ({
        module: module.id,
        actions: {
          view: false,
          create: false,
          edit: false,
          delete: false,
        },
      })),
    });
    setIsFormOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
    });
    setIsFormOpen(true);
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles(prev => prev.filter(role => role.id !== roleId));
  };

  const handlePermissionChange = (moduleId: string, action: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.map(perm =>
        perm.module === moduleId
          ? { ...perm, actions: { ...perm.actions, [action]: checked } }
          : perm
      ),
    }));
  };

  const handleSave = () => {
    if (selectedRole) {
      // Update existing role
      setRoles(prev => prev.map(role =>
        role.id === selectedRole.id
          ? { ...role, ...formData, dateCreated: role.dateCreated }
          : role
      ));
    } else {
      // Add new role
      const newRole: Role = {
        id: Date.now().toString(),
        ...formData,
        isActive: true,
        dateCreated: new Date(),
      };
      setRoles(prev => [...prev, newRole]);
    }
    setIsFormOpen(false);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddRole}
        >
          Add Role
        </Button>
      </Box>

      <Grid container spacing={3}>
        {roles.map((role) => (
          <Grid item xs={12} md={6} key={role.id}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box>
                    <Typography variant="h6">
                      {role.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {role.description}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleEditRole(role)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteRole(role.id)}
                      color="error"
                      disabled={role.name === 'Administrator'}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Permissions
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {role.permissions.map((perm) => {
                      const module = modules.find(m => m.id === perm.module);
                      if (!module) return null;

                      const actions = Object.entries(perm.actions)
                        .filter(([_, value]) => value)
                        .map(([key]) => key);

                      return actions.length > 0 ? (
                        <Chip
                          key={perm.module}
                          label={`${module.name} (${actions.join(', ')})`}
                          size="small"
                          variant="outlined"
                        />
                      ) : null;
                    })}
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    Created: {new Date(role.dateCreated).toLocaleDateString()}
                  </Typography>
                  <Chip
                    label={role.isActive ? 'Active' : 'Inactive'}
                    color={role.isActive ? 'success' : 'default'}
                    size="small"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedRole ? 'Edit Role' : 'Add Role'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Role Name"
                  fullWidth
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Module Permissions
                </Typography>
                {modules.map((module) => (
                  <Paper key={module.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        <Typography variant="subtitle2">
                          {module.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {module.description}
                        </Typography>
                      </FormLabel>
                      <FormGroup row sx={{ mt: 1 }}>
                        {module.permissions.map((permission) => {
                          const currentPermission = formData.permissions.find(
                            p => p.module === module.id
                          );
                          return (
                            <FormControlLabel
                              key={permission}
                              control={
                                <Checkbox
                                  checked={currentPermission?.actions[permission as keyof typeof currentPermission.actions] || false}
                                  onChange={(e) => handlePermissionChange(module.id, permission, e.target.checked)}
                                />
                              }
                              label={permission}
                            />
                          );
                        })}
                      </FormGroup>
                    </FormControl>
                  </Paper>
                ))}
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsFormOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!formData.name || !formData.description}
          >
            {selectedRole ? 'Save Changes' : 'Add Role'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}