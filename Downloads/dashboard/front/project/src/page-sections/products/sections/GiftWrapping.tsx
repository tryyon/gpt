'use client';

import { useState } from 'react';
import {
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  FormHelperText,
  Paper,
} from '@mui/material';
import { UseFormReturn, Controller } from 'react-hook-form';
import type { CreateProductInput } from '@/lib/validations/product';

interface GiftWrappingProps {
  form: UseFormReturn<CreateProductInput>;
}

// Mock data for gift wrapping options
const giftWrappingOptions = [
  {
    id: 1,
    name: "Classic Red & Gold",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=400",
    description: "Elegant red paper with gold ribbon accent"
  },
  {
    id: 2,
    name: "Festive Gift Wrap",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=400",
    description: "Colorful wrapping paper with holiday patterns"
  },
  {
    id: 3,
    name: "Luxury Gift Bag",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400",
    description: "Premium paper bag with handles and tissue paper"
  },
  {
    id: 4,
    name: "Eco-Friendly Wrap",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&q=80&w=400",
    description: "Sustainable wrapping made from recycled materials"
  }
];

export function GiftWrapping({ form }: GiftWrappingProps) {
  const { control, formState: { errors } } = form;
  const [selectedOption, setSelectedOption] = useState<string>('none');

  const handleWrappingChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <Box>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="subtitle1" gutterBottom fontWeight={500}>
          Gift Wrapping
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Choose wrapping preference
        </Typography>

        <Controller
          name="giftWrapping"
          control={control}
          defaultValue="none"
          render={({ field }) => (
            <FormControl component="fieldset" error={!!errors.giftWrapping} fullWidth>
              <RadioGroup
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleWrappingChange(e.target.value);
                }}
              >
                <FormControlLabel
                  value="none"
                  control={<Radio />}
                  label="Don't wrap this item"
                />
                <FormControlLabel
                  value="all"
                  control={<Radio />}
                  label="Use all available gift wrapping options"
                />
                <FormControlLabel
                  value="specific"
                  control={<Radio />}
                  label="Select specific wrapping options"
                />
              </RadioGroup>

              {errors.giftWrapping && (
                <FormHelperText>{errors.giftWrapping.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        {selectedOption === 'specific' && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Select wrapping options
            </Typography>
            <Grid container spacing={3}>
              {giftWrappingOptions.map((option) => (
                <Grid item xs={12} sm={6} key={option.id}>
                  <Card variant="outlined">
                    <CardMedia
                      component="img"
                      height="140"
                      image={option.image}
                      alt={option.name}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="subtitle2" component="div">
                          {option.name}
                        </Typography>
                        <Chip
                          label={`$${option.price.toFixed(2)}`}
                          color="primary"
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {option.description}
                      </Typography>
                      <Controller
                        name={`wrappingOptions.${option.id}`}
                        control={control}
                        defaultValue={false}
                        render={({ field: { value, ...field } }) => (
                          <FormControlLabel
                            control={
                              <Radio
                                {...field}
                                checked={value}
                                onChange={(e) => field.onChange(e.target.checked)}
                              />
                            }
                            label="Select this option"
                            sx={{ mt: 1 }}
                          />
                        )}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Paper>
    </Box>
  );
}