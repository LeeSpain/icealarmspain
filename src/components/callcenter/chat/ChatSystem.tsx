
import React, { useState } from "react";
import { toast } from "react-toastify";
import ChatSessions from "./ChatSessions";
import ChatInterface from "./ChatInterface";
import { mockChatSessions } from "./mock-data";
import { ChatSession } from "./types";

const ChatSystem: React.FC = () => {
  const [sessions, setSessions] = useState(mockChatSessions);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);

  // Set the initial selected session
  useState(() => {
    // Find the first session with unread messages, or just the first session
    const initialSession = sessions.find(session => session.unreadCount > 0) || sessions[0];
    setSelectedSession(initialSession);
  });

  const handleSelectSession = (session: ChatSession) => {
    // Mark messages as read when selecting a session
    if (session.unreadCount > 0) {
      const updatedSessions = sessions.map(s => {
        if (s.id === session.id) {
          return { ...s, unreadCount: 0 };
        }
        return s;
      });
      setSessions(updatedSessions);
    }
    
    setSelectedSession(session);
  };

  const handleSendMessage = (sessionId: number, message: string) => {
    // Update the last message preview and timestamp for the session
    const updatedSessions = sessions.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          lastMessagePreview: message,
          lastMessage: new Date().toISOString()
        };
      }
      return session;
    });
    
    setSessions(updatedSessions);
    
    // In a real app, you would send this message to an API
    toast.success("Message sent successfully");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      {/* Chat Sessions List */}
      <div className="lg:col-span-1 h-full bg-white rounded-lg shadow-sm p-4">
        <ChatSessions 
          sessions={sessions}
          selectedSession={selectedSession}
          onSelectSession={handleSelectSession}
        />
      </div>
      
      {/* Chat Interface */}
      <div className="lg:col-span-2 h-full bg-white rounded-lg shadow-sm p-4">
        <ChatInterface 
          selectedSession={selectedSession}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default ChatSystem;
