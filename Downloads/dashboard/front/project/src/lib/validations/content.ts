import { z } from 'zod';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const bannerSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().optional(),
  image: z.string().url('Invalid image URL'),
  link: z.string().url('Invalid link URL').optional(),
  isActive: z.boolean(),
  displayOrder: z.number().min(0),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

export const faqSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
  category: z.string().min(1, 'Category is required'),
  isActive: z.boolean(),
  displayOrder: z.number().min(0),
});

export const corporateInfoSchema = z.object({
  section: z.string().min(1, 'Section is required'),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  isActive: z.boolean(),
  displayOrder: z.number().min(0),
});

export const careerSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  department: z.string().min(1, 'Department is required'),
  location: z.string().min(1, 'Location is required'),
  type: z.enum(['full-time', 'part-time', 'contract', 'internship']),
  description: z.string().min(1, 'Description is required'),
  requirements: z.array(z.string()).min(1, 'At least one requirement is required'),
  responsibilities: z.array(z.string()).min(1, 'At least one responsibility is required'),
  isActive: z.boolean(),
  postedDate: z.date(),
});

export const brandAssetSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['logo', 'icon', 'banner', 'media_kit', 'style_guide', 'other']),
  category: z.enum(['primary', 'secondary', 'monochrome', 'social', 'print', 'web']),
  format: z.enum(['png', 'jpg', 'svg', 'pdf', 'ai', 'zip']),
  url: z.string().url('Invalid URL'),
  description: z.string().optional(),
  isActive: z.boolean(),
  dateAdded: z.date(),
  dimensions: z.object({
    width: z.number().optional(),
    height: z.number().optional(),
  }).optional(),
  fileSize: z.number().optional(), // in bytes
  tags: z.array(z.string()).optional(),
  version: z.string().optional(),
});

export const pressReleaseSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  publishDate: z.date(),
  isActive: z.boolean(),
  image: z.string().url('Invalid image URL').optional(),
  attachments: z.array(z.string()).optional(),
  brandAssets: z.array(z.string()).optional(), // References to brand assets
});

export const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  author: z.string().min(1, 'Author is required'),
  publishDate: z.date(),
  isPublished: z.boolean(),
  categories: z.array(z.string()).min(1, 'At least one category is required'),
  tags: z.array(z.string()),
  featuredImage: z.string().url('Invalid image URL').optional(),
});

export const directorSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  bio: z.string().min(1, 'Bio is required'),
  image: z.string().url('Invalid image URL'),
  order: z.number().min(0),
  isActive: z.boolean(),
  socialLinks: z.object({
    linkedin: z.string().url('Invalid LinkedIn URL').optional(),
    twitter: z.string().url('Invalid Twitter URL').optional(),
  }).optional(),
});

export const contactInfoSchema = z.object({
  type: z.enum(['email', 'phone', 'address', 'social']),
  label: z.string().min(1, 'Label is required'),
  value: z.string().min(1, 'Value is required'),
  isActive: z.boolean(),
  displayOrder: z.number().min(0),
});

export type Banner = z.infer<typeof bannerSchema>;
export type FAQ = z.infer<typeof faqSchema>;
export type CorporateInfo = z.infer<typeof corporateInfoSchema>;
export type Career = z.infer<typeof careerSchema>;
export type PressRelease = z.infer<typeof pressReleaseSchema>;
export type BlogPost = z.infer<typeof blogPostSchema>;
export type Director = z.infer<typeof directorSchema>;
export type ContactInfo = z.infer<typeof contactInfoSchema>;