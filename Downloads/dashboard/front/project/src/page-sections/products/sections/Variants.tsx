'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
  FormControlLabel,
  Switch,
  Checkbox,
  Alert,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Radio,
  RadioGroup,
  Chip,
  Tabs,
  Tab,
  FormHelperText,
} from '@mui/material';
import {
  Close as CloseIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Image as ImageIcon,
  Upload as UploadIcon,
  MenuBook as MenuBookIcon,
} from '@mui/icons-material';
import { UseFormReturn, Controller } from 'react-hook-form';
import type { CreateProductInput } from '@/lib/validations/product';
import { ColorSelector } from './ColorSelector';
import { ProductContentsDialog } from './ProductContentsDialog';
import { AttributesDialog } from './AttributesDialog';
import { FileUpload } from '@/global-components/common/FileUpload';

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
      id={`variant-tabpanel-${index}`}
      aria-labelledby={`variant-tab-${index}`}
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

// Age group options with age ranges
const ageGroupOptions = [
  { value: 'infant', label: 'Infant (0-12 months)' },
  { value: 'toddler', label: 'Toddler (1-3 years)' },
  { value: 'kids', label: 'Kids (4-12 years)' },
  { value: 'teen', label: 'Teen (13-17 years)' },
  { value: 'adult_18_34', label: 'Adult (18-34 years)' },
  { value: 'adult_35_44', label: 'Adult (35-44 years)' },
  { value: 'adult_45_60', label: 'Adult (45-60 years)' },
  { value: 'adult_60_plus', label: 'Adult (60+ years)' },
  { value: 'adult_any', label: 'Adult (Any age)' }
];

interface Variant {
  id: string;
  manufacturerPartNumber: string;
  gtin: string;
  warehouse: string;
  rackNumber: string;
  binNumber: string;
  productName: string;
  sku: string;
  barcode: string;
  ageGroup: string;
  size: string;
  mrp: string;
  sellingPrice: string;
  cost: string;
  maxOrderQuantityRetail: string;
  usePreconfiguredTax: boolean;
  preconfiguredTax: string;
  wholesalePrice: string;
  minOrderQuantityB2B: string;
  maxOrderQuantityB2B: string;
  commissionType: 'percentage' | 'fixed';
  commissionValue: string;
  resellerRate: string;
  color: {
    name: string;
    hex: string;
  };
  images: File[];
}

interface VariantsProps {
  form: UseFormReturn<CreateProductInput>;
}

