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
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Paper,
  Divider,
  Alert,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { UseFormReturn } from 'react-hook-form';
import type { CreateProductInput } from '@/lib/validations/product';

interface ModifierOptionsProps {
  form: UseFormReturn<CreateProductInput>;
}

// Modifier option types
const modifierTypes = [
  { value: 'single', label: 'Single Choice (Radio)' },
  { value: 'multiple', label: 'Multiple Choice (Checkbox)' },
  { value: 'text', label: 'Text Input' },
  { value: 'dropdown', label: 'Dropdown Select' },
];

// Initial modifier option template
const initialModifierOption = {
  name: '',
  description: '',
  priceAdjustment: '',
  isDefault: false,
};

export function ModifierOptions({ form }: ModifierOptionsProps) {
  const [modifiers, setModifiers] = useState<any[]>([]);
  const [isModifierFormOpen, setIsModifierFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentModifier, setCurrentModifier] = useState<any>(null);
  const [modifierOptions, setModifierOptions] = useState<any[]>([initialModifierOption]);

  // Open the form to create a new modifier
  const handleAddModifier = () => {
    setIsEditMode(false);
    setCurrentModifier({
      name: '',
      description: '',
      type: 'single',
      required: false,
      options: [{ ...initialModifierOption }],
    });
    setModifierOptions([{ ...initialModifierOption }]);
    setIsModifierFormOpen(true);
  };

  // Open the form to edit an existing modifier
  const handleEditModifier = (modifier: any) => {
    setIsEditMode(true);
    setCurrentModifier(modifier);
    // Convert numeric price adjustments to string for editing
    const optionsWithStringPrices = modifier.options.map((option: any) => ({
      ...option,
      priceAdjustment: option.priceAdjustment.toString()
    }));
    setModifierOptions(optionsWithStringPrices || [{ ...initialModifierOption }]);
    setIsModifierFormOpen(true);
  };

  // Delete a modifier
  const handleDeleteModifier = (modifierId: string) => {
    setModifiers(prev => prev.filter(m => m.id !== modifierId));
  };

  // Add a new option to the current modifier
  const handleAddOption = () => {
    setModifierOptions(prev => [...prev, { ...initialModifierOption }]);
  };

  // Remove an option from the current modifier
  const handleRemoveOption = (index: number) => {
    setModifierOptions(prev => prev.filter((_, i) => i !== index));
  };

  // Update an option's field
  const handleOptionChange = (index: number, field: string, value: any) => {
    setModifierOptions(prev => 
      prev.map((option, i) => 
        i === index ? { ...option, [field]: value } : option
      )
    );
  };

  // Update a field in the current modifier
  const handleModifierChange = (field: string, value: any) => {
    setCurrentModifier(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Save the current modifier
  const handleSaveModifier = () => {
    // Convert string price adjustments to numbers for storage
    const optionsWithNumericPrices = modifierOptions.map(option => ({
      ...option,
      priceAdjustment: option.priceAdjustment === '' ? 0 : parseFloat(option.priceAdjustment)
    }));
    
    if (isEditMode) {
      // Update existing modifier
      setModifiers(prev => 
        prev.map(modifier => 
          modifier.id === currentModifier.id 
            ? { ...currentModifier, options: optionsWithNumericPrices } 
            : modifier
        )
      );
    } else {
      // Add new modifier
      const newModifier = {
        ...currentModifier,
        id: `mod-${Date.now()}`,
        options: optionsWithNumericPrices,
      };
      setModifiers(prev => [...prev, newModifier]);
    }
    setIsModifierFormOpen(false);
  };

  return (
    <Box>
      {/* Modifier Options Section */}
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">
            Modifier Options
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddModifier}
          >
            + ADD MODIFIER
          </Button>
        </Box>

        {modifiers.length === 0 ? (
          <Alert severity="info" sx={{ mb: 2 }}>
            No modifier options added yet. Click the "ADD MODIFIER" button to create custom options for your product.
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {modifiers.map((modifier) => (
              <Grid item xs={12} md={6} key={modifier.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {modifier.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {modifier.description}
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton
                          size="small"
                          onClick={() => handleEditModifier(modifier)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteModifier(modifier.id)}
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Chip
                        label={modifier.type === 'single' ? 'Single Choice' : 
                               modifier.type === 'multiple' ? 'Multiple Choice' : 
                               modifier.type === 'text' ? 'Text Input' : 'Dropdown'}
                        color="primary"
                        size="small"
                      />
                      <Chip
                        label={modifier.required ? 'Required' : 'Optional'}
                        color={modifier.required ? 'error' : 'default'}
                        size="small"
                      />
                      <Chip
                        label={`${modifier.options.length} options`}
                        variant="outlined"
                        size="small"
                      />
                    </Box>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {modifier.options.map((option: any, index: number) => (
                        <Chip
                          key={index}
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <span>{option.name}</span>
                              {option.priceAdjustment > 0 && (
                                <Typography variant="caption" color="primary">
                                  +${option.priceAdjustment.toFixed(2)}
                                </Typography>
                              )}
                            </Box>
                          }
                          variant="outlined"
                          size="small"
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      {/* Modifier Form Dialog */}
      <Dialog
        open={isModifierFormOpen}
        onClose={() => setIsModifierFormOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {isEditMode ? 'Edit Modifier' : 'Add New Modifier'}
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Modifier Name"
                  fullWidth
                  value={currentModifier?.name || ''}
                  onChange={(e) => handleModifierChange('name', e.target.value)}
                  required
                  placeholder="e.g., Size, Color, Material"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={2}
                  value={currentModifier?.description || ''}
                  onChange={(e) => handleModifierChange('description', e.target.value)}
                  placeholder="Describe this modifier option"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Selection Type</InputLabel>
                  <Select
                    value={currentModifier?.type || 'single'}
                    onChange={(e) => handleModifierChange('type', e.target.value)}
                    label="Selection Type"
                  >
                    {modifierTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={currentModifier?.required || false}
                      onChange={(e) => handleModifierChange('required', e.target.checked)}
                    />
                  }
                  label="Required"
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1">
                    Modifier Options
                  </Typography>
                  <Button
                    startIcon={<AddIcon />}
                    onClick={handleAddOption}
                    variant="outlined"
                    size="small"
                  >
                    Add Option
                  </Button>
                </Box>

                {modifierOptions.map((option, index) => (
                  <Paper key={index} variant="outlined" sx={{ p: 2, mb: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Option Name"
                          value={option.name}
                          onChange={(e) => handleOptionChange(index, 'name', e.target.value)}
                          required
                          placeholder="e.g., Small, Medium, Large"
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Price Adjustment"
                          type="number"
                          value={option.priceAdjustment}
                          onChange={(e) => handleOptionChange(index, 'priceAdjustment', e.target.value)}
                          InputProps={{
                            startAdornment: '$',
                          }}
                          placeholder="Additional cost for this option"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={option.isDefault || false}
                                onChange={(e) => handleOptionChange(index, 'isDefault', e.target.checked)}
                              />
                            }
                            label="Default Option"
                          />
                          {modifierOptions.length > 1 && (
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
                  </Paper>
                ))}
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModifierFormOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveModifier}
            disabled={!currentModifier?.name || modifierOptions.some(option => !option.name)}
          >
            {isEditMode ? 'Update Modifier' : 'Add Modifier'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}