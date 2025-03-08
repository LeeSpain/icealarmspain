
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useGuardian } from "./GuardianContext";

const MessageInput: React.FC = () => {
  const { language } = useLanguage();
  const { sendMessage, isLoading } = useGuardian();
  const [userInput, setUserInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;
    
    await sendMessage(userInput);
    setUserInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex gap-2">
      <Textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder={language === 'en' ? "Type your question or request here..." : "Escribe tu pregunta o solicitud aquí..."}
        className="flex-grow resize-none"
        rows={1}
      />
      <Button 
        type="submit" 
        size="icon" 
        className="bg-guardian-500 hover:bg-guardian-600 h-full aspect-square"
        disabled={isLoading || !userInput.trim()}
      >
        {isLoading ? <Sparkles size={18} className="animate-pulse" /> : <Send size={18} />}
      </Button>
    </form>
  );
};

export default MessageInput;
