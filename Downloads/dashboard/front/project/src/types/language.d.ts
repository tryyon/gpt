export interface Language {
  id?: string;
  code: string;
  name: string;
  nativeName: string;
  isDefault: boolean;
  isActive: boolean;
  direction: 'ltr' | 'rtl';
  dateFormat: string;
  timeFormat: string;
}