import { Packaging } from '../validations/packaging';

export const mockPackaging: Packaging[] = [
  {
    id: 1,
    name: 'Standard Box - Small',
    type: 'Box',
    dimensions: { length: 20, width: 15, height: 10 },
    weight: 100,
    material: 'Corrugated Cardboard',
    cost: 2.50,
    isActive: true,
    isDefault: true,
    description: 'Standard small box for lightweight items',
    dateCreated: new Date('2024-03-15'),
  },
  {
    id: 2,
    name: 'Poly Mailer',
    type: 'Envelope',
    dimensions: { length: 30, width: 25, height: 0.5 },
    weight: 20,
    material: 'Polyethylene',
    cost: 1.00,
    isActive: true,
    isDefault: false,
    description: 'Waterproof poly mailer for soft items',
    dateCreated: new Date('2024-03-14'),
  },
];