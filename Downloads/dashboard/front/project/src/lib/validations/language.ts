import { z } from 'zod';

export const languageSchema = z.object({
  id: z.string().optional(),
  code: z.string()
    .min(2, 'Language code must be at least 2 characters')
    .max(5, 'Language code must not exceed 5 characters')
    .regex(/^[a-z-]+$/, 'Language code must be lowercase letters with optional hyphens'),
  name: z.string().min(2, 'Language name must be at least 2 characters'),
  nativeName: z.string().min(2, 'Native name must be at least 2 characters'),
  isDefault: z.boolean(),
  isActive: z.boolean(),
  direction: z.enum(['ltr', 'rtl']),
  dateFormat: z.string().min(1, 'Date format is required'),
  timeFormat: z.string().min(1, 'Time format is required'),
}).refine(data => {
  if (data.code.includes('-')) {
    const parts = data.code.split('-');
    return parts.length === 2 && parts[0].length >= 2 && parts[1].length === 2;
  }
  return true;
}, {
  message: "Invalid language code format. Use format like 'en' or 'en-us'",
  path: ["code"],
});

export type Language = z.infer<typeof languageSchema>;