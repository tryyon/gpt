export interface GeneralSettingsInput {
  companyName: string;
  email: string;
  address?: string;
  enableEmailNotifications: boolean;
  enableSmsNotifications: boolean;
}

export interface SecuritySettingsInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface NotificationSettingsInput {
  orderUpdates: boolean;
  newCustomers: boolean;
  productReviews: boolean;
  securityAlerts: boolean;
  systemUpdates: boolean;
  newsletter: boolean;
}

export interface SEOSettings {
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string;
  robotsTxt: string;
  sitemapEnabled: boolean;
  canonicalUrlEnabled: boolean;
  socialMetaEnabled: boolean;
}

export interface SocialSettings {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  pinterest?: string;
  youtube?: string;
  tiktok?: string;
  enableSharing: boolean;
  enableSocialLogin: boolean;
  facebookAppId?: string;
  twitterHandle?: string;
}