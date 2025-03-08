
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Bot } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import KnowledgeAreaSelector from "./KnowledgeAreaSelector";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatCard: React.FC = () => {
  const { language } = useLanguage();

  return (
    <Card className="shadow-lg border-guardian-100">
      <CardHeader className="border-b pb-3">
        <CardTitle className="text-lg flex items-center text-guardian-600">
          <Bot className="mr-2 h-5 w-5" />
          {language === 'en' ? 'Enhanced AI Business Assistant' : 'Asistente IA de Negocios Mejorado'}
        </CardTitle>
      </CardHeader>
      
      <KnowledgeAreaSelector />
      
      <CardContent className="p-0">
        <MessageList />
      </CardContent>
      
      <CardFooter className="border-t p-3">
        <MessageInput />
      </CardFooter>
    </Card>
  );
};

export default ChatCard;
