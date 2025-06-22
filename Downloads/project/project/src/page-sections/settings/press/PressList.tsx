'use client';

import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Chip,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import type { PressRelease } from '@/types/content';

interface PressListProps {
  pressReleases: PressRelease[];
  onEdit: (release: PressRelease) => void;
  onDelete: (releaseId: string) => void;
}

export function PressList({ pressReleases, onEdit, onDelete }: PressListProps) {
  const [selectedRelease, setSelectedRelease] = useState<PressRelease | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleViewDetails = (release: PressRelease) => {
    setSelectedRelease(release);
    setDetailsOpen(true);
  };

  return (
    <>
      <Grid container spacing={3}>
        {pressReleases.map((release) => (
          <Grid item xs={12} key={release.id}>
            <Card variant="outlined">
              <Grid container>
                {release.image && (
                  <Grid item xs={12} md={3}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={release.image}
                      alt={release.title}
                      sx={{ objectFit: 'cover' }}
                    />
                  </Grid>
                )}
                <Grid item xs={12} md={release.image ? 9 : 12}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {release.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Published on {new Date(release.publishDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Box>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => handleViewDetails(release)}
                            color="primary"
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() => onEdit(release)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            onClick={() => onDelete(release.id!)}
                            color="error"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>

                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {release.content}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                      <Chip
                        label={release.isActive ? 'Published' : 'Draft'}
                        color={release.isActive ? 'success' : 'default'}
                        size="small"
                      />
                      {release.attachments && release.attachments.length > 0 && (
                        <Chip
                          label={`${release.attachments.length} attachments`}
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedRelease?.title}
        </DialogTitle>
        <DialogContent dividers>
          {selectedRelease && (
            <Box>
              {selectedRelease.image && (
                <Box
                  component="img"
                  src={selectedRelease.image}
                  alt={selectedRelease.title}
                  sx={{
                    width: '100%',
                    height: 300,
                    objectFit: 'cover',
                    borderRadius: 1,
                    mb: 3,
                  }}
                />
              )}

              <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                Published on {new Date(selectedRelease.publishDate).toLocaleDateString()}
              </Typography>

              <Box sx={{
                mt: 2,
                '& h1': { fontSize: '1.5rem', fontWeight: 600, mb: 2 },
                '& h2': { fontSize: '1.25rem', fontWeight: 600, mb: 2 },
                '& h3': { fontSize: '1.1rem', fontWeight: 600, mb: 1 },
                '& p': { mb: 2 },
                '& ul, & ol': { pl: 3, mb: 2 },
                '& li': { mb: 1 },
              }}>
                <ReactMarkdown>
                  {selectedRelease.content}
                </ReactMarkdown>
              </Box>

              {selectedRelease.attachments && selectedRelease.attachments.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Attachments
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {selectedRelease.attachments.map((attachment, index) => (
                      <Chip
                        key={index}
                        label={`Attachment ${index + 1}`}
                        component="a"
                        href={attachment}
                        clickable
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)}>
            Close
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setDetailsOpen(false);
              if (selectedRelease) {
                onEdit(selectedRelease);
              }
            }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}