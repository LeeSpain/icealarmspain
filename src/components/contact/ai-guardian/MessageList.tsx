
import React, { useRef, useEffect } from "react";
import { useGuardian, MessageType } from "./GuardianContext";
import { getCategoryIcon } from "./utils";

const MessageList: React.FC = () => {
  const { messages, isLoading } = useGuardian();
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages container when messages change
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="p-4 h-96 overflow-y-auto flex flex-col space-y-4" ref={messageContainerRef}>
      {messages.map((message, index) => (
        <MessageBubble key={index} message={message} />
      ))}
      
      {isLoading && (
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-lg p-3 bg-guardian-100 text-guardian-950">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-guardian-500 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-guardian-500 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 rounded-full bg-guardian-500 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MessageBubble: React.FC<{ message: MessageType }> = ({ message }) => {
  return (
    <div 
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`max-w-[80%] rounded-lg p-3 ${
          message.sender === 'user' 
            ? 'bg-ice-100 text-ice-950' 
            : 'bg-guardian-100 text-guardian-950'
        }`}
      >
        {message.sender === 'ai' && (
          <div className="flex items-center mb-1 text-xs font-medium">
            {getCategoryIcon(message.category)}
            ICE AI Guardian
          </div>
        )}
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default MessageList;
