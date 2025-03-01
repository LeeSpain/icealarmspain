
// Types for ticketing system
export interface Ticket {
  id: number;
  clientId: number;
  clientName: string;
  subject: string;
  status: 'open' | 'pending' | 'closed';
  priority: 'high' | 'medium' | 'low';
  created: string;
  lastUpdated: string;
  internalNotes?: InternalNote[];
}

export interface InternalNote {
  id: number;
  ticketId: number;
  agentName: string;
  content: string;
  timestamp: string;
}

export interface Message {
  id: number;
  ticketId: number;
  sender: string;
  isClient: boolean;
  message: string;
  timestamp: string;
}

export interface NewTicketForm {
  clientId: string;
  clientName: string;
  subject: string;
  description: string;
  priority: string;
}
