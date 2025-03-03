
// Types for call center tickets
export interface Ticket {
  id: number;
  clientId: number;
  clientName: string;
  subject: string;
  message: string;
  status: 'open' | 'pending' | 'closed';
  priority: 'low' | 'medium' | 'high';
  created: string;
  lastUpdated: string;
  assignedTo?: string;
  category: string;
}
