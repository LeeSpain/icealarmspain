
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  input?: string;
  setInput?: (input: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  isLoading = false,
  input = "",
  setInput,
  onSubmit
}) => {
  const { language } = useLanguage();
  const [internalInput, setInternalInput] = React.useState("");
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setInput) {
      setInput(e.target.value);
    } else {
      setInternalInput(e.target.value);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSubmit) {
      onSubmit(e);
      return;
    }
    
    const currentInput = setInput ? input : internalInput;
    if (!currentInput.trim() || isLoading) return;
    
    onSendMessage(currentInput);
    if (!setInput) {
      setInternalInput("");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={setInput ? input : internalInput}
        onChange={handleInputChange}
        disabled={isLoading}
        placeholder={language === 'en' ? "Type your message..." : "Escribe tu mensaje..."}
        className="flex-1 p-2 text-sm border border-gray-300 rounded-md"
      />
      <Button 
        type="submit" 
        size="sm" 
        className="bg-guardian-500 hover:bg-guardian-600"
        disabled={!(setInput ? input : internalInput).trim() || isLoading}
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
