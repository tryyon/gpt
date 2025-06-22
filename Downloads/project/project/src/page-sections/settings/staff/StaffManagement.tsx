'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  Alert,
  Snackbar,
  Tabs,
  Tab,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { StaffTable } from './StaffTable';
import { StaffForm } from './StaffForm';
import { RoleManagement } from './RoleManagement';
import { DefaultCard } from '@/global-components/common/DefaultCard';
import type { StaffMember } from './types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`staff-tabpanel-${index}`}
      aria-labelledby={`staff-tab-${index}`}
      sx={{ py: 3 }}
    >
      {value === index && children}
    </Box>
  );
}

// Mock data - replace with API call in production
const mockStaff: StaffMember[] = [
  {
    id: '1',
    fullName: 'John Doe',
    email: 'john@example.com',
    contactNumber: '+1234567890',
    role: 'Admin',
    department: 'Management',
    startDate: '2024-01-15',
    status: 'active',
    profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    permissions: ['all'],
  },
  {
    id: '2',
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    contactNumber: '+1987654321',
    role: 'Manager',
    department: 'Sales',
    startDate: '2024-02-01',
    status: 'active',
    profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    permissions: ['view', 'edit'],
  },
];

export function StaffManagement() {
  const [staff, setStaff] = useState<StaffMember[]>(mockStaff);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleAddStaff = () => {
    setSelectedStaff(null);
    setIsFormOpen(true);
  };

  const handleEditStaff = (staffMember: StaffMember) => {
    setSelectedStaff(staffMember);
    setIsFormOpen(true);
  };

  const handleDeactivateStaff = (staffId: string) => {
    setStaff(prev => prev.map(member =>
      member.id === staffId ? { ...member, status: 'inactive' } : member
    ));
    setSnackbar({
      open: true,
      message: 'Staff member deactivated successfully',
      severity: 'success',
    });
  };

  const handleSaveStaff = (data: Partial<StaffMember>) => {
    if (selectedStaff) {
      // Update existing staff member
      setStaff(prev => prev.map(member =>
        member.id === selectedStaff.id ? { ...member, ...data } : member
      ));
    } else {
      // Add new staff member
      const newStaff: StaffMember = {
        id: Date.now().toString(),
        fullName: data.fullName!,
        email: data.email!,
        contactNumber: data.contactNumber!,
        role: data.role!,
        department: data.department!,
        startDate: data.startDate!,
        status: 'active',
        profilePhoto: data.profilePhoto,
        permissions: data.permissions || ['view'],
      };
      setStaff(prev => [...prev, newStaff]);
    }

    setSnackbar({
      open: true,
      message: `Staff member ${selectedStaff ? 'updated' : 'added'} successfully`,
      severity: 'success',
    });
    setIsFormOpen(false);
    setSelectedStaff(null);
  };

  return (
    <DefaultCard>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Staff Members" />
          <Tab label="Roles & Permissions" />
        </Tabs>
      </Box>

      <TabPanel value={currentTab} index={0}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddStaff}
          >
            Add Staff Member
          </Button>
        </Box>

        <StaffTable
          staff={staff}
          onEdit={handleEditStaff}
          onDeactivate={handleDeactivateStaff}
        />
      </TabPanel>

      <TabPanel value={currentTab} index={1}>
        <RoleManagement />
      </TabPanel>

      <Dialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedStaff(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <StaffForm
          onSubmit={handleSaveStaff}
          initialData={selectedStaff}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedStaff(null);
          }}
        />
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </DefaultCard>
  );
}