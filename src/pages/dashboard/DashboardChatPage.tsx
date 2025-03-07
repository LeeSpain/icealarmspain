
import React, { useState } from "react";
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessageSquare, Bot, History } from "lucide-react";
import AIGuardianChatTab from "@/components/chat/AIGuardianChatTab";
import SupportChatTab from "@/components/chat/SupportChatTab";

const DashboardChatPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("support");
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="chat"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-ice-800 mb-2">
              {language === 'en' ? 'Chat Support' : 'Chat de Soporte'}
            </h1>
            <p className="text-ice-700">
              {language === 'en' 
                ? 'Get help and support from our team or use AI Guardian' 
                : 'Obtén ayuda y soporte de nuestro equipo o usa AI Guardian'}
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full bg-white border mb-6 p-0 h-auto">
              <TabsTrigger
                value="support"
                className="flex-1 py-3 data-[state=active]:bg-ice-50 data-[state=active]:border-b-2 data-[state=active]:border-ice-600 rounded-none"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Support Chat' : 'Chat de Soporte'}
              </TabsTrigger>
              <TabsTrigger
                value="ai-guardian"
                className="flex-1 py-3 data-[state=active]:bg-ice-50 data-[state=active]:border-b-2 data-[state=active]:border-ice-600 rounded-none"
              >
                <Bot className="h-4 w-4 mr-2" />
                {language === 'en' ? 'AI Guardian' : 'AI Guardian'}
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="flex-1 py-3 data-[state=active]:bg-ice-50 data-[state=active]:border-b-2 data-[state=active]:border-ice-600 rounded-none"
              >
                <History className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Chat History' : 'Historial de Chat'}
              </TabsTrigger>
            </TabsList>
            
            <Card className="border-t-0 rounded-t-none min-h-[70vh]">
              <CardContent className="p-0">
                <TabsContent value="support" className="m-0">
                  <SupportChatTab />
                </TabsContent>
                
                <TabsContent value="ai-guardian" className="m-0">
                  <AIGuardianChatTab />
                </TabsContent>
                
                <TabsContent value="history" className="m-0">
                  <div className="p-8 flex flex-col items-center justify-center text-center">
                    <History size={64} className="text-ice-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-700 mb-2">
                      {language === 'en' ? 'Chat History' : 'Historial de Chat'}
                    </h3>
                    <p className="text-gray-500 max-w-md mb-4">
                      {language === 'en' 
                        ? 'View your past conversations with our support team and AI Guardian.'
                        : 'Ver conversaciones anteriores con nuestro equipo de soporte y AI Guardian.'}
                    </p>
                    <p className="text-sm text-gray-400">
                      {language === 'en' 
                        ? 'No chat history available yet.'
                        : 'No hay historial de chat disponible aún.'}
                    </p>
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DashboardChatPage;
