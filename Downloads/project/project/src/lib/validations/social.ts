import { z } from 'zod';

const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

export const socialSettingsSchema = z.object({
  facebook: z.string().regex(urlRegex, 'Invalid URL format').optional().or(z.literal('')),
  twitter: z.string().regex(urlRegex, 'Invalid URL format').optional().or(z.literal('')),
  instagram: z.string().regex(urlRegex, 'Invalid URL format').optional().or(z.literal('')),
  pinterest: z.string().regex(urlRegex, 'Invalid URL format').optional().or(z.literal('')),
  youtube: z.string().regex(urlRegex, 'Invalid URL format').optional().or(z.literal('')),
  tiktok: z.string().regex(urlRegex, 'Invalid URL format').optional().or(z.literal('')),
  enableSharing: z.boolean(),
  enableSocialLogin: z.boolean(),
  facebookAppId: z.string().optional().or(z.literal('')),
  twitterHandle: z.string()
    .regex(/^@?[a-zA-Z0-9_]{1,15}$/, 'Invalid Twitter handle')
    .optional()
    .or(z.literal('')),
});

export type SocialSettings = z.infer<typeof socialSettingsSchema>;