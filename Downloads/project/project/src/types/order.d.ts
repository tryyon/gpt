export interface Order {
  id: number;
  orderNumber: string;
  customer: string;
  email: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentStatus: 'paid' | 'unpaid' | 'refunded';
  orderType: 'customer' | 'reseller';
}

export interface TimeRange {
  value: string;
  label: string;
}