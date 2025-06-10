import { GiftWrapping } from '../validations/giftWrapping';

export const mockGiftWrapping: GiftWrapping[] = [
  {
    id: 1,
    name: 'Premium Gift Box',
    description: 'Elegant gift box with gold ribbon accent',
    price: 5.99,
    type: 'Box',
    color: 'Gold',
    isActive: true,
    isDefault: true,
    maxDimensions: {
      length: 30,
      width: 20,
      height: 15,
    },
    imageUrl: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=400',
    dateCreated: new Date('2024-03-15'),
  },
  {
    id: 2,
    name: 'Festive Gift Wrap',
    description: 'Colorful wrapping paper with holiday patterns',
    price: 2.99,
    type: 'Paper',
    color: 'Multi',
    isActive: true,
    isDefault: false,
    maxDimensions: {
      length: 100,
      width: 70,
      height: 0,
    },
    imageUrl: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=400',
    dateCreated: new Date('2024-03-14'),
  },
];