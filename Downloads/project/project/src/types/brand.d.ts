export interface Organization {
  id: string;
  name: string;
}

export interface BrandFormData {
  brandName: string;
  yearsOfOperation: number;
  manufacturerName: string;
  manufacturerContactNumber: string;
  manufacturerAddress: string;
  packerAddressAndContactDetails: string;
  earthFriendly: boolean;
  natureOfBusiness: 'distributor' | 'brand_manufacturer' | 'brand_owner' | 'exporter' | 'manufacturer';
  categories: {
    rootCategory: string;
    mainCategory: string;
    childCategory: string;
  }[];
  organizations: string[];
  description?: string;
  logo?: File;
  catalog?: File;
  trademarkCertificate?: File;
}

export interface BusinessOption {
  value: string;
  label: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface CategoryMap {
  [key: string]: Category[];
}