import { Metadata } from 'next';
import { LandingPage } from '@/page-sections/landing/LandingPage';

export const metadata: Metadata = {
  title: 'Welcome | Admin Dashboard',
  description: 'Powerful admin dashboard for managing your e-commerce store.',
  keywords: ['admin', 'dashboard', 'ecommerce', 'management', 'store'],
  authors: [{ name: 'Your Company Name' }],
};

export default async function HomePage() {
  return <LandingPage />;
}