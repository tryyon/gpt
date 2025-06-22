export interface GroupRequirements {
  minOrderValue: number;
  minOrderQuantity: number;
  maxDiscountAmount?: number;
}

export interface Group {
  id?: number;
  title: string;
  description: string;
  type: 'Retail' | 'Wholesale' | 'Reseller';
  subType: string;
  isCustomSubType: boolean;
  discountPercentage: number;
  isActive: boolean;
  requirements: GroupRequirements;
}