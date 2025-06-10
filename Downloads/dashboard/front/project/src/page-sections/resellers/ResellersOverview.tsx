'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Avatar,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ShoppingCart as OrdersIcon,
  Group as CustomersIcon,
  AttachMoney as RevenueIcon,
} from '@mui/icons-material';
import { PageTitle } from '@/global-components/layout/PageTitle';

const resellerStats = [
  { title: 'Total Resellers', value: '45', icon: <CustomersIcon /> },
  { title: 'Total Orders', value: '1,234', icon: <OrdersIcon /> },
  { title: 'Total Revenue', value: '$45,678', icon: <RevenueIcon /> },
];

const resellers = [
  {
    id: 'RS001',
    name: 'John Doe Enterprises',
    email: 'john@example.com',
    phone: '+1234567890',
    type: 'Gold',
    status: 'active',
    ordersCount: 156,
    revenue: 12345.67,
    joinDate: '2024-01-15',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 'RS002',
    name: 'Smith Trading Co.',
    email: 'smith@example.com',
    phone: '+1987654321',
    type: 'Silver',
    status: 'pending',
    ordersCount: 89,
    revenue: 8901.23,
    joinDate: '2024-02-20',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

const getTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'gold':
      return 'warning';
    case 'silver':
      return 'info';
    case 'bronze':
      return 'error';
    default:
      return 'default';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'pending':
      return 'warning';
    case 'suspended':
      return 'error';
    default:
      return 'default';
  }
};

export function ResellersOverview() {
  return (
    <Box>
      <PageTitle 
        title="Resellers" 
        subtitle="Manage your reseller network"
      />

      {/* Reseller Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {resellerStats.map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box 
                  sx={{ 
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                  }}
                >
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    {stat.title}
                  </Typography>
                  <Typography variant="h5">
                    {stat.value}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Resellers Table */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">
              Reseller List
            </Typography>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Reseller</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Orders</TableCell>
                  <TableCell>Revenue</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Join Date</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resellers.map((reseller) => (
                  <TableRow key={reseller.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={reseller.avatar} />
                        <Box>
                          <Typography variant="body2" fontWeight={500}>
                            {reseller.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {reseller.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={reseller.type}
                        color={getTypeColor(reseller.type)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{reseller.ordersCount}</TableCell>
                    <TableCell>${reseller.revenue.toFixed(2)}</TableCell>
                    <TableCell>
                      <Chip
                        label={reseller.status}
                        color={getStatusColor(reseller.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(reseller.joinDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Tooltip title="View Details">
                          <IconButton size="small">
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton size="small">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small" color="error">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}