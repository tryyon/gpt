import { z } from 'zod';

export const basicDetailsSchema = z.object({
  // Owner Information
  ownerFullName: z.string().min(1, 'Business owner\'s full name is required'),
  ownerEmail: z.string().email('Invalid email format').optional(),
  ownerContactNumber: z.string().optional(),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number'),

  // Business Information
  businessType: z.enum(['B2B', 'B2C', 'B2B and B2C']).optional(),
  businessName: z.string().min(1, 'Business name is required'),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  pincode: z.string().optional(),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  registrationNumber: z.string().optional(),
  incorporationDate: z.string().optional(),

  // Primary Contact
  primaryContactName: z.string().optional(),
  primaryContactEmail: z.string().email('Invalid email format').optional(),
  primaryContactPhone: z.string().optional(),
});

export type BasicDetailsData = z.infer<typeof basicDetailsSchema>;