import { z } from 'zod';

export const bankDetailsSchema = z.object({
  organizationId: z.string(),
  accountHolderName: z.string().min(1, 'Account holder name is required'),
  bankName: z.string().min(1, 'Bank name is required'),
  accountNumber: z.string().min(1, 'Account number is required'),
  accountType: z.enum(['Savings', 'Current']),
  ifscCode: z.string().min(1, 'IFSC code is required')
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code format'),
  branchName: z.string().min(1, 'Branch name is required'),
  branchAddress: z.string().min(1, 'Branch address is required'),
  swiftCode: z.string().optional(),
  upiId: z.string().optional(),
  isDefault: z.boolean().default(false)
});

export type BankDetailsData = z.infer<typeof bankDetailsSchema>;