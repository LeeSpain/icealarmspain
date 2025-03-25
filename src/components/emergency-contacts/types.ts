
export interface Contact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  priority: number;
  receivesAlerts: boolean;
  receivesUpdates: boolean;
}

export type AlertType = 'emergency' | 'medical' | 'activity' | 'all';

export type TestStatus = 'idle' | 'sending' | 'success' | 'error';

export interface TestResult {
  id: string;
  timestamp: Date;
  type: AlertType;
  success: boolean;
  recipients: string[];
  errorMessage?: string;
}

export interface TestLog {
  contactId: string;
  timestamp: Date;
  alertType: AlertType;
  delivered: boolean;
  deliveryMethod: 'sms' | 'email' | 'call';
  message: string;
}

// Make all properties required to match the Zod schema
export type ContactFormValues = {
  name: string;
  relationship: string;
  phone: string;
  email: string;
  priority: number;
  receivesAlerts: boolean;
  receivesUpdates: boolean;
};
