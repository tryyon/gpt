'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Chat as ChatIcon,
  Add as AddIcon,
} from '@mui/icons-material';

// Mock support data
const mockTickets = [
  {
    id: 1,
    subject: 'Order Delivery Delay',
    status: 'open',
    priority: 'high',
    createdAt: '2024-03-15T10:30:00',
    lastUpdated: '2024-03-15T15:45:00',
    messages: [
      {
        id: 1,
        type: 'customer',
        message: 'My order is delayed. When will it be delivered?',
        timestamp: '2024-03-15T10:30:00',
      },
      {
        id: 2,
        type: 'agent',
        message: 'I apologize for the delay. Let me check the status for you.',
        timestamp: '2024-03-15T10:35:00',
      },
    ],
  },
  {
    id: 2,
    subject: 'Product Return Request',
    status: 'closed',
    priority: 'medium',
    createdAt: '2024-03-14T09:15:00',
    lastUpdated: '2024-03-14T14:20:00',
    messages: [
      {
        id: 3,
        type: 'customer',
        message: 'I would like to return my recent purchase.',
        timestamp: '2024-03-14T09:15:00',
      },
      {
        id: 4,
        type: 'agent',
        message: 'I can help you with that. Please provide your order number.',
        timestamp: '2024-03-14T09:20:00',
      },
    ],
  },
];

const mockPreferences = {
  preferredLanguage: 'English',
  communicationChannel: 'email',
  newsletter: true,
  specialInstructions: 'Prefers morning delivery',
};

export function CustomerSupport() {
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'warning';
      case 'closed':
        return 'success';
      case 'pending':
        return 'info';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Communication Preferences */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Communication Preferences
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Preferred Language
                </Typography>
                <Typography variant="body1">
                  {mockPreferences.preferredLanguage}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Preferred Channel
                </Typography>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {mockPreferences.communicationChannel === 'email' ? <EmailIcon fontSize="small" /> : <PhoneIcon fontSize="small" />}
                  {mockPreferences.communicationChannel}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Newsletter Subscription
                </Typography>
                <Chip
                  label={mockPreferences.newsletter ? 'Subscribed' : 'Not Subscribed'}
                  color={mockPreferences.newsletter ? 'success' : 'default'}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Special Instructions
                </Typography>
                <Typography variant="body1">
                  {mockPreferences.specialInstructions}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Support Tickets */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">
                Support Tickets
              </Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={() => setShowNewTicket(true)}
              >
                New Ticket
              </Button>
            </Box>

            <List>
              {mockTickets.map((ticket) => (
                <Box key={ticket.id}>
                  <ListItem
                    button
                    onClick={() => setSelectedTicket(ticket)}
                    sx={{ 
                      bgcolor: selectedTicket?.id === ticket.id ? 'action.selected' : 'transparent',
                      borderRadius: 1,
                    }}
                  >
                    <ListItemIcon>
                      <ChatIcon color="action" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body1">
                            {ticket.subject}
                          </Typography>
                          <Chip
                            label={ticket.status}
                            color={getStatusColor(ticket.status)}
                            size="small"
                          />
                          <Chip
                            label={ticket.priority}
                            color={getPriorityColor(ticket.priority)}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                      }
                      secondary={
                        <Typography variant="caption" color="text.secondary">
                          Last updated: {new Date(ticket.lastUpdated).toLocaleString()}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Divider component="li" />
                </Box>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>

      {/* Ticket Details Dialog */}
      <Dialog
        open={!!selectedTicket}
        onClose={() => setSelectedTicket(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              {selectedTicket?.subject}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip
                label={selectedTicket?.status}
                color={getStatusColor(selectedTicket?.status)}
                size="small"
              />
              <Chip
                label={selectedTicket?.priority}
                color={getPriorityColor(selectedTicket?.priority)}
                size="small"
                variant="outlined"
              />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {selectedTicket?.messages.map((message: any) => (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: message.type === 'customer' ? 'flex-start' : 'flex-end',
                }}
              >
                <Box
                  sx={{
                    maxWidth: '80%',
                    bgcolor: message.type === 'customer' ? 'grey.100' : 'primary.light',
                    borderRadius: 2,
                    p: 2,
                  }}
                >
                  <Typography variant="body1">
                    {message.message}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(message.timestamp).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Reply"
              multiline
              rows={3}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedTicket(null)}>
            Close
          </Button>
          <Button
            variant="contained"
            disabled={!newMessage.trim()}
          >
            Send Reply
          </Button>
        </DialogActions>
      </Dialog>

      {/* New Ticket Dialog */}
      <Dialog
        open={showNewTicket}
        onClose={() => setShowNewTicket(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Support Ticket</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Subject"
              fullWidth
            />
            <TextField
              label="Message"
              multiline
              rows={4}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowNewTicket(false)}>
            Cancel
          </Button>
          <Button variant="contained">
            Create Ticket
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}