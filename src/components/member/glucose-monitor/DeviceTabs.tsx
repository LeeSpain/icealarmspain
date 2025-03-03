
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";
import DeviceOverview from "./DeviceOverview";
import QuickActions from "./QuickActions";
import DeviceSettings from "./DeviceSettings";
import ReadingsHistory from "./ReadingsHistory";

const DeviceTabs: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <Tabs defaultValue="overview">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">
          {language === 'en' ? 'Overview' : 'Resumen'}
        </TabsTrigger>
        <TabsTrigger value="readings">
          {language === 'en' ? 'Readings' : 'Lecturas'}
        </TabsTrigger>
        <TabsTrigger value="settings">
          {language === 'en' ? 'Settings' : 'Configuración'}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        <DeviceOverview />
        <QuickActions />
      </TabsContent>
      
      <TabsContent value="readings" className="space-y-4">
        <ReadingsHistory />
      </TabsContent>
      
      <TabsContent value="settings" className="space-y-4">
        <DeviceSettings />
      </TabsContent>
    </Tabs>
  );
};

export default DeviceTabs;
