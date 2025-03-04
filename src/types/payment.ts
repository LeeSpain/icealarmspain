
export interface PaymentAddress {
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;  // Added phone property
  nie?: string;    // Added NIE property
  address: PaymentAddress;
}

export interface PaymentFormProps {
  amount: number;
  items: any[];
  onSuccess: (paymentResult: any) => void;
  onCancel: () => void;
  isNewCustomer?: boolean;
}
