// Analytics Configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

// Standard ecommerce events
export const ANALYTICS_EVENTS = {
  PAGE_VIEW: 'page_view',
  VIEW_ITEM: 'view_item',
  ADD_TO_CART: 'add_to_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  BEGIN_CHECKOUT: 'begin_checkout',
  ADD_PAYMENT_INFO: 'add_payment_info',
  PURCHASE: 'purchase',
  REFUND: 'refund',
  VIEW_CART: 'view_cart',
  ADD_TO_WISHLIST: 'add_to_wishlist',
  VIEW_ITEM_LIST: 'view_item_list',
  SELECT_ITEM: 'select_item',
  LOGIN: 'login',
  SIGN_UP: 'sign_up',
  // Custom events
  FILTER_PRODUCTS: 'filter_products',
  SORT_PRODUCTS: 'sort_products',
  SEARCH_PRODUCTS: 'search_products',
  APPLY_COUPON: 'apply_coupon',
  REMOVE_COUPON: 'remove_coupon',
  UPDATE_CART: 'update_cart',
  INITIATE_RETURN: 'initiate_return',
  COMPLETE_RETURN: 'complete_return',
} as const;

// User properties to track
export const USER_PROPERTIES = {
  USER_TYPE: 'user_type',
  ACCOUNT_TYPE: 'account_type',
  CUSTOMER_TIER: 'customer_tier',
  TOTAL_ORDERS: 'total_orders',
  TOTAL_SPENT: 'total_spent',
  LAST_PURCHASE_DATE: 'last_purchase_date',
  PREFERRED_PAYMENT_METHOD: 'preferred_payment_method',
  PREFERRED_SHIPPING_METHOD: 'preferred_shipping_method',
} as const;

// Conversion goals
export const CONVERSION_GOALS = {
  PURCHASE: {
    name: 'purchase',
    value: 'total_amount',
    currency: 'currency',
  },
  SIGNUP: {
    name: 'sign_up',
    value: 0,
  },
  ADD_TO_CART: {
    name: 'add_to_cart',
    value: 'item_value',
  },
} as const;

// Custom dimensions
export const CUSTOM_DIMENSIONS = {
  CUSTOMER_SEGMENT: 'customer_segment',
  PRODUCT_CATEGORY: 'product_category',
  ORDER_STATUS: 'order_status',
  PAYMENT_METHOD: 'payment_method',
  SHIPPING_METHOD: 'shipping_method',
  DEVICE_TYPE: 'device_type',
  USER_REGION: 'user_region',
} as const;