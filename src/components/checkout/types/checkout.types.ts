
export interface BillingInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  nie: string;
}

export interface CardDetails {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  monthlyPrice?: number;
  image?: string;
}

export interface OrderData {
  membershipType: string;
  items: OrderItem[];
  deviceCount: number;
  oneTimeTotal: number;
  productTax: number;
  shippingTotal: number;
  shippingTax: number;
  monthlyTotal: number;
  monthlyTax: number;
  total: number;
}

export interface PaymentResult {
  success: boolean;
  orderId: string;
  orderDate: string;
  amount: number;
  last4: string;
}
