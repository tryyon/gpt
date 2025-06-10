import { z } from 'zod';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const imageSchema = z.any()
  .refine((file) => !file || (file instanceof File && file.size <= MAX_FILE_SIZE), 'Max file size is 2MB')
  .refine(
    (file) => !file || (file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type)),
    'Only .jpg, .jpeg, .png and .webp formats are supported'
  )
  .nullable();

// Base category schema with common fields
const baseCategorySchema = {
  name: z.string().min(2, 'Category name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  isActive: z.boolean(),
  displayOrder: z.number().int().min(0),
  logo: imageSchema,
  image: imageSchema,
};

// Root Category Schema
export const rootCategorySchema = z.object({
  ...baseCategorySchema,
  slug: z.string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

// Main Category Schema
export const mainCategorySchema = z.object({
  ...baseCategorySchema,
  rootCategoryId: z.string().min(1, 'Root category is required'),
});

// Child Category Schema
export const childCategorySchema = z.object({
  ...baseCategorySchema,
  rootCategoryId: z.string().min(1, 'Root category is required'),
  mainCategoryId: z.string().min(1, 'Main category is required'),
});

export type RootCategoryFormData = z.infer<typeof rootCategorySchema>;
export type MainCategoryFormData = z.infer<typeof mainCategorySchema>;
export type ChildCategoryFormData = z.infer<typeof childCategorySchema>;