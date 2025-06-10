'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { CustomerForm } from '../CustomerForm';

// Mock customer data - Replace with actual API call
const mockCustomer = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
  gstType: 'Regular',
  gstNumber: 'GST123456789',
  billingAddress: {
    street: '123 Main St',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    country: 'India',
  },
  shippingAddress: {
    street: '123 Main St',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    country: 'India',
  },
  status: 'active',
  tier: 'Gold',
  createdAt: '2024-03-15T10:30:00',
  notes: [
    { id: 1, text: 'Prefers email communication', date: '2024-03-15T10:30:00' },
    { id: 2, text: 'Special handling required', date: '2024-03-14T15:45:00' },
  ],
  preferences: {
    communicationChannel: 'email',
    language: 'English',
    newsletter: true,
  },
  loyaltyPoints: 1500,
  totalOrders: 25,
  totalSpent: 4999.99,
};

interface CustomerDetailsProps {
  onUpdateSuccess: (message: string) => void;
}

export function CustomerDetails({ onUpdateSuccess }: CustomerDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editNote, setEditNote] = useState<{ id: number; text: string } | null>(null);
  const [newNote, setNewNote] = useState('');
  const [showNoteDialog, setShowNoteDialog] = useState(false);

  const handleSave = () => {
    // Here you would typically make an API call to save the changes
    setIsEditing(false);
    onUpdateSuccess('Customer details updated successfully');
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      // Here you would typically make an API call to add the note
      setNewNote('');
      setShowNoteDialog(false);
      onUpdateSuccess('Note added successfully');
    }
  };

  const formatAddress = (address: any) => {
    return [
      address.street,
      address.city,
      address.state,
      address.pincode,
      address.country,
    ].filter(Boolean).join(', ');
  };

  return (
    <Grid container spacing={3}>
      {/* Basic Information */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Basic Information</Typography>
              <Button
                startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                color={isEditing ? 'primary' : 'inherit'}
              >
                {isEditing ? 'Save' : 'Edit'}
              </Button>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={mockCustomer.name}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={mockCustomer.email}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={mockCustomer.phone}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip 
                    label={`Status: ${mockCustomer.status}`}
                    color={mockCustomer.status === 'active' ? 'success' : 'default'}
                  />
                  <Chip 
                    label={`Tier: ${mockCustomer.tier}`}
                    color="primary"
                    variant="outlined"
                  />
                  <Chip 
                    label={`${mockCustomer.loyaltyPoints} Points`}
                    color="secondary"
                    variant="outlined"
                  />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* GST Information */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              GST Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="GST Type"
                  value={mockCustomer.gstType}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="GST Number"
                  value={mockCustomer.gstNumber}
                  disabled
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Addresses */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Billing Address
            </Typography>
            <Typography>
              {formatAddress(mockCustomer.billingAddress)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>
            <Typography>
              {formatAddress(mockCustomer.shippingAddress)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Customer Stats */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Customer Overview
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Total Orders
                </Typography>
                <Typography variant="h4">
                  {mockCustomer.totalOrders}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Total Spent
                </Typography>
                <Typography variant="h4">
                  ${mockCustomer.totalSpent.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Member Since
                </Typography>
                <Typography variant="h4">
                  {new Date(mockCustomer.createdAt).toLocaleDateString()}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Notes & Comments */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Notes & Comments</Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={() => setShowNoteDialog(true)}
              >
                Add Note
              </Button>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {mockCustomer.notes.map((note) => (
                <Card key={note.id} variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography>
                        {note.text}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(note.date).toLocaleString()}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Add Note Dialog */}
      <Dialog
        open={showNoteDialog}
        onClose={() => setShowNoteDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Note"
            fullWidth
            multiline
            rows={4}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowNoteDialog(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddNote} variant="contained">
            Add Note
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}