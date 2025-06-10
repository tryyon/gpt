'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import {
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  IconButton,
  Typography,
  Paper,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { z } from 'zod';

const schema = z.object({
  benefits: z.array(z.object({
    title: z.string().min(1, 'Title is required'),
    points: z.array(z.string().min(1, 'Point is required')),
  })),
});

type FormData = z.infer<typeof schema>;

interface BenefitsFormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  initialData?: FormData | null;
}

export function BenefitsForm({ onSubmit, onCancel, initialData }: BenefitsFormProps) {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: initialData || {
      benefits: [
        {
          title: '',
          points: [''],
        },
      ],
    },
  });

  const { fields: benefitFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({
    control,
    name: 'benefits',
  });

  const { fields: pointFields, append: appendPoint, remove: removePoint } = useFieldArray({
    control,
    name: `benefits.0.points`,
  });

  return (
    <>
      <DialogTitle>
        {initialData ? 'Edit Benefits & Perks' : 'Add Benefits & Perks'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" id="benefits-form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 2 }}>
          {benefitFields.map((benefitField, benefitIndex) => (
            <Paper key={benefitField.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle1">Benefit Category {benefitIndex + 1}</Typography>
                {benefitFields.length > 1 && (
                  <IconButton onClick={() => removeBenefit(benefitIndex)} color="error">
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Category Title"
                    {...control.register(`benefits.${benefitIndex}.title`)}
                  />
                </Grid>

                {pointFields.map((pointField, pointIndex) => (
                  <Grid item xs={12} key={pointField.id}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <TextField
                        fullWidth
                        label={`Point ${pointIndex + 1}`}
                        {...control.register(`benefits.${benefitIndex}.points.${pointIndex}`)}
                      />
                      {pointFields.length > 1 && (
                        <IconButton onClick={() => removePoint(pointIndex)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Box>
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => appendPoint('')}
                    variant="outlined"
                    size="small"
                  >
                    Add Point
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          ))}

          <Button
            startIcon={<AddIcon />}
            onClick={() => appendBenefit({ title: '', points: [''] })}
            variant="outlined"
            fullWidth
          >
            Add Benefit Category
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="benefits-form"
          variant="contained"
        >
          {initialData ? 'Save Changes' : 'Add Benefits'}
        </Button>
      </DialogActions>
    </>
  );
}