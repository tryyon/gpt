import { z } from 'zod';

export const policyTypes = [
  'privacy',
  'terms',
  'shipping',
  'returns',
  'cookies',
  'disclaimer',
  'accessibility',
  'security',
] as const;

export const policySchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, 'Title must be at least 2 characters'),
  type: z.enum(policyTypes),
  content: z.string()
    .min(10, 'Content must be at least 10 characters')
    .max(50000, 'Content must not exceed 50,000 characters'),
  isActive: z.boolean(),
  lastUpdated: z.date(),
  version: z.string().regex(/^\d+\.\d+(\.\d+)?$/, 'Version must be in format x.y or x.y.z'),
  isRequired: z.boolean(),
  displayOrder: z.number().int().min(1),
});

export type Policy = z.infer<typeof policySchema>;