
import React, { useState } from "react";
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneCall, UserPlus, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AddContactTab from "@/components/emergency-contacts/AddContactTab";
import ManageContactsTab from "@/components/emergency-contacts/ManageContactsTab";
import TestAlertsTab from "@/components/emergency-contacts/TestAlertsTab";

const DashboardEmergencyContactsPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-ice-800 mb-2">
              {language === 'en' ? 'Emergency Contacts' : 'Contactos de Emergencia'}
            </h1>
            <p className="text-ice-700">
              {language === 'en' 
                ? 'Manage the people to contact in case of emergency' 
                : 'Gestiona las personas a contactar en caso de emergencia'}
            </p>
          </div>

          <Tabs defaultValue="manage" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="manage" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {language === 'en' ? 'Manage Contacts' : 'Gestionar Contactos'}
              </TabsTrigger>
              <TabsTrigger value="add" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                {language === 'en' ? 'Add Contact' : 'Añadir Contacto'}
              </TabsTrigger>
              <TabsTrigger value="test" className="flex items-center gap-2">
                <PhoneCall className="h-4 w-4" />
                {language === 'en' ? 'Test Alerts' : 'Probar Alertas'}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="manage">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Your Emergency Contacts' : 'Tus Contactos de Emergencia'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ManageContactsTab />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="add">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Add New Emergency Contact' : 'Añadir Nuevo Contacto de Emergencia'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AddContactTab />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="test">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Test Emergency Alerts' : 'Probar Alertas de Emergencia'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TestAlertsTab />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DashboardEmergencyContactsPage;
