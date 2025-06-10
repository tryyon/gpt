import { z } from 'zod';

export const basicDetailsSchema = z.object({
  // Owner Information
  ownerFullName: z.string().min(1, 'Business owner\'s full name is required'),
  ownerEmail: z.string().email('Invalid email format'),
  ownerContactNumber: z.string().regex(/^[0-9]{10}$/, 'Invalid phone number (10 digits required)'),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number'),

  // Business Information
  businessType: z.enum(['B2B', 'B2C', 'B2B and B2C']),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  pincode: z.string().regex(/^[0-9]{6}$/, 'Invalid pincode (6 digits required)'),

  // Primary Contact
  primaryContactName: z.string().min(1, 'Primary contact name is required'),
  primaryContactEmail: z.string().email('Invalid email format'),
  primaryContactPhone: z.string().regex(/^[0-9]{10}$/, 'Invalid phone number (10 digits required)'),
});

export type BasicDetailsData = z.infer<typeof basicDetailsSchema>;