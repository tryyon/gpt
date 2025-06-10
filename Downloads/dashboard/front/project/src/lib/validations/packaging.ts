import { z } from 'zod';

const dimensionsSchema = z.object({
  length: z.number().min(0, 'Length must be positive'),
  width: z.number().min(0, 'Width must be positive'),
  height: z.number().min(0, 'Height must be positive'),
});

export const packagingSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  type: z.enum(['Box', 'Envelope', 'Bag', 'Tube', 'Custom']),
  dimensions: dimensionsSchema,
  weight: z.number().min(0, 'Weight must be positive'),
  material: z.string().min(2, 'Material must be at least 2 characters'),
  cost: z.number().min(0, 'Cost must be positive'),
  isActive: z.boolean().default(true),
  isDefault: z.boolean().default(false),
  description: z.string().optional(),
  dateCreated: z.date().optional(),
});

export type Packaging = z.infer<typeof packagingSchema>;

export const packagingTypes = [
  { value: 'Box', label: 'Box' },
  { value: 'Envelope', label: 'Envelope' },
  { value: 'Bag', label: 'Bag' },
  { value: 'Tube', label: 'Tube' },
  { value: 'Custom', label: 'Custom' },
] as const;