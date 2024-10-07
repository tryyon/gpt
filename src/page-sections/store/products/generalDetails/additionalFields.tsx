import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Switch,
  Typography,
  Grid,
  Select,
  MenuItem,
} from '@mui/material';
import ProductIdentifier from './productIdentifiers';

interface FormData {
  additionalFields: boolean;
  manufacturer: string;
  supplier: string;
  country: string;
  importer: string;
  language: string;
}

const AdditionalFields = () => {
  const [formData, setFormData] = useState<FormData>({
    additionalFields: false,
    manufacturer: '',
    supplier: '',
    country: '',
    importer: '',
    language: '',
  });

  const toggleAdditionalFields = () => {
    setFormData((prevState) => ({
      ...prevState,
      additionalFields: !prevState.additionalFields,
    }));
  };

  return (
    <>
      <Box margin={2}>
        <FormControl fullWidth>
          <FormLabel component="legend">
            <Typography margin={2}>Additional fields</Typography>
          </FormLabel>
          <Switch
            checked={formData.additionalFields}
            onChange={toggleAdditionalFields}
            name="additionalFields"
            color="primary"
          />
        </FormControl>
      </Box>
      {formData.additionalFields && (
        <>
          <Grid container spacing={2} marginTop={3}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <FormLabel htmlFor="manufacturer">Manufacturer</FormLabel>
                <Select
                  id="manufacturer"
                  value={formData.manufacturer}
                  onChange={(e) =>
                    setFormData({ ...formData, manufacturer: e.target.value })
                  }
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>Select Manufacturer</em>
                  </MenuItem>
                  <MenuItem value="manufacturer1">Manufacturer 1</MenuItem>
                  <MenuItem value="manufacturer2">Manufacturer 2</MenuItem>
                  <MenuItem value="manufacturer3">Manufacturer 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <FormLabel htmlFor="supplier">Supplier</FormLabel>
                <Select
                  id="supplier"
                  value={formData.supplier}
                  onChange={(e) =>
                    setFormData({ ...formData, supplier: e.target.value })
                  }
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>Select Supplier</em>
                  </MenuItem>
                  <MenuItem value="supplier1">Supplier 1</MenuItem>
                  <MenuItem value="supplier2">Supplier 2</MenuItem>
                  <MenuItem value="supplier3">Supplier 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <FormLabel htmlFor="country">Country of origin</FormLabel>
                <Select
                  id="country"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>Select Country</em>
                  </MenuItem>
                  <MenuItem value="country1">Country 1</MenuItem>
                  <MenuItem value="country2">Country 2</MenuItem>
                  <MenuItem value="country3">Country 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <FormLabel htmlFor="importer">Importer Name</FormLabel>
                <Select
                  id="importer"
                  value={formData.importer}
                  onChange={(e) =>
                    setFormData({ ...formData, importer: e.target.value })
                  }
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>Select Importer</em>
                  </MenuItem>
                  <MenuItem value="importer1">Importer 1</MenuItem>
                  <MenuItem value="importer2">Importer 2</MenuItem>
                  <MenuItem value="importer3">Importer 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <FormLabel htmlFor="language">Language</FormLabel>
                <Select
                  id="language"
                  value={formData.language}
                  onChange={(e) =>
                    setFormData({ ...formData, language: e.target.value })
                  }
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>Select Language</em>
                  </MenuItem>
                  <MenuItem value="english">English</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <ProductIdentifier />
        </>
      )}
    </>
  );
};

export default AdditionalFields;
