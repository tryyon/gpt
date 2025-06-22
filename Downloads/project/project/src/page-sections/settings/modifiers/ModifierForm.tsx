'use client';

import { useState } from 'react';
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
  IconButton,
  Paper,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { FileUpload } from '@/global-components/common/FileUpload';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  selectionType: z.enum(['single', 'multiple']),
  required: z.boolean(),
  minSelections: z.number().min(0),
  maxSelections: z.number().min(0),
  isActive: z.boolean(),
  options: z.array(z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Option name is required'),
    description: z.string(),
    priceAdjustment: z.number(),
    weightAdjustment: z.number(),
    isAvailable: z.boolean(),
    image: z.any().optional(),
  })).min(1, 'At least one option is required'),
});

type FormData = z.infer<typeof schema>;

interface ModifierFormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  initialData?: {
    name: string;
    description: string;
    selectionType: 'single' | 'multiple';
    required: boolean;
    minSelections: number;
    maxSelections: number;
    isActive: boolean;
    options: {
      id: string;
      name: string;
      description: string;
      priceAdjustment: number;
      weightAdjustment: number;
      isAvailable: boolean;
      image?: string;
    }[];
  } | null;
}

export function ModifierForm({ onSubmit, onCancel, initialData }: ModifierFormProps) {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      selectionType: initialData?.selectionType || 'single',
      required: initialData?.required ?? false,
      minSelections: initialData?.minSelections || 0,
      maxSelections: initialData?.maxSelections || 1,
      isActive: initialData?.isActive ?? true,
      options: initialData?.options || [{
        name: '',
        description: '',
        priceAdjustment: 0,
        weightAdjustment: 0,
        isAvailable: true,
      }],
    },
  });

  const selectionType = watch('selectionType');
  const [optionImages, setOptionImages] = useState<{ [key: number]: string }>({});

  const { setValue } = useForm<FormData>({
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      selectionType: initialData?.selectionType || 'single',
      required: initialData?.required ?? false,
      minSelections: initialData?.minSelections || 0,
      maxSelections: initialData?.maxSelections || 1,
      isActive: initialData?.isActive ?? true,
      options: initialData?.options || [{
        name: '',
        description: '',
        priceAdjustment: 0,
        weightAdjustment: 0,
        isAvailable: true,
      }],
    },
  });

  const handleAddOption = () => {
    const currentOptions = watch('options');
    const newOption = {
      name: '',
      description: '',
      priceAdjustment: 0,
      weightAdjustment: 0,
      isAvailable: true,
    };
    setValue('options', [...currentOptions, newOption]);
  };

  const handleRemoveOption = (index: number) => {
    const currentOptions = watch('options');
    setValue('options', currentOptions.filter((_, i) => i !== index));
  };

  const handleImageUpload = (index: number, file: File) => {
    // In production, you would upload the file to your server
    // For now, we'll just create a local URL
    const imageUrl = URL.createObjectURL(file);
    setOptionImages(prev => ({ ...prev, [index]: imageUrl }));
  };

  return (
    <>
      <DialogTitle>
        {initialData ? 'Edit Modifier Group' : 'Add Modifier Group'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" id="modifier-form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 3 }}>
                <Typography variant="subtitle1" gutterBottom fontWeight={500}>
                  Basic Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Controller
                      name="name"
                      control={control}
                      rules={{ required: 'Name is required' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Group Name"
                          fullWidth
                          error={!!errors.name}
                          helperText={errors.name?.message}
                          required
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="description"
                      control={control}
                      rules={{ required: 'Description is required' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Description"
                          fullWidth
                          multiline
                          rows={2}
                          error={!!errors.description}
                          helperText={errors.description?.message}
                          required
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Selection Rules */}
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 3 }}>
                <Typography variant="subtitle1" gutterBottom fontWeight={500}>
                  Selection Rules
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="selectionType"
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <InputLabel>Selection Type</InputLabel>
                          <Select {...field} label="Selection Type">
                            <MenuItem value="single">Single Choice</MenuItem>
                            <MenuItem value="multiple">Multiple Choice</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="required"
                      control={control}
                      render={({ field: { value, ...field } }) => (
                        <FormControlLabel
                          control={<Switch checked={value} {...field} />}
                          label="Selection is required"
                        />
                      )}
                    />
                  </Grid>

                  {selectionType === 'multiple' && (
                    <>
                      <Grid item xs={12} md={6}>
                        <Controller
                          name="minSelections"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Minimum Selections"
                              type="number"
                              fullWidth
                              InputProps={{ inputProps: { min: 0 } }}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Controller
                          name="maxSelections"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Maximum Selections"
                              type="number"
                              fullWidth
                              InputProps={{ inputProps: { min: 1 } }}
                            />
                          )}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
              </Paper>
            </Grid>

            {/* Modifier Options */}
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight={500}>
                    Modifier Options
                  </Typography>
                  <Button
                    startIcon={<AddIcon />}
                    onClick={handleAddOption}
                  >
                    Add Option
                  </Button>
                </Box>

                <Controller
                  name="options"
                  control={control}
                  render={({ field }) => (
                    <Grid container spacing={3}>
                      {field.value.map((option, index) => (
                        <Grid item xs={12} key={index}>
                          <Card variant="outlined">
                            <CardContent>
                              <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                  <TextField
                                    fullWidth
                                    label="Option Name"
                                    value={option.name}
                                    onChange={(e) => {
                                      const newOptions = [...field.value];
                                      newOptions[index] = {
                                        ...newOptions[index],
                                        name: e.target.value,
                                      };
                                      field.onChange(newOptions);
                                    }}
                                    required
                                  />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                  <TextField
                                    fullWidth
                                    label="Description"
                                    value={option.description}
                                    onChange={(e) => {
                                      const newOptions = [...field.value];
                                      newOptions[index] = {
                                        ...newOptions[index],
                                        description: e.target.value,
                                      };
                                      field.onChange(newOptions);
                                    }}
                                  />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                  <TextField
                                    fullWidth
                                    label="Price Adjustment"
                                    type="number"
                                    value={option.priceAdjustment}
                                    onChange={(e) => {
                                      const newOptions = [...field.value];
                                      newOptions[index] = {
                                        ...newOptions[index],
                                        priceAdjustment: parseFloat(e.target.value) || 0,
                                      };
                                      field.onChange(newOptions);
                                    }}
                                    InputProps={{
                                      startAdornment: '$',
                                    }}
                                  />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                  <TextField
                                    fullWidth
                                    label="Weight Adjustment"
                                    type="number"
                                    value={option.weightAdjustment}
                                    onChange={(e) => {
                                      const newOptions = [...field.value];
                                      newOptions[index] = {
                                        ...newOptions[index],
                                        weightAdjustment: parseFloat(e.target.value) || 0,
                                      };
                                      field.onChange(newOptions);
                                    }}
                                    InputProps={{
                                      endAdornment: 'kg',
                                    }}
                                  />
                                </Grid>

                                <Grid item xs={12}>
                                  <FileUpload
                                    label="Option Image"
                                    accept="image/*"
                                    maxSize={2 * 1024 * 1024}
                                    value={null}
                                    onChange={(file) => file}
                                    icon={<AddIcon />}
                                    currentImage={optionImages[index] || option.image}
                                  />
                                </Grid>

                                <Grid item xs={12}>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <FormControlLabel
                                      control={
                                        <Switch
                                          checked={option.isAvailable}
                                          onChange={(e) => {
                                            const newOptions = [...field.value];
                                            newOptions[index] = {
                                              ...newOptions[index],
                                              isAvailable: e.target.checked,
                                            };
                                            field.onChange(newOptions);
                                          }}
                                        />
                                      }
                                      label="Option is available"
                                    />
                                    {field.value.length > 1 && (
                                      <IconButton
                                        color="error"
                                        onClick={() => handleRemoveOption(index)}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    )}
                                  </Box>
                                </Grid>
                              </Grid>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                />
              </Paper>
            </Grid>

            {/* Status */}
            <Grid item xs={12}>
              <Controller
                name="isActive"
                control={control}
                render={({ field: { value, ...field } }) => (
                  <FormControlLabel
                    control={<Switch checked={value} {...field} />}
                    label="Modifier group is active"
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
          form="modifier-form"
          variant="contained"
        >
          {initialData ? 'Save Changes' : 'Add Modifier Group'}
        </Button>
      </DialogActions>
    </>
  );
}