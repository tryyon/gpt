export interface OrganizationData {
  companyName: string;
  companyType: 'private_limited' | 'public_limited' | 'llp' | 'partnership' | 'proprietorship';
  yearEstablished?: string;
  employeeCount?: string;
  website?: string;
  logo?: string;
  registrationNumber?: string;
  taxId?: string;
  vatNumber?: string;
  legalAddress?: string;
  registeredState?: string;
  incorporationDate?: string;
  gstCertificates?: string[];
  socialProfiles?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}