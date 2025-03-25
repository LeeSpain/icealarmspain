
export interface EmergencyContact {
  id: string;
  userId: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  priority: 'primary' | 'secondary' | 'tertiary';
  createdAt: string;
  updatedAt: string;
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
