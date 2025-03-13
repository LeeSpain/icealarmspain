
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { contactInfo } from "./translations";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { toast } from "react-toastify";

const LiveChatCard: React.FC = () => {
  const { language } = useLanguage();
  const content = language === 'en' ? contactInfo.en : contactInfo.es;
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <MessageSquare className="h-6 w-6 text-ice-600 mt-1" />
          <div>
            <h3 className="font-medium">{content.chatTitle}</h3>
            <p className="text-sm text-muted-foreground">{content.chatDescription}</p>
            <Button 
              variant="outline" 
              className="mt-2 w-full border-ice-600 text-ice-600 hover:bg-ice-50"
              onClick={() => {
                // Would implement chat functionality 
                toast.info(
                  language === 'en' 
                    ? "Chat feature coming soon!" 
                    : "¡Función de chat próximamente!"
                );
              }}
            >
              {content.chatButton}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveChatCard;
