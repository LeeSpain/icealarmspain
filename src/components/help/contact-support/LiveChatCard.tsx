
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { contactInfo } from "./translations";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ChatSystem from "@/components/callcenter/chat/ChatSystem";

const LiveChatCard: React.FC = () => {
  const { language } = useLanguage();
  const content = language === 'en' ? contactInfo.en : contactInfo.es;
  const [chatOpen, setChatOpen] = useState(false);
  
  return (
    <>
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
                onClick={() => setChatOpen(true)}
              >
                {content.chatButton}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogContent className="max-w-4xl h-[80vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl font-semibold">
              {language === 'en' ? 'Live Chat Support' : 'Soporte por Chat en Vivo'}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden p-6 h-full">
            <ChatSystem />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LiveChatCard;
