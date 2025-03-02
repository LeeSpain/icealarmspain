
import React, { useState } from "react";
import MemberSidebar from "@/components/member/MemberSidebar";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { getDevices } from "@/components/devices/deviceData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AlertCircle, BellRing, Settings, Shield, ShoppingCart } from "lucide-react";
import DeviceSetupGuide from "@/components/member/DeviceSetupGuide";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SOSPendantMemberPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  
  // For demo purposes, let's assume the user doesn't have this device yet
  // In a real app, this would come from an API or context
  const [hasDevice, setHasDevice] = useState(false);
  
  const deviceData = getDevices(language).find(device => device.id === "sos");
  
  const handleBuyDevice = () => {
    // In a real app, this would navigate to a checkout process
    toast.info(language === 'en' 
      ? "Adding SOS Pendant to your account..." 
      : "Añadiendo Colgante SOS a tu cuenta...");
    
    setTimeout(() => {
      setHasDevice(true);
      toast.success(language === 'en' 
        ? "SOS Pendant added to your account!" 
        : "¡Colgante SOS añadido a tu cuenta!");
    }, 1500);
  };
  
  const handleSetupComplete = () => {
    setShowSetupGuide(false);
    toast.success(language === 'en' 
      ? "SOS Pendant setup completed!" 
      : "¡Configuración del Colgante SOS completada!");
  };
  
  if (showSetupGuide) {
    return (
      <div className="flex h-screen bg-ice-50/30">
        <MemberSidebar 
          activePage="sos-pendant"
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        
        <div className={`flex-1 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <div className="p-6">
            <Button 
              variant="outline" 
              onClick={() => setShowSetupGuide(false)} 
              className="mb-6"
            >
              {language === 'en' ? 'Back to Device' : 'Volver al Dispositivo'}
            </Button>
            
            <DeviceSetupGuide 
              deviceType="pendant" 
              onComplete={handleSetupComplete} 
            />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="sos-pendant"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className={`flex-1 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BellRing className="h-6 w-6 text-orange-500" />
              {language === 'en' ? 'SOS Pendant' : 'Colgante SOS'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Manage your SOS Pendant device and settings' 
                : 'Gestiona tu dispositivo Colgante SOS y su configuración'}
            </p>
          </div>
          
          {hasDevice ? (
            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">
                  {language === 'en' ? 'Overview' : 'Resumen'}
                </TabsTrigger>
                <TabsTrigger value="settings">
                  {language === 'en' ? 'Settings' : 'Configuración'}
                </TabsTrigger>
                <TabsTrigger value="history">
                  {language === 'en' ? 'History' : 'Historial'}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === 'en' ? 'Device Status' : 'Estado del Dispositivo'}</CardTitle>
                    <CardDescription>
                      {language === 'en' 
                        ? 'Current status and information about your SOS Pendant' 
                        : 'Estado actual e información sobre tu Colgante SOS'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{language === 'en' ? 'Status' : 'Estado'}</span>
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-green-500"></span>
                          <span className="text-sm text-green-600">{language === 'en' ? 'Active' : 'Activo'}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{language === 'en' ? 'Battery' : 'Batería'}</span>
                        <span className="text-sm">85%</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{language === 'en' ? 'Last Sync' : 'Última Sincronización'}</span>
                        <span className="text-sm">{language === 'en' ? '10 minutes ago' : 'Hace 10 minutos'}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{language === 'en' ? 'Last Test' : 'Última Prueba'}</span>
                        <span className="text-sm">{language === 'en' ? '2 days ago' : 'Hace 2 días'}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button className="w-full">
                        <Shield className="mr-2 h-4 w-4" />
                        {language === 'en' ? 'Test SOS Alarm' : 'Probar Alarma SOS'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>{language === 'en' ? 'Quick Actions' : 'Acciones Rápidas'}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      {language === 'en' ? 'Configure Alerts' : 'Configurar Alertas'}
                    </Button>
                    <Button variant="outline" size="sm">
                      {language === 'en' ? 'Update Emergency Contacts' : 'Actualizar Contactos de Emergencia'}
                    </Button>
                    <Button variant="outline" size="sm">
                      {language === 'en' ? 'View User Manual' : 'Ver Manual de Usuario'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === 'en' ? 'Device Settings' : 'Configuración del Dispositivo'}</CardTitle>
                    <CardDescription>
                      {language === 'en' 
                        ? 'Customize how your SOS Pendant works' 
                        : 'Personaliza cómo funciona tu Colgante SOS'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {language === 'en' 
                        ? 'Settings for your SOS Pendant would appear here.' 
                        : 'La configuración de tu Colgante SOS aparecería aquí.'}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === 'en' ? 'Alert History' : 'Historial de Alertas'}</CardTitle>
                    <CardDescription>
                      {language === 'en' 
                        ? 'Past alerts and events from your SOS Pendant' 
                        : 'Alertas y eventos pasados de tu Colgante SOS'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <AlertCircle className="mx-auto h-12 w-12 opacity-50 mb-4" />
                      <p>{language === 'en' ? 'No alerts recorded yet' : 'Aún no hay alertas registradas'}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="border border-ice-100">
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Get Your SOS Pendant' : 'Obtén Tu Colgante SOS'}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Add this essential safety device to your ICE Alarm system' 
                    : 'Añade este dispositivo esencial de seguridad a tu sistema ICE Alarm'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <img 
                      src="/lovable-uploads/ad65a632-e7ef-4c61-a20e-7b6ff282a87a.png" 
                      alt="SOS Pendant" 
                      className="w-full h-auto rounded-lg shadow-sm"
                    />
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <div>
                      <h3 className="font-medium text-lg mb-2">{deviceData?.name}</h3>
                      <p className="text-muted-foreground">{deviceData?.description}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">{language === 'en' ? 'Key Features:' : 'Características Principales:'}</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {deviceData?.features.slice(0, 4).map((feature, index) => (
                          <li key={index} className="text-sm">{feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div>
                          <p className="text-muted-foreground text-sm">{language === 'en' ? 'One-time purchase' : 'Compra única'}</p>
                          <p className="text-lg font-bold">${deviceData?.price.toFixed(2)}</p>
                        </div>
                        <div className="border-l pl-4">
                          <p className="text-muted-foreground text-sm">{language === 'en' ? 'Monthly service' : 'Servicio mensual'}</p>
                          <p className="text-lg font-bold">${deviceData?.monthlyService.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button onClick={handleBuyDevice} className="flex-1">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          {language === 'en' ? 'Add to My Account' : 'Añadir a Mi Cuenta'}
                        </Button>
                        <Button variant="outline" onClick={() => setShowSetupGuide(true)}>
                          {language === 'en' ? 'Learn More' : 'Más Información'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SOSPendantMemberPage;
