
export interface Contact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  address?: string;
  priority: 'primary' | 'secondary' | 'tertiary';
  notificationPreferences: {
    sms: boolean;
    email: boolean;
    call: boolean;
  };
}

export interface TestResult {
  success: boolean;
  type: string;
  recipients: string[];
  error?: string;
  timestamp: string;
}

export type TestStatus = 'idle' | 'sending' | 'success' | 'error';

export interface TestLog {
  id: string;
  timestamp: string;
  type: string;
  recipients: string[];
  success: boolean;
  error?: string;
}
