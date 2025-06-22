'use client';

import React from 'react';
import { Box, Typography, Paper, Grid, Divider } from '@mui/material';
import { useParams } from 'next/navigation';
import { mockOrders } from './mockData'; // Assuming mockData has your order data

export function OrderDetails() {
  const params = useParams();
  const orderId = params.orderId as string;

  // Find the order based on the orderId
  const order = mockOrders.find(o => o.orderNumber === orderId);

  if (!order) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">Order not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Order Details: {order.orderNumber}</Typography>
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>Customer Information</Typography>
            <Typography variant="body1"><strong>Name:</strong> {order.customer}</Typography>
            <Typography variant="body1"><strong>Email:</strong> {order.email}</Typography>
            {/* Add more customer details as needed */}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>Order Summary</Typography>
            <Typography variant="body1"><strong>Total:</strong> ${order.total.toFixed(2)}</Typography>
            <Typography variant="body1"><strong>Status:</strong> {order.status}</Typography>
            <Typography variant="body1"><strong>Payment Status:</strong> {order.paymentStatus}</Typography>
            <Typography variant="body1"><strong>Date:</strong> {new Date(order.date).toLocaleString()}</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>Items</Typography>
        {/* Assuming 'items' is an array in your Order type */}
        {/* {order.items && order.items.length > 0 ? (
          order.items.map((item, index) => (
            <Box key={index} sx={{ mb: 1 }}>
              <Typography variant="body2">{item.name} x {item.quantity} - ${item.price.toFixed(2)}</Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2">No items listed.</Typography>
        )} */}
        <Typography variant="body2">Item details would go here.</Typography>
      </Paper>
      {/* Add more sections for shipping, payment, etc. */}
    </Box>
  );
}