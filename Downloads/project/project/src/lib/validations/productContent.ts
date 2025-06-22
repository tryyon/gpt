import { z } from 'zod';

export const dimensionsSchema = z.object({
  length: z.number().min(0, 'Length must be positive'),
  width: z.number().min(0, 'Width must be positive'),
  height: z.number().min(0, 'Height must be positive'),
});

export const itemSchema = z.object({
  name: z.string().min(1, 'Item name is required'),
  dimensions: dimensionsSchema,
  weight: z.number().min(0, 'Weight must be positive'),
});

export const productContentSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, 'Product title is required'),
  items: z.array(itemSchema).min(1, 'At least one item is required'),
  dateCreated: z.date(),
  status: z.enum(['Enabled', 'Disabled', 'Archived']),
});

export type Dimensions = z.infer<typeof dimensionsSchema>;
export type Item = z.infer<typeof itemSchema>;
export type ProductContent = z.infer<typeof productContentSchema>;