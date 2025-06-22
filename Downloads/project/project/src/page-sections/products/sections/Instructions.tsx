'use client';

import { useState } from 'react';
import { 
  Grid, 
  TextField, 
  FormControlLabel, 
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Typography,
  FormHelperText,
  Box,
} from '@mui/material';
import { UseFormReturn, Controller } from 'react-hook-form';
import type { CreateProductInput } from '@/lib/validations/product';

interface InstructionsProps {
  form: UseFormReturn<CreateProductInput>;
}

// Care instruction options
const careInstructions = [
  'Machine Wash',
  'Hand Wash Only',
  'Dry Clean Only',
  'Spot Clean Only',
  'Do Not Wash',
  'Wipe Clean with Damp Cloth',
];

// Warranty duration options
const warrantyDurations = [
  { value: '1_year', label: '1 Year' },
  { value: '2_years', label: '2 Years' },
  { value: 'lifetime', label: 'Lifetime' },
];

// Return duration options
const returnDurations = [
  { value: '7_days', label: '7 Days' },
  { value: '14_days', label: '14 Days' },
  { value: '30_days', label: '30 Days' },
];

// Size chart options
const sizeCharts = [
  { value: 'us', label: 'US Sizes' },
  { value: 'eu', label: 'EU Sizes' },
  { value: 'uk', label: 'UK Sizes' },
];

// Product condition options
const conditions = [
  { value: 'new', label: 'New' },
  { value: 'used', label: 'Used' },
  { value: 'refurbished', label: 'Refurbished' },
];

export function Instructions({ form }: InstructionsProps) {
  const { control, formState: { errors } } = form;
  const [isEssential, setIsEssential] = useState(false);
  const [isFragile, setIsFragile] = useState(false);

  return (
    <Grid container spacing={3}>
      {/* Care Instructions Section */}
      <Grid item xs={12}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight={500}>
            Instructions
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isEssential}
                    onChange={(e) => setIsEssential(e.target.checked)}
                  />
                }
                label="Essential Item"
              />
              <FormHelperText>
                Does this product come under daily essential items?
              </FormHelperText>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isFragile}
                    onChange={(e) => setIsFragile(e.target.checked)}
                  />
                }
                label="Fragile Item"
              />
              <FormHelperText>
                Can this item be easily damaged like glass?
              </FormHelperText>
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="careInstructions"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.careInstructions}>
                    <InputLabel>Care Instructions</InputLabel>
                    <Select {...field} label="Care Instructions">
                      {careInstructions.map((instruction) => (
                        <MenuItem key={instruction} value={instruction}>
                          {instruction}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.careInstructions && (
                      <FormHelperText>{errors.careInstructions.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Warranty & Returns Section */}
      <Grid item xs={12}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight={500}>
            Warranty & Returns
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="warrantyPolicy"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Warranty Policy"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.warrantyPolicy}
                    helperText={errors.warrantyPolicy?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="warrantyDuration"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.warrantyDuration}>
                    <InputLabel>Warranty Duration</InputLabel>
                    <Select {...field} label="Warranty Duration">
                      {warrantyDurations.map((duration) => (
                        <MenuItem key={duration.value} value={duration.value}>
                          {duration.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.warrantyDuration && (
                      <FormHelperText>{errors.warrantyDuration.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="returnPolicy"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Exchange and Return Policy"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.returnPolicy}
                    helperText={errors.returnPolicy?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="returnDuration"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.returnDuration}>
                    <InputLabel>Exchange and Return Duration</InputLabel>
                    <Select {...field} label="Exchange and Return Duration">
                      {returnDurations.map((duration) => (
                        <MenuItem key={duration.value} value={duration.value}>
                          {duration.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.returnDuration && (
                      <FormHelperText>{errors.returnDuration.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Additional Information Section */}
      <Grid item xs={12}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight={500}>
            Additional Information
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="sizeChart"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.sizeChart}>
                    <InputLabel>Size Chart</InputLabel>
                    <Select {...field} label="Size Chart">
                      {sizeCharts.map((chart) => (
                        <MenuItem key={chart.value} value={chart.value}>
                          {chart.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.sizeChart && (
                      <FormHelperText>{errors.sizeChart.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="condition"
                control={control}
                defaultValue="new"
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.condition}>
                    <InputLabel>Product Condition</InputLabel>
                    <Select {...field} label="Product Condition">
                      {conditions.map((condition) => (
                        <MenuItem key={condition.value} value={condition.value}>
                          {condition.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.condition && (
                      <FormHelperText>{errors.condition.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="customMessage"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Custom Message"
                    fullWidth
                    multiline
                    rows={4}
                    error={!!errors.customMessage}
                    helperText={errors.customMessage?.message || "Add custom information to be displayed on the product page"}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}