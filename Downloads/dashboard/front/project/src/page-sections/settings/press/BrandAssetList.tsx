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
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Preview as PreviewIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import type { BrandAsset } from '@/lib/validations/content';

interface BrandAssetListProps {
  assets: BrandAsset[];
  onEdit: (asset: BrandAsset) => void;
  onDelete: (assetId: string) => void;
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export function BrandAssetList({ assets, onEdit, onDelete }: BrandAssetListProps) {
  const [selectedAsset, setSelectedAsset] = useState<BrandAsset | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleViewDetails = (asset: BrandAsset) => {
    setSelectedAsset(asset);
    setDetailsOpen(true);
  };

  const handlePreview = (asset: BrandAsset, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedAsset(asset);
    setPreviewOpen(true);
  };

  const isPreviewable = (format: string) => {
    return ['png', 'jpg', 'svg'].includes(format);
  };

  const groupedAssets = assets.reduce((acc, asset) => {
    if (!acc[asset.type]) {
      acc[asset.type] = [];
    }
    acc[asset.type].push(asset);
    return acc;
  }, {} as Record<string, BrandAsset[]>);

  return (
    <>
      {Object.entries(groupedAssets).map(([type, typeAssets]) => (
        <Box key={type} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, textTransform: 'capitalize' }}>
            {type.replace('_', ' ')}
          </Typography>
          <Grid container spacing={3}>
            {typeAssets.map((asset) => (
              <Grid item xs={12} sm={6} md={4} key={asset.id}>
                <Card variant="outlined">
                  {isPreviewable(asset.format) && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={asset.url}
                      alt={asset.name}
                      sx={{ objectFit: 'contain', bgcolor: 'background.default', p: 2 }}
                      onClick={() => handleViewDetails(asset)}
                    />
                  )}
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box>
                        <Typography variant="subtitle1" gutterBottom>
                          {asset.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Version {asset.version}
                        </Typography>
                      </Box>
                      <Box>
                        {isPreviewable(asset.format) && (
                          <Tooltip title="Preview">
                            <IconButton
                              size="small"
                              onClick={(e) => handlePreview(asset, e)}
                            >
                              <PreviewIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title="Download">
                          <IconButton
                            size="small"
                            component={Link}
                            href={asset.url}
                            download
                            target="_blank"
                          >
                            <DownloadIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() => onEdit(asset)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            onClick={() => onDelete(asset.id!)}
                            color="error"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                      <Chip
                        label={asset.category}
                        color="primary"
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        label={asset.format.toUpperCase()}
                        size="small"
                        variant="outlined"
                      />
                      {asset.fileSize && (
                        <Chip
                          label={formatFileSize(asset.fileSize)}
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Box>

                    {asset.tags && asset.tags.length > 0 && (
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {asset.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.75rem' }}
                          />
                        ))}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      {/* Details Dialog */}
      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Asset Details
        </DialogTitle>
        <DialogContent dividers>
          {selectedAsset && (
            <Grid container spacing={3}>
              {isPreviewable(selectedAsset.format) && (
                <Grid item xs={12}>
                  <Box
                    component="img"
                    src={selectedAsset.url}
                    alt={selectedAsset.name}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: 400,
                      objectFit: 'contain',
                      bgcolor: 'background.default',
                      borderRadius: 1,
                    }}
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ width: '30%' }}>
                          Name
                        </TableCell>
                        <TableCell>{selectedAsset.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Type
                        </TableCell>
                        <TableCell sx={{ textTransform: 'capitalize' }}>
                          {selectedAsset.type.replace('_', ' ')}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Category
                        </TableCell>
                        <TableCell sx={{ textTransform: 'capitalize' }}>
                          {selectedAsset.category}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Format
                        </TableCell>
                        <TableCell>{selectedAsset.format.toUpperCase()}</TableCell>
                      </TableRow>
                      {selectedAsset.dimensions && (
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Dimensions
                          </TableCell>
                          <TableCell>
                            {selectedAsset.dimensions.width} × {selectedAsset.dimensions.height} px
                          </TableCell>
                        </TableRow>
                      )}
                      {selectedAsset.fileSize && (
                        <TableRow>
                          <TableCell component="th" scope="row">
                            File Size
                          </TableCell>
                          <TableCell>{formatFileSize(selectedAsset.fileSize)}</TableCell>
                        </TableRow>
                      )}
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Version
                        </TableCell>
                        <TableCell>{selectedAsset.version}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          Date Added
                        </TableCell>
                        <TableCell>
                          {new Date(selectedAsset.dateAdded).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                      {selectedAsset.description && (
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Description
                          </TableCell>
                          <TableCell>{selectedAsset.description}</TableCell>
                        </TableRow>
                      )}
                      {selectedAsset.tags && selectedAsset.tags.length > 0 && (
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Tags
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                              {selectedAsset.tags.map((tag) => (
                                <Chip
                                  key={tag}
                                  label={tag}
                                  size="small"
                                  variant="outlined"
                                />
                              ))}
                            </Box>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)}>
            Close
          </Button>
          {selectedAsset && (
            <>
              <Button
                component={Link}
                href={selectedAsset.url}
                download
                target="_blank"
                startIcon={<DownloadIcon />}
              >
                Download
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setDetailsOpen(false);
                  onEdit(selectedAsset);
                }}
              >
                Edit
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        {selectedAsset && isPreviewable(selectedAsset.format) && (
          <>
            <DialogContent sx={{ p: 0 }}>
              <Box
                component="img"
                src={selectedAsset.url}
                alt={selectedAsset.name}
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setPreviewOpen(false)}>
                Close
              </Button>
              <Button
                component={Link}
                href={selectedAsset.url}
                download
                target="_blank"
                startIcon={<DownloadIcon />}
              >
                Download
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}