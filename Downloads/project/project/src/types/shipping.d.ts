export interface ShippingPartner {
  name: string;
  apiKey: string;
  password: string;
}

export interface AverageDeliveryTime {
  unit: 'hours' | 'days';
  value: string;
}

export interface ShippingSettings {
  freeShippingThreshold?: string;
  fixedShippingType?: 'order' | 'product';
  fixedShippingAmount?: string;
  expressShippingType?: 'order' | 'product';
  expressShippingAmount?: string;
  codExtraCharge?: string;
  codPartialAdvance?: string;
  averageDeliveryTimes?: AverageDeliveryTime[];
  shippingPartners?: ShippingPartner[];
}

export interface BooleanSettings {
  freeShippingEnabled: boolean;
  fixedShippingEnabled: boolean;
  expressShippingEnabled: boolean;
  integratedShipping: boolean;
  pickupInStore: boolean;
  codEnabled: boolean;
  averageDeliveryTimeEnabled: boolean;
}