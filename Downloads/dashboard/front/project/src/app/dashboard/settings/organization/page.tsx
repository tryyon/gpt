import { Metadata } from 'next';
import { OrganizationDetails } from '@/page-sections/settings/organization/OrganizationDetails';

export const metadata: Metadata = {
  title: 'Organization Details | Admin Panel',
  description: 'Manage your organization profile and settings.',
};

export default function OrganizationPage() {
  return <OrganizationDetails />;
}