
export interface Message {
  text: string;
  sender: 'user' | 'ai';
}

export interface AdminAIAssistantProps {
  currentSection?: string;
  onNavigate?: (section: string, params?: any) => void;
}
