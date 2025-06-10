'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Radio,
  FormControlLabel,
  RadioGroup,
  IconButton,
  Divider,
  Chip,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface AttributeOption {
  id: string;
  label: string;
}

interface AttributeGroup {
  name: string;
  options: AttributeOption[];
}

interface AttributesDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (attributes: { group: string; value: string }[]) => void;
  initialAttributes?: { group: string; value: string }[];
}

// Updated mock data for attribute groups
const attributeGroups: AttributeGroup[] = [
  {
    name: 'Material',
    options: [
      { id: 'cotton', label: 'Cotton' },
      { id: 'polyester', label: 'Polyester' },
      { id: 'silk', label: 'Silk' },
      { id: 'wool', label: 'Wool' },
      { id: 'linen', label: 'Linen' },
      { id: 'denim', label: 'Denim' },
    ],
  },
  {
    name: 'Occasion',
    options: [
      { id: 'casual', label: 'Casual' },
      { id: 'formal', label: 'Formal' },
      { id: 'party', label: 'Party' },
      { id: 'wedding', label: 'Wedding' },
      { id: 'sports', label: 'Sports' },
    ],
  },
  {
    name: 'Pattern',
    options: [
      { id: 'solid', label: 'Solid' },
      { id: 'striped', label: 'Striped' },
      { id: 'printed', label: 'Printed' },
      { id: 'checked', label: 'Checked' },
      { id: 'floral', label: 'Floral' },
    ],
  },
  {
    name: 'Fit',
    options: [
      { id: 'regular', label: 'Regular' },
      { id: 'slim', label: 'Slim' },
      { id: 'loose', label: 'Loose' },
      { id: 'tailored', label: 'Tailored' },
      { id: 'oversized', label: 'Oversized' },
    ],
  },
  {
    name: 'Neckline',
    options: [
      { id: 'round', label: 'Round' },
      { id: 'v-neck', label: 'V-neck' },
      { id: 'collar', label: 'Collar' },
      { id: 'crew', label: 'Crew' },
      { id: 'turtleneck', label: 'Turtleneck' },
    ],
  },
  {
    name: 'Sleeve',
    options: [
      { id: 'full', label: 'Full' },
      { id: 'half', label: 'Half' },
      { id: 'short', label: 'Short' },
      { id: 'sleeveless', label: 'Sleeveless' },
      { id: '3/4th', label: '3/4th' },
    ],
  },
  {
    name: 'Style',
    options: [
      { id: 'classic', label: 'Classic' },
      { id: 'modern', label: 'Modern' },
      { id: 'vintage', label: 'Vintage' },
      { id: 'bohemian', label: 'Bohemian' },
      { id: 'minimalist', label: 'Minimalist' },
    ],
  },
];

export function AttributesDialog({ open, onClose, onSave, initialAttributes = [] }: AttributesDialogProps) {
  const [selectedAttributes, setSelectedAttributes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialAttributes.length > 0) {
      const attributeMap = initialAttributes.reduce((acc, { group, value }) => {
        acc[group] = value;
        return acc;
      }, {} as { [key: string]: string });
      setSelectedAttributes(attributeMap);
    }
  }, [initialAttributes]);

  const handleAttributeChange = (group: string, value: string) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [group]: value,
    }));
  };

  const handleRemoveAttribute = (group: string) => {
    setSelectedAttributes(prev => {
      const newState = { ...prev };
      delete newState[group];
      return newState;
    });
  };

  const handleSave = () => {
    const attributes = Object.entries(selectedAttributes).map(([group, value]) => ({
      group,
      value,
    }));
    onSave(attributes);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Product Attributes</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {/* Selected Attributes Section */}
        {Object.keys(selectedAttributes).length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Selected Attributes
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {Object.entries(selectedAttributes).map(([group, value]) => (
                <Chip
                  key={group}
                  label={`${group}: ${value}`}
                  onDelete={() => handleRemoveAttribute(group)}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
            <Divider sx={{ my: 2 }} />
          </Box>
        )}

        {/* Attribute Groups */}
        {attributeGroups.map((group, index) => (
          <Box key={group.name} sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              {group.name}
            </Typography>
            <RadioGroup
              value={selectedAttributes[group.name] || ''}
              onChange={(e) => handleAttributeChange(group.name, e.target.value)}
              sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1 }}
            >
              {group.options.map((option) => (
                <FormControlLabel
                  key={option.id}
                  value={option.label}
                  control={<Radio size="small" />}
                  label={option.label}
                  sx={{
                    border: '1px solid',
                    borderColor: selectedAttributes[group.name] === option.label ? 'primary.main' : 'divider',
                    borderRadius: 1,
                    m: 0,
                    px: 1,
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                />
              ))}
            </RadioGroup>
            {index < attributeGroups.length - 1 && <Divider sx={{ mt: 3 }} />}
          </Box>
        ))}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSave} 
          variant="contained"
          disabled={Object.keys(selectedAttributes).length === 0}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}