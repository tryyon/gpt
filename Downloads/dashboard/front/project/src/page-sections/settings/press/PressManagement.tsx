'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  Button,
  Dialog,
  Alert,
  Snackbar,
  Tabs,
  Tab,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { PressForm } from './PressForm';
import { PressList } from './PressList';
import { BannerSection } from './BannerSection';
import { BrandAssetForm } from './BrandAssetForm';
import { BrandAssetList } from './BrandAssetList';
import { DefaultCard } from '@/global-components/common/DefaultCard';
import type { PressRelease, Banner, BrandAsset } from '@/types/content';

// Mock data
const mockPressReleases: PressRelease[] = [
  {
    id: '1',
    title: 'Company Announces Record Growth in Q1 2024',
    content: `We are pleased to announce record-breaking growth in the first quarter of 2024. Our platform has seen a 200% increase in merchant adoption and processed over $1 billion in transactions.

Key highlights:
- 200% growth in merchant adoption
- $1 billion in processed transactions
- Expansion into 5 new markets
- Launch of innovative AI-powered features

This success reflects our commitment to providing cutting-edge e-commerce solutions and exceptional service to our customers.`,
    publishDate: new Date('2024-03-15'),
    isActive: true,
    image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '2',
    title: 'New AI-Powered Features Launch',
    content: `Today marks the launch of our revolutionary AI-powered features designed to transform the e-commerce experience. These new capabilities will help merchants increase sales and improve customer satisfaction.

Key features:
- Smart product recommendations
- Automated inventory management
- Predictive analytics
- Customer behavior insights

These innovations represent our ongoing commitment to leveraging cutting-edge technology to benefit our merchants.`,
    publishDate: new Date('2024-03-10'),
    isActive: true,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000',
  },
];

const mockBanner: Banner = {
  title: 'Press & Media',
  subtitle: 'Latest news and announcements from our company',
  image: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80&w=1000',
  isActive: true,
  displayOrder: 1,
};

