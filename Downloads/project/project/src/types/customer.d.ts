export interface AddressData {
  street?: string;
  pincode?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface CustomerFormData {
  name: string;
  phone: string;
  email?: string;
  gstType?: 'unregistered' | 'regular' | 'composition';
  gstNumber?: string;
  billingAddress?: AddressData;
  shippingAddress?: AddressData;
}

export interface GSTType {
  value: string;
  label: string;
}