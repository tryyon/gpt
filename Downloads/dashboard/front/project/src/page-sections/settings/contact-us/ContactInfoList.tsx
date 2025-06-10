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
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Public as PublicIcon,
} from '@mui/icons-material';
import type { ContactInfo } from '@/types/content';

interface ContactInfoListProps {
  contactInfo: ContactInfo[];
  onEdit: (info: ContactInfo) => void;
  onDelete: (infoId: string) => void;
}

const getIcon = (type: string) => {
  switch (type) {
    case 'email':
      return <EmailIcon />;
    case 'phone':
      return <PhoneIcon />;
    case 'address':
      return <LocationIcon />;
    case 'social':
      return <PublicIcon />;
    default:
      return null;
  }
};

export function ContactInfoList({ contactInfo, onEdit, onDelete }: ContactInfoListProps) {
  return (
    <Grid container spacing={3}>
      {contactInfo.map((info) => (
        <Grid item xs={12} md={6} key={info.id}>
          <Card variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {getIcon(info.type)}
                  <Typography variant="h6">
                    {info.label}
                  </Typography>
                </Box>
                <Box>
                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      onClick={() => onEdit(info)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      onClick={() => onDelete(info.id!)}
                      color="error"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              <Typography variant="body1" sx={{ mb: 2 }}>
                {info.value}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip
                  label={info.type}
                  color="primary"
                  size="small"
                  variant="outlined"
                />
                <Chip
                  label={info.isActive ? 'Active' : 'Inactive'}
                  color={info.isActive ? 'success' : 'default'}
                  size="small"
                />
                <Chip
                  label={`Order: ${info.displayOrder}`}
                  size="small"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}