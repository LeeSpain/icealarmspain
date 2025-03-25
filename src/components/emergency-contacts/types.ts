
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
  success: boolean;
  timestamp: string;
  type: AlertType;
  recipients: string[];
  errorMessage?: string;
}
