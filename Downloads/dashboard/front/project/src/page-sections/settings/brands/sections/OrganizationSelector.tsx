'use client';

import { Box, Chip, Autocomplete, TextField, Paper, IconButton, Tooltip } from '@mui/material';
import { HelpOutline as HelpIcon } from '@mui/icons-material';
import { Control, Controller } from 'react-hook-form';
import type { BrandFormData } from '@/lib/validations/brand';
import { SectionTitle } from '@/global-components/common/SectionTitle';

interface Organization {
  id: string;
  name: string;
}

// Mock organizations - Replace with actual data
const mockOrganizations: Organization[] = [
  { id: 'org1', name: 'Organization 1' },
  { id: 'org2', name: 'Organization 2' },
  { id: 'org3', name: 'Organization 3' },
];

interface OrganizationSelectorProps {
  control: Control<BrandFormData>;
  errors: any;
}

export function OrganizationSelector({ control, errors }: OrganizationSelectorProps) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <SectionTitle title="Organizations" />
        <Tooltip title="You can add this brand to multiple organizations to manage it across different business entities">
          <IconButton size="small" sx={{ mb: 0.5 }}>
            <HelpIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Controller
        name="organizations"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            multiple
            options={mockOrganizations}
            getOptionLabel={(option) => 
              typeof option === 'string' 
                ? option 
                : option.name
            }
            value={mockOrganizations.filter(org => 
              value?.includes(org.id)
            )}
            onChange={(_, newValue) => {
              onChange(newValue.map(v => v.id));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Organizations"
                error={!!errors.organizations}
                helperText={errors.organizations?.message}
                placeholder="Choose one or more organizations"
              />
            )}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  label={option.name}
                  {...getTagProps({ index })}
                  key={option.id}
                />
              ))
            }
          />
        )}
      />
    </Paper>
  );
}