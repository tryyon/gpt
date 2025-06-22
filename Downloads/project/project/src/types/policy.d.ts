export type PolicyType = 'privacy' | 'terms' | 'shipping' | 'returns' | 'cookies' | 'disclaimer';

export interface Policy {
  id?: string;
  title: string;
  type: PolicyType;
  content: string;
  isActive: boolean;
  lastUpdated: Date;
  version: string;
  isRequired: boolean;
  displayOrder: number;
}