import { z } from 'zod';

export const itemSchema = z.object({
  description: z.string().min(1, 'Description is required'),
});

export const collectionSchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'Collection title is required'),
  items: z.array(itemSchema).min(1, 'At least one item is required'),
  dateCreated: z.date(),
  status: z.enum(['Enabled', 'Disabled', 'Archived']),
});

export type Item = z.infer<typeof itemSchema>;
export type Collection = z.infer<typeof collectionSchema>;