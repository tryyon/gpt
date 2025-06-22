'use client';

import { useForm, useFieldArray, Control, UseFormSetValue } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
  const { control, register, handleSubmit, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      benefits: [],
    },
  });

  const { fields: benefitFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({
    control,
    name: 'benefits',
  });

  return (
    <>
      <DialogTitle>
        {initialData ? 'Edit Benefits & Perks' : 'Add Benefits & Perks'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" id="benefits-form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 2 }}>
          {benefitFields.map((benefitField, benefitIndex) => {
            const benefit = benefitFields[benefitIndex];

            return (
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
                      {...register(`benefits.${benefitIndex}.title`)}
                    />
                  </Grid>

                  {benefit.points.map((point, pointIndex) => (
                    <Grid item xs={12} key={pointIndex}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                          fullWidth
                          label={`Point ${pointIndex + 1}`}
                          {...register(`benefits.${benefitIndex}.points.${pointIndex}`)}
                        />
                        {benefit.points.length > 1 && (
                          <IconButton onClick={() => {
                             const newPoints = [...benefit.points];
                             newPoints.splice(pointIndex, 1);
                             setValue(`benefits.${benefitIndex}.points`, newPoints);
                           }} color="error">
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </Box>
                    </Grid>
                  ))} <Grid item xs={12}>
                     <Button
                       variant="outlined"
                       startIcon={<AddIcon />}
                       onClick={() => {
                         const newPoints = [...benefit.points, ''];
                         setValue(`benefits.${benefitIndex}.points`, newPoints);
                       }}
                     >
                       Add Point
                     </Button>
                   </Grid>
                  <Grid item xs={12}>
                    <Button
                      startIcon={<AddIcon />}
                      onClick={() => {
                        const newPoints = [...benefit.points, ''];
                        setValue(`benefits.${benefitIndex}.points`, newPoints);
                      }}
                      variant="outlined"
                      size="small"
                    >
                      Add Point
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            );
          })}
            <Grid container justifyContent="center">
            <Grid item xs={12} sm={8}>
              <Button
              startIcon={<AddIcon />}
              onClick={() => appendBenefit({ title: '', points: [''] })}
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              >
              Add Benefit Category
              </Button>
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
          form="benefits-form"
          variant="contained"
        >
          {initialData ? 'Save Changes' : 'Add Benefits'}
        </Button>
      </DialogActions>
    </>
  );
}