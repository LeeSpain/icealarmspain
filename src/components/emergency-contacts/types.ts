
export interface Contact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  address?: string;
  priority: number; // Changed from enum to number
  notificationPreferences: {
    sms: boolean;
    email: boolean;
    call: boolean;
  };
  // Add missing properties
  receivesAlerts: boolean;
  receivesUpdates: boolean;
}

export interface TestResult {
  success: boolean;
  type: string;
  recipients: string[];
  error?: string;
  timestamp: string;
  id?: string; // Added optional id property
  errorMessage?: string; // Added errorMessage property
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

// Add missing AlertType type
export type AlertType = 'emergency' | 'medical' | 'activity' | 'all';
