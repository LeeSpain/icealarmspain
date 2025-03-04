
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

export type TestStatus = 'idle' | 'sending' | 'success' | 'error';
