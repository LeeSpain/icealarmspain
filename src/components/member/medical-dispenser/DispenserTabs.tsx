
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTabContent, MedicationsTabContent, ScheduleTabContent, SettingsTabContent } from "./DispenserTabContent";
import { useLanguage } from "@/context/LanguageContext";

interface DispenserTabsProps {
  medications: Array<{
    name: string;
    schedule: string;
    remaining: number;
    total: number;
  }>;
}

const DispenserTabs: React.FC<DispenserTabsProps> = ({ medications }) => {
  const { language } = useLanguage();
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4 w-full flex justify-center">
          <TabsTrigger value="overview" className="flex-1">
            {language === 'en' ? 'Overview' : 'Resumen'}
          </TabsTrigger>
          <TabsTrigger value="medications" className="flex-1">
            {language === 'en' ? 'Medications' : 'Medicamentos'}
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex-1">
            {language === 'en' ? 'Schedule' : 'Horario'}
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">
            {language === 'en' ? 'Settings' : 'Configuración'}
          </TabsTrigger>
        </TabsList>
        
        <OverviewTabContent medications={medications} />
        <MedicationsTabContent />
        <ScheduleTabContent />
        <SettingsTabContent />
      </Tabs>
    </div>
  );
};

export default DispenserTabs;
