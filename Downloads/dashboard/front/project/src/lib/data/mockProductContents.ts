import { ProductContent } from '../validations/productContent';

export const mockProductContents: ProductContent[] = [
  {
    id: 1,
    title: 'Basic T-Shirt Package',
    items: [
      {
        name: 'T-Shirt',
        dimensions: {
          length: 70,
          width: 50,
          height: 1,
        },
        weight: 180,
      },
      {
        name: 'Packaging Box',
        dimensions: {
          length: 25,
          width: 20,
          height: 5,
        },
        weight: 50,
      }
    ],
    dateCreated: new Date('2024-03-15'),
    status: 'Enabled',
  },
  {
    id: 2,
    title: 'Smartphone Bundle',
    items: [
      {
        name: 'Smartphone',
        dimensions: {
          length: 15.5,
          width: 7.5,
          height: 0.8,
        },
        weight: 180,
      },
      {
        name: 'Charger',
        dimensions: {
          length: 8,
          width: 5,
          height: 3,
        },
        weight: 120,
      },
      {
        name: 'Earphones',
        dimensions: {
          length: 10,
          width: 5,
          height: 2,
        },
        weight: 30,
      },
      {
        name: 'Product Box',
        dimensions: {
          length: 18,
          width: 10,
          height: 6,
        },
        weight: 100,
      }
    ],
    dateCreated: new Date('2024-03-14'),
    status: 'Enabled',
  },
  {
    id: 3,
    title: 'Running Shoes Package',
    items: [
      {
        name: 'Running Shoes',
        dimensions: {
          length: 32,
          width: 20,
          height: 12,
        },
        weight: 650,
      },
      {
        name: 'Shoe Box',
        dimensions: {
          length: 35,
          width: 22,
          height: 14,
        },
        weight: 200,
      },
      {
        name: 'Silica Gel Pack',
        dimensions: {
          length: 5,
          width: 3,
          height: 0.5,
        },
        weight: 10,
      }
    ],
    dateCreated: new Date('2024-03-13'),
    status: 'Enabled',
  },
  {
    id: 4,
    title: 'Laptop Packaging',
    items: [
      {
        name: 'Laptop',
        dimensions: {
          length: 35,
          width: 25,
          height: 2,
        },
        weight: 1800,
      },
      {
        name: 'Charger',
        dimensions: {
          length: 15,
          width: 6,
          height: 6,
        },
        weight: 300,
      },
      {
        name: 'User Manual',
        dimensions: {
          length: 20,
          width: 15,
          height: 0.5,
        },
        weight: 50,
      },
      {
        name: 'Laptop Box',
        dimensions: {
          length: 45,
          width: 35,
          height: 10,
        },
        weight: 500,
      }
    ],
    dateCreated: new Date('2024-03-12'),
    status: 'Disabled',
  },
  {
    id: 5,
    title: 'Watch Gift Set',
    items: [
      {
        name: 'Watch',
        dimensions: {
          length: 8,
          width: 4,
          height: 1,
        },
        weight: 150,
      },
      {
        name: 'Extra Strap',
        dimensions: {
          length: 20,
          width: 2,
          height: 0.5,
        },
        weight: 30,
      },
      {
        name: 'Gift Box',
        dimensions: {
          length: 12,
          width: 8,
          height: 6,
        },
        weight: 100,
      }
    ],
    dateCreated: new Date('2024-03-11'),
    status: 'Archived',
  }
];