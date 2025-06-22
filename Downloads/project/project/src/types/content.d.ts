export interface Banner {
  id?: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  isActive: boolean;
  displayOrder: number;
  startDate?: Date;
  endDate?: Date;
}

export interface FAQ {
  id?: string;
  question: string;
  answer: string;
  category: string;
  isActive: boolean;
  displayOrder: number;
}

export interface Career {
  id?: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  description: string;
  requirements: { value: string }[];
  responsibilities: { value: string }[];
  isActive: boolean;
  postedDate: Date;
}

export interface PressRelease {
  id?: string;
  title: string;
  content: string;
  publishDate: Date;
  isActive: boolean;
  image?: string;
  attachments?: string[];
}

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  publishDate: Date;
  isPublished: boolean;
  categories: string[];
  tags: string[];
  featuredImage?: string;
}

export interface ContactInfo {
  id?: string;
  type: 'email' | 'phone' | 'address' | 'social';
  label: string;
  value: string;
  isActive: boolean;
  displayOrder: number;
}

export interface CorporateInfo {
  id?: string;
  section: string;
  title: string;
  content: string;
  isActive: boolean;
  displayOrder: number;
}