'use client';

import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Chip,
  Card,
  CardContent,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  Circle as CircleIcon,
  Work as WorkIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import type { Career } from '@/types/content';

interface CareerListProps {
  careers: Career[];
  onEdit: (career: Career) => void;
  onDelete: (careerId: string) => void;
}

const getJobTypeColor = (type: string) => {
  switch (type) {
    case 'full-time':
      return 'primary';
    case 'part-time':
      return 'secondary';
    case 'contract':
      return 'warning';
    case 'internship':
      return 'info';
    default:
      return 'default';
  }
};

export function CareerList({ careers, onEdit, onDelete }: CareerListProps) {
  const groupedCareers = careers.reduce((acc, career) => {
    if (!acc[career.department]) {
      acc[career.department] = [];
    }
    acc[career.department].push(career);
    return acc;
  }, {} as Record<string, Career[]>);

  return (
    <Box>
      {Object.entries(groupedCareers).map(([department, departmentCareers]) => (
        <Card key={department} variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Typography variant="h6">
                {department}
              </Typography>
              <Chip
                label={`${departmentCareers.length} openings`}
                color="primary"
                size="small"
                variant="outlined"
              />
            </Box>

            {departmentCareers.map((career) => (
              <Accordion key={career.id} variant="outlined">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1">
                        {career.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <WorkIcon fontSize="small" color="action" />
                          <Typography variant="caption" color="text.secondary">
                            {career.department}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <LocationIcon fontSize="small" color="action" />
                          <Typography variant="caption" color="text.secondary">
                            {career.location}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <TimeIcon fontSize="small" color="action" />
                          <Typography variant="caption" color="text.secondary">
                            Posted {new Date(career.postedDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Chip
                        label={career.type.replace('-', ' ')}
                        color={getJobTypeColor(career.type)}
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      />
                      <Chip
                        label={career.isActive ? 'Active' : 'Inactive'}
                        color={career.isActive ? 'success' : 'default'}
                        size="small"
                      />
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(career);
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(career.id!);
                          }}
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" paragraph>
                    {career.description}
                  </Typography>

                  <Typography variant="subtitle2" gutterBottom>
                    Requirements
                  </Typography>
                  <List dense>
                    {career.requirements.map((requirement, index) => (
                      <ListItem key={index}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <CircleIcon sx={{ fontSize: 8 }} />
                        </ListItemIcon>
                        <ListItemText primary={requirement} />
                      </ListItem>
                    ))}
                  </List>

                  <Typography variant="subtitle2" gutterBottom>
                    Responsibilities
                  </Typography>
                  <List dense>
                    {career.responsibilities.map((responsibility, index) => (
                      <ListItem key={index}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <CircleIcon sx={{ fontSize: 8 }} />
                        </ListItemIcon>
                        <ListItemText primary={responsibility} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}