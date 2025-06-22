import { z } from 'zod';

// Common validation patterns
const phoneRegex = /^\+?[1-9]\d{1,14}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// General Settings
export const generalSettingsSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  address: z.string().min(5, 'Address must be at least 5 characters').optional(),
  phone: z.string().regex(phoneRegex, 'Please enter a valid phone number').optional(),
  enableEmailNotifications: z.boolean(),
  enableSmsNotifications: z.boolean(),
  timezone: z.string(),
  dateFormat: z.string(),
  timeFormat: z.string(),
});

// Security Settings
export const securitySettingsSchema = z.object({
  currentPassword: z.string().min(8, 'Current password is required'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(passwordRegex, 'Password must contain uppercase, lowercase, number and special character'),
  confirmPassword: z.string()
    .min(8, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Notification Settings
export const notificationSettingsSchema = z.object({
  orderUpdates: z.boolean(),
  newCustomers: z.boolean(),
  productReviews: z.boolean(),
  securityAlerts: z.boolean(),
  systemUpdates: z.boolean(),
  newsletter: z.boolean(),
  emailDigest: z.enum(['daily', 'weekly', 'monthly', 'never']),
  pushNotifications: z.boolean(),
  desktopNotifications: z.boolean(),
});

// Tax Settings
export const taxSettingsSchema = z.object({
  enableAutomaticTax: z.boolean(),
  taxCalculationMethod: z.enum(['shipping', 'billing', 'store']),
  defaultTaxRate: z.number().min(0).max(100),
  enableTaxByRegion: z.boolean(),
  taxRoundingMethod: z.enum(['up', 'down', 'nearest']),
  displayPricesWithTax: z.boolean(),
  taxExemptCustomerGroups: z.array(z.string()),
});

// Export types
export type GeneralSettingsInput = z.infer<typeof generalSettingsSchema>;
export type SecuritySettingsInput = z.infer<typeof securitySettingsSchema>;
export type NotificationSettingsInput = z.infer<typeof notificationSettingsSchema>;
export type TaxSettingsInput = z.infer<typeof taxSettingsSchema>;