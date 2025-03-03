
import React, { useState } from "react";
import MemberSidebar from "@/components/member/MemberSidebar";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { getDevices } from "@/components/devices/deviceData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AlertCircle, Clock, Pill, PlusSquare, Settings, ShoppingCart, Sparkles } from "lucide-react";
import DeviceSetupGuide from "@/components/member/DeviceSetupGuide";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Progress } from "@/components/ui/progress";

const MedicalDispenserMemberPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  
  // For demo purposes, let's assume the user doesn't have this device yet
  // In a real app, this would come from an API or context
  const [hasDevice, setHasDevice] = useState(false);
  
  const deviceData = getDevices(language).find(device => device.id === "dispenser");

  // Mock medication data
  const mockMedications = [
    { name: "Metformin", schedule: "8:00, 20:00", remaining: 12, total: 28 },
    { name: "Atorvastatin", schedule: "20:00", remaining: 15, total: 30 },
    { name: "Lisinopril", schedule: "8:00", remaining: 10, total: 30 },
  ];
  
  const handleBuyDevice = () => {
    // In a real app, this would navigate to a checkout process
    toast.info(language === 'en' 
      ? "Adding Medical Dispenser to your account..." 
      : "Añadiendo Dispensador Médico a tu cuenta...");
    
    setTimeout(() => {
      setHasDevice(true);
      toast.success(language === 'en' 
        ? "Medical Dispenser added to your account!" 
        : "¡Dispensador Médico añadido a tu cuenta!");
    }, 1500);
  };
  
  const handleSetupComplete = () => {
    setShowSetupGuide(false);
    toast.success(language === 'en' 
      ? "Medical Dispenser setup completed!" 
      : "¡Configuración del Dispensador Médico completada!");
  };
  
  if (showSetupGuide) {
    return (
      <div className="flex h-screen bg-ice-50/30">
        <MemberSidebar 
          activePage="medical-dispenser"
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
              deviceType="dispenser" 
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
        activePage="medical-dispenser"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-auto transition-all duration-300">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <PlusSquare className="h-6 w-6 text-guardian-500" />
              {language === 'en' ? 'Medical Dispenser' : 'Dispensador Médico'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Manage your Medical Dispenser device and medications' 
                : 'Gestiona tu Dispensador Médico y medicamentos'}
            </p>
          </div>
          
          {hasDevice ? (
            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">
                  {language === 'en' ? 'Overview' : 'Resumen'}
                </TabsTrigger>
                <TabsTrigger value="medications">
                  {language === 'en' ? 'Medications' : 'Medicamentos'}
                </TabsTrigger>
                <TabsTrigger value="schedule">
                  {language === 'en' ? 'Schedule' : 'Horario'}
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
                        ? 'Current status and information about your Medical Dispenser' 
                        : 'Estado actual e información sobre tu Dispensador Médico'}
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
                        <span className="text-sm font-medium">{language === 'en' ? 'Connection' : 'Conexión'}</span>
                        <span className="text-sm">{language === 'en' ? 'Online' : 'En línea'}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{language === 'en' ? 'Last Sync' : 'Última Sincronización'}</span>
                        <span className="text-sm">{language === 'en' ? '15 minutes ago' : 'Hace 15 minutos'}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{language === 'en' ? 'Next Dose' : 'Próxima Dosis'}</span>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-orange-500" />
                          <span className="text-sm font-semibold">20:00 - Metformin, Atorvastatin</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-3">{language === 'en' ? 'Medication Overview' : 'Resumen de Medicamentos'}</h3>
                      
                      {mockMedications.map((med, index) => (
                        <div key={index} className="mb-4">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">{med.name}</span>
                            <span className="text-xs text-muted-foreground">{med.remaining} / {med.total} {language === 'en' ? 'remaining' : 'restantes'}</span>
                          </div>
                          <Progress value={(med.remaining / med.total) * 100} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>{language === 'en' ? 'Quick Actions' : 'Acciones Rápidas'}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm">
                      <Pill className="mr-2 h-4 w-4" />
                      {language === 'en' ? 'Add Medication' : 'Añadir Medicamento'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      {language === 'en' ? 'Configure Alerts' : 'Configurar Alertas'}
                    </Button>
                    <Button variant="outline" size="sm">
                      {language === 'en' ? 'Order Refills' : 'Pedir Recambios'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="medications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === 'en' ? 'My Medications' : 'Mis Medicamentos'}</CardTitle>
                    <CardDescription>
                      {language === 'en' 
                        ? 'Manage medications in your dispenser' 
                        : 'Gestiona los medicamentos en tu dispensador'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {language === 'en' 
                        ? 'Detailed medication management would appear here.' 
                        : 'La gestión detallada de medicamentos aparecería aquí.'}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="schedule" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === 'en' ? 'Medication Schedule' : 'Horario de Medicamentos'}</CardTitle>
                    <CardDescription>
                      {language === 'en' 
                        ? 'Set and view your medication schedules' 
                        : 'Establece y visualiza los horarios de tus medicamentos'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {language === 'en' 
                        ? 'Medication schedules would appear here.' 
                        : 'Los horarios de medicamentos aparecerían aquí.'}
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
                        ? 'Customize how your Medical Dispenser works' 
                        : 'Personaliza cómo funciona tu Dispensador Médico'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {language === 'en' 
                        ? 'Settings for your Medical Dispenser would appear here.' 
                        : 'La configuración de tu Dispensador Médico aparecería aquí.'}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="border border-ice-100">
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Get Your Medical Dispenser' : 'Obtén Tu Dispensador Médico'}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Add automated medication management to your ICE Alarm system' 
                    : 'Añade gestión automatizada de medicamentos a tu sistema ICE Alarm'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <img 
                      src="/lovable-uploads/5e439305-cf63-4080-962e-52657e864050.png" 
                      alt="Medical Dispenser" 
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

export default MedicalDispenserMemberPage;
