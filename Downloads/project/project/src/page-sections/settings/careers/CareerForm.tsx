'use client';

import { useForm, useFieldArray, Controller, Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
  FormControlLabel,
  Switch,
  Typography,
  Paper,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { careerSchema, type Career } from '@/lib/validations/content';

interface CareerFormProps {
  onSubmit: (data: Career) => void;
  initialData?: Career | null;
  onCancel: () => void;
}

const departments = [
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Sales',
  'Customer Support',
  'HR',
  'Finance',
  'Operations',
];

const jobTypes = [
  { value: 'full-time', label: 'Full Time' },
  { value: 'part-time', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
];

export function CareerForm({ onSubmit, initialData, onCancel }: CareerFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Career>({
    resolver: zodResolver(careerSchema),
    defaultValues: initialData || {
      title: '',
      department: '',
      location: '',
      type: 'full-time',
      description: '',
      requirements: [{ value: '' }],
      responsibilities: [{ value: '' }],
      isActive: true,
      postedDate: new Date(),
    },
  });

  const { 
    fields: requirementFields, 
    append: appendRequirement, 
    remove: removeRequirement 
  } = useFieldArray({
     control: control as Control<Career>,
     name: 'requirements' as const,
  });

  const { 
    fields: responsibilityFields, 
    append: appendResponsibility,     remove: removeResponsibility 
  } = useFieldArray({
     control: control as Control<Career>,
     name: 'responsibilities' as const,
  });

  return (
    <>
      <DialogTitle>
        {initialData ? 'Edit Career' : 'Add Career'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" id="career-form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Job Title"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
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
                      {departments.map(dept => (
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
                name="type"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.type}>
                    <InputLabel>Job Type</InputLabel>
                    <Select {...field} label="Job Type">
                      {jobTypes.map(type => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Location"
                    fullWidth
                    error={!!errors.location}
                    helperText={errors.location?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Job Description"
                    fullWidth
                    multiline
                    rows={4}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Requirements
                </Typography>
                {requirementFields.map((field, index) => (
                  <Box key={field.id} sx={{ mb: 2, display: 'flex', gap: 1 }}>
                    <Controller
                      name={`requirements.${index}.value` as const}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          placeholder="Enter requirement"
                          error={!!errors.requirements?.[index]?.value}
                          helperText={errors.requirements?.[index]?.message}
                        />
                      )}
                    />
                    <IconButton
                      onClick={() => removeRequirement(index)}
                      disabled={requirementFields.length <= 1}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => appendRequirement({ value: '' })}
                  variant="outlined"
                  size="small"
                >
                  Add Requirement
                </Button>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Responsibilities
                </Typography>
                {responsibilityFields.map((field, index) => (
                  <Box key={field.id} sx={{ mb: 2, display: 'flex', gap: 1 }}>
                    <Controller
                      name={`responsibilities.${index}.value` as const}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          placeholder="Enter responsibility"
                          error={!!errors.responsibilities?.[index]?.value}
                          helperText={errors.responsibilities?.[index]?.message}
                        />
                      )}
                    />
                    <IconButton
                      onClick={() => removeResponsibility(index)}
                      disabled={responsibilityFields.length <= 1}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => appendResponsibility({ value: '' })}
                  variant="outlined"
                  size="small"
                >
                  Add Responsibility
                </Button>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="isActive"
                control={control}
                render={({ field: { value, ...field } }) => (
                  <FormControlLabel
                    control={<Switch checked={value} {...field} />}
                    label="Job posting is active"
                  />
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
          form="career-form"
          variant="contained"
        >
          {initialData ? 'Save Changes' : 'Add Career'}
        </Button>
      </DialogActions>
    </>
  );
}
