
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Bell, Globe, Moon, Phone, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const SettingsPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  
  // Mock settings state
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: true,
    deviceAlerts: true,
    medicationReminders: true,
    weeklyReports: true,
    marketingEmails: false
  });
  
  const handleToggle = (setting: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    toast.success(
      language === 'en' 
        ? "Setting updated successfully!" 
        : "¡Configuración actualizada con éxito!"
    );
  };
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="settings"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className={`flex-1 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6 max-w-7xl mx-auto">
          <ToastContainer />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-ice-800 mb-2">
              {language === 'en' ? 'Settings' : 'Configuración'}
            </h1>
            <p className="text-ice-700">
              {language === 'en' 
                ? 'Configure your account and application settings' 
                : 'Configura los ajustes de tu cuenta y aplicación'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-ice-500" />
                  <CardTitle>
                    {language === 'en' ? 'Notification Settings' : 'Configuración de Notificaciones'}
                  </CardTitle>
                </div>
                <CardDescription>
                  {language === 'en' 
                    ? 'Manage how and when you receive alerts' 
                    : 'Gestiona cómo y cuándo recibes alertas'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailAlerts" className="font-medium">
                        {language === 'en' ? 'Email Alerts' : 'Alertas por Email'}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' 
                          ? 'Receive emergency notifications via email' 
                          : 'Recibir notificaciones de emergencia por email'}
                      </p>
                    </div>
                    <Switch 
                      id="emailAlerts" 
                      checked={notifications.emailAlerts} 
                      onCheckedChange={() => handleToggle('emailAlerts')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="smsAlerts" className="font-medium">
                        {language === 'en' ? 'SMS Alerts' : 'Alertas SMS'}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' 
                          ? 'Receive emergency notifications via SMS' 
                          : 'Recibir notificaciones de emergencia por SMS'}
                      </p>
                    </div>
                    <Switch 
                      id="smsAlerts" 
                      checked={notifications.smsAlerts} 
                      onCheckedChange={() => handleToggle('smsAlerts')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="deviceAlerts" className="font-medium">
                        {language === 'en' ? 'Device Alerts' : 'Alertas de Dispositivo'}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' 
                          ? 'Receive device status notifications' 
                          : 'Recibir notificaciones de estado del dispositivo'}
                      </p>
                    </div>
                    <Switch 
                      id="deviceAlerts" 
                      checked={notifications.deviceAlerts} 
                      onCheckedChange={() => handleToggle('deviceAlerts')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="medicationReminders" className="font-medium">
                        {language === 'en' ? 'Medication Reminders' : 'Recordatorios de Medicación'}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' 
                          ? 'Receive medication schedule reminders' 
                          : 'Recibir recordatorios de horario de medicación'}
                      </p>
                    </div>
                    <Switch 
                      id="medicationReminders" 
                      checked={notifications.medicationReminders} 
                      onCheckedChange={() => handleToggle('medicationReminders')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-ice-500" />
                  <CardTitle>
                    {language === 'en' ? 'Language & Display' : 'Idioma y Visualización'}
                  </CardTitle>
                </div>
                <CardDescription>
                  {language === 'en' 
                    ? 'Customize your language and display preferences' 
                    : 'Personaliza tus preferencias de idioma y visualización'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label className="font-medium mb-2 block">
                      {language === 'en' ? 'Language' : 'Idioma'}
                    </Label>
                    <LanguageSwitcher />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="darkMode" className="font-medium">
                        {language === 'en' ? 'Dark Mode' : 'Modo Oscuro'}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' 
                          ? 'Switch between light and dark theme' 
                          : 'Cambiar entre tema claro y oscuro'}
                      </p>
                    </div>
                    <Switch id="darkMode" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weeklyReports" className="font-medium">
                        {language === 'en' ? 'Weekly Reports' : 'Informes Semanales'}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' 
                          ? 'Receive weekly summary of your health data' 
                          : 'Recibir resumen semanal de tus datos de salud'}
                      </p>
                    </div>
                    <Switch 
                      id="weeklyReports" 
                      checked={notifications.weeklyReports} 
                      onCheckedChange={() => handleToggle('weeklyReports')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-ice-500" />
                  <CardTitle>
                    {language === 'en' ? 'Device Connections' : 'Conexiones de Dispositivos'}
                  </CardTitle>
                </div>
                <CardDescription>
                  {language === 'en' 
                    ? 'Manage connected apps and devices' 
                    : 'Gestiona aplicaciones y dispositivos conectados'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <h3 className="font-medium">
                        {language === 'en' ? 'Smartphone App' : 'Aplicación de Smartphone'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Connected' : 'Conectado'}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      {language === 'en' ? 'Manage' : 'Gestionar'}
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <h3 className="font-medium">
                        {language === 'en' ? 'Smart Watch' : 'Reloj Inteligente'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Not connected' : 'No conectado'}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      {language === 'en' ? 'Connect' : 'Conectar'}
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <h3 className="font-medium">
                        {language === 'en' ? 'Family Access' : 'Acceso Familiar'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' ? '2 accounts connected' : '2 cuentas conectadas'}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      {language === 'en' ? 'Manage' : 'Gestionar'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-ice-500" />
                  <CardTitle>
                    {language === 'en' ? 'Privacy & Data' : 'Privacidad y Datos'}
                  </CardTitle>
                </div>
                <CardDescription>
                  {language === 'en' 
                    ? 'Manage your data and privacy settings' 
                    : 'Gestiona tus datos y configuración de privacidad'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketingEmails" className="font-medium">
                        {language === 'en' ? 'Marketing Emails' : 'Emails de Marketing'}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' 
                          ? 'Receive promotional emails and offers' 
                          : 'Recibir emails promocionales y ofertas'}
                      </p>
                    </div>
                    <Switch 
                      id="marketingEmails" 
                      checked={notifications.marketingEmails} 
                      onCheckedChange={() => handleToggle('marketingEmails')}
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="outline" className="w-full mb-2">
                      {language === 'en' ? 'Download My Data' : 'Descargar Mis Datos'}
                    </Button>
                    
                    <Button variant="outline" className="w-full text-red-500 hover:text-red-700 hover:bg-red-50">
                      {language === 'en' ? 'Delete Account' : 'Eliminar Cuenta'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
