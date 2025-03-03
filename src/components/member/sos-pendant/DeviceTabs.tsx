
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";
import DeviceOverview from "./DeviceOverview";
import QuickActions from "./QuickActions";
import DeviceSettings from "./DeviceSettings";
import AlertHistory from "./AlertHistory";

const DeviceTabs: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <Tabs defaultValue="overview">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">
          {language === 'en' ? 'Overview' : 'Resumen'}
        </TabsTrigger>
        <TabsTrigger value="settings">
          {language === 'en' ? 'Settings' : 'Configuración'}
        </TabsTrigger>
        <TabsTrigger value="history">
          {language === 'en' ? 'History' : 'Historial'}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        <DeviceOverview />
        <QuickActions />
      </TabsContent>
      
      <TabsContent value="settings" className="space-y-4">
        <DeviceSettings />
      </TabsContent>
      
      <TabsContent value="history" className="space-y-4">
        <AlertHistory />
      </TabsContent>
    </Tabs>
  );
};

export default DeviceTabs;
