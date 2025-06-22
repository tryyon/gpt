export interface Duration {
  value: number;
  unit: 'Days' | 'Months' | 'Years';
}

export interface Warranty {
  id?: number;
  title: string;
  type: 'Warranty' | 'Guarantee' | 'Refund & Exchange';
  duration: Duration;
  description: string;
  isActive: boolean;
  dateCreated?: Date;
  conditions: string[];
}

export interface WarrantyType {
  value: 'Warranty' | 'Guarantee' | 'Refund & Exchange';
  label: string;
}

export interface DurationUnit {
  value: 'Days' | 'Months' | 'Years';
  label: string;
}