import { z } from 'zod';

export const shippingPartnerSchema = z.object({
  name: z.string().min(1, 'Shipping partner name is required'),
  apiKey: z.string().min(1, 'API key is required'),
  password: z.string().min(1, 'Password is required'),
});

export const averageDeliveryTimeSchema = z.object({
  unit: z.enum(['hours', 'days'], {
    required_error: 'Delivery time unit is required',
  }),
  value: z.string().min(1, 'Average delivery time is required'),
});

export const shippingSettingsSchema = z.object({
  freeShippingThreshold: z.string().optional(),
  fixedShippingType: z.enum(['order', 'product']).optional(),
  fixedShippingAmount: z.string().optional(),
  expressShippingType: z.enum(['order', 'product']).optional(),
  expressShippingAmount: z.string().optional(),
  codExtraCharge: z.string().optional(),
  codPartialAdvance: z.string().optional(),
  averageDeliveryTimes: z.array(averageDeliveryTimeSchema).optional(),
  shippingPartners: z.array(shippingPartnerSchema).optional(),
}).superRefine((data, ctx) => {
  if (data.freeShippingThreshold && isNaN(Number(data.freeShippingThreshold))) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Must be a valid number',
      path: ['freeShippingThreshold'],
    });
  }

  if (data.fixedShippingAmount && isNaN(Number(data.fixedShippingAmount))) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Must be a valid number',
      path: ['fixedShippingAmount'],
    });
  }

  if (data.expressShippingAmount && isNaN(Number(data.expressShippingAmount))) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Must be a valid number',
      path: ['expressShippingAmount'],
    });
  }

  if (data.codExtraCharge && isNaN(Number(data.codExtraCharge))) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Must be a valid number',
      path: ['codExtraCharge'],
    });
  }

  if (data.codPartialAdvance && isNaN(Number(data.codPartialAdvance))) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Must be a valid number',
      path: ['codPartialAdvance'],
    });
  }
});

export type ShippingSettings = z.infer<typeof shippingSettingsSchema>;
export type ShippingPartner = z.infer<typeof shippingPartnerSchema>;
export type AverageDeliveryTime = z.infer<typeof averageDeliveryTimeSchema>;

export interface BooleanSettings {
  freeShippingEnabled: boolean;
  fixedShippingEnabled: boolean;
  expressShippingEnabled: boolean;
  integratedShipping: boolean;
  pickupInStore: boolean;
  codEnabled: boolean;
  averageDeliveryTimeEnabled: boolean;
}