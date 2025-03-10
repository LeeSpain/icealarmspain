
import React, { useRef, useEffect } from "react";
import { Message } from "../types";
import { Brain } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface MessageListProps {
  messages: Message[];
  isProcessing: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isProcessing }) => {
  const { language } = useLanguage();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      {messages.map((message, idx) => (
        <div 
          key={idx} 
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`max-w-[85%] p-3 rounded-lg ${
              message.sender === 'user' 
                ? 'bg-ice-100 text-ice-900' 
                : 'bg-white border border-ice-200 shadow-sm'
            }`}
          >
            {message.sender === 'ai' && (
              <div className="flex items-center mb-2 text-xs font-medium text-ice-500">
                <Brain className="h-3 w-3 mr-1" />
                {language === 'en' ? 'Admin AI' : 'IA Admin'}
              </div>
            )}
            <p className="text-sm whitespace-pre-line">{message.text}</p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
      
      {isProcessing && (
        <div className="flex justify-center my-2">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-ice-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-ice-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-ice-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageList;
