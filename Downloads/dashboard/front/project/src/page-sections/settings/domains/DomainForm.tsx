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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  Alert,
} from '@mui/material';
import { z } from 'zod';

const domainSchema = z.object({
  domain: z.string()
    .min(1, 'Domain is required')
    .regex(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](\.[a-zA-Z]{2,})+$/, 'Invalid domain format'),
  type: z.enum(['primary', 'subdomain']),
});

type DomainFormData = z.infer<typeof domainSchema>;

interface DomainFormProps {
  onSubmit: (data: DomainFormData) => void;
  initialData?: DomainFormData | null;
  onCancel: () => void;
}

export function DomainForm({ onSubmit, initialData, onCancel }: DomainFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DomainFormData>({
    resolver: zodResolver(domainSchema),
    defaultValues: initialData || {
      domain: '',
      type: 'primary',
    },
  });

  return (
    <>
      <DialogTitle>
        {initialData ? 'Edit Domain' : 'Add Domain'}
      </DialogTitle>
      <DialogContent dividers>
        <Box component="form" id="domain-form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mb: 3 }}>
                Make sure to update your DNS records after adding a domain. We'll provide the necessary DNS configuration details.
              </Alert>
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="domain"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Domain Name"
                    fullWidth
                    error={!!errors.domain}
                    helperText={errors.domain?.message || 'Enter your domain name (e.g., example.com)'}
                    required
                    placeholder="yourdomain.com"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.type}>
                    <InputLabel>Domain Type</InputLabel>
                    <Select {...field} label="Domain Type">
                      <MenuItem value="primary">Primary Domain</MenuItem>
                      <MenuItem value="subdomain">Subdomain</MenuItem>
                    </Select>
                    <FormHelperText>
                      {errors.type?.message || 'Select whether this is your primary domain or a subdomain'}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                After adding your domain, you'll need to:
              </Typography>
              <Box component="ul" sx={{ pl: 2, mt: 1, color: 'text.secondary' }}>
                <li>Configure your DNS settings at your domain registrar</li>
                <li>Add the required DNS records we'll provide</li>
                <li>Wait for DNS propagation (can take up to 48 hours)</li>
              </Box>
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
          form="domain-form"
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Save Changes' : 'Add Domain'}
        </Button>
      </DialogActions>
    </>
  );
}