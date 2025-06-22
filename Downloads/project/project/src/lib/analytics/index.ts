import { initGA4, pageview as gaPageview, trackEcommerceEvent, ecommerce } from './ga4';
import { initMetaPixel, pixel } from './meta-pixel';
import { salesAnalytics } from './sales';
import { ANALYTICS_EVENTS, USER_PROPERTIES } from './config';

// Initialize all analytics - Lazy loading approach
export const initAnalytics = () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // Only initialize in production
    initGA4();
    initMetaPixel();
  }
};

// Unified analytics API
export const analytics = {
  // Initialize
  initAnalytics,

  // Page views
  pageview: (url: string, title?: string) => {
    if (process.env.NODE_ENV !== 'production') return;
    gaPageview(url, title);
    pixel.pageView(url);
  },

  // Ecommerce events
  ecommerce: {
    viewProduct: (product: any) => {
      if (process.env.NODE_ENV !== 'production') return;
      ecommerce.viewItem(product);
      pixel.viewContent(product);
    },

    addToCart: (product: any, quantity: number) => {
      if (process.env.NODE_ENV !== 'production') return;
      ecommerce.addToCart(product, quantity);
      pixel.addToCart(product, quantity);
    },

    purchase: (order: any) => {
      if (process.env.NODE_ENV !== 'production') return;
      ecommerce.purchase(order);
      pixel.purchase(order);
      salesAnalytics.trackRevenue(order);
    },

    refund: (order: any, fullRefund: boolean = true, items?: any[]) => {
      if (process.env.NODE_ENV !== 'production') return;
      ecommerce.refund(order, fullRefund, items);
      salesAnalytics.trackRefund(order, fullRefund ? order.total : items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0);
    },
  },

  // User properties
  setUserProperties: (properties: Record<string, any>) => {
    if (process.env.NODE_ENV !== 'production') return;
    trackEcommerceEvent('set_user_properties', properties);
  },

  // Custom events
  track: (eventName: string, params: Record<string, any> = {}) => {
    if (process.env.NODE_ENV !== 'production') return;
    trackEcommerceEvent(eventName, params);
    pixel.customEvent(eventName, params);
  },

  // Sales analytics
  sales: salesAnalytics,
};

// Export events and properties
export { ANALYTICS_EVENTS, USER_PROPERTIES };