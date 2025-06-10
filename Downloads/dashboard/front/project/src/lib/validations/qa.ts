import { z } from 'zod';

export const qaFormSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, 'Title is required'),
  items: z.array(z.object({
    id: z.number().optional(),
    question: z.string().min(1, 'Question is required'),
    answer: z.string().min(1, 'Answer is required'),
    category: z.string().min(1, 'Category is required'),
    isPublished: z.boolean().default(true),
    isHighlighted: z.boolean().default(false),
    displayOrder: z.number().min(0).default(0),
  })).min(1, 'At least one Q&A is required'),
  dateCreated: z.date().optional(),
  lastUpdated: z.date().optional(),
});

export type QAForm = z.infer<typeof qaFormSchema>;

export const qaCategories = [
  { value: 'general', label: 'General' },
  { value: 'product', label: 'Product' },
  { value: 'shipping', label: 'Shipping' },
  { value: 'returns', label: 'Returns' },
  { value: 'payment', label: 'Payment' },
  { value: 'warranty', label: 'Warranty' },
] as const;