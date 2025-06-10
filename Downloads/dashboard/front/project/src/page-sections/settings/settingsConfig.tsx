'use client';

import {
  Language,
  Security,
  Notifications,
  Payment,
  LocalShipping,
  Category,
  Collections,
  Group,
  Store,
  AccountBalance,
  Business,
  Domain,
  Settings,
  Inventory,
  CardGiftcard,
  QuestionAnswer,
  Search as SearchIcon,
  AttachMoney,
  Public,
  Translate,
  Policy,
  ShoppingCart,
  BrandingWatermark,
  Code as CodeIcon,
  ViewQuilt as ViewQuiltIcon,
  People as PeopleIcon,
  Tune as TuneIcon,
  Gavel as GavelIcon,
  Description as DescriptionIcon,
  PrivacyTip as PrivacyTipIcon,
  Assignment as AssignmentIcon,
  LocalShipping as ShippingIcon,
  AssignmentReturn as ReturnsIcon,
  Cookie as CookieIcon,
  Announcement as AnnouncementIcon,
  Accessibility as AccessibilityIcon,
  Security as SecurityPolicyIcon,
  History as HistoryIcon,
  ContactSupport as ContactSupportIcon,
  Work as CareersIcon,
  Article as PressIcon,
  Book as BlogIcon,
  Business as CorporateIcon,
  Campaign as CampaignIcon,
  CurrencyRupee as CurrencyRupeeIcon,
} from '@mui/icons-material';

