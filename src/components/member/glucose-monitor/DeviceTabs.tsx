
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
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4 w-full flex justify-center">
          <TabsTrigger value="overview" className="flex-1">
            {language === 'en' ? 'Overview' : 'Resumen'}
          </TabsTrigger>
          <TabsTrigger value="readings" className="flex-1">
            {language === 'en' ? 'Readings' : 'Lecturas'}
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">
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
    </div>
  );
};

export default DeviceTabs;
