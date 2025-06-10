'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Paper,
  Tooltip,
  Collapse,
  IconButton,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Search as SearchIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

// Updated color families with exact names and hex codes
const colorFamilies = {
  Maroon: [
    { name: 'Deep Maroon', hex: '#4B0101', id: 'maroon-deep' },
    { name: 'Dark Maroon', hex: '#670101', id: 'maroon-dark' },
    { name: 'Maroon', hex: '#800000', id: 'maroon' },
    { name: 'Light Maroon', hex: '#A63F3F', id: 'maroon-light' },
  ],
  Red: [
    { name: 'Deep Red', hex: '#A7001C', id: 'red-deep' },
    { name: 'Dark Red', hex: '#C90011', id: 'red-dark' },
    { name: 'Red', hex: '#F30000', id: 'red' },
    { name: 'Light Red', hex: '#FF6657', id: 'red-light' },
  ],
  Orange: [
    { name: 'Deep Orange', hex: '#B63802', id: 'orange-deep' },
    { name: 'Dark Orange', hex: '#E14604', id: 'orange-dark' },
    { name: 'Orange', hex: '#FC782D', id: 'orange' },
    { name: 'Light Orange', hex: '#FF9C64', id: 'orange-light' },
  ],
  Peach: [
    { name: 'Deep Peach', hex: '#CC6C5E', id: 'peach-deep' },
    { name: 'Dark Peach', hex: '#ED8879', id: 'peach-dark' },
    { name: 'Peach', hex: '#EFA59A', id: 'peach' },
    { name: 'Light Peach', hex: '#FBD4CE', id: 'peach-light' },
  ],
  Black: [
    { name: 'Black', hex: '#000000', id: 'black' },
  ],
  Grey: [
    { name: 'Deep Grey', hex: '#3D3E3D', id: 'grey-deep' },
    { name: 'Dark Grey', hex: '#555656', id: 'grey-dark' },
    { name: 'Grey', hex: '#777777', id: 'grey' },
    { name: 'Light Grey', hex: '#DFE0E0', id: 'grey-light' },
  ],
  Silver: [
    { name: 'Deep Silver', hex: '#868686', id: 'silver-deep' },
    { name: 'Dark Silver', hex: '#ACACAC', id: 'silver-dark' },
    { name: 'Silver', hex: '#C0C0C0', id: 'silver' },
    { name: 'Light Silver', hex: '#DEDDDD', id: 'silver-light' },
  ],
  Brown: [
    { name: 'Deep Brown', hex: '#290D08', id: 'brown-deep' },
    { name: 'Dark Brown', hex: '#462504', id: 'brown-dark' },
    { name: 'Brown', hex: '#633E19', id: 'brown' },
    { name: 'Light Brown', hex: '#997B62', id: 'brown-light' },
  ],
  Khakhi: [
    { name: 'Deep Khakhi', hex: '#7C7256', id: 'khakhi-deep' },
    { name: 'Dark Khakhi', hex: '#A18F5E', id: 'khakhi-dark' },
    { name: 'Khakhi', hex: '#C1AF7D', id: 'khakhi' },
    { name: 'Light Khakhi', hex: '#E0D1A6', id: 'khakhi-light' },
  ],
  Beige: [
    { name: 'Deep Beige', hex: '#B09B7D', id: 'beige-deep' },
    { name: 'Dark Beige', hex: '#D2B994', id: 'beige-dark' },
    { name: 'Beige', hex: '#D1C0A8', id: 'beige' },
    { name: 'Light Beige', hex: '#E8DED1', id: 'beige-light' },
  ],
  Green: [
    { name: 'Deep Green', hex: '#004317', id: 'green-deep' },
    { name: 'Dark Green', hex: '#066716', id: 'green-dark' },
    { name: 'Green', hex: '#009800', id: 'green' },
    { name: 'Light Green', hex: '#6DD363', id: 'green-light' },
  ],
  Cream: [
    { name: 'Dark Cream', hex: '#E7CC97', id: 'cream-dark' },
    { name: 'Cream', hex: '#FCF1DD', id: 'cream' },
  ],
  White: [
    { name: 'White', hex: '#FFFFFF', id: 'white' },
    { name: 'Off White', hex: '#FEFBEA', id: 'white-off' },
  ],
  'Parrot Green': [
    { name: 'Deep Parrot Green', hex: '#2B8800', id: 'parrot-deep' },
    { name: 'Dark Parrot Green', hex: '#46AC16', id: 'parrot-dark' },
    { name: 'Parrot Green', hex: '#6ED240', id: 'parrot' },
    { name: 'Light Parrot Green', hex: '#9CFF6D', id: 'parrot-light' },
  ],
  'Pistachio Green': [
    { name: 'Deep Pistachio Green', hex: '#639852', id: 'pistachio-deep' },
    { name: 'Dark Pistachio Green', hex: '#8FB483', id: 'pistachio-dark' },
    { name: 'Pistachio Green', hex: '#AEDB9F', id: 'pistachio' },
    { name: 'Light Pistachio Green', hex: '#DDF8D4', id: 'pistachio-light' },
  ],
  'Mehendi Green': [
    { name: 'Deep Mehendi Green', hex: '#585C0F', id: 'mehendi-deep' },
    { name: 'Dark Mehendi Green', hex: '#767C16', id: 'mehendi-dark' },
    { name: 'Mehendi Green', hex: '#959A31', id: 'mehendi' },
    { name: 'Light Mehendi Green', hex: '#BFC278', id: 'mehendi-light' },
  ],
  'Navy Blue': [
    { name: 'Deep Navy Blue', hex: '#000B30', id: 'navy-deep' },
    { name: 'Navy Blue', hex: '#01005F', id: 'navy' },
    { name: 'Light Navy Blue', hex: '#243E70', id: 'navy-light' },
  ],
  'Royal Blue': [
    { name: 'Deep Royal Blue', hex: '#01005F', id: 'royal-deep' },
    { name: 'Dark Royal Blue', hex: '#01018E', id: 'royal-dark' },
    { name: 'Royal Blue', hex: '#0403CF', id: 'royal' },
    { name: 'Light Royal Blue', hex: '#3F58E0', id: 'royal-light' },
  ],
  'Turquoise (Firozi)': [
    { name: 'Deep Turquoise', hex: '#0184B0', id: 'turquoise-deep' },
    { name: 'Dark Turquoise', hex: '#03A3D9', id: 'turquoise-dark' },
    { name: 'Turquoise', hex: '#00BFFF', id: 'turquoise' },
    { name: 'Light Turquoise', hex: '#66D8FF', id: 'turquoise-light' },
  ],
  'Sky Blue': [
    { name: 'Deep Sky Blue', hex: '#2E97D2', id: 'sky-deep' },
    { name: 'Dark Sky Blue', hex: '#57AAD9', id: 'sky-dark' },
    { name: 'Sky Blue', hex: '#87C7EB', id: 'sky' },
    { name: 'Light Sky Blue', hex: '#CEEBFB', id: 'sky-light' },
  ],
  Teal: [
    { name: 'Deep Teal', hex: '#005757', id: 'teal-deep' },
    { name: 'Dark Teal', hex: '#087777', id: 'teal-dark' },
    { name: 'Teal', hex: '#07A5A5', id: 'teal' },
    { name: 'Light Teal', hex: '#50D7D7', id: 'teal-light' },
  ],
  Purple: [
    { name: 'Deep Purple', hex: '#441F68', id: 'purple-deep' },
    { name: 'Dark Purple', hex: '#4C1881', id: 'purple-dark' },
    { name: 'Purple', hex: '#663399', id: 'purple' },
    { name: 'Light Purple', hex: '#8856B9', id: 'purple-light' },
  ],
  Lilac: [
    { name: 'Deep Lilac', hex: '#8B72D2', id: 'lilac-deep' },
    { name: 'Dark Lilac', hex: '#B3A2E4', id: 'lilac-dark' },
    { name: 'Lilac', hex: '#DCD0FF', id: 'lilac' },
    { name: 'Light Lilac', hex: '#F1ECFF', id: 'lilac-light' },
  ],
  Gajri: [
    { name: 'Deep Gajri', hex: '#FF0056', id: 'gajri-deep' },
    { name: 'Dark Gajri', hex: '#FF568F', id: 'gajri-dark' },
    { name: 'Gajri', hex: '#FF8CB3', id: 'gajri' },
    { name: 'Light Gajri', hex: '#FEC9DB', id: 'gajri-light' },
  ],
  Magenta: [
    { name: 'Deep Magenta', hex: '#7B0179', id: 'magenta-deep' },
    { name: 'Dark Magenta', hex: '#A303A0', id: 'magenta-dark' },
    { name: 'Magenta', hex: '#D630D3', id: 'magenta' },
    { name: 'Light Magenta', hex: '#F07EEE', id: 'magenta-light' },
  ],
  'Hot Pink': [
    { name: 'Deep Hot Pink', hex: '#A0007D', id: 'hot-pink-deep' },
    { name: 'Dark Hot Pink', hex: '#CE01A1', id: 'hot-pink-dark' },
    { name: 'Hot Pink', hex: '#FC0CC7', id: 'hot-pink' },
    { name: 'Light Hot Pink', hex: '#FF7AE2', id: 'hot-pink-light' },
  ],
  Pink: [
    { name: 'Deep Pink', hex: '#E14BBA', id: 'pink-deep' },
    { name: 'Dark Pink', hex: '#F678D5', id: 'pink-dark' },
    { name: 'Pink', hex: '#FFB7EC', id: 'pink' },
    { name: 'Light Pink', hex: '#FFDEF6', id: 'pink-light' },
  ],
  Yellow: [
    { name: 'Deep Yellow', hex: '#C79700', id: 'yellow-deep' },
    { name: 'Dark Yellow', hex: '#E5B302', id: 'yellow-dark' },
    { name: 'Yellow', hex: '#FDCF2E', id: 'yellow' },
    { name: 'Light Yellow', hex: '#FFEF99', id: 'yellow-light' },
  ],
  Lemon: [
    { name: 'Deep Lemon', hex: '#CFC200', id: 'lemon-deep' },
    { name: 'Dark Lemon', hex: '#E3D500', id: 'lemon-dark' },
    { name: 'Lemon', hex: '#FFEF00', id: 'lemon' },
    { name: 'Light Lemon', hex: '#FFFAA8', id: 'lemon-light' },
  ],
  Gold: [
    { name: 'Deep Antique Gold', hex: '#867448', id: 'antique-gold-deep' },
    { name: 'Antique Gold', hex: '#9B8245', id: 'antique-gold' },
    { name: 'Gold', hex: '#D4AF37', id: 'gold' },
    { name: 'Light Gold', hex: '#EFD687', id: 'gold-light' },
  ],
} as const;

