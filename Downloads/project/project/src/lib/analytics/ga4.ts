import { GA_TRACKING_ID, ANALYTICS_EVENTS } from './config';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    _fbq: any;
  }
}

// Initialize GA4 - Lazy load only when needed
export const initGA4 = () => {
  if (!GA_TRACKING_ID || typeof window === 'undefined') return;

  // Only load if not already loaded
  if (typeof window.gtag === 'function') return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    page_path: window.location.pathname,
    send_page_view: false, // We'll handle this manually
  });

  // Dynamically load the script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  script.async = true;
  document.head.appendChild(script);
};

// Track page views
export const pageview = (url: string, title?: string) => {
  if (!window.gtag) {
    // Lazy initialize if not already done
    initGA4();
    if (!window.gtag) return; // Exit if still not available
  }
  
  window.gtag('event', ANALYTICS_EVENTS.PAGE_VIEW, {
    page_path: url,
    page_title: title,
    page_location: window.location.href,
  });
};

// Track ecommerce events
export const trackEcommerceEvent = (
  eventName: string,
  eventParams: Record<string, any>
) => {
  if (!window.gtag) {
    // Lazy initialize if not already done
    initGA4();
    if (!window.gtag) return; // Exit if still not available
  }

  window.gtag('event', eventName, {
    ...eventParams,
    send_to: GA_TRACKING_ID,
  });
};

// Track user properties
export const setUserProperties = (properties: Record<string, any>) => {
  if (!window.gtag) {
    // Lazy initialize if not already done
    initGA4();
    if (!window.gtag) return; // Exit if still not available
  }

  window.gtag('set', 'user_properties', properties);
};

// Enhanced ecommerce tracking
export const ecommerce = {
  viewItem: (product: any) => {
    trackEcommerceEvent(ANALYTICS_EVENTS.VIEW_ITEM, {
      currency: 'USD',
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        quantity: 1,
      }],
    });
  },

  addToCart: (product: any, quantity: number) => {
    trackEcommerceEvent(ANALYTICS_EVENTS.ADD_TO_CART, {
      currency: 'USD',
      value: product.price * quantity,
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        quantity,
      }],
    });
  },

  purchase: (order: any) => {
    trackEcommerceEvent(ANALYTICS_EVENTS.PURCHASE, {
      transaction_id: order.id,
      value: order.total,
      currency: 'USD',
      tax: order.tax,
      shipping: order.shipping,
      items: order.items.map((item: any) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    });
  },

  refund: (order: any, fullRefund: boolean = true, items?: any[]) => {
    trackEcommerceEvent(ANALYTICS_EVENTS.REFUND, {
      transaction_id: order.id,
      value: fullRefund ? order.total : items?.reduce((sum, item) => sum + item.price * item.quantity, 0),
      currency: 'USD',
      items: fullRefund ? order.items : items,
    });
  },
};