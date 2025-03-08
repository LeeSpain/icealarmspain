
import React from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useGuardian } from "./GuardianContext";

const ActionButtons: React.FC = () => {
  const { language } = useLanguage();
  const { createSupportTicket, openHelpCenter } = useGuardian();

  return (
    <div className="mt-8 flex justify-center gap-4">
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={openHelpCenter}
      >
        <HelpCircle size={16} />
        <span>{language === 'en' ? 'Help Center' : 'Centro de Ayuda'}</span>
      </Button>
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={createSupportTicket}
      >
        <MessageCircle size={16} />
        <span>{language === 'en' ? 'Create Support Ticket' : 'Crear Ticket de Soporte'}</span>
      </Button>
    </div>
  );
};

export default ActionButtons;
