
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface MessageInputProps {
  input: string;
  setInput: (value: string) => void;
  isProcessing: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  input, 
  setInput, 
  isProcessing, 
  onSubmit 
}) => {
  const { language } = useLanguage();
  
  return (
    <form onSubmit={onSubmit} className="w-full flex gap-2">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={language === 'en' 
          ? "Ask about clients, metrics, inventory, etc..." 
          : "Pregunta sobre clientes, métricas, inventario, etc..."}
        className="flex-1 resize-none h-10 py-2"
        disabled={isProcessing}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit(e);
          }
        }}
      />
      <Button 
        type="submit" 
        variant="default"
        className="bg-ice-600 hover:bg-ice-700 h-10"
        disabled={isProcessing || !input.trim()}
      >
        {isProcessing ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
};

export default MessageInput;
