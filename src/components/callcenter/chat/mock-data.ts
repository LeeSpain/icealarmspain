
import { ChatSession, Message } from "./types";

// Mock data for chat sessions
export const mockChatSessions: ChatSession[] = [
  {
    id: 1,
    memberId: 101,
    memberName: "John Smith",
    online: true,
    lastMessage: new Date().toISOString(),
    lastMessagePreview: "When will my new router arrive?",
    unreadCount: 2
  },
  {
    id: 2,
    memberId: 102,
    memberName: "Sarah Johnson",
    online: true,
    lastMessage: new Date(Date.now() - 15 * 60000).toISOString(), // 15 mins ago
    lastMessagePreview: "Thanks for your help with my connection issues",
    unreadCount: 0
  },
  {
    id: 3,
    memberId: 103,
    memberName: "Michael Brown",
    online: false,
    lastMessage: new Date(Date.now() - 60 * 60000).toISOString(), // 1 hour ago
    lastMessagePreview: "I need to upgrade my plan to include international calls",
    unreadCount: 0
  },
  {
    id: 4,
    memberId: 104,
    memberName: "Emma Wilson",
    online: false,
    lastMessage: new Date(Date.now() - 2 * 60 * 60000).toISOString(), // 2 hours ago
    lastMessagePreview: "Is there a way to reduce my monthly bill?",
    unreadCount: 0
  },
  {
    id: 5,
    memberId: 105,
    memberName: "James Taylor",
    online: true,
    lastMessage: new Date(Date.now() - 30 * 60000).toISOString(), // 30 mins ago
    lastMessagePreview: "My internet has been slow for the past week",
    unreadCount: 1
  }
];

// Mock data for chat messages
export const mockChatMessages: Message[] = [
  // Chat session 1 (John Smith)
  {
    id: 1,
    sessionId: 1,
    sender: "member",
    content: "Hello, I ordered a new router last week and I was wondering when it will arrive?",
    timestamp: new Date(Date.now() - 10 * 60000).toISOString(), // 10 mins ago
    read: true
  },
  {
    id: 2,
    sessionId: 1,
    sender: "agent",
    content: "Hello John, I'll check the status of your order right away. Could you please provide your order number?",
    timestamp: new Date(Date.now() - 8 * 60000).toISOString(), // 8 mins ago
    read: true
  },
  {
    id: 3,
    sessionId: 1,
    sender: "member",
    content: "It's ORD-45678.",
    timestamp: new Date(Date.now() - 6 * 60000).toISOString(), // 6 mins ago
    read: true
  },
  {
    id: 4,
    sessionId: 1,
    sender: "agent",
    content: "Thank you. I can see that your router has been shipped and should arrive tomorrow between 9am and 12pm.",
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(), // 5 mins ago
    read: true
  },
  {
    id: 5,
    sessionId: 1,
    sender: "member",
    content: "Great! Will I get a tracking number?",
    timestamp: new Date(Date.now() - 3 * 60000).toISOString(), // 3 mins ago
    read: false
  },
  {
    id: 6,
    sessionId: 1,
    sender: "member",
    content: "When will my new router arrive?",
    timestamp: new Date(Date.now() - 1 * 60000).toISOString(), // 1 min ago
    read: false
  },

  // Chat session 2 (Sarah Johnson)
  {
    id: 7,
    sessionId: 2,
    sender: "member",
    content: "Hi there, I've been having connection issues for the past few days.",
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(), // 45 mins ago
    read: true
  },
  {
    id: 8,
    sessionId: 2,
    sender: "agent",
    content: "Hello Sarah, I'm sorry to hear that. Let's troubleshoot this issue. Have you tried restarting your router?",
    timestamp: new Date(Date.now() - 44 * 60000).toISOString(), // 44 mins ago
    read: true
  },
  {
    id: 9,
    sessionId: 2,
    sender: "member",
    content: "Yes, I've tried that several times but the problem persists.",
    timestamp: new Date(Date.now() - 42 * 60000).toISOString(), // 42 mins ago
    read: true
  },
  {
    id: 10,
    sessionId: 2,
    sender: "agent",
    content: "Let me check if there are any outages in your area. Could you please confirm your address?",
    timestamp: new Date(Date.now() - 40 * 60000).toISOString(), // 40 mins ago
    read: true
  },
  {
    id: 11,
    sessionId: 2,
    sender: "member",
    content: "123 Main Street, Apt 4B, Springfield.",
    timestamp: new Date(Date.now() - 38 * 60000).toISOString(), // 38 mins ago
    read: true
  },
  {
    id: 12,
    sessionId: 2,
    sender: "agent",
    content: "Thank you. I can see there was a service disruption in your area, but it has been resolved. Let me send a signal to reset your connection remotely.",
    timestamp: new Date(Date.now() - 35 * 60000).toISOString(), // 35 mins ago
    read: true
  },
  {
    id: 13,
    sessionId: 2,
    sender: "agent",
    content: "I've reset your connection. Please check if your internet is working now.",
    timestamp: new Date(Date.now() - 30 * 60000).toISOString(), // 30 mins ago
    read: true
  },
  {
    id: 14,
    sessionId: 2,
    sender: "member",
    content: "It's working now! Thank you so much for your help.",
    timestamp: new Date(Date.now() - 25 * 60000).toISOString(), // 25 mins ago
    read: true
  },
  {
    id: 15,
    sessionId: 2,
    sender: "agent",
    content: "You're welcome! Is there anything else I can help you with today?",
    timestamp: new Date(Date.now() - 20 * 60000).toISOString(), // 20 mins ago
    read: true
  },
  {
    id: 16,
    sessionId: 2,
    sender: "member",
    content: "No, that's all. Thanks for your help with my connection issues!",
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(), // 15 mins ago
    read: true
  },

  // Add a few messages for session 5 (James Taylor)
  {
    id: 17,
    sessionId: 5,
    sender: "member",
    content: "Hello, my internet has been slow for the past week. I'm only getting about half the speed I'm paying for.",
    timestamp: new Date(Date.now() - 35 * 60000).toISOString(), // 35 mins ago
    read: true
  },
  {
    id: 18,
    sessionId: 5,
    sender: "agent",
    content: "Hello James, I'm sorry to hear that you're experiencing slow internet speeds. Let me help you troubleshoot this issue.",
    timestamp: new Date(Date.now() - 33 * 60000).toISOString(), // 33 mins ago
    read: true
  },
  {
    id: 19,
    sessionId: 5,
    sender: "member",
    content: "My internet has been slow for the past week",
    timestamp: new Date(Date.now() - 30 * 60000).toISOString(), // 30 mins ago
    read: false
  }
];
