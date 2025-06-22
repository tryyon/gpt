import { FB_PIXEL_ID } from './config';

// Initialize Meta Pixel - Lazy load only when needed
export const initMetaPixel = () => {
  if (!FB_PIXEL_ID || typeof window === 'undefined') return;

  // Only load if not already loaded
  if (window._fbq) return;

  window._fbq = function() {
    // @ts-ignore
    window._fbq.callMethod ? window._fbq.callMethod.apply(window._fbq, arguments) : window._fbq.queue.push(arguments);
  };

  if (!window._fbq) window._fbq = window._fbq;
  window._fbq.push = window._fbq;
  window._fbq.loaded = true;
  window._fbq.version = '2.0';
  window._fbq.queue = [];

  window._fbq('init', FB_PIXEL_ID);
  window._fbq('track', 'PageView');

  // Dynamically load the script
  const script = document.createElement('script');
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  script.async = true;
  document.head.appendChild(script);

  const noscript = document.createElement('noscript');
  const img = document.createElement('img');
  img.height = 1;
  img.width = 1;
  img.style.display = 'none';
  img.src = `https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`;
  noscript.appendChild(img);
  document.head.appendChild(noscript);
};

// Track standard events
export const pixel = {
  pageView: (url: string) => {
    if (!window._fbq) {
      // Lazy initialize if not already done
      initMetaPixel();
      if (!window._fbq) return; // Exit if still not available
    }
    
    window._fbq('track', 'PageView', {
      page_path: url,
    });
  },

  viewContent: (product: any) => {
    if (!window._fbq) {
      initMetaPixel();
      if (!window._fbq) return;
    }
    
    window._fbq('track', 'ViewContent', {
      content_ids: [product.id],
      content_name: product.name,
      content_type: 'product',
      value: product.price,
      currency: 'USD',
    });
  },

  addToCart: (product: any, quantity: number) => {
    if (!window._fbq) {
      initMetaPixel();
      if (!window._fbq) return;
    }
    
    window._fbq('track', 'AddToCart', {
      content_ids: [product.id],
      content_name: product.name,
      value: product.price * quantity,
      currency: 'USD',
      contents: [{
        id: product.id,
        quantity,
      }],
    });
  },

  purchase: (order: any) => {
    if (!window._fbq) {
      initMetaPixel();
      if (!window._fbq) return;
    }
    
    window._fbq('track', 'Purchase', {
      content_ids: order.items.map((item: any) => item.id),
      content_type: 'product',
      value: order.total,
      currency: 'USD',
      num_items: order.items.length,
    });
  },

  // Custom conversions
  customEvent: (eventName: string, params: Record<string, any> = {}) => {
    if (!window._fbq) {
      initMetaPixel();
      if (!window._fbq) return;
    }
    
    window._fbq('trackCustom', eventName, params);
  },
};