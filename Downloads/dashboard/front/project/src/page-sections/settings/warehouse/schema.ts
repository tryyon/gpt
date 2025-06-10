import { z } from 'zod';

const organizationSchema = z.object({
  name: z.string(),
  status: z.enum(['pending', 'approved', 'not approved']),
});

const warehouseSchema = z.object({
  warehousePincode: z.string().min(1, 'Warehouse Pincode is required'),
  warehouseGSTIN: z.string().min(1, 'Warehouse GSTIN is required'),
  warehouseAddress: z.string().min(1, 'Warehouse Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  warehouseEmailID: z.string().email('Invalid email format'),
  warehouseContactNumber: z.string().min(10, 'Contact number must be at least 10 digits'),
  operationStartTime: z.string().min(1, 'Operation Start Time is required'),
  operationEndTime: z.string().min(1, 'Operation End Time is required'),
  perDayOrderProcessingCapacity: z.number().min(1, 'Processing capacity must be greater than 0'),
  documents: z.array(z.any()).optional(),
  organizations: z.array(organizationSchema).default([]),
});

export const schema = z.object({
  warehouses: z.array(warehouseSchema).min(1, 'At least one warehouse is required'),
});

export type FormData = z.infer<typeof schema>;
export type WarehouseData = z.infer<typeof warehouseSchema>;
export type OrganizationData = z.infer<typeof organizationSchema>;