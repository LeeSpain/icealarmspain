
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isLoading = false }) => {
  const { language } = useLanguage();
  const [input, setInput] = React.useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    onSendMessage(input);
    setInput("");
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isLoading}
        placeholder={language === 'en' ? "Type your message..." : "Escribe tu mensaje..."}
        className="flex-1 p-2 text-sm border border-gray-300 rounded-md"
      />
      <Button 
        type="submit" 
        size="sm" 
        className="bg-guardian-500 hover:bg-guardian-600"
        disabled={!input.trim() || isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <MessageSquare className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
};

export default MessageInput;
