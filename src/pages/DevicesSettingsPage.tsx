
import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const DevicesSettingsPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="device-settings"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className={`flex-1 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6 max-w-7xl mx-auto">
          <ToastContainer />
          
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-ice-500" />
                <CardTitle>
                  {language === 'en' ? 'Device Settings' : 'Configuración de Dispositivos'}
                </CardTitle>
              </div>
              <CardDescription>
                {language === 'en' 
                  ? 'Manage all your device settings and notifications' 
                  : 'Gestiona todas las configuraciones y notificaciones de tus dispositivos'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <Card className="flex-1 p-4 border border-ice-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Bell className="h-5 w-5 text-ice-500" />
                      <h3 className="font-medium">
                        {language === 'en' ? 'Notification Settings' : 'Configuración de Notificaciones'}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {language === 'en' 
                        ? 'Configure how and when you receive notifications from your devices' 
                        : 'Configura cómo y cuándo recibes notificaciones de tus dispositivos'}
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      {language === 'en' ? 'Configure Notifications' : 'Configurar Notificaciones'}
                    </Button>
                  </Card>
                  
                  <Card className="flex-1 p-4 border border-ice-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Settings className="h-5 w-5 text-ice-500" />
                      <h3 className="font-medium">
                        {language === 'en' ? 'Device Preferences' : 'Preferencias de Dispositivos'}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {language === 'en' 
                        ? 'Adjust sensitivity, check-in frequency, and other device settings' 
                        : 'Ajusta la sensibilidad, la frecuencia de registro y otras configuraciones de dispositivos'}
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      {language === 'en' ? 'Adjust Settings' : 'Ajustar Configuración'}
                    </Button>
                  </Card>
                </div>
                
                <Card className="p-4 border border-ice-200">
                  <h3 className="font-medium mb-3">
                    {language === 'en' ? 'Contact Settings' : 'Configuración de Contactos'}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === 'en' 
                      ? 'Manage emergency contacts and notification recipients' 
                      : 'Gestiona contactos de emergencia y destinatarios de notificaciones'}
                  </p>
                  <Button variant="outline" size="sm">
                    {language === 'en' ? 'Manage Contacts' : 'Gestionar Contactos'}
                  </Button>
                </Card>
              </div>
            </CardContent>
          </Card>
          
        </div>
      </div>
    </div>
  );
};

export default DevicesSettingsPage;
