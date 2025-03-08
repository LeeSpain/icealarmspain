
export type MessageType = {
  text: string;
  sender: 'user' | 'ai';
  category?: string;
};

export type KnowledgeAreaType = 'services' | 'support' | 'business' | 'appointments' | 'general';

export interface GuardianContextType {
  messages: MessageType[];
  isLoading: boolean;
  selectedArea: string | null;
  sendMessage: (message: string) => Promise<void>;
  handleAreaSelect: (area: string) => void;
  createSupportTicket: () => void;
  openHelpCenter: () => void;
}
