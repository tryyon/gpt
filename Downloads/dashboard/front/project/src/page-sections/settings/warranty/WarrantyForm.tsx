'use client';

import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Grid,
  TextField,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Typography,
  RadioGroup,
  Radio,
  FormHelperText,
} from '@mui/material';
import { warrantySchema, warrantyTypes, durationUnits, type Warranty } from '@/lib/validations/warranty';

const refundExchangeConditions = [
  { id: 1, text: 'Refundable' },
  { id: 2, text: 'Not refundable' },
  { id: 3, text: 'Refundable only if received damaged when delivered' },
  { id: 4, text: 'Not refundable - exchange only' },
  { id: 5, text: 'No exchange, no refund' },
  { id: 6, text: 'Can be exchanged only if received damaged' },
];

interface WarrantyFormProps {
  onSubmit: (data: Warranty) => void;
  onCancel: () => void;
  initialData?: Warranty | null;
  isSubmitting: boolean;
}

export function WarrantyForm({ onSubmit, onCancel, initialData, isSubmitting }: WarrantyFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Warranty>({
    resolver: zodResolver(warrantySchema),
    defaultValues: {
      title: initialData?.title || '',
      type: initialData?.type || 'Warranty',
      duration: {
        value: initialData?.duration?.value || 1,
        unit: initialData?.duration?.unit || 'Years',
      },
      description: initialData?.description || '',
      conditions: initialData?.conditions || [''],
      isActive: initialData?.isActive ?? true,
    },
  });

  const selectedType = useWatch({
    control,
    name: 'type',
  });

  const handleConditionChange = (value: string) => {
    setValue('conditions', [value], { shouldValidate: true });
  };

  return (
    <>
      <DialogTitle>
        {initialData?.id ? 'Edit Policy' : 'Add New Policy'}
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" id="warranty-form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.type}>
                    <InputLabel>Type</InputLabel>
                    <Select {...field} label="Type">
                      {warrantyTypes.map(type => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="duration.value"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Duration"
                    type="number"
                    fullWidth
                    error={!!errors.duration?.value}
                    helperText={errors.duration?.value?.message}
                    inputProps={{ min: 1 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="duration.unit"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.duration?.unit}>
                    <InputLabel>Duration Unit</InputLabel>
                    <Select {...field} label="Duration Unit">
                      {durationUnits.map(unit => (
                        <MenuItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Policy Condition
              </Typography>

              {selectedType === 'Refund & Exchange' ? (
                <FormControl component="fieldset" fullWidth error={!!errors.conditions}>
                  <Controller
                    name="conditions.0"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup {...field} onChange={(e) => handleConditionChange(e.target.value)}>
                        {refundExchangeConditions.map((condition) => (
                          <FormControlLabel
                            key={condition.id}
                            value={condition.text}
                            control={<Radio />}
                            label={condition.text}
                          />
                        ))}
                        <FormControlLabel
                          value="custom"
                          control={<Radio />}
                          label={
                            <TextField
                              placeholder="Enter custom condition"
                              size="small"
                              fullWidth
                              onChange={(e) => {
                                if (field.value === 'custom') {
                                  handleConditionChange(e.target.value);
                                }
                              }}
                              onClick={(e) => e.stopPropagation()}
                              disabled={field.value !== 'custom'}
                            />
                          }
                        />
                      </RadioGroup>
                    )}
                  />
                  {errors.conditions && (
                    <FormHelperText>{errors.conditions.message}</FormHelperText>
                  )}
                </FormControl>
              ) : (
                <Controller
                  name="conditions.0"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      rows={2}
                      placeholder={`Enter ${selectedType} condition`}
                      error={!!errors.conditions}
                      helperText={errors.conditions?.message}
                    />
                  )}
                />
              )}
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="isActive"
                control={control}
                render={({ field: { value, ...field } }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={value}
                        {...field}
                      />
                    }
                    label="Policy is active"
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
          form="warranty-form"
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : initialData?.id ? 'Save Changes' : 'Add Policy'}
        </Button>
      </DialogActions>
    </>
  );
}