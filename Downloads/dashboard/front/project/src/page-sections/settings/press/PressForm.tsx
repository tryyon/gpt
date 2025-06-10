'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControlLabel,
  Switch,
  Typography,
  Paper,
} from '@mui/material';
import { pressReleaseSchema, type PressRelease } from '@/lib/validations/content';
import ReactMarkdown from 'react-markdown';

interface PressFormProps {
  onSubmit: (data: PressRelease) => void;
  initialData?: PressRelease | null;
  onCancel: () => void;
}

export function PressForm({ onSubmit, initialData, onCancel }: PressFormProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PressRelease>({
    resolver: zodResolver(pressReleaseSchema),
    defaultValues: initialData || {
      title: '',
      content: '',
      publishDate: new Date(),
      isActive: true,
    },
  });

  const content = watch('content');

  return (
    <>
      <DialogTitle>
        {initialData ? 'Edit Press Release' : 'Add Press Release'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" id="press-form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 2 }}>
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
                name="image"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Featured Image URL"
                    fullWidth
                    error={!!errors.image}
                    helperText={errors.image?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="publishDate"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <TextField
                    {...field}
                    type="date"
                    label="Publish Date"
                    fullWidth
                    value={value instanceof Date ? value.toISOString().split('T')[0] : value}
                    onChange={e => onChange(new Date(e.target.value))}
                    error={!!errors.publishDate}
                    helperText={errors.publishDate?.message}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Content (Markdown supported)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="content"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        multiline
                        rows={15}
                        error={!!errors.content}
                        helperText={errors.content?.message}
                        placeholder="Write your press release content here..."
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper 
                    variant="outlined" 
                    sx={{ 
                      p: 2, 
                      height: '100%', 
                      overflow: 'auto',
                      '& img': {
                        maxWidth: '100%',
                        height: 'auto',
                      },
                    }}
                  >
                    <Typography variant="subtitle2" gutterBottom>
                      Preview
                    </Typography>
                    <Box sx={{
                      '& h1': { fontSize: '1.5rem', fontWeight: 600, mb: 2 },
                      '& h2': { fontSize: '1.25rem', fontWeight: 600, mb: 2 },
                      '& h3': { fontSize: '1.1rem', fontWeight: 600, mb: 1 },
                      '& p': { mb: 2 },
                      '& ul, & ol': { pl: 3, mb: 2 },
                      '& li': { mb: 1 },
                    }}>
                      <ReactMarkdown>
                        {content}
                      </ReactMarkdown>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="isActive"
                control={control}
                render={({ field: { value, ...field } }) => (
                  <FormControlLabel
                    control={<Switch checked={value} {...field} />}
                    label="Press release is active"
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
          form="press-form"
          variant="contained"
        >
          {initialData ? 'Save Changes' : 'Add Press Release'}
        </Button>
      </DialogActions>
    </>
  );
}