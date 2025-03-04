
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface MessageInputProps {
  input: string;
  setInput: (input: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ input, setInput, onSubmit }) => {
  const { language } = useLanguage();
  
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={language === 'en' ? "Type your message..." : "Escribe tu mensaje..."}
        className="flex-1 p-2 text-sm border border-gray-300 rounded-md"
      />
      <Button 
        type="submit" 
        size="sm" 
        className="bg-guardian-500 hover:bg-guardian-600"
      >
        <MessageSquare className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default MessageInput;
