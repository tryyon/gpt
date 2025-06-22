'use client';

import {
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { FileUpload } from '@/global-components/common/FileUpload';
import { Image as ImageIcon } from '@mui/icons-material';
import type { StaffMember } from './types';

const schema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  contactNumber: z.string().min(10, 'Contact number must be at least 10 digits'),
  role: z.string().min(1, 'Role is required'),
  department: z.string().min(1, 'Department is required'),
  startDate: z.string().min(1, 'Start date is required'),
  profilePhoto: z.any().optional(),
});

type FormData = z.infer<typeof schema>;

interface StaffFormProps {
  onSubmit: (data: Partial<StaffMember>) => void;
  onCancel: () => void;
  initialData?: StaffMember | null;
}

const departments = [
  'Management',
  'Sales',
  'Marketing',
  'Customer Support',
  'IT',
  'Finance',
  'HR',
  'Operations',
];

const roles = [
  'Admin',
  'Manager',
  'Supervisor',
  'Staff',
  'Support',
];

export function StaffForm({ onSubmit, onCancel, initialData }: StaffFormProps) {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      fullName: initialData?.fullName || '',
      email: initialData?.email || '',
      contactNumber: initialData?.contactNumber || '',
      role: initialData?.role || '',
      department: initialData?.department || '',
      startDate: initialData?.startDate || '',
      profilePhoto: null,
    },
  });

  return (
    <>
      <DialogTitle>
        {initialData ? 'Edit Staff Member' : 'Add Staff Member'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" id="staff-form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="profilePhoto"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <FileUpload
                    label="Profile Photo"
                    accept="image/*"
                    maxSize={2 * 1024 * 1024}
                    error={typeof errors.profilePhoto === 'object' && errors.profilePhoto !== null ? (errors.profilePhoto as { message?: string }).message : undefined}
                    value={value}
                    onChange={onChange}
                    icon={<ImageIcon />}
                    currentImage={initialData?.profilePhoto}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Full Name"
                    fullWidth
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                    required
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email Address"
                    type="email"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    required
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="contactNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Contact Number"
                    fullWidth
                    error={!!errors.contactNumber}
                    helperText={errors.contactNumber?.message}
                    required
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Start Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.startDate}
                    helperText={errors.startDate?.message}
                    required
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.department}>
                    <InputLabel>Department</InputLabel>
                    <Select {...field} label="Department">
                      {departments.map((dept) => (
                        <MenuItem key={dept} value={dept}>
                          {dept}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.role}>
                    <InputLabel>Role</InputLabel>
                    <Select {...field} label="Role">
                      {roles.map((role) => (
                        <MenuItem key={role} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="staff-form"
          variant="contained"
        >
          {initialData ? 'Save Changes' : 'Add Staff Member'}
        </Button>
      </DialogActions>
    </>
  );
}