import React from 'react';
import { Box, Grid, TextField, InputLabel } from '@mui/material';

const ProductIdentifier = () => {
  return (
    <>
      <Grid container spacing={2} margin={2}>
        <Grid item xs={12} sm={6} md={4}>
          <InputLabel htmlFor="barcode">Barcode</InputLabel>
          <TextField fullWidth id="barcode" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InputLabel htmlFor="hsnNo">HSN No.</InputLabel>
          <TextField fullWidth id="hsnNo" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InputLabel htmlFor="manufacturerPartNo">Manufacturer Part Number</InputLabel>
          <TextField fullWidth id="manufacturerPartNo" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InputLabel htmlFor="binPickingNumber">BIN Picking Number</InputLabel>
          <TextField fullWidth id="binPickingNumber" variant="outlined" />
        </Grid>
      </Grid>

      <Grid container spacing={2} margin={2}>
        <Grid item xs={12} sm={6} md={4}>
          <InputLabel htmlFor="globalTradeItemNumber">Global Trade Item Number</InputLabel>
          <TextField fullWidth id="globalTradeItemNumber" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InputLabel htmlFor="keywords">Search Keywords</InputLabel>
          <TextField fullWidth id="keywords" placeholder="Tags" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}></Grid>
        <Grid item xs={12} sm={6} md={4}></Grid>
      </Grid>
    </>
  );
};

export default ProductIdentifier;
