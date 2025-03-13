
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
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4 w-full flex justify-center">
          <TabsTrigger value="overview" className="flex-1">
            {language === 'en' ? 'Overview' : 'Resumen'}
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">
            {language === 'en' ? 'Settings' : 'Configuración'}
          </TabsTrigger>
          <TabsTrigger value="history" className="flex-1">
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
    </div>
  );
};

export default DeviceTabs;
