import { z } from 'zod';

const dimensionsSchema = z.object({
  length: z.number().min(0, 'Length must be positive'),
  width: z.number().min(0, 'Width must be positive'),
  height: z.number().min(0, 'Height must be positive'),
});

const attributesSchema = z.object({
  material: z.string().optional(),
  size: z.string().optional(),
  color: z.string().optional(),
});

export const createProductSchema = z.object({
  name: z.string()
    .min(3, 'Product name must be at least 3 characters')
    .max(100, 'Product name must not exceed 100 characters'),
  category: z.string()
    .min(1, 'Please select a category'),
  sku: z.string()
    .min(1, 'SKU is required'),
  barcode: z.string().optional(),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must not exceed 1000 characters')
    .optional(),
  weight: z.number()
    .min(0, 'Weight must be positive')
    .optional(),
  dimensions: dimensionsSchema.optional(),
  attributes: attributesSchema.optional(),
  
  // Pricing
  mrp: z.number()
    .min(0.01, 'MRP must be greater than 0'),
  sellingPrice: z.number()
    .min(0.01, 'Selling price must be greater than 0'),
  wholesalePrice: z.number()
    .min(0.01, 'Wholesale price must be greater than 0')
    .optional(),
  taxRate: z.number()
    .min(0, 'Tax rate cannot be negative')
    .max(100, 'Tax rate cannot exceed 100%')
    .default(0),
  
  // Order Limits
  minOrderQuantity: z.number()
    .int('Minimum order quantity must be a whole number')
    .min(1, 'Minimum order quantity must be at least 1')
    .optional(),
  maxOrderQuantity: z.number()
    .int('Maximum order quantity must be a whole number')
    .min(1, 'Maximum order quantity must be at least 1')
    .optional(),
  
  // Stock
  stock: z.number()
    .int('Stock must be a whole number')
    .min(0, 'Stock cannot be negative'),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;