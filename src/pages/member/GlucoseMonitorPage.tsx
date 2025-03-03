
import React, { useState } from "react";
import MemberSidebar from "@/components/member/MemberSidebar";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { getDevices } from "@/components/devices/deviceData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ActivitySquare, AlertCircle, Settings, ShoppingCart } from "lucide-react";
import DeviceSetupGuide from "@/components/member/DeviceSetupGuide";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const GlucoseMonitorMemberPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  
  // For demo purposes, let's assume the user doesn't have this device yet
  // In a real app, this would come from an API or context
  const [hasDevice, setHasDevice] = useState(false);
  
  const deviceData = getDevices(language).find(device => device.id === "glucose");
  
  // Mock glucose data
  const mockGlucoseData = [
    { time: '6:00', value: 95 },
    { time: '8:00', value: 120 },
    { time: '10:00', value: 110 },
    { time: '12:00', value: 130 },
    { time: '14:00', value: 95 },
    { time: '16:00', value: 105 },
    { time: '18:00', value: 120 },
    { time: '20:00', value: 115 },
  ];
  
  const handleBuyDevice = () => {
    // In a real app, this would navigate to a checkout process
    toast.info(language === 'en' 
      ? "Adding Glucose Monitor to your account..." 
      : "Añadiendo Monitor de Glucosa a tu cuenta...");
    
    setTimeout(() => {
      setHasDevice(true);
      toast.success(language === 'en' 
        ? "Glucose Monitor added to your account!" 
        : "¡Monitor de Glucosa añadido a tu cuenta!");
    }, 1500);
  };
  
  const handleSetupComplete = () => {
    setShowSetupGuide(false);
    toast.success(language === 'en' 
      ? "Glucose Monitor setup completed!" 
      : "¡Configuración del Monitor de Glucosa completada!");
  };
  
  if (showSetupGuide) {
    return (
      <div className="flex h-screen bg-ice-50/30">
        <MemberSidebar 
          activePage="glucose-monitor"
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        
        <div className="flex-1 overflow-auto transition-all duration-300">
          <div className="p-6">
            <Button 
              variant="outline" 
              onClick={() => setShowSetupGuide(false)} 
              className="mb-6"
            >
              {language === 'en' ? 'Back to Device' : 'Volver al Dispositivo'}
            </Button>
            
            <DeviceSetupGuide 
              deviceType="monitor" 
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
        activePage="glucose-monitor"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-auto transition-all duration-300">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <ActivitySquare className="h-6 w-6 text-orange-500" />
              {language === 'en' ? 'Glucose Monitor' : 'Monitor de Glucosa'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Manage your Glucose Monitor device and readings' 
                : 'Gestiona tu dispositivo Monitor de Glucosa y sus lecturas'}
            </p>
          </div>
          
          {hasDevice ? (
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
                <Card>
                  <CardHeader>
                    <CardTitle>{language === 'en' ? 'Device Status' : 'Estado del Dispositivo'}</CardTitle>
                    <CardDescription>
                      {language === 'en' 
                        ? 'Current status and information about your Glucose Monitor' 
                        : 'Estado actual e información sobre tu Monitor de Glucosa'}
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
                        <span className="text-sm font-medium">{language === 'en' ? 'Sensor' : 'Sensor'}</span>
                        <span className="text-sm">{language === 'en' ? '10 days remaining' : '10 días restantes'}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{language === 'en' ? 'Last Reading' : 'Última Lectura'}</span>
                        <span className="text-sm">{language === 'en' ? '5 minutes ago' : 'Hace 5 minutos'}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{language === 'en' ? 'Current Reading' : 'Lectura Actual'}</span>
                        <span className="text-sm font-semibold">115 mg/dL</span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Card className="bg-slate-50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">{language === 'en' ? 'Today\'s Trend' : 'Tendencia de Hoy'}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={mockGlucoseData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" />
                                <YAxis domain={[60, 200]} />
                                <Tooltip />
                                <Line 
                                  type="monotone" 
                                  dataKey="value" 
                                  stroke="#0284c7" 
                                  activeDot={{ r: 8 }} 
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
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
                      {language === 'en' ? 'Generate Report' : 'Generar Informe'}
                    </Button>
                    <Button variant="outline" size="sm">
                      {language === 'en' ? 'Order New Sensors' : 'Pedir Nuevos Sensores'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="readings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === 'en' ? 'Glucose Readings' : 'Lecturas de Glucosa'}</CardTitle>
                    <CardDescription>
                      {language === 'en' 
                        ? 'Detailed history of your glucose readings' 
                        : 'Historial detallado de tus lecturas de glucosa'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {language === 'en' 
                        ? 'Detailed readings would appear here.' 
                        : 'Las lecturas detalladas aparecerían aquí.'}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === 'en' ? 'Device Settings' : 'Configuración del Dispositivo'}</CardTitle>
                    <CardDescription>
                      {language === 'en' 
                        ? 'Customize how your Glucose Monitor works' 
                        : 'Personaliza cómo funciona tu Monitor de Glucosa'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {language === 'en' 
                        ? 'Settings for your Glucose Monitor would appear here.' 
                        : 'La configuración de tu Monitor de Glucosa aparecería aquí.'}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="border border-ice-100">
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Get Your Glucose Monitor' : 'Obtén Tu Monitor de Glucosa'}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Add continuous glucose monitoring to your ICE Alarm system' 
                    : 'Añade monitoreo continuo de glucosa a tu sistema ICE Alarm'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <img 
                      src="/lovable-uploads/6eb6b5d1-34a3-4236-ac3a-351d6c22de7e.png" 
                      alt="Glucose Monitor" 
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

export default GlucoseMonitorMemberPage;
