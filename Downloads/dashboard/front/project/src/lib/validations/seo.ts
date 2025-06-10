import { z } from 'zod';

export const seoSettingsSchema = z.object({
  defaultTitle: z.string()
    .min(1, 'Default title is required')
    .max(60, 'Title should not exceed 60 characters'),
  defaultDescription: z.string()
    .min(1, 'Default description is required')
    .max(160, 'Description should not exceed 160 characters'),
  defaultKeywords: z.string()
    .min(1, 'Default keywords are required')
    .max(500, 'Keywords should not exceed 500 characters'),
  robotsTxt: z.string()
    .min(1, 'Robots.txt content is required')
    .max(10000, 'Robots.txt content is too long'),
  sitemapEnabled: z.boolean(),
  canonicalUrlEnabled: z.boolean(),
  socialMetaEnabled: z.boolean(),
});

export type SEOSettings = z.infer<typeof seoSettingsSchema>;