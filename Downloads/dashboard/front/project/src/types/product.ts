export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  barcode?: string;
  image?: string;
}

export interface SelectedProduct extends Product {
  quantity: number;
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
}

export interface ProductAttributes {
  material?: string;
  size?: string;
  color?: string;
}

export interface CreateProductInput {
  name: string;
  category: string;
  sku: string;
  barcode?: string;
  description?: string;
  weight?: number;
  dimensions?: Dimensions;
  attributes?: ProductAttributes;
  mrp: number;
  sellingPrice: number;
  wholesalePrice?: number;
  taxRate: number;
  minOrderQuantity?: number;
  maxOrderQuantity?: number;
  stock: number;
}