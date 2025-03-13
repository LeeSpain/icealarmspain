
import React from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, PillIcon, PhoneCall, Heart } from "lucide-react";

interface TabsNavigationProps {
  activeTab: string;
}

const TabsNavigation: React.FC<TabsNavigationProps> = ({ activeTab }) => {
  const { language } = useLanguage();

  return (
    <TabsList className="w-full bg-white border mb-6 p-0 h-auto">
      <TabsTrigger
        value="personal"
        className="flex-1 py-3 data-[state=active]:bg-ice-50 data-[state=active]:border-b-2 data-[state=active]:border-ice-600 rounded-none"
      >
        <User className="h-4 w-4 mr-2" />
        {language === 'en' ? 'Personal Information' : 'Información Personal'}
      </TabsTrigger>
      <TabsTrigger
        value="medications"
        className="flex-1 py-3 data-[state=active]:bg-ice-50 data-[state=active]:border-b-2 data-[state=active]:border-ice-600 rounded-none"
      >
        <PillIcon className="h-4 w-4 mr-2" />
        {language === 'en' ? 'Medications' : 'Medicamentos'}
      </TabsTrigger>
      <TabsTrigger
        value="emergency"
        className="flex-1 py-3 data-[state=active]:bg-ice-50 data-[state=active]:border-b-2 data-[state=active]:border-ice-600 rounded-none"
      >
        <PhoneCall className="h-4 w-4 mr-2" />
        {language === 'en' ? 'Emergency Contacts' : 'Contactos de Emergencia'}
      </TabsTrigger>
      <TabsTrigger
        value="medical"
        className="flex-1 py-3 data-[state=active]:bg-ice-50 data-[state=active]:border-b-2 data-[state=active]:border-ice-600 rounded-none"
      >
        <Heart className="h-4 w-4 mr-2" />
        {language === 'en' ? 'Medical Information' : 'Información Médica'}
      </TabsTrigger>
    </TabsList>
  );
};

export default TabsNavigation;
