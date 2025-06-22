export interface Dimensions {
  length: number;
  width: number;
  height: number;
}

export interface GiftWrapping {
  id?: number;
  name: string;
  description: string;
  price: number;
  type: 'Paper' | 'Box' | 'Bag' | 'Ribbon' | 'Custom';
  color: string;
  isActive: boolean;
  isDefault: boolean;
  maxDimensions: Dimensions;
  image?: File | null;
  imageUrl?: string;
  dateCreated?: Date;
}

export interface WrappingType {
  value: 'Paper' | 'Box' | 'Bag' | 'Ribbon' | 'Custom';
  label: string;
}