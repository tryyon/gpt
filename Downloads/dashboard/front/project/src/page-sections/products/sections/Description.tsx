'use client';

import { useState } from 'react';
import { 
  Grid, 
  TextField, 
  FormControlLabel, 
  Switch, 
  Box, 
  Typography,
  Collapse,
  Paper
} from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import type { CreateProductInput } from '@/lib/validations/product';

interface DescriptionProps {
  form: UseFormReturn<CreateProductInput>;
}

export function Description({ form }: DescriptionProps) {
  const { register, formState: { errors } } = form;
  const [showSeoMeta, setShowSeoMeta] = useState(false);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          {...register('description')}
          label="Product Description"
          multiline
          rows={6}
          fullWidth
          error={!!errors.description}
          helperText={errors.description?.message}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          {...register('shortDescription')}
          label="Short Description"
          multiline
          rows={3}
          fullWidth
          helperText="Brief description for product listings"
        />
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ mt: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={showSeoMeta}
                onChange={(e) => setShowSeoMeta(e.target.checked)}
              />
            }
            label="Show SEO Meta Information"
          />
        </Box>

        <Collapse in={showSeoMeta}>
          <Paper variant="outlined" sx={{ p: 3, mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom color="text.secondary">
              SEO Meta Information
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  {...register('metaTitle')}
                  label="Meta Title"
                  fullWidth
                  helperText="Optimal length: 50-60 characters"
                  inputProps={{ maxLength: 60 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  {...register('metaDescription')}
                  label="Meta Description"
                  multiline
                  rows={3}
                  fullWidth
                  helperText="Optimal length: 150-160 characters"
                  inputProps={{ maxLength: 160 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  {...register('metaKeywords')}
                  label="Meta Keywords"
                  fullWidth
                  helperText="Comma-separated keywords (e.g., shoes, running, sports)"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  {...register('canonicalUrl')}
                  label="Canonical URL"
                  fullWidth
                  helperText="Optional: Use this if you want to specify a canonical URL"
                />
              </Grid>
            </Grid>
          </Paper>
        </Collapse>
      </Grid>
    </Grid>
  );
}