
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
}

export interface InternalNote {
  id: number;
  ticketId: number;
  content: string;
  createdBy: string;
  createdAt: string;
}

export interface NewTicketForm {
  clientId: number;
  clientName: string;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
}
