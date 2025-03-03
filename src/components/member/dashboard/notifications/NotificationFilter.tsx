
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";

interface NotificationFilterProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const NotificationFilter: React.FC<NotificationFilterProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  const { language } = useLanguage();
  
  return (
    <TabsList className="grid grid-cols-5 w-full">
      <TabsTrigger 
        value="all" 
        className="text-xs" 
        onClick={() => onTabChange("all")}
        data-state={activeTab === "all" ? "active" : "inactive"}
      >
        {language === 'en' ? 'All' : 'Todo'}
      </TabsTrigger>
      <TabsTrigger 
        value="unread" 
        className="text-xs" 
        onClick={() => onTabChange("unread")}
        data-state={activeTab === "unread" ? "active" : "inactive"}
      >
        {language === 'en' ? 'Unread' : 'No leído'}
      </TabsTrigger>
      <TabsTrigger 
        value="message" 
        className="text-xs" 
        onClick={() => onTabChange("message")}
        data-state={activeTab === "message" ? "active" : "inactive"}
      >
        {language === 'en' ? 'Chats' : 'Chats'}
      </TabsTrigger>
      <TabsTrigger 
        value="glucose" 
        className="text-xs" 
        onClick={() => onTabChange("glucose")}
        data-state={activeTab === "glucose" ? "active" : "inactive"}
      >
        {language === 'en' ? 'Glucose' : 'Glucosa'}
      </TabsTrigger>
      <TabsTrigger 
        value="medication" 
        className="text-xs" 
        onClick={() => onTabChange("medication")}
        data-state={activeTab === "medication" ? "active" : "inactive"}
      >
        {language === 'en' ? 'Meds' : 'Medicamentos'}
      </TabsTrigger>
    </TabsList>
  );
};

export default NotificationFilter;
