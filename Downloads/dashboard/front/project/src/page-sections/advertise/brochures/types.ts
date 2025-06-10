export interface ProductArea {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  productName: string;
  productUrl: string;
  price?: string;
}

export interface Brochure {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  productAreas: ProductArea[];
}