
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

export interface Message {
  id: number;
  ticketId: number;
  content: string;
  sentBy: string;
  sentAt: string;
  isInternal: boolean;
  // Added properties to match usage in components
  sender: string;
  isClient: boolean;
  message: string;
  timestamp: string;
}

export interface InternalNote {
  id: number;
  ticketId: number;
  content: string;
  createdBy: string;
  createdAt: string;
  // Added properties to match usage in components
  agentName: string;
  timestamp: string;
}

export interface NewTicketForm {
  clientId: number | string; // Allow both number and string types
  clientName: string;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  // Add description to match component usage
  description: string;
}
