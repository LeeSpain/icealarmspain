
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
    <Tabs defaultValue="overview">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">
          {language === 'en' ? 'Overview' : 'Resumen'}
        </TabsTrigger>
        <TabsTrigger value="medications">
          {language === 'en' ? 'Medications' : 'Medicamentos'}
        </TabsTrigger>
        <TabsTrigger value="schedule">
          {language === 'en' ? 'Schedule' : 'Horario'}
        </TabsTrigger>
        <TabsTrigger value="settings">
          {language === 'en' ? 'Settings' : 'Configuración'}
        </TabsTrigger>
      </TabsList>
      
      <OverviewTabContent medications={medications} />
      <MedicationsTabContent />
      <ScheduleTabContent />
      <SettingsTabContent />
    </Tabs>
  );
};

export default DispenserTabs;
