'use client';

import {
  Box,
  IconButton,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Circle as CircleIcon,
} from '@mui/icons-material';

interface Benefit {
  title: string;
  points: string[];
}

interface BenefitsListProps {
  benefits: Benefit[];
  onEdit: () => void;
  onDelete: () => void;
}

export function BenefitsList({ benefits, onEdit, onDelete }: BenefitsListProps) {
  return (
    <Grid container spacing={3}>
      {benefits.map((benefit, index) => (
        <Grid item xs={12} md={6} key={index}>
          <Card variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">
                  {benefit.title}
                </Typography>
                <Box>
                  <IconButton
                    size="small"
                    onClick={onEdit}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={onDelete}
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              <List dense>
                {benefit.points.map((point, pointIndex) => (
                  <ListItem key={pointIndex}>
                    <ListItemIcon sx={{ minWidth: 24 }}>
                      <CircleIcon sx={{ fontSize: 8 }} />
                    </ListItemIcon>
                    <ListItemText primary={point} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}