
export interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  nie: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  [key: string]: any;
}

export interface PaymentFormProps {
  amount: number;
  items: any[];
  onSuccess: (billingInfo: any) => void;
  onCancel: () => void;
  isNewCustomer?: boolean;
}

export interface PaymentResult {
  success: boolean;
  orderId?: string;
  orderDate?: string;
  amount?: number;
  last4?: string;
  error?: string;
}