interface ColorSelectorProps {
  onColorSelect: (color: { name: string; hex: string }) => void;
  selectedColor?: { name: string; hex: string } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ColorSelector({ onColorSelect, selectedColor, isOpen, onClose }: ColorSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFamily, setExpandedFamily] = useState<string | false>(false);
  
  const filteredColors = useMemo(() => {
    const term = searchTerm.toLowerCase();
    const results: { family: string; shades: typeof colorFamilies[keyof typeof colorFamilies] }[] = [];
    
    Object.entries(colorFamilies).forEach(([family, shades]) => {
      const matchingShades = shades.filter(shade => 
        shade.name.toLowerCase().includes(term) ||
        shade.hex.toLowerCase().includes(term) ||
        family.toLowerCase().includes(term)
      );
      
      if (matchingShades.length > 0) {
        results.push({ family, shades: matchingShades });
      }
    });
    
    return results;
  }, [searchTerm]);

  return (
    <Collapse in={isOpen}>
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 3,
          mt: 2,
          maxHeight: '70vh',
          overflow: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">
            Color Selection
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <TextField
          fullWidth
          placeholder="Search colors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        {selectedColor && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Selected Color
            </Typography>
            <Chip
              label={selectedColor.name}
              onDelete={() => onColorSelect({ name: '', hex: '' })}
              sx={{
                bgcolor: selectedColor.hex,
                color: isLightColor(selectedColor.hex) ? 'black' : 'white',
                '& .MuiChip-deleteIcon': {
                  color: isLightColor(selectedColor.hex) ? 'black' : 'white',
                },
              }}
            />
          </Box>
        )}

        {filteredColors.map(({ family, shades }) => (
          <Accordion
            key={family}
            expanded={expandedFamily === family}
            onChange={() => setExpandedFamily(expandedFamily === family ? false : family)}
            sx={{ mb: 1 }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">{family}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {shades.map((shade) => (
                  <Box key={shade.id} sx={{ textAlign: 'center' }}>
                    <Tooltip title={`${shade.name} - ${shade.hex}`} arrow>
                      <Box
                        onClick={() => onColorSelect(shade)}
                        sx={{
                          width: 60,
                          height: 60,
                          bgcolor: shade.hex,
                          borderRadius: 1,
                          cursor: 'pointer',
                          border: '2px solid',
                          borderColor: selectedColor?.hex === shade.hex ? 'primary.main' : 'divider',
                          transition: 'all 0.2s',
                          '&:hover': {
                            transform: 'scale(1.1)',
                            boxShadow: 2,
                          },
                          position: 'relative',
                        }}
                      />
                    </Tooltip>
                    <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>
                      {shade.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}

        {filteredColors.length === 0 && (
          <Typography color="text.secondary" align="center">
            No colors found matching "{searchTerm}"
          </Typography>
        )}
      </Paper>
    </Collapse>
  );
}

// Helper function to determine if a color is light
function isLightColor(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
}