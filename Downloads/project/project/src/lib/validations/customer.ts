import { z } from 'zod';

const addressSchema = z.object({
  street: z.string().optional(),
  pincode: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
});

export const customerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  gstType: z.enum(['unregistered', 'regular', 'composition']).optional(),
  gstNumber: z.string().optional(),
  billingAddress: addressSchema.optional(),
  shippingAddress: addressSchema.optional(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;
export type AddressData = z.infer<typeof addressSchema>;

export const gstTypes = [
  { value: 'unregistered', label: 'Unregistered/Consumer' },
  { value: 'regular', label: 'Registered Business - Regular' },
  { value: 'composition', label: 'Registered Business - Composition' },
];