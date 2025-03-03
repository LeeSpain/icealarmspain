
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import MemberSidebar from "@/components/member/MemberSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import FAQSection from "@/components/help/FAQSection";
import DeviceGuides from "@/components/help/DeviceGuides";
import VideoTutorials from "@/components/help/VideoTutorials";
import ContactSupport from "@/components/help/ContactSupport";

const HelpCenter: React.FC = () => {
  const { language } = useLanguage();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="help"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">
              {language === 'en' ? 'Help Center' : 'Centro de Ayuda'}
            </h1>
            <p className="text-muted-foreground mb-6">
              {language === 'en' 
                ? 'Find answers to common questions and learn how to use ICE Alarm services.'
                : 'Encuentre respuestas a preguntas comunes y aprenda a usar los servicios de ICE Alarm.'}
            </p>
            
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder={language === 'en' ? "Search for help..." : "Buscar ayuda..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="faq">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="faq">
                  {language === 'en' ? 'FAQ' : 'Preguntas Frecuentes'}
                </TabsTrigger>
                <TabsTrigger value="devices">
                  {language === 'en' ? 'Device Guides' : 'Guías de Dispositivos'}
                </TabsTrigger>
                <TabsTrigger value="videos">
                  {language === 'en' ? 'Video Tutorials' : 'Tutoriales en Video'}
                </TabsTrigger>
                <TabsTrigger value="contact">
                  {language === 'en' ? 'Contact Support' : 'Contactar Soporte'}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="faq">
                <FAQSection searchQuery={searchQuery} />
              </TabsContent>
              
              <TabsContent value="devices">
                <DeviceGuides searchQuery={searchQuery} />
              </TabsContent>
              
              <TabsContent value="videos">
                <VideoTutorials />
              </TabsContent>
              
              <TabsContent value="contact">
                <ContactSupport />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