export const settingsGroups = [
  {
    title: 'General Settings',
    items: [
      { name: 'Domains', icon: <Domain />, path: '/dashboard/settings/domains', description: 'Manage custom domains' },
      { name: 'Basic Details', icon: <Settings />, path: '/dashboard/settings/general', description: 'Configure basic store information' },
      { name: 'Organisation Details', icon: <Business />, path: '/dashboard/settings/organization', description: 'Manage company information' },
      { name: 'Bank Details', icon: <AccountBalance />, path: '/dashboard/settings/bank', description: 'Configure payment accounts' },
      { name: 'Brands', icon: <BrandingWatermark />, path: '/dashboard/settings/brands', description: 'Manage product brands' },
      { name: 'Warehouse', icon: <Store />, path: '/dashboard/settings/warehouse', description: 'Configure warehouse locations' },
      { name: 'Staff', icon: <PeopleIcon />, path: '/dashboard/settings/staff', description: 'Manage staff accounts and permissions' },
      { name: 'Advertise', icon: <CampaignIcon />, path: '/dashboard/advertise', description: 'Configure advertising campaigns' },
      { name: 'Commission', icon: <CurrencyRupeeIcon />, path: '/dashboard/commission', description: 'Manage commission payments' },
    ]
  },
  {
    title: 'CMS',
    items: [
      { name: 'Components', icon: <ViewQuiltIcon />, path: '/dashboard/cms/components', description: 'Manage reusable UI components' },
      { name: 'Code Editor', icon: <CodeIcon />, path: '/dashboard/cms/code-editor', description: 'Edit custom code' },
    ]
  },
  {
    title: 'Category Management',
    items: [
      { name: 'Root Category', icon: <Category />, path: '/dashboard/settings/root-category', description: 'Manage top-level categories' },
      { name: 'Main Category', icon: <Category />, path: '/dashboard/settings/main-category', description: 'Manage main categories' },
      { name: 'Child Category', icon: <Category />, path: '/dashboard/settings/child-category', description: 'Manage child categories' },
      { name: 'Collections', icon: <Collections />, path: '/dashboard/settings/collections', description: 'Manage product collections' },
      { name: 'Groups', icon: <Group />, path: '/dashboard/settings/groups', description: 'Manage customer groups' },
    ]
  },
  {
    title: 'Product Settings',
    items: [
      { name: 'Product Contents', icon: <Inventory />, path: '/dashboard/settings/product-contents', description: 'Configure product contents' },
      { name: 'Size Chart', icon: <Category />, path: '/dashboard/settings/size-chart', description: 'Manage size charts' },
      { name: 'Warranty & Guarantee', icon: <Security />, path: '/dashboard/settings/warranty', description: 'Configure warranty policies' },
      { name: 'Packaging', icon: <Inventory />, path: '/dashboard/settings/packaging', description: 'Manage packaging options' },
      { name: 'Gift Wrapping', icon: <CardGiftcard />, path: '/dashboard/settings/gift-wrapping', description: 'Configure gift wrapping' },
      { name: 'Q&A', icon: <QuestionAnswer />, path: '/dashboard/settings/qa', description: 'Manage product Q&A' },
      { name: 'Modifier Options', icon: <TuneIcon />, path: '/dashboard/settings/modifiers', description: 'Configure product modifiers' },
    ]
  },
  {
    title: 'Commerce Settings',
    items: [
      { name: 'Shipping', icon: <LocalShipping />, path: '/dashboard/settings/shipping', description: 'Configure shipping options' },
      { name: 'Payments', icon: <Payment />, path: '/dashboard/settings/payments', description: 'Manage payment methods' },
      { name: 'Checkout', icon: <ShoppingCart />, path: '/dashboard/settings/checkout', description: 'Configure checkout process' },
      { name: 'Tax', icon: <AttachMoney />, path: '/dashboard/settings/tax', description: 'Manage tax settings' },
    ]
  },
  {
    title: 'System Settings',
    items: [
      { name: 'Security', icon: <Security />, path: '/dashboard/settings/security', description: 'Configure security settings' },
      { name: 'Notifications', icon: <Notifications />, path: '/dashboard/settings/notifications', description: 'Manage notification preferences' },
      { name: 'Social', icon: <Public />, path: '/dashboard/settings/social', description: 'Configure social media integrations' },
      { name: 'SEO', icon: <SearchIcon />, path: '/dashboard/settings/seo', description: 'Optimize search engine settings' },
      { name: 'Languages', icon: <Translate />, path: '/dashboard/settings/languages', description: 'Manage store languages' },
      { name: 'Currencies', icon: <Language />, path: '/dashboard/settings/currencies', description: 'Configure currency options' },
      { 
        name: 'Policies', 
        icon: <GavelIcon />, 
        path: '/dashboard/settings/policies',
        description: 'Manage legal policies',
        subItems: [
          { name: 'Terms & Conditions', icon: <DescriptionIcon />, path: '/dashboard/settings/policies/terms', description: 'Manage terms of service' },
          { name: 'Privacy Policy', icon: <PrivacyTipIcon />, path: '/dashboard/settings/policies/privacy', description: 'Configure privacy policy' },
          { name: 'Shipping Policy', icon: <ShippingIcon />, path: '/dashboard/settings/policies/shipping', description: 'Set shipping policies' },
          { name: 'Returns Policy', icon: <ReturnsIcon />, path: '/dashboard/settings/policies/returns', description: 'Configure returns policy' },
          { name: 'Cookie Policy', icon: <CookieIcon />, path: '/dashboard/settings/policies/cookies', description: 'Manage cookie policy' },
          { name: 'Disclaimer', icon: <AnnouncementIcon />, path: '/dashboard/settings/policies/disclaimer', description: 'Set legal disclaimers' },
          { name: 'Accessibility', icon: <AccessibilityIcon />, path: '/dashboard/settings/policies/accessibility', description: 'Configure accessibility policy' },
          { name: 'Security', icon: <SecurityPolicyIcon />, path: '/dashboard/settings/policies/security', description: 'Manage security policy' },
        ]
      },
      { name: 'Our Story', icon: <HistoryIcon />, path: '/dashboard/settings/our-story', description: 'Edit your company story' },
      { name: 'FAQ', icon: <ContactSupportIcon />, path: '/dashboard/settings/faq', description: 'Manage frequently asked questions' },
      { name: 'Contact Us', icon: <ContactSupportIcon />, path: '/dashboard/settings/contact-us', description: 'Configure contact information' },
      { name: 'Careers', icon: <CareersIcon />, path: '/dashboard/settings/careers', description: 'Manage career listings' },
      { name: 'Press', icon: <PressIcon />, path: '/dashboard/settings/press', description: 'Configure press information' },
      { name: 'Blog', icon: <BlogIcon />, path: '/dashboard/settings/blog', description: 'Manage blog settings' },
      { name: 'Corporate Info', icon: <CorporateIcon />, path: '/dashboard/settings/corporate', description: 'Edit corporate information' },
    ]
  },
];