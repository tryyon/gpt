"use client";
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  FormLabel,
  TextField,
  Select,
  MenuItem,
  Grid,
  Box,
  Button,
  FormControl,
  Switch,
  FormControlLabel,
  ButtonGroup,
} from '@mui/material';
import { FaClone } from 'react-icons/fa';
import { defaultProduct2, createProductState2 } from '@/store/atoms/Product/createProductState';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { General } from '../../../../app/admin/products/AddProducts/page';

export function useSSR() {
  const [isInitial, setIsInitial] = useState(true);
  const [generalDetails, setGeneralDetails] =
    useRecoilState(createProductState2);
  useEffect(() => {
    setIsInitial(false);
  }, []);
  return [
    isInitial ? defaultProduct2 : generalDetails,
    setGeneralDetails,
  ] as const;
}

const GeneralDetails = () => {
  const [generalDetails, setGeneralDetails] = useSSR();
  const {
    register,
    handleSubmit,
    watch,
  } = useForm<General>({
    defaultValues: defaultProduct2,
  });
  const switchValue = watch("switch");
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setGeneralDetails({ ...generalDetails, [name]: newValue });
  };

  const onSubmitHandler = (data: General) => {
    console.log("data", data);
    setGeneralDetails(data);
  };

  return (
    <div className="m-5">
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Card
          style={{ width: '900px', padding: '20px', borderRadius: '20px', marginBottom: '20px' }}
        >
          <CardHeader
            title={<Typography variant="h5">General Details</Typography>}
          />
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={3}>
                <FormLabel htmlFor="status">Status</FormLabel>
              </Grid>
              <Grid item xs={12} md={9}>
                <ButtonGroup>
                  <Button
                    startIcon={<FaClone />}
                    style={{ color: '#BA7A1A', backgroundColor: '#FCD57F' }}
                  >
                    Clone
                  </Button>
                  <Button style={{ color: '#01823C', backgroundColor: '#8DEEB9' }}>
                    Enable
                  </Button>
                  <Button style={{ color: '#F30000', backgroundColor: '#FCACAC' }}>
                    Disable
                  </Button>
                  <Button style={{ backgroundColor: '#CBE5FD', color: '#3184FE' }}>
                    Draft
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>

            <Box mt={2}>
              <FormControl component="fieldset">
                <FormControlLabel
                  control={
                    <Switch
                      id="marketplace"
                      {...register("isMarketplace")}
                      checked={generalDetails.isMarketplace}
                      onChange={handleChange}
                    />
                  }
                  label="Show this product in Tryyon Marketplace"
                />
              </FormControl>
            </Box>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <FormLabel htmlFor="language">Language</FormLabel>
                <Select
                  id="language"
                  {...register("language")}
                  value={generalDetails.language}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="gujarat">Gujarati</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel htmlFor="brandname">Brand Name</FormLabel>
                <Select
                  id="brandname"
                  {...register("brandname")}
                  value={generalDetails.brandname}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="Coca cola">Coca Cola</MenuItem>
                  <MenuItem value="pepsi">Pepsi</MenuItem>
                  <MenuItem value="thumbsup">Thumbs Up</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormLabel htmlFor="manufacturer">Manufacturer *</FormLabel>
                <TextField
                  id="manufacturer"
                  {...register("manufacturer")}
                  value={generalDetails.manufacturer}
                  onChange={handleChange}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormLabel htmlFor="supplier">Supplier</FormLabel>
                <Select
                  id="supplier"
                  {...register('supplier')}
                  value={generalDetails.supplier}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="supplier1">Supplier 1</MenuItem>
                  <MenuItem value="supplier2">Supplier 2</MenuItem>
                  <MenuItem value="supplier3">Supplier 3</MenuItem>
                </Select>
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={6}>
                <FormLabel htmlFor="productname">Product Name *</FormLabel>
                <TextField
                  id="productname"
                  {...register("productName")}
                  value={generalDetails.productName}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              {/* Other input fields... */}
            </Grid>

            <Box mt={2}>
              <FormControl component="fieldset">
                <FormControlLabel
                  control={
                    <Switch
                      id="addtionalFields"
                      {...register("switch")}
                      checked={switchValue}
                    />
                  }
                  label="Additional fields"
                />
              </FormControl>
            </Box>

            {switchValue && (
              <Grid container spacing={2} mt={2}>
                {/* Additional Fields */}
              </Grid>
            )}

            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button
                variant="outlined"
                style={{ color: '#67707F', marginRight: '10px' }}
              >
                Cancel
              </Button>
              <Button color="primary" variant="contained" type="submit">
                Save
              </Button>
            </Box>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default GeneralDetails;
