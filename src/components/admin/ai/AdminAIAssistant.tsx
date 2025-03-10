
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Bot } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { AdminAIAssistantProps } from "./types";
import { useAdminAI } from "./hooks/useAdminAI";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";

const AdminAIAssistant: React.FC<AdminAIAssistantProps> = ({ 
  currentSection, 
  onNavigate 
}) => {
  const { language } = useLanguage();
  const { 
    messages, 
    input, 
    setInput, 
    isProcessing, 
    handleSubmit 
  } = useAdminAI(currentSection, onNavigate);

  return (
    <Card className="w-full h-full flex flex-col overflow-hidden shadow-md">
      <CardHeader className="bg-gradient-to-r from-ice-50 to-ice-100 py-3">
        <CardTitle className="flex items-center text-lg text-ice-900">
          <Bot className="text-ice-600 mr-2 h-5 w-5" />
          {language === 'en' ? 'Administrative AI Assistant' : 'Asistente de IA Administrativo'}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
        <MessageList 
          messages={messages} 
          isProcessing={isProcessing} 
        />
      </CardContent>
      
      <CardFooter className="border-t border-ice-100 p-3">
        <MessageInput
          input={input}
          setInput={setInput}
          isProcessing={isProcessing}
          onSubmit={handleSubmit}
        />
      </CardFooter>
    </Card>
  );
};

export default AdminAIAssistant;