const mockBrandAssets: BrandAsset[] = [
  {
    id: '1',
    name: 'Primary Logo',
    type: 'logo',
    category: 'primary',
    format: 'png',
    url: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80&w=300',
    description: 'Official company logo for light backgrounds',
    isActive: true,
    dateAdded: new Date('2024-03-15'),
    dimensions: {
      width: 1200,
      height: 600,
    },
    fileSize: 256000,
    tags: ['light', 'official', 'horizontal'],
    version: '1.0',
  },
  {
    id: '2',
    name: 'Dark Logo',
    type: 'logo',
    category: 'monochrome',
    format: 'png',
    url: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80&w=300',
    description: 'Official company logo for dark backgrounds',
    isActive: true,
    dateAdded: new Date('2024-03-15'),
    dimensions: {
      width: 1200,
      height: 600,
    },
    fileSize: 245000,
    tags: ['dark', 'official', 'horizontal'],
    version: '1.0',
  },
  {
    id: '3',
    name: 'Brand Guidelines',
    type: 'style_guide',
    category: 'primary',
    format: 'pdf',
    url: 'https://example.com/brand-guidelines.pdf',
    description: 'Official brand guidelines and usage instructions',
    isActive: true,
    dateAdded: new Date('2024-03-15'),
    fileSize: 2450000,
    tags: ['guidelines', 'official'],
    version: '2.1',
  },
  {
    id: '4',
    name: 'Media Kit',
    type: 'media_kit',
    category: 'press',
    format: 'zip',
    url: 'https://example.com/media-kit.zip',
    description: 'Complete media kit including logos, photos, and brand assets',
    isActive: true,
    dateAdded: new Date('2024-03-15'),
    fileSize: 25000000,
    tags: ['press', 'complete'],
    version: '2024-Q1',
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`press-tabpanel-${index}`}
      aria-labelledby={`press-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export function PressManagement() {
  const [currentTab, setCurrentTab] = useState(0);
  const [pressReleases, setPressReleases] = useState<PressRelease[]>(mockPressReleases);
  const [brandAssets, setBrandAssets] = useState<BrandAsset[]>(mockBrandAssets);
  const [banner, setBanner] = useState<Banner>(mockBanner);
  const [selectedRelease, setSelectedRelease] = useState<PressRelease | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<BrandAsset | null>(null);
  const [isReleaseFormOpen, setIsReleaseFormOpen] = useState(false);
  const [isAssetFormOpen, setIsAssetFormOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleSaveRelease = (data: PressRelease) => {
    try {
      if (selectedRelease?.id) {
        setPressReleases(prev => prev.map(release => 
          release.id === selectedRelease.id ? { ...data, id: release.id } : release
        ));
      } else {
        const newRelease = {
          ...data,
          id: String(Date.now()),
        };
        setPressReleases(prev => [...prev, newRelease]);
      }

      setSnackbar({
        open: true,
        message: `Press release ${selectedRelease ? 'updated' : 'added'} successfully`,
        severity: 'success',
      });
      setIsReleaseFormOpen(false);
      setSelectedRelease(null);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error saving press release',
        severity: 'error',
      });
    }
  };

  const handleSaveAsset = (data: BrandAsset) => {
    try {
      if (selectedAsset?.id) {
        setBrandAssets(prev => prev.map(asset => 
          asset.id === selectedAsset.id ? { ...data, id: asset.id } : asset
        ));
      } else {
        const newAsset = {
          ...data,
          id: String(Date.now()),
        };
        setBrandAssets(prev => [...prev, newAsset]);
      }

      setSnackbar({
        open: true,
        message: `Brand asset ${selectedAsset ? 'updated' : 'added'} successfully`,
        severity: 'success',
      });
      setIsAssetFormOpen(false);
      setSelectedAsset(null);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error saving brand asset',
        severity: 'error',
      });
    }
  };

  const handleSaveBanner = (data: Banner) => {
    try {
      setBanner(data);
      setSnackbar({
        open: true,
        message: 'Banner updated successfully',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error updating banner',
        severity: 'error',
      });
    }
  };

  const handleDeleteRelease = (releaseId: string) => {
    setPressReleases(prev => prev.filter(release => release.id !== releaseId));
    setSnackbar({
      open: true,
      message: 'Press release deleted successfully',
      severity: 'success',
    });
  };

  const handleDeleteAsset = (assetId: string) => {
    setBrandAssets(prev => prev.filter(asset => asset.id !== assetId));
    setSnackbar({
      open: true,
      message: 'Brand asset deleted successfully',
      severity: 'success',
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <BannerSection
          banner={banner}
          onSave={handleSaveBanner}
        />
      </Grid>

      <Grid item xs={12}>
        <DefaultCard>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={currentTab} onChange={handleTabChange}>
              <Tab label="Press Releases" />
              <Tab label="Brand Assets" />
            </Tabs>
          </Box>

          <TabPanel value={currentTab} index={0}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setIsReleaseFormOpen(true)}
              >
                Add Press Release
              </Button>
            </Box>

            <PressList
              pressReleases={pressReleases}
              onEdit={(release) => {
                setSelectedRelease(release);
                setIsReleaseFormOpen(true);
              }}
              onDelete={handleDeleteRelease}
            />
          </TabPanel>

          <TabPanel value={currentTab} index={1}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setIsAssetFormOpen(true)}
              >
                Add Brand Asset
              </Button>
            </Box>

            <BrandAssetList
              assets={brandAssets}
              onEdit={(asset) => {
                setSelectedAsset(asset);
                setIsAssetFormOpen(true);
              }}
              onDelete={handleDeleteAsset}
            />
          </TabPanel>
        </DefaultCard>
      </Grid>

      <Dialog
        open={isReleaseFormOpen}
        onClose={() => {
          setIsReleaseFormOpen(false);
          setSelectedRelease(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <PressForm
          onSubmit={handleSaveRelease}
          initialData={selectedRelease}
          onCancel={() => {
            setIsReleaseFormOpen(false);
            setSelectedRelease(null);
          }}
        />
      </Dialog>

      <Dialog
        open={isAssetFormOpen}
        onClose={() => {
          setIsAssetFormOpen(false);
          setSelectedAsset(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <BrandAssetForm
          onSubmit={handleSaveAsset}
          initialData={selectedAsset}
          onCancel={() => {
            setIsAssetFormOpen(false);
            setSelectedAsset(null);
          }}
        />
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}