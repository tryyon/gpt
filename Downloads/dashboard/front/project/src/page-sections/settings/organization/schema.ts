import { z } from 'zod';

export const organizationSchema = z.object({
  // Company Information
  companyName: z.string().min(1, 'Company name is required'),
  companyType: z.enum(['private_limited', 'public_limited', 'llp', 'partnership', 'proprietorship']).optional(),
  yearEstablished: z.string()
    .regex(/^\d{4}$/, 'Invalid year')
    .refine((val) => {
      const year = parseInt(val);
      const currentYear = new Date().getFullYear();
      return year >= 1900 && year <= currentYear;
    }, 'Invalid year')
    .optional(),
  employeeCount: z.string().optional(),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  logo: z.string().url('Invalid logo URL').optional().or(z.literal('')),

  // Legal Information
  registrationNumber: z.string().optional(),
  taxId: z.string().optional(),
  panNumber: z.string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number format')
    .optional(),
  vatNumber: z.string().optional(),
  legalAddress: z.string().optional(),
  registeredState: z.string().optional(),
  incorporationDate: z.string().optional(),
  gstCertificates: z.array(z.string()).optional(),

  // Social Profiles
  socialProfiles: z.object({
    facebook: z.string().url('Invalid Facebook URL').optional().or(z.literal('')),
    twitter: z.string().url('Invalid Twitter URL').optional().or(z.literal('')),
    linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
    instagram: z.string().url('Invalid Instagram URL').optional().or(z.literal('')),
  }).optional(),
});

export type OrganizationData = z.infer<typeof organizationSchema>;