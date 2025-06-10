import { z } from 'zod';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const categorySchema = z.object({
  rootCategory: z.string().min(1, 'Root category is required'),
  mainCategory: z.string().min(1, 'Main category is required'),
  childCategory: z.string().min(1, 'Child category is required'),
});

export const brandSchema = z.object({
  brandName: z.string().min(2, 'Brand name must be at least 2 characters'),
  yearsOfOperation: z.number().min(0, 'Years must be 0 or greater'),
  manufacturerName: z.string().min(2, 'Manufacturer name is required'),
  manufacturerContactNumber: z.string().regex(/^\+?[0-9]{10,15}$/, 'Invalid contact number'),
  manufacturerAddress: z.string().min(10, 'Address must be at least 10 characters'),
  packerName: z.string().min(2, 'Packer name is required'),
  packerContact: z.string().regex(/^\+?[0-9]{10,15}$/, 'Invalid contact number'),
  packerAddress: z.string().min(10, 'Packer address is required'),
  earthFriendly: z.boolean(),
  natureOfBusiness: z.enum(['distributor', 'brand_manufacturer', 'brand_owner', 'exporter', 'manufacturer']),
  categories: z.array(categorySchema).min(1, 'At least one category must be selected'),
  organizations: z.array(z.string()).min(1, 'At least one organization must be selected'),
  description: z.string().optional(),
  logo: z.any()
    .refine((file) => !file || (file instanceof File && file.size <= MAX_FILE_SIZE), 'Max file size is 2MB')
    .refine(
      (file) => !file || (file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type)),
      'Only .jpg, .jpeg, .png and .webp formats are supported'
    )
    .optional(),
  catalog: z.any()
    .refine((file) => !file || (file instanceof File && file.size <= MAX_FILE_SIZE), 'Max file size is 2MB')
    .refine(
      (file) => !file || (file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type)),
      'Only .jpg, .jpeg, .png and .webp formats are supported'
    )
    .optional(),
  trademarkCertificate: z.any()
    .refine((file) => !file || (file instanceof File && file.size <= MAX_FILE_SIZE), 'Max file size is 2MB')
    .refine(
      (file) => !file || (file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type)),
      'Only .jpg, .jpeg, .png and .webp formats are supported'
    )
    .optional(),
});

export type BrandFormData = z.infer<typeof brandSchema>;

export const natureOfBusinessOptions = [
  { value: 'distributor', label: 'Distributor/Reseller' },
  { value: 'brand_manufacturer', label: 'Brand owner + Manufacturer' },
  { value: 'brand_owner', label: 'Brand owner' },
  { value: 'exporter', label: 'Exporter/Importer' },
  { value: 'manufacturer', label: 'Manufacturer' },
];

// Mock data - Replace with actual API data
export const rootCategories = [
  { id: 'rc1', name: 'Electronics' },
  { id: 'rc2', name: 'Fashion' },
  { id: 'rc3', name: 'Home & Living' },
];

export const mainCategories = {
  rc1: [
    { id: 'mc1', name: 'Smartphones' },
    { id: 'mc2', name: 'Laptops' },
  ],
  rc2: [
    { id: 'mc3', name: "Men's Clothing" },
    { id: 'mc4', name: "Women's Clothing" },
  ],
  rc3: [
    { id: 'mc5', name: 'Furniture' },
    { id: 'mc6', name: 'Decor' },
  ],
};