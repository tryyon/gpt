import { Warranty } from '../validations/warranty';

export const mockWarranties: Warranty[] = [
  {
    id: 1,
    title: 'Standard Product Warranty',
    type: 'Warranty',
    duration: {
      value: 1,
      unit: 'Years',
    },
    description: 'Standard manufacturer warranty covering defects in materials and workmanship.',
    conditions: [
      'Product must be used under normal conditions',
      'Warranty void if product is modified',
      'Original proof of purchase required',
    ],
    isActive: true,
    dateCreated: new Date('2024-03-15'),
  },
  {
    id: 2,
    title: 'Customer Satisfaction Policy',
    type: 'Refund & Exchange',
    duration: {
      value: 30,
      unit: 'Days',
    },
    description: 'Full refund or exchange if not satisfied with the product. Return shipping costs may apply.',
    conditions: [
      'Product must be in original condition',
      'All original packaging must be included',
      'Return shipping costs borne by customer',
      'Exchange subject to stock availability',
    ],
    isActive: true,
    dateCreated: new Date('2024-03-14'),
  },
  {
    id: 3,
    title: 'Extended Electronics Warranty',
    type: 'Warranty',
    duration: {
      value: 2,
      unit: 'Years',
    },
    description: 'Extended warranty coverage for electronic products including parts and labor.',
    conditions: [
      'Registration required within 30 days of purchase',
      'Covers electrical and mechanical failures',
      'Excludes accidental damage',
      'Professional service required',
    ],
    isActive: true,
    dateCreated: new Date('2024-03-13'),
  },
];