
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

export interface TestResult {
  id: string;
  timestamp: string;
  success: boolean;
  type: AlertType;
  recipients: string[];
  error?: string;
}

export interface TestStatus {
  id: string;
  contactId: string;
  type: 'sms' | 'email' | 'call' | 'all';
  status: 'success' | 'failed' | 'pending';
  timestamp: string;
  message?: string;
}

export interface TestLog {
  id: string;
  userId: string;
  type: 'sms' | 'email' | 'call' | 'all';
  recipients: string[];
  status: 'success' | 'failed' | 'pending';
  timestamp: string;
  message?: string;
}
