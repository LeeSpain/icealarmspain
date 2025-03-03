
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DeviceSettings, AlertCircle, Bell, Settings, Battery, Wifi, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useParams } from "react-router-dom";

const DeviceSettingsPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  const { deviceId } = useParams();
  
  // Mock device settings
  const [deviceSettings, setDeviceSettings] = useState({
    alertVolume: 80,
    vibrationEnabled: true,
    autoAlert: true,
    fallDetection: true,
    locationSharing: true,
    batteryAlerts: true,
    nightMode: false
  });
  
  const handleToggle = (setting: keyof typeof deviceSettings) => {
    setDeviceSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    toast.success(
      language === 'en' 
        ? "Device setting updated!" 
        : "¡Configuración del dispositivo actualizada!"
    );
  };
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage={deviceId?.includes('sos') ? 'sos-pendant' : deviceId?.includes('glucose') ? 'glucose-monitor' : 'medical-dispenser'}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className={`flex-1 overflow-auto transition-all duration-300`}>
        <div className="p-6 max-w-7xl mx-auto">
          <ToastContainer />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-ice-800 mb-2">
              {language === 'en' ? 'Device Settings' : 'Configuración del Dispositivo'}
            </h1>
            <p className="text-ice-700">
              {language === 'en' 
                ? 'Manage and configure your device preferences' 
                : 'Gestiona y configura las preferencias de tu dispositivo'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-ice-500" />
                    <CardTitle>
                      {language === 'en' ? 'General Settings' : 'Configuración General'}
                    </CardTitle>
                  </div>
                  <CardDescription>
                    {language === 'en' 
                      ? 'Configure basic device functionality' 
                      : 'Configura la funcionalidad básica del dispositivo'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="vibrationEnabled" className="font-medium">
                          {language === 'en' ? 'Vibration Alerts' : 'Alertas de Vibración'}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' 
                            ? 'Enable vibration for alerts and notifications' 
                            : 'Activar vibración para alertas y notificaciones'}
                        </p>
                      </div>
                      <Switch 
                        id="vibrationEnabled" 
                        checked={deviceSettings.vibrationEnabled} 
                        onCheckedChange={() => handleToggle('vibrationEnabled')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="autoAlert" className="font-medium">
                          {language === 'en' ? 'Automatic Alerts' : 'Alertas Automáticas'}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' 
                            ? 'Send alerts automatically for detected emergencies' 
                            : 'Enviar alertas automáticamente para emergencias detectadas'}
                        </p>
                      </div>
                      <Switch 
                        id="autoAlert" 
                        checked={deviceSettings.autoAlert} 
                        onCheckedChange={() => handleToggle('autoAlert')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="fallDetection" className="font-medium">
                          {language === 'en' ? 'Fall Detection' : 'Detección de Caídas'}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' 
                            ? 'Automatically detect falls and trigger alerts' 
                            : 'Detectar caídas automáticamente y activar alertas'}
                        </p>
                      </div>
                      <Switch 
                        id="fallDetection" 
                        checked={deviceSettings.fallDetection} 
                        onCheckedChange={() => handleToggle('fallDetection')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="nightMode" className="font-medium">
                          {language === 'en' ? 'Night Mode' : 'Modo Nocturno'}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' 
                            ? 'Dim lights and reduce sounds during night hours' 
                            : 'Atenuar luces y reducir sonidos durante la noche'}
                        </p>
                      </div>
                      <Switch 
                        id="nightMode" 
                        checked={deviceSettings.nightMode} 
                        onCheckedChange={() => handleToggle('nightMode')}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-ice-500" />
                    <CardTitle>
                      {language === 'en' ? 'Alert Settings' : 'Configuración de Alertas'}
                    </CardTitle>
                  </div>
                  <CardDescription>
                    {language === 'en' 
                      ? 'Configure alert preferences and thresholds' 
                      : 'Configura preferencias y umbrales de alertas'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="alertVolume" className="font-medium">
                        {language === 'en' ? 'Alert Volume' : 'Volumen de Alerta'}
                      </Label>
                      <div className="flex items-center justify-between mt-2">
                        <input 
                          type="range" 
                          id="alertVolume" 
                          min="0" 
                          max="100" 
                          value={deviceSettings.alertVolume} 
                          onChange={(e) => {
                            setDeviceSettings({
                              ...deviceSettings,
                              alertVolume: parseInt(e.target.value)
                            });
                          }}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="ml-2 text-sm font-medium">{deviceSettings.alertVolume}%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="batteryAlerts" className="font-medium">
                          {language === 'en' ? 'Battery Alerts' : 'Alertas de Batería'}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' 
                            ? 'Notify when battery level is low' 
                            : 'Notificar cuando el nivel de batería es bajo'}
                        </p>
                      </div>
                      <Switch 
                        id="batteryAlerts" 
                        checked={deviceSettings.batteryAlerts} 
                        onCheckedChange={() => handleToggle('batteryAlerts')}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-ice-500" />
                    <CardTitle>
                      {language === 'en' ? 'Location Services' : 'Servicios de Ubicación'}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="locationSharing" className="font-medium">
                        {language === 'en' ? 'Location Sharing' : 'Compartir Ubicación'}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' 
                          ? 'Share your location during emergencies' 
                          : 'Compartir tu ubicación durante emergencias'}
                      </p>
                    </div>
                    <Switch 
                      id="locationSharing" 
                      checked={deviceSettings.locationSharing} 
                      onCheckedChange={() => handleToggle('locationSharing')}
                    />
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    {language === 'en' ? 'Calibrate GPS' : 'Calibrar GPS'}
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <DeviceSettings className="h-5 w-5 text-ice-500" />
                    <CardTitle>
                      {language === 'en' ? 'Device Information' : 'Información del Dispositivo'}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{language === 'en' ? 'Model' : 'Modelo'}</span>
                    <span className="text-sm text-muted-foreground">ICE Alarm Pro</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{language === 'en' ? 'Serial Number' : 'Número de Serie'}</span>
                    <span className="text-sm text-muted-foreground">SN12345678</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{language === 'en' ? 'Firmware' : 'Firmware'}</span>
                    <span className="text-sm text-muted-foreground">v2.1.4</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Battery className="h-4 w-4 mr-1 text-green-500" />
                      <span className="text-sm font-medium">{language === 'en' ? 'Battery' : 'Batería'}</span>
                    </div>
                    <span className="text-sm text-green-500">85%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Wifi className="h-4 w-4 mr-1 text-blue-500" />
                      <span className="text-sm font-medium">{language === 'en' ? 'Connection' : 'Conexión'}</span>
                    </div>
                    <span className="text-sm text-blue-500">{language === 'en' ? 'Strong' : 'Fuerte'}</span>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    {language === 'en' ? 'Update Firmware' : 'Actualizar Firmware'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default DeviceSettingsPage;
