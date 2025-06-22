'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Typography,
  Chip,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bannerSchema, type Banner } from '@/lib/validations/content';

interface BannerSectionProps {
  banner: Banner;
  onSave: (data: Banner) => void;
}

export function BannerSection({ banner, onSave }: BannerSectionProps) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Banner>({
    resolver: zodResolver(bannerSchema),
    defaultValues: banner,
  });

  const handleSave = (data: Banner) => {
    onSave(data);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">
            Banner Settings
          </Typography>
          <Button
            variant="contained"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit Banner'}
          </Button>
        </Box>

        {isEditing ? (
          <Box component="form" onSubmit={handleSubmit(handleSave)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
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

              <Grid item xs={12}>
                <Controller
                  name="subtitle"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Subtitle"
                      fullWidth
                      error={!!errors.subtitle}
                      helperText={errors.subtitle?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Image URL"
                      fullWidth
                      error={!!errors.image}
                      helperText={errors.image?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="link"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Link URL (Optional)"
                      fullWidth
                      error={!!errors.link}
                      helperText={errors.link?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="isActive"
                  control={control}
                  render={({ field: { value, ...field } }) => (
                    <FormControlLabel
                      control={<Switch checked={value} {...field} />}
                      label="Banner is active"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                  >
                    Save Changes
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box
                component="img"
                src={banner.image}
                alt={banner.title}
                sx={{
                  width: '100%',
                  height: 200,
                  objectFit: 'cover',
                  borderRadius: 1,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {banner.title}
              </Typography>
              {banner.subtitle && (
                <Typography variant="body2" color="text.secondary">
                  {banner.subtitle}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip
                  label={banner.isActive ? 'Active' : 'Inactive'}
                  color={banner.isActive ? 'success' : 'default'}
                  size="small"
                />
                {banner.link && (
                  <Chip
                    label="Has Link"
                    color="primary"
                    size="small"
                    variant="outlined"
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}