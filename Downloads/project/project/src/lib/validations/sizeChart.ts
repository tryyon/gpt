import { z } from 'zod';

const cellSchema = z.object({
  value: z.string().min(1, 'Cell value is required'),
});

const rowSchema = z.object({
  cells: z.array(cellSchema).min(1, 'Row must have at least one cell').max(10, 'Maximum 10 columns allowed'),
});

export const sizeChartSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  categories: z.array(z.string()).min(1, 'At least one category is required'),
  columns: z.array(z.string()).min(1, 'At least one column is required').max(10, 'Maximum 10 columns allowed'),
  rows: z.array(rowSchema).min(1, 'At least one row is required').max(20, 'Maximum 20 rows allowed'),
  csvFile: z.any().optional(),
  isActive: z.boolean().default(true),
  dateCreated: z.date().optional(),
});

export type Cell = z.infer<typeof cellSchema>;
export type Row = z.infer<typeof rowSchema>;
export type SizeChart = z.infer<typeof sizeChartSchema>;