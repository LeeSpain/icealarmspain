
import React from 'react';
import { Bot } from "lucide-react";

interface MessagesListProps {
  messages: Array<{text: string, type: 'guardian' | 'user'}>;
}

const MessagesList: React.FC<MessagesListProps> = ({ messages }) => {
  return (
    <div className="h-48 overflow-y-auto space-y-2 bg-slate-50 p-3 rounded-md" id="chat-container">
      {messages.map((message, idx) => (
        <div 
          key={idx} 
          className={`p-2 rounded-lg ${
            message.type === 'guardian' 
              ? 'bg-guardian-50 border-l-4 border-guardian-500' 
              : 'bg-ice-50 border-l-4 border-ice-500 ml-6'
          }`}
        >
          <div className="flex items-start gap-2">
            {message.type === 'guardian' && (
              <Bot className="h-4 w-4 mt-0.5 text-guardian-600 flex-shrink-0" />
            )}
            <p className="text-sm">
              {message.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagesList;
