export interface Dimensions {
  length: number;
  width: number;
  height: number;
}

export interface Item {
  name: string;
  dimensions: Dimensions;
  weight: number;
}

export interface ProductContent {
  id?: number;
  title: string;
  items: Item[];
  dateCreated: Date;
  status: 'Enabled' | 'Disabled' | 'Archived';
}