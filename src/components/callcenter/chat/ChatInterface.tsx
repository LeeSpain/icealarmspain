
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, UserCircle, CircleCheck } from "lucide-react";
import { toast } from "react-toastify";
import { mockChatMessages } from "./mock-data";
import { Message, ChatSession } from "./types";

interface ChatInterfaceProps {
  selectedSession: ChatSession | null;
  onSendMessage: (sessionId: number, message: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  selectedSession, 
  onSendMessage 
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Load messages when selected session changes
  useEffect(() => {
    if (selectedSession) {
      // In a real app, you would fetch messages from an API
      const sessionMessages = mockChatMessages.filter(
        msg => msg.sessionId === selectedSession.id
      );
      setMessages(sessionMessages);
    }
  }, [selectedSession]);

  // Auto scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!selectedSession) {
      toast.error("No active chat session");
      return;
    }

    if (!newMessage.trim()) {
      toast.error("Please enter a message");
      return;
    }

    const newMsg: Message = {
      id: messages.length + 1,
      sessionId: selectedSession.id,
      sender: "agent",
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false
    };

    setMessages([...messages, newMsg]);
    onSendMessage(selectedSession.id, newMessage);
    setNewMessage("");
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!selectedSession) {
    return (
      <Card className="h-full flex flex-col">
        <CardContent className="flex flex-col items-center justify-center h-full text-center p-6">
          <UserCircle className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Active Chat Session</h3>
          <p className="text-muted-foreground">
            Select a chat session from the sidebar to start messaging
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center gap-2">
          <UserCircle className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">
            {selectedSession.memberName}
          </CardTitle>
          {selectedSession.online && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              Online
            </span>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[75%] rounded-lg p-3 ${
                  message.sender === 'agent' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-foreground'
                }`}
              >
                <p className="break-words">{message.content}</p>
                <div className={`flex items-center justify-end gap-1 mt-1 text-xs ${
                  message.sender === 'agent' 
                    ? 'text-primary-foreground/70' 
                    : 'text-muted-foreground'
                }`}>
                  {formatTime(message.timestamp)}
                  {message.sender === 'agent' && message.read && (
                    <CircleCheck className="h-3 w-3" />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;
