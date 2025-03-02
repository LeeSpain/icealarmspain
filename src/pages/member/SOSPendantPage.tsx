
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BellRing, Settings, Battery, MapPin, History, ShoppingCart, Shield, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { mockUserDevices, availableProducts } from "@/components/member/dashboard/data";
import { getDevices } from "@/components/devices/deviceData";
import { Link } from "react-router-dom";
import { calculateTotals } from "@/utils/joinUtils";

const SOSPendantPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  const [hasDevice, setHasDevice] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState("92%");
  const [lastCheckin, setLastCheckin] = useState("Today, 9:30 AM");
  const [currentTab, setCurrentTab] = useState("overview");
  const [emergencyContact, setEmergencyContact] = useState(true);
  const [fallDetection, setFallDetection] = useState(true);
  const [locationTracking, setLocationTracking] = useState(true);
  
  const devices = getDevices(language);
  const sosPendant = devices.find(device => device.id === "sos");
  
  // Check if user has the device
  useEffect(() => {
    // In a real app, this would come from an API call
    const userHasDevice = mockUserDevices.some(
      device => device.name.toLowerCase().includes("alarm") || device.name.toLowerCase().includes("sos")
    );
    setHasDevice(userHasDevice);
    
    if (userHasDevice) {
      const device = mockUserDevices.find(
        device => device.name.toLowerCase().includes("alarm") || device.name.toLowerCase().includes("sos")
      );
      if (device) {
        setBatteryLevel(device.batteryLevel);
        setLastCheckin(device.lastChecked);
      }
    }
  }, []);

  const handleAddToCart = () => {
    toast.success(language === 'en' 
      ? "SOS Pendant added to your cart" 
      : "Colgante SOS añadido a su carrito");
  };

  const handleSendTestAlert = () => {
    toast.info(language === 'en' 
      ? "Test alert sent successfully" 
      : "Alerta de prueba enviada con éxito");
  };

  // Calculate pricing for displaying in purchase section
  const devicePrice = sosPendant ? {
    oneTime: sosPendant.price,
    monthly: sosPendant.monthlyService,
    tax: sosPendant.price * 0.21,
    shipping: 14.99,
    shippingTax: 14.99 * 0.21,
    totalOneTime: sosPendant.price * 1.21 + 14.99 * 1.21,
    totalMonthly: sosPendant.monthlyService * 1.10
  } : {
    oneTime: 110,
    monthly: 24.99,
    tax: 110 * 0.21,
    shipping: 14.99,
    shippingTax: 14.99 * 0.21,
    totalOneTime: 110 * 1.21 + 14.99 * 1.21,
    totalMonthly: 24.99 * 1.10
  };

  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="sos-pendant"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className={`flex-1 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6 w-full">
          <ToastContainer />
          
          <div className="flex items-center mb-6">
            <BellRing className="h-8 w-8 text-orange-500 mr-3" />
            <div>
              <h1 className="text-2xl font-bold">
                {language === 'en' ? 'SOS Pendant' : 'Colgante SOS'}
              </h1>
              <p className="text-muted-foreground">
                {language === 'en' 
                  ? 'Manage your emergency pendant device and settings' 
                  : 'Gestione su dispositivo de colgante de emergencia y configuración'}
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
                <TabsTrigger value="settings">
                  {language === 'en' ? 'Settings' : 'Configuración'}
                </TabsTrigger>
                <TabsTrigger value="history">
                  {language === 'en' ? 'Alert History' : 'Historial de Alertas'}
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
                            ? 'Estimated 5 days remaining' 
                            : 'Aproximadamente 5 días restantes'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-ice-600" />
                        <CardTitle className="text-base">
                          {language === 'en' ? 'Last Known Location' : 'Última Ubicación Conocida'}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center py-4">
                        <p className="text-center">
                          {language === 'en' 
                            ? 'Home (3 min ago)' 
                            : 'Casa (hace 3 min)'}
                        </p>
                        <p className="text-sm text-muted-foreground text-center mt-1">
                          {language === 'en' 
                            ? 'GPS signal active' 
                            : 'Señal GPS activa'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-orange-500" />
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
                    <CardTitle>{language === 'en' ? 'Quick Actions' : 'Acciones Rápidas'}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-3">
                    <Button 
                      variant="outline" 
                      className="border-orange-200 text-orange-700 hover:bg-orange-50"
                      onClick={handleSendTestAlert}
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      {language === 'en' ? 'Send Test Alert' : 'Enviar Alerta de Prueba'}
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-ice-200 text-ice-700 hover:bg-ice-50"
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      {language === 'en' ? 'Locate Device' : 'Localizar Dispositivo'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === 'en' ? 'Device Settings' : 'Configuración del Dispositivo'}</CardTitle>
                    <CardDescription>
                      {language === 'en' 
                        ? 'Customize how your SOS Pendant works' 
                        : 'Personalice cómo funciona su Colgante SOS'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">
                          {language === 'en' ? 'Fall Detection' : 'Detección de Caídas'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' 
                            ? 'Automatically detect falls and send alerts' 
                            : 'Detectar caídas automáticamente y enviar alertas'}
                        </p>
                      </div>
                      <Switch 
                        checked={fallDetection} 
                        onCheckedChange={setFallDetection} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">
                          {language === 'en' ? 'GPS Location Tracking' : 'Seguimiento de Ubicación GPS'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' 
                            ? 'Track device location in case of emergency' 
                            : 'Rastrear la ubicación del dispositivo en caso de emergencia'}
                        </p>
                      </div>
                      <Switch 
                        checked={locationTracking} 
                        onCheckedChange={setLocationTracking} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">
                          {language === 'en' ? 'Emergency Contact Notification' : 'Notificación a Contacto de Emergencia'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' 
                            ? 'Notify emergency contacts when alarm is triggered' 
                            : 'Notificar a contactos de emergencia cuando se activa la alarma'}
                        </p>
                      </div>
                      <Switch 
                        checked={emergencyContact} 
                        onCheckedChange={setEmergencyContact} 
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === 'en' ? 'Emergency Contacts' : 'Contactos de Emergencia'}
                    </CardTitle>
                    <CardDescription>
                      {language === 'en' 
                        ? 'People who will be notified in case of emergency' 
                        : 'Personas que serán notificadas en caso de emergencia'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      {language === 'en' ? 'Manage Emergency Contacts' : 'Administrar Contactos de Emergencia'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* History Tab */}
              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === 'en' ? 'Alert History' : 'Historial de Alertas'}
                    </CardTitle>
                    <CardDescription>
                      {language === 'en' 
                        ? 'Recent alerts from your device' 
                        : 'Alertas recientes de su dispositivo'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <History className="h-12 w-12 mx-auto mb-2 opacity-30" />
                      <p>
                        {language === 'en' 
                          ? 'No alerts in the past 30 days' 
                          : 'No hay alertas en los últimos 30 días'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            /* User doesn't have the device - show purchase option */
            <div className="space-y-6">
              <Card className="border-ice-200">
                <CardHeader className="pb-2">
                  <CardTitle>
                    {language === 'en' 
                      ? 'Add SOS Pendant to Your Membership' 
                      : 'Añadir Colgante SOS a Su Membresía'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'en' 
                      ? 'Get immediate emergency response with just one touch' 
                      : 'Obtenga respuesta inmediata a emergencias con un solo toque'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div>
                      <div className="mb-4">
                        <img 
                          src="/lovable-uploads/ad65a632-e7ef-4c61-a20e-7b6ff282a87a.png" 
                          alt="SOS Pendant"
                          className="rounded-lg border border-ice-100 bg-white p-4 object-contain mx-auto"
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
                              "One-touch emergency button",
                              "Advanced fall detection",
                              "GPS location tracking",
                              "Water-resistant design",
                              "Long battery life (up to 7 days)"
                            ]
                          : [
                              "Botón de emergencia con un toque",
                              "Detección avanzada de caídas",
                              "Seguimiento de ubicación GPS",
                              "Diseño resistente al agua",
                              "Batería de larga duración (hasta 7 días)"
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
                      
                      <Button onClick={handleAddToCart} className="w-full bg-orange-600 hover:bg-orange-700">
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
                    ? 'The SOS Pendant integrates seamlessly with your ICE Alarm subscription. You can add this device to your account and have it shipped to your home in just a few days.' 
                    : 'El Colgante SOS se integra perfectamente con su suscripción ICE Alarm. Puede añadir este dispositivo a su cuenta y recibirlo en su domicilio en pocos días.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SOSPendantPage;
