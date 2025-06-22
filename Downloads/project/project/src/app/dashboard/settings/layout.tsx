import { SettingsLayout } from '@/page-sections/settings/SettingsLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SettingsLayout>{children}</SettingsLayout>;
}