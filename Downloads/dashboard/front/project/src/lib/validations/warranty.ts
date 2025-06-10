import { z } from 'zod';

export const warrantySchema = z.object({
  id: z.number().optional(),
  title: z.string().min(2, 'Title must be at least 2 characters'),
  type: z.enum(['Warranty', 'Guarantee', 'Refund & Exchange']),
  duration: z.object({
    value: z.number().min(1, 'Duration must be at least 1'),
    unit: z.enum(['Days', 'Months', 'Years']),
  }),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  isActive: z.boolean().default(true),
  dateCreated: z.date().optional(),
  conditions: z.array(z.string()).min(1, 'At least one condition is required'),
});

export type Warranty = z.infer<typeof warrantySchema>;

export const warrantyTypes = [
  { value: 'Warranty', label: 'Product Warranty' },
  { value: 'Guarantee', label: 'Product Guarantee' },
  { value: 'Refund & Exchange', label: 'Refund & Exchange Policy' },
] as const;

export const durationUnits = [
  { value: 'Days', label: 'Days' },
  { value: 'Months', label: 'Months' },
  { value: 'Years', label: 'Years' },
] as const;