export function Variants({ form }: VariantsProps) {
  const [currentTab, setCurrentTab] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
  const [imageUploadOpen, setImageUploadOpen] = useState(false);
  const [productContentsOpen, setProductContentsOpen] = useState(false);
  const [selectedContents, setSelectedContents] = useState<{
    name: string;
    dimensions: {
      length: string;
      width: string;
      height: string;
      weight: string;
    };
  }[]>([]);
  const [attributesOpen, setAttributesOpen] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState<any[]>([]);
  const [selectedAttributeChips, setSelectedAttributeChips] = useState<{ group: string; value: string }[]>([]);
  const [formData, setFormData] = useState<Variant>({
    id: '',
    manufacturerPartNumber: '',
    gtin: '',
    warehouse: '',
    rackNumber: '',
    binNumber: '',
    productName: '',
    sku: '',
    barcode: '',
    ageGroup: '',
    size: '',
    color: { name: '', hex: '' },
    mrp: '',
    sellingPrice: '',
    cost: '',
    maxOrderQuantityRetail: '',
    usePreconfiguredTax: false,
    preconfiguredTax: '10',
    wholesalePrice: '',
    minOrderQuantityB2B: '',
    maxOrderQuantityB2B: '',
    commissionType: 'percentage',
    commissionValue: '',
    resellerRate: '',
    images: [],
  });

  const [showColorSelector, setShowColorSelector] = useState(false);
  const [calculatedCommission, setCalculatedCommission] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Calculate commission whenever relevant fields change
  useEffect(() => {
    if (formData.commissionType === 'percentage' && formData.commissionValue && formData.sellingPrice) {
      const percentage = parseFloat(formData.commissionValue);
      const sellingPrice = parseFloat(formData.sellingPrice);
      if (!isNaN(percentage) && !isNaN(sellingPrice)) {
        const commission = (percentage / 100) * sellingPrice;
        setCalculatedCommission(commission.toFixed(2));
      } else {
        setCalculatedCommission('');
      }
    } else {
      setCalculatedCommission('');
    }
  }, [formData.commissionType, formData.commissionValue, formData.sellingPrice]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      if (value) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
      
      return newData;
    });
  };

  const handleSelectChange = (field: string) => (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      if (value) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
      
      return newData;
    });
  };

  const handleCheckboxChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.checked
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    // Validate required fields
    if (!formData.productName) {
      newErrors.productName = 'Product name is required';
    }
    
    if (!formData.sku) {
      newErrors.sku = 'SKU is required';
    }
    
    if (!formData.ageGroup) {
      newErrors.ageGroup = 'Age group is required';
    }
    
    if (!formData.size) {
      newErrors.size = 'Size is required';
    }
    
    if (!formData.color.name || !formData.color.hex) {
      newErrors.color = 'Color is required';
    }

    if (!formData.mrp) {
      newErrors.mrp = 'MRP is required';
    } else if (isNaN(parseFloat(formData.mrp)) || parseFloat(formData.mrp) <= 0) {
      newErrors.mrp = 'MRP must be a positive number';
    }

    if (!formData.sellingPrice) {
      newErrors.sellingPrice = 'Selling Price is required';
    } else if (isNaN(parseFloat(formData.sellingPrice)) || parseFloat(formData.sellingPrice) <= 0) {
      newErrors.sellingPrice = 'Selling Price must be a positive number';
    } else if (parseFloat(formData.sellingPrice) > parseFloat(formData.mrp)) {
      newErrors.sellingPrice = 'Selling Price cannot be greater than MRP';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddVariant = () => {
    if (!validateForm()) {
      setCurrentTab(1);
      return;
    }

    const newVariant: Variant = {
      id: Date.now().toString(),
      ...formData,
    };
    setVariants(prev => [...prev, newVariant]);
    
    // Update the form values with the first variant's data
    if (variants.length === 0) {
      form.setValue('name', formData.productName);
      form.setValue('sku', formData.sku);
      form.setValue('ageGroup', formData.ageGroup);
      form.setValue('size', formData.size);
      form.setValue('color', formData.color);
      form.setValue('mrp', parseFloat(formData.mrp));
      form.setValue('sellingPrice', parseFloat(formData.sellingPrice));
      form.setValue('stock', 0); // Default stock value
    }
    
    setFormData({
      id: '',
      manufacturerPartNumber: '',
      gtin: '',
      warehouse: '',
      rackNumber: '',
      binNumber: '',
      productName: '',
      sku: '',
      barcode: '',
      ageGroup: '',
      size: '',
      color: { name: '', hex: '' },
      mrp: '',
      sellingPrice: '',
      cost: '',
      maxOrderQuantityRetail: '',
      usePreconfiguredTax: false,
      preconfiguredTax: '10',
      wholesalePrice: '',
      minOrderQuantityB2B: '',
      maxOrderQuantityB2B: '',
      commissionType: 'percentage',
      commissionValue: '',
      resellerRate: '',
      images: [],
    });
    setIsFormOpen(false);
  };

  const handleAttributesSave = (attributes: { group: string; value: string }[]) => {
    setSelectedAttributes(attributes);
    setSelectedAttributeChips(attributes);
    setAttributesOpen(false);
  };

  const handleImageUpload = (files: File[]) => {
    if (selectedVariants.length === 0) {
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), ...files]
      }));
    } else {
      setVariants(prev => prev.map(variant => 
        selectedVariants.includes(variant.id)
          ? { ...variant, images: [...(variant.images || []), ...files] }
          : variant
      ));
    }
  };

  const handleRemoveImage = (variantId: string, index: number) => {
    setVariants(prev => prev.map(variant => 
      variant.id === variantId
        ? {
            ...variant,
            images: variant.images.filter((_, i) => i !== index)
          }
        : variant
    ));
  };

  // Helper function to get age group label from value
  const getAgeGroupLabel = (value: string) => {
    const option = ageGroupOptions.find(option => option.value === value);
    return option ? option.label : value;
  };

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          onClick={() => setIsFormOpen(true)}
          startIcon={<AddIcon />}
        >
          Add Variant
        </Button>
        <Button
          variant="outlined"
          onClick={() => setImageUploadOpen(true)}
          disabled={selectedVariants.length === 0}
        >
          Add Images to Selected
        </Button>
      </Box>

      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedVariants.length > 0 && selectedVariants.length < variants.length}
                  checked={variants.length > 0 && selectedVariants.length === variants.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedVariants(variants.map(v => v.id));
                    } else {
                      setSelectedVariants([]);
                    }
                  }}
                />
              </TableCell>
              <TableCell>Images</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Age Group</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {variants.map((variant) => (
              <TableRow key={variant.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedVariants.includes(variant.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedVariants(prev => [...prev, variant.id]);
                      } else {
                        setSelectedVariants(prev => prev.filter(id => id !== variant.id));
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {variant.images?.map((image, index) => (
                      <Box
                        key={index}
                        sx={{ 
                          position: 'relative',
                          '&:hover .delete-icon': {
                            opacity: 1,
                          },
                        }}
                      >
                        <Box
                          component="img"
                          src={URL.createObjectURL(image)}
                          alt={`Variant ${index + 1}`}
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 1,
                            objectFit: 'cover',
                          }}
                        />
                        <IconButton
                          size="small"
                          className="delete-icon"
                          onClick={() => handleRemoveImage(variant.id, index)}
                          sx={{
                            position: 'absolute',
                            top: -8,
                            right: -8,
                            opacity: 0,
                            transition: 'opacity 0.2s',
                            bgcolor: 'background.paper',
                            boxShadow: 1,
                            p: 0.5,
                            '&:hover': {
                              bgcolor: 'error.light',
                              color: 'white',
                            },
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                </TableCell>
                <TableCell>{variant.sku}</TableCell>
                <TableCell>{variant.productName}</TableCell>
                <TableCell>{variant.size}</TableCell>
                <TableCell>{getAgeGroupLabel(variant.ageGroup)}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {variant.color.hex && (
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: 0.5,
                          bgcolor: variant.color.hex,
                          border: '1px solid',
                          borderColor: 'divider',
                        }}
                      />
                    )}
                    {variant.color.name}
                  </Box>
                </TableCell>
                <TableCell>${variant.sellingPrice}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => {
                    const newVariants = variants.filter(v => v.id !== variant.id);
                    setVariants(newVariants);
                    setSelectedVariants(prev => prev.filter(id => id !== variant.id));
                  }}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={imageUploadOpen}
        onClose={() => setImageUploadOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Upload Images</DialogTitle>
        <Box sx={{ p: 3 }}>
          <FileUpload
            label="Upload Images"
            accept="image/*"
            maxSize={5 * 1024 * 1024}
            value={null}
            onChange={(files) => {
              if (files) {
                handleImageUpload(Array.isArray(files) ? files : [files]);
              }
            }}
            icon={<ImageIcon />}
            multiple
          />
        </Box>
      </Dialog>

      <Dialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Add Product Variant
        </DialogTitle>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}>
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab label="Basic Info" />
            <Tab label="Pricing" />
            <Tab label="Influencers Settings" />
            <Tab label="Reseller Settings" />
          </Tabs>
        </Box>

        <Box sx={{ p: 3 }}>
          <TabPanel value={currentTab} index={0}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Manufacturer Part Number"
                  value={formData.manufacturerPartNumber}
                  onChange={handleInputChange('manufacturerPartNumber')}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="GTIN"
                  value={formData.gtin}
                  onChange={handleInputChange('gtin')}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Warehouse</InputLabel>
                  <Select
                    value={formData.warehouse}
                    onChange={(e) => setFormData(prev => ({ ...prev, warehouse: e.target.value }))}
                    label="Warehouse"
                  >
                    <MenuItem value="warehouse1">Warehouse 1</MenuItem>
                    <MenuItem value="warehouse2">Warehouse 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Rack Number"
                  value={formData.rackNumber}
                  onChange={handleInputChange('rackNumber')}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="BIN Number"
                  value={formData.binNumber}
                  onChange={handleInputChange('binNumber')}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Product Name"
                  required
                  value={formData.productName}
                  onChange={handleInputChange('productName')}
                  error={!!errors.productName}
                  helperText={errors.productName}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="SKU"
                  required
                  value={formData.sku}
                  onChange={handleInputChange('sku')}
                  error={!!errors.sku}
                  helperText={errors.sku}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Barcode"
                  value={formData.barcode}
                  onChange={handleInputChange('barcode')}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!errors.ageGroup}>
                  <InputLabel>Age Group</InputLabel>
                  <Select
                    value={formData.ageGroup}
                    onChange={handleSelectChange('ageGroup')}
                    label="Age Group"
                    required
                  >
                    <MenuItem value="">Select Age Group</MenuItem>
                    {ageGroupOptions.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.ageGroup && <FormHelperText>{errors.ageGroup}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!errors.size}>
                  <InputLabel>Size</InputLabel>
                  <Select
                    value={formData.size}
                    onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                    label="Size"
                    required
                  >
                    <MenuItem value="">Select Size</MenuItem>
                    <MenuItem value="s">Small</MenuItem>
                    <MenuItem value="m">Medium</MenuItem>
                    <MenuItem value="l">Large</MenuItem>
                    <MenuItem value="xl">X-Large</MenuItem>
                  </Select>
                  {errors.size && <FormHelperText>{errors.size}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Color"
                    value={formData.color.name}
                    InputProps={{
                      readOnly: true,
                      startAdornment: formData.color.hex && (
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: 0.5,
                            bgcolor: formData.color.hex,
                            mr: 1,
                            border: '1px solid',
                            borderColor: 'divider',
                          }}
                        />
                      ),
                    }}
                    required
                    error={!!errors.color}
                    helperText={errors.color}
                  />
                  <Button
                    variant="outlined"
                    onClick={() => setShowColorSelector(!showColorSelector)}
                  >
                    {showColorSelector ? 'Close Colors' : 'Show Colors'}
                  </Button>
                </Box>
                
                <ColorSelector
                  isOpen={showColorSelector}
                  onClose={() => setShowColorSelector(false)}
                  selectedColor={formData.color.name ? formData.color : null}
                  onColorSelect={(color) => {
                    setFormData(prev => ({
                      ...prev,
                      color: { name: color.name, hex: color.hex }
                    }));
                    
                    if (color.name && color.hex) {
                      setErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.color;
                        return newErrors;
                      });
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setProductContentsOpen(true)}
                    sx={{ 
                      borderRadius: 1,
                      textTransform: 'none',
                      justifyContent: 'flex-start',
                      px: 2,
                      py: 1.5,
                      width: '100%',
                      bgcolor: 'background.paper',
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Typography variant="subtitle2" color="text.primary">
                        Product Contents
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {selectedContents.length > 0 
                          ? `${selectedContents.length} items added`
                          : 'No items added yet. Click "Manage Included Items" to add product contents.'}
                      </Typography>
                    </Box>
                  </Button>
                </Box>

                {selectedContents.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    {selectedContents.map((item, index) => (
                      <Paper
                        key={index}
                        variant="outlined"
                        sx={{ 
                          p: 2, 
                          mb: 2,
                          position: 'relative',
                          '&:last-child': { mb: 0 }
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Box>
                            <Typography variant="subtitle2" gutterBottom>
                              {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Length: {item.dimensions.length}cm • 
                              Width: {item.dimensions.width}cm • 
                              Height: {item.dimensions.height}cm • 
                              Weight: {item.dimensions.weight}g
                            </Typography>
                          </Box>
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => {
                              setSelectedContents(prev => prev.filter((_, i) => i !== index));
                            }}
                            sx={{ mt: -1, mr: -1 }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Paper>
                    ))}
                  </Box>
                )}

                <ProductContentsDialog
                  open={productContentsOpen}
                  onClose={() => setProductContentsOpen(false)}
                  onSave={(items) => {
                    setSelectedContents(items);
                    setProductContentsOpen(false);
                  }}
                />

                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setAttributesOpen(true)}
                    sx={{ 
                      borderRadius: 1,
                      textTransform: 'none',
                      justifyContent: 'flex-start',
                      px: 2,
                      py: 1.5,
                      width: '100%',
                      bgcolor: 'background.paper',
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Typography variant="subtitle2" color="text.primary">
                        Manage Attributes
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {selectedAttributeChips.length > 0 
                          ? `${selectedAttributeChips.length} attributes selected`
                          : 'Click to manage product attributes and specifications.'}
                      </Typography>
                    </Box>
                  </Button>
                </Box>

                {selectedAttributeChips.length > 0 && (
                  <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedAttributeChips.map((attr, index) => (
                      <Chip
                        key={index}
                        label={`${attr.group}: ${attr.value}`}
                        color="primary"
                        variant="outlined"
                        onDelete={() => {
                          const newChips = selectedAttributeChips.filter((_, i) => i !== index);
                          setSelectedAttributeChips(newChips);
                          setSelectedAttributes(newChips);
                        }}
                      />
                    ))}
                  </Box>
                )}

                <AttributesDialog
                  open={attributesOpen}
                  onClose={() => setAttributesOpen(false)}
                  onSave={handleAttributesSave}
                />
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={currentTab} index={1}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Retail Pricing
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="MRP"
                    value={formData.mrp}
                    onChange={handleInputChange('mrp')}
                    error={!!errors.mrp}
                    helperText={errors.mrp || 'Maximum Retail Price'}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Selling Price"
                    value={formData.sellingPrice}
                    onChange={handleInputChange('sellingPrice')}
                    error={!!errors.sellingPrice}
                    helperText={errors.sellingPrice || 'Must be less than or equal to MRP'}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Max Order Quantity Retail"
                    type="number"
                    value={formData.maxOrderQuantityRetail}
                    onChange={handleInputChange('maxOrderQuantityRetail')}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Cost"
                    value={formData.cost}
                    onChange={handleInputChange('cost')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.usePreconfiguredTax}
                        onChange={handleCheckboxChange('usePreconfiguredTax')}
                      />
                    }
                    label="Use Pre-configured Tax"
                  />
                </Grid>
                {formData.usePreconfiguredTax && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Pre Configured Tax (%)"
                      value={formData.preconfiguredTax}
                      onChange={handleInputChange('preconfiguredTax')}
                    />
                  </Grid>
                )}
              </Grid>

              <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                B2B Pricing
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Wholesale Price"
                    value={formData.wholesalePrice}
                    onChange={handleInputChange('wholesalePrice')}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Min Order Quantity B2B"
                    type="number"
                    value={formData.minOrderQuantityB2B}
                    onChange={handleInputChange('minOrderQuantityB2B')}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Max Order Quantity B2B"
                    type="number"
                    value={formData.maxOrderQuantityB2B}
                    onChange={handleInputChange('maxOrderQuantityB2B')}
                  />
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          <TabPanel value={currentTab} index={2}>
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Commission Settings
              </Typography>
              
              <FormControl component="fieldset" sx={{ mb: 3 }}>
                <RadioGroup
                  value={formData.commissionType}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    commissionType: e.target.value as 'percentage' | 'fixed',
                    commissionValue: ''
                  }))}
                >
                  <FormControlLabel 
                    value="percentage" 
                    control={<Radio />} 
                    label="Percentage Based Commission"
                  />
                  <FormControlLabel 
                    value="fixed" 
                    control={<Radio />} 
                    label="Fixed Amount Commission"
                  />
                </RadioGroup>
              </FormControl>

              <TextField
                fullWidth
                label={formData.commissionType === 'percentage' ? 'Commission Percentage' : 'Commission Amount'}
                value={formData.commissionValue}
                onChange={handleInputChange('commissionValue')}
              />

              {calculatedCommission && formData.commissionType === 'percentage' && formData.sellingPrice && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Calculated Commission: ${calculatedCommission} ({formData.commissionValue}% of ${formData.sellingPrice})
                </Typography>
              )}
            </Box>
          </TabPanel>

          <TabPanel value={currentTab} index={3}>
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Reseller Settings
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Fixed Reseller Rate"
                    type="number"
                    value={formData.resellerRate}
                    onChange={handleInputChange('resellerRate')}
                    InputProps={{
                      startAdornment: '$',
                    }}
                    helperText="Set a fixed rate for resellers"
                  />
                </Grid>
                
                {formData.resellerRate && formData.sellingPrice && (
                  <Grid item xs={12}>
                    <Alert severity="info" sx={{ mt: 1 }}>
                      Resellers will pay ${formData.resellerRate} for this product, which is {
                        formData.sellingPrice && formData.resellerRate 
                          ? `${(100 - (parseFloat(formData.resellerRate) / parseFloat(formData.sellingPrice) * 100)).toFixed(2)}% off`
                          : ''
                      } the retail price of ${formData.sellingPrice}.
                    </Alert>
                  </Grid>
                )}
              </Grid>
            </Box>
          </TabPanel>
        </Box>

        <DialogActions>
          <Button onClick={() => setIsFormOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddVariant}
          >
            Add Variant
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}