export interface Dimensions {
  length: number;
  width: number;
  height: number;
}

export interface Packaging {
  id?: number;
  name: string;
  type: 'Box' | 'Envelope' | 'Bag' | 'Tube' | 'Custom';
  dimensions: Dimensions;
  weight: number;
  material: string;
  cost: number;
  isActive: boolean;
  isDefault: boolean;
  description?: string;
  dateCreated?: Date;
}

export interface PackagingType {
  value: 'Box' | 'Envelope' | 'Bag' | 'Tube' | 'Custom';
  label: string;
}