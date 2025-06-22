import { SizeChart } from '../validations/sizeChart';

export const mockSizeCharts: SizeChart[] = [
  {
    id: 1,
    title: "Men's T-Shirt Size Guide",
    description: 'Standard size measurements for men\'s t-shirts including chest, length, and shoulder width.',
    categories: ['Men\'s Clothing', 'T-Shirts'],
    columns: ['Size', 'Chest (cm)', 'Length (cm)', 'Shoulder (cm)'],
    rows: [
      { cells: [{ value: 'S' }, { value: '96-101' }, { value: '69' }, { value: '44' }] },
      { cells: [{ value: 'M' }, { value: '101-106' }, { value: '71' }, { value: '46' }] },
      { cells: [{ value: 'L' }, { value: '106-111' }, { value: '73' }, { value: '48' }] },
      { cells: [{ value: 'XL' }, { value: '111-116' }, { value: '75' }, { value: '50' }] },
    ],
    isActive: true,
    dateCreated: new Date('2024-03-15'),
  },
  {
    id: 2,
    title: "Women's Dress Size Chart",
    description: 'Comprehensive size guide for women\'s dresses with bust, waist, and hip measurements.',
    categories: ['Women\'s Clothing', 'Dresses'],
    columns: ['Size', 'Bust (cm)', 'Waist (cm)', 'Hip (cm)', 'Length (cm)'],
    rows: [
      { cells: [{ value: 'XS' }, { value: '82' }, { value: '64' }, { value: '88' }, { value: '95' }] },
      { cells: [{ value: 'S' }, { value: '86' }, { value: '68' }, { value: '92' }, { value: '96' }] },
      { cells: [{ value: 'M' }, { value: '90' }, { value: '72' }, { value: '96' }, { value: '97' }] },
      { cells: [{ value: 'L' }, { value: '94' }, { value: '76' }, { value: '100' }, { value: '98' }] },
    ],
    isActive: true,
    dateCreated: new Date('2024-03-14'),
  },
];