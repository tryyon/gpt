import { z } from 'zod';

export const productQASchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
  isPublished: z.boolean().default(false),
  isHighlighted: z.boolean().default(false),
  displayOrder: z.number().min(0),
  dateCreated: z.date().optional(),
  lastUpdated: z.date().optional(),
});

export type ProductQA = z.infer<typeof productQASchema>;