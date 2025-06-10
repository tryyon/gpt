import { z } from 'zod';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const giftWrappingSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0, 'Price must be positive'),
  type: z.enum(['Paper', 'Box', 'Bag', 'Ribbon', 'Custom']),
  color: z.string().min(1, 'Color is required'),
  isActive: z.boolean().default(true),
  isDefault: z.boolean().default(false),
  maxDimensions: z.object({
    length: z.number().min(0, 'Length must be positive'),
    width: z.number().min(0, 'Width must be positive'),
    height: z.number().min(0, 'Height must be positive'),
  }),
  image: z.any()
    .refine((file) => !file || (file instanceof File && file.size <= MAX_FILE_SIZE), 'Max file size is 2MB')
    .refine(
      (file) => !file || (file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type)),
      'Only .jpg, .jpeg, .png and .webp formats are supported'
    )
    .nullable()
    .optional(),
  imageUrl: z.string().optional(),
  dateCreated: z.date().optional(),
});

export type GiftWrapping = z.infer<typeof giftWrappingSchema>;

export const wrappingTypes = [
  { value: 'Paper', label: 'Gift Paper' },
  { value: 'Box', label: 'Gift Box' },
  { value: 'Bag', label: 'Gift Bag' },
  { value: 'Ribbon', label: 'Ribbon' },
  { value: 'Custom', label: 'Custom' },
] as const;