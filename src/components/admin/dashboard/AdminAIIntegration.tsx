
import React, { useState } from "react";
import { Maximize2, Minimize2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminAIAssistant from "@/components/admin/ai/AdminAIAssistant";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "react-toastify";

interface AdminAIIntegrationProps {
  activeSection: string;
  onNavigate: (section: string, params?: any) => void;
}

const AdminAIIntegration: React.FC<AdminAIIntegrationProps> = ({
  activeSection,
  onNavigate
}) => {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleExpandToggle = () => {
    setIsExpanded(prev => !prev);
  };
  
  const handleOpenToggle = () => {
    setIsOpen(prev => !prev);
    
    // Show welcome toast when opening
    if (!isOpen) {
      toast.info(
        language === 'en' 
          ? "AI Assistant is ready to help you manage your business" 
          : "El Asistente de IA está listo para ayudarte a gestionar tu negocio",
        {
          autoClose: 3000,
          position: "bottom-right",
        }
      );
    }
  };
  
  if (!isOpen) {
    return (
      <Button 
        variant="default"
        size="icon"
        className="fixed bottom-6 right-6 rounded-full w-12 h-12 shadow-lg bg-ice-600 hover:bg-ice-700 z-50"
        onClick={handleOpenToggle}
      >
        <MessageSquare className="h-5 w-5" />
      </Button>
    );
  }
  
  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isExpanded 
          ? 'w-[80%] h-[80%] max-w-4xl bottom-[10%] right-[10%] top-[10%]' 
          : 'w-80 h-96'
      }`}
    >
      <div className="absolute top-[-40px] right-0 flex gap-2">
        <Button 
          variant="outline" 
          size="icon"
          className="h-8 w-8 bg-white"
          onClick={handleExpandToggle}
        >
          {isExpanded ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          className="h-8 w-8 bg-white"
          onClick={handleOpenToggle}
        >
          <span className="sr-only">Close</span>
          <span aria-hidden="true">&times;</span>
        </Button>
      </div>
      
      <AdminAIAssistant 
        currentSection={activeSection}
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default AdminAIIntegration;
