
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusSquare, Settings, Battery, Clock, History, ShoppingCart, Shield, Bell, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { mockUserDevices } from "@/components/member/dashboard/data";
import { getDevices } from "@/components/devices/deviceData";

const MedicalDispenserPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  const [hasDevice, setHasDevice] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState("87%");
  const [lastCheckin, setLastCheckin] = useState("Today, 8:15 AM");
  const [currentTab, setCurrentTab] = useState("overview");
  const [refillReminders, setRefillReminders] = useState(true);
  const [audioAlerts, setAudioAlerts] = useState(true);
  const [missedDoseNotifications, setMissedDoseNotifications] = useState(true);
  
  const devices = getDevices(language);
  const medicalDispenser = devices.find(device => device.id === "dispenser");
  
  // Check if user has the device
  useEffect(() => {
    // In a real app, this would come from an API call
    const userHasDevice = mockUserDevices.some(
      device => device.name.toLowerCase().includes("dispenser") || device.name.toLowerCase().includes("medical")
    );
    setHasDevice(userHasDevice);
    
    if (userHasDevice) {
      const device = mockUserDevices.find(
        device => device.name.toLowerCase().includes("dispenser") || device.name.toLowerCase().includes("medical")
      );
      if (device) {
        setBatteryLevel(device.batteryLevel);
        setLastCheckin(device.lastChecked);
      }
    }
  }, []);

  const handleAddToCart = () => {
    toast.success(language === 'en' 
      ? "Medical Dispenser added to your cart" 
      : "Dispensador Médico añadido a su carrito");
  };

  const handleRunDiagnostic = () => {
    toast.info(language === 'en' 
      ? "Diagnostic test running..." 
      : "Ejecutando prueba de diagnóstico...");
    
    setTimeout(() => {
      toast.success(language === 'en' 
        ? "Diagnostic complete: Device functioning normally" 
        : "Diagnóstico completo: El dispositivo funciona normalmente");
    }, 2000);
  };

  // Calculate pricing for displaying in purchase section
  const devicePrice = medicalDispenser ? {
    oneTime: medicalDispenser.price,
    monthly: medicalDispenser.monthlyService,
    tax: medicalDispenser.price * 0.21,
    shipping: 14.99,
    shippingTax: 14.99 * 0.21,
    totalOneTime: medicalDispenser.price * 1.21 + 14.99 * 1.21,
    totalMonthly: medicalDispenser.monthlyService * 1.10
  } : {
    oneTime: 249.99,
    monthly: 24.99,
    tax: 249.99 * 0.21,
    shipping: 14.99,
    shippingTax: 14.99 * 0.21,
    totalOneTime: 249.99 * 1.21 + 14.99 * 1.21,
    totalMonthly: 24.99 * 1.10
  };

  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="medical-dispenser"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className={`flex-1 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6 w-full">
          <ToastContainer />
          
          <div className="flex items-center mb-6">
            <PlusSquare className="h-8 w-8 text-guardian-500 mr-3" />
            <div>
              <h1 className="text-2xl font-bold">
                {language === 'en' ? 'Medical Dispenser' : 'Dispensador Médico'}
              </h1>
              <p className="text-muted-foreground">
                {language === 'en' 
                  ? 'Manage your automated medication dispenser device' 
                  : 'Gestione su dispositivo dispensador automático de medicamentos'}
              </p>
            </div>
            {hasDevice && (
              <Badge variant="outline" className="ml-auto bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                {language === 'en' ? 'Active' : 'Activo'}
              </Badge>
            )}
          </div>
          
          {hasDevice ? (
            <Tabs defaultValue="overview" className="w-full" onValueChange={setCurrentTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="overview">
                  {language === 'en' ? 'Overview' : 'Resumen'}
                </TabsTrigger>
                <TabsTrigger value="schedule">
                  {language === 'en' ? 'Medication Schedule' : 'Horario de Medicación'}
                </TabsTrigger>
                <TabsTrigger value="settings">
                  {language === 'en' ? 'Settings' : 'Configuración'}
                </TabsTrigger>
                <TabsTrigger value="history">
                  {language === 'en' ? 'History' : 'Historial'}
                </TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Battery className="h-5 w-5 text-green-500" />
                        <CardTitle className="text-base">
                          {language === 'en' ? 'Battery Status' : 'Estado de Batería'}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center py-4">
                        <div className="text-3xl font-bold text-green-500">{batteryLevel}</div>
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' 
                            ? 'Backup power: 48 hours' 
                            : 'Energía de respaldo: 48 horas'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Pill className="h-5 w-5 text-guardian-600" />
                        <CardTitle className="text-base">
                          {language === 'en' ? 'Next Dose' : 'Próxima Dosis'}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center py-4">
                        <p className="text-center font-medium">
                          {language === 'en' ? 'Today, 6:00 PM' : 'Hoy, 6:00 PM'}
                        </p>
                        <p className="text-sm text-muted-foreground text-center mt-1">
                          {language === 'en' ? '2 medications' : '2 medicamentos'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-guardian-500" />
                        <CardTitle className="text-base">
                          {language === 'en' ? 'Last Check-in' : 'Último Registro'}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center py-4">
                        <p className="text-center font-medium">{lastCheckin}</p>
                        <p className="text-sm text-muted-foreground text-center mt-1">
                          {language === 'en' 
                            ? 'Device status normal' 
                            : 'Estado del dispositivo normal'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>{language === 'en' ? 'Medication Adherence' : 'Cumplimiento de Medicación'}</CardTitle>
                    <CardDescription>
                      {language === 'en' ? 'Last 7 days' : 'Últimos 7 días'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-12 flex items-center">
                      <div className="w-full bg-ice-100 rounded-full h-4">
                        <div className="bg-green-500 h-4 rounded-full" style={{ width: '97%' }}></div>
                      </div>
                      <span className="ml-3 font-medium">97%</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      {language === 'en' 
                        ? 'Excellent adherence. 1 dose was delayed by 10 minutes.' 
                        : 'Excelente cumplimiento. 1 dosis se retrasó 10 minutos.'}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>{language === 'en' ? 'Quick Actions' : 'Acciones Rápidas'}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-3">
                    <Button 
                      variant="outline" 
                      className="border-guardian-200 text-guardian-700 hover:bg-guardian-50"
                      onClick={handleRunDiagnostic}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      {language === 'en' ? 'Run Diagnostic' : 'Ejecutar Diagnóstico'}
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-guardian-200 text-guardian-700 hover:bg-guardian-50"
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {language === 'en' ? 'Adjust Schedule' : 'Ajustar Horario'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Medication Schedule Tab */}
              <TabsContent value="schedule" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === 'en' ? 'Medication Schedule' : 'Horario de Medicación'}
                    </CardTitle>
                    <CardDescription>
                      {language === 'en' 
                        ? 'Manage your medication schedule and reminders' 
                        : 'Administre su horario de medicación y recordatorios'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-md p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">
                              {language === 'en' ? 'Morning (8:00 AM)' : 'Mañana (8:00 AM)'}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {language === 'en' ? '2 medications' : '2 medicamentos'}
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            {language === 'en' ? 'Edit' : 'Editar'}
                          </Button>
                        </div>
                        <div className="pl-4 space-y-1 text-sm">
                          <p>• {language === 'en' ? 'Medication A - 1 pill' : 'Medicamento A - 1 píldora'}</p>
                          <p>• {language === 'en' ? 'Medication B - 2 pills' : 'Medicamento B - 2 píldoras'}</p>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">
                              {language === 'en' ? 'Evening (6:00 PM)' : 'Tarde (6:00 PM)'}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {language === 'en' ? '2 medications' : '2 medicamentos'}
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            {language === 'en' ? 'Edit' : 'Editar'}
                          </Button>
                        </div>
                        <div className="pl-4 space-y-1 text-sm">
                          <p>• {language === 'en' ? 'Medication A - 1 pill' : 'Medicamento A - 1 píldora'}</p>
                          <p>• {language === 'en' ? 'Medication C - 1 pill' : 'Medicamento C - 1 píldora'}</p>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-guardian-600 hover:bg-guardian-700">
                        <PlusSquare className="mr-2 h-4 w-4" />
                        {language === 'en' ? 'Add New Schedule' : 'Añadir Nuevo Horario'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === 'en' ? 'Device Settings' : 'Configuración del Dispositivo'}
                    </CardTitle>
                    <CardDescription>
                      {language === 'en' 
                        ? 'Customize how your Medical Dispenser works' 
                        : 'Personalice cómo funciona su Dispensador Médico'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">
                          {language === 'en' ? 'Refill Reminders' : 'Recordatorios de Recarga'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' 
                            ? 'Receive notifications when medication needs refilling' 
                            : 'Recibir notificaciones cuando la medicación necesite recarga'}
                        </p>
                      </div>
                      <Switch 
                        checked={refillReminders} 
                        onCheckedChange={setRefillReminders} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">
                          {language === 'en' ? 'Missed Dose Notifications' : 'Notificaciones de Dosis Olvidadas'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' 
                            ? 'Alert when a scheduled dose is missed' 
                            : 'Alerta cuando se omite una dosis programada'}
                        </p>
                      </div>
                      <Switch 
                        checked={missedDoseNotifications} 
                        onCheckedChange={setMissedDoseNotifications} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">
                          {language === 'en' ? 'Audio Alerts' : 'Alertas de Audio'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' 
                            ? 'Play sound when it\'s time to take medication' 
                            : 'Reproducir sonido cuando sea hora de tomar la medicación'}
                        </p>
                      </div>
                      <Switch 
                        checked={audioAlerts} 
                        onCheckedChange={setAudioAlerts} 
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* History Tab */}
              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === 'en' ? 'Medication History' : 'Historial de Medicación'}
                    </CardTitle>
                    <CardDescription>
                      {language === 'en' 
                        ? 'Record of medication dispensing' 
                        : 'Registro de dispensación de medicamentos'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="border-b pb-2">
                        <p className="text-sm font-medium">
                          {language === 'en' ? 'Today, 8:00 AM' : 'Hoy, 8:00 AM'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {language === 'en' 
                            ? 'Morning medications (2) - Taken on time' 
                            : 'Medicamentos de la mañana (2) - Tomados a tiempo'}
                        </p>
                      </div>
                      
                      <div className="border-b pb-2">
                        <p className="text-sm font-medium">
                          {language === 'en' ? 'Yesterday, 6:00 PM' : 'Ayer, 6:00 PM'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {language === 'en' 
                            ? 'Evening medications (2) - Taken on time' 
                            : 'Medicamentos de la tarde (2) - Tomados a tiempo'}
                        </p>
                      </div>
                      
                      <div className="border-b pb-2">
                        <p className="text-sm font-medium">
                          {language === 'en' ? 'Yesterday, 8:00 AM' : 'Ayer, 8:00 AM'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {language === 'en' 
                            ? 'Morning medications (2) - Taken with 10 min delay' 
                            : 'Medicamentos de la mañana (2) - Tomados con 10 min de retraso'}
                        </p>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full mt-4">
                      {language === 'en' ? 'View Full History' : 'Ver Historial Completo'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            /* User doesn't have the device - show purchase option */
            <div className="space-y-6">
              <Card className="border-guardian-200">
                <CardHeader className="pb-2">
                  <CardTitle>
                    {language === 'en' 
                      ? 'Add Medical Dispenser to Your Membership' 
                      : 'Añadir Dispensador Médico a Su Membresía'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'en' 
                      ? 'Smart medication management with automated dispensing and reminders' 
                      : 'Gestión inteligente de medicamentos con dispensación automatizada y recordatorios'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div>
                      <div className="mb-4">
                        <img 
                          src="/lovable-uploads/5e439305-cf63-4080-962e-52657e864050.png" 
                          alt="Medical Dispenser"
                          className="rounded-lg border border-guardian-100 bg-white p-4 object-contain mx-auto"
                          style={{ height: "200px" }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {language === 'en' ? 'Key Features' : 'Características Principales'}
                      </h3>
                      <ul className="space-y-1 mb-6">
                        {(language === 'en' 
                          ? [
                              "Automated pill dispensing",
                              "Customizable medication schedules",
                              "Missed dose notifications",
                              "Medication adherence tracking",
                              "Refill reminders"
                            ]
                          : [
                              "Dispensación automatizada de píldoras",
                              "Horarios de medicación personalizables",
                              "Notificaciones de dosis olvidadas",
                              "Seguimiento de adherencia a la medicación",
                              "Recordatorios de recarga"
                            ]
                        ).map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <Shield className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {language === 'en' ? 'Device Price' : 'Precio del Dispositivo'}:
                          </span>
                          <span>€{devicePrice.oneTime.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {language === 'en' ? 'IVA (21%)' : 'IVA (21%)'}:
                          </span>
                          <span>€{devicePrice.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {language === 'en' ? 'Shipping' : 'Envío'}:
                          </span>
                          <span>€{devicePrice.shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {language === 'en' ? 'Shipping IVA (21%)' : 'IVA de Envío (21%)'}:
                          </span>
                          <span>€{devicePrice.shippingTax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-medium pt-2 border-t border-gray-100">
                          <span>
                            {language === 'en' ? 'Total One-time Cost' : 'Costo Único Total'}:
                          </span>
                          <span>€{devicePrice.totalOneTime.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {language === 'en' 
                              ? 'Monthly Service (+ 10% IVA)' 
                              : 'Servicio Mensual (+ 10% IVA)'}:
                          </span>
                          <span>€{devicePrice.totalMonthly.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <Button onClick={handleAddToCart} className="w-full bg-guardian-600 hover:bg-guardian-700">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {language === 'en' ? 'Add to Cart' : 'Añadir al Carrito'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-blue-800">
                <p className="text-sm">
                  {language === 'en' 
                    ? 'The Medical Dispenser integrates with your ICE Alarm subscription to ensure you never miss a dose. Automating medication management helps improve adherence and health outcomes.' 
                    : 'El Dispensador Médico se integra con su suscripción ICE Alarm para asegurar que nunca se pierda una dosis. La automatización de la gestión de medicamentos ayuda a mejorar la adherencia y los resultados de salud.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalDispenserPage;
