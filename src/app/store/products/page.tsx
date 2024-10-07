import { atom } from 'recoil';

// Define the shape of the general product details
export interface General {
  isMarketplace: boolean;
  language: string;
  brandname: string;
  manufacturer: string;
  supplier: string;
  productName: string;
  switch: boolean;
}

// Define the shape of the additional fields
export interface AdditionalFields {
  additionalFields: boolean;
  manufacturer: string;
  supplier: string;
  country: string;
  importer: string;
  language: string;
}

// Define the shape of the product identifier fields
export interface ProductIdentifier {
  barcode: string;
  hsnNo: string;
  manufacturerPartNo: string;
  binPickingNumber: string;
  globalTradeItemNumber: string;
  keywords: string;
}

// Default values for the general product details
export const defaultProduct2: General = {
  isMarketplace: false,
  language: 'english',  // Default value for language
  brandname: 'pepsi',   // Default brand
  manufacturer: 'Default Manufacturer', // Change this as necessary
  supplier: 'supplier1',  // Default supplier
  productName: '',  // Initially empty product name
  switch: false,    // Default switch state is 'off'
};

// Default values for the additional fields
export const defaultAdditionalFields: AdditionalFields = {
  additionalFields: false,
  manufacturer: '',
  supplier: '',
  country: '',
  importer: '',
  language: '',
};

// Default values for the product identifier fields
export const defaultProductIdentifier: ProductIdentifier = {
  barcode: '',
  hsnNo: '',
  manufacturerPartNo: '',
  binPickingNumber: '',
  globalTradeItemNumber: '',
  keywords: '',
};

// Recoil atom for managing the general product details state
export const createProductState2 = atom<General>({
  key: 'createProductState2',  // Unique key for this atom
  default: defaultProduct2,    // Initial state
});

// Recoil atom for managing the additional fields state
export const additionalFieldsState = atom<AdditionalFields>({
  key: 'additionalFieldsState',  // Unique key for this atom
  default: defaultAdditionalFields, // Initial state
});

// Recoil atom for managing the product identifier fields state
export const productIdentifierState = atom<ProductIdentifier>({
  key: 'productIdentifierState',  // Unique key for this atom
  default: defaultProductIdentifier, // Initial state
});
