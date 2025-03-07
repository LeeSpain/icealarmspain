
import React, { useState } from "react";
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Globe, Lock, Shield, Smartphone, User } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DashboardSettingsPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language, setLanguage } = useLanguage();
  
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
              {language === 'en' ? 'Settings' : 'Configuración'}
            </h1>
            <p className="text-ice-700">
              {language === 'en' 
                ? 'Manage your account settings and preferences' 
                : 'Gestiona la configuración y preferencias de tu cuenta'}
            </p>
          </div>

          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full md:grid-cols-4 grid-cols-2 mb-8">
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {language === 'en' ? 'Account' : 'Cuenta'}
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                {language === 'en' ? 'Notifications' : 'Notificaciones'}
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                {language === 'en' ? 'Privacy' : 'Privacidad'}
              </TabsTrigger>
              <TabsTrigger value="language" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                {language === 'en' ? 'Language' : 'Idioma'}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Account Settings' : 'Configuración de la Cuenta'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'en' 
                      ? 'Manage your account settings and preferences' 
                      : 'Gestiona la configuración y preferencias de tu cuenta'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{language === 'en' ? 'Two-factor authentication' : 'Autenticación de dos factores'}</h3>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Add an extra layer of security' : 'Añade una capa extra de seguridad'}
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{language === 'en' ? 'Login notifications' : 'Notificaciones de inicio de sesión'}</h3>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Get notified when someone logs in to your account' : 'Recibe notificaciones cuando alguien inicie sesión en tu cuenta'}
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Notification Settings' : 'Configuración de Notificaciones'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'en' 
                      ? 'Control how and when you receive notifications' 
                      : 'Controla cómo y cuándo recibes notificaciones'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{language === 'en' ? 'Email Notifications' : 'Notificaciones por Correo'}</h3>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Receive notifications via email' : 'Recibe notificaciones por correo electrónico'}
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{language === 'en' ? 'SMS Notifications' : 'Notificaciones SMS'}</h3>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Receive notifications via SMS' : 'Recibe notificaciones por SMS'}
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{language === 'en' ? 'Push Notifications' : 'Notificaciones Push'}</h3>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Receive push notifications on your devices' : 'Recibe notificaciones push en tus dispositivos'}
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Privacy Settings' : 'Configuración de Privacidad'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'en' 
                      ? 'Control your privacy settings and data' 
                      : 'Controla tu configuración de privacidad y datos'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{language === 'en' ? 'Data Collection' : 'Recopilación de Datos'}</h3>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Allow us to collect data to improve your experience' : 'Permítenos recopilar datos para mejorar tu experiencia'}
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{language === 'en' ? 'Activity Tracking' : 'Seguimiento de Actividad'}</h3>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Track your activity for better recommendations' : 'Seguimiento de tu actividad para mejores recomendaciones'}
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{language === 'en' ? 'Marketing Emails' : 'Correos de Marketing'}</h3>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Receive marketing emails from us' : 'Recibe correos de marketing de nuestra parte'}
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="language">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Language Settings' : 'Configuración de Idioma'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'en' 
                      ? 'Change the language of the application' 
                      : 'Cambia el idioma de la aplicación'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button 
                      onClick={() => setLanguage('en')}
                      variant={language === 'en' ? 'default' : 'outline'}
                      className={language === 'en' ? 'bg-ice-600 hover:bg-ice-700' : ''}
                    >
                      English
                    </Button>
                    <Button 
                      onClick={() => setLanguage('es')}
                      variant={language === 'es' ? 'default' : 'outline'}
                      className={language === 'es' ? 'bg-ice-600 hover:bg-ice-700' : ''}
                    >
                      Español
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DashboardSettingsPage;
