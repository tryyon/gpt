import { Metadata } from 'next';
import { SettingsOverview } from '@/page-sections/settings/SettingsOverview';

export const metadata: Metadata = {
  title: 'Settings | Admin Panel',
  description: 'Configure your store settings and preferences.',
};

export default function SettingsPage() {
  return <SettingsOverview />;
}