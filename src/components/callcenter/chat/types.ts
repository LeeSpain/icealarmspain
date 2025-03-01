
// Chat system types
export interface ChatSession {
  id: number;
  memberId: number;
  memberName: string;
  online: boolean;
  lastMessage: string; // ISO datetime string
  lastMessagePreview: string;
  unreadCount: number;
}

export interface Message {
  id: number;
  sessionId: number;
  sender: 'agent' | 'member';
  content: string;
  timestamp: string; // ISO datetime string
  read: boolean;
}
