
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Settings, Battery, History, ShoppingCart, Shield, Bell, LineChart, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { mockUserDevices } from "@/components/member/dashboard/data";
import { getDevices } from "@/components/devices/deviceData";

const GlucoseMonitorPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  const [hasDevice, setHasDevice] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState("85%");
  const [lastCheckin, setLastCheckin] = useState("Today, 9:10 AM");
  const [currentTab, setCurrentTab] = useState("overview");
  const [highAlerts, setHighAlerts] = useState(true);
  const [lowAlerts, setLowAlerts] = useState(true);
  const [trendPredictions, setTrendPredictions] = useState(true);
  const [autoSharing, setAutoSharing] = useState(false);
  
  const devices = getDevices(language);
  const glucoseMonitor = devices.find(device => device.id === "glucose");
  
  // Check if user has the device
  useEffect(() => {
    // In a real app, this would come from an API call
    const userHasDevice = mockUserDevices.some(
      device => device.name.toLowerCase().includes("glucose") || device.name.toLowerCase().includes("monitor")
    );
    setHasDevice(userHasDevice);
    
    if (userHasDevice) {
      const device = mockUserDevices.find(
        device => device.name.toLowerCase().includes("glucose") || device.name.toLowerCase().includes("monitor")
      );
      if (device) {
        setBatteryLevel(device.batteryLevel);
        setLastCheckin(device.lastChecked);
      }
    }
  }, []);

  const handleAddToCart = () => {
    toast.success(language === 'en' 
      ? "Glucose Monitor added to your cart" 
      : "Monitor de Glucosa añadido a su carrito");
  };

  const handleSyncApp = () => {
    toast.info(language === 'en' 
      ? "Syncing with mobile app..." 
      : "Sincronizando con la aplicación móvil...");
    
    setTimeout(() => {
      toast.success(language === 'en' 
        ? "Successfully synced with mobile app" 
        : "Sincronizado con éxito con la aplicación móvil");
    }, 2000);
  };

  // Calculate pricing for displaying in purchase section
  const devicePrice = glucoseMonitor ? {
    oneTime: glucoseMonitor.price,
    monthly: glucoseMonitor.monthlyService,
    tax: glucoseMonitor.price * 0.21,
    shipping: 14.99,
    shippingTax: 14.99 * 0.21,
    totalOneTime: glucoseMonitor.price * 1.21 + 14.99 * 1.21,
    totalMonthly: glucoseMonitor.monthlyService * 1.10
  } : {
    oneTime: 149.99,
    monthly: 24.99,
    tax: 149.99 * 0.21,
    shipping: 14.99,
    shippingTax: 14.99 * 0.21,
    totalOneTime: 149.99 * 1.21 + 14.99 * 1.21,
    totalMonthly: 24.99 * 1.10
  };

  // Simulated glucose reading data for visualization
  const currentGlucose = 112;
  const glucoseTrend = "→";
  const dailyAverage = 118;
  const trendDirection = "stable";
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="glucose-monitor"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className={`flex-1 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6 w-full">
          <ToastContainer />
          
          <div className="flex items-center mb-6">
            <Activity className="h-8 w-8 text-orange-500 mr-3" />
            <div>
              <h1 className="text-2xl font-bold">
                {language === 'en' ? 'Glucose Monitor' : 'Monitor de Glucosa'}
              </h1>
              <p className="text-muted-foreground">
                {language === 'en' 
                  ? 'Manage your continuous glucose monitoring device' 
                  : 'Gestione su dispositivo de monitoreo continuo de glucosa'}
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
                <TabsTrigger value="trends">
                  {language === 'en' ? 'Trends & Analysis' : 'Tendencias y Análisis'}
                </TabsTrigger>
                <TabsTrigger value="settings">
                  {language === 'en' ? 'Settings' : 'Configuración'}
                </TabsTrigger>
                <TabsTrigger value="insights">
                  {language === 'en' ? 'Insights' : 'Información'}
                </TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-orange-500" />
                        <CardTitle className="text-base">
                          {language === 'en' ? 'Current Reading' : 'Lectura Actual'}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center py-4">
                        <div className="text-3xl font-bold text-orange-500">
                          {currentGlucose} <span className="text-xl">mg/dL</span> {glucoseTrend}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {language === 'en' 
                            ? 'Within target range' 
                            : 'Dentro del rango objetivo'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <LineChart className="h-5 w-5 text-ice-600" />
                        <CardTitle className="text-base">
                          {language === 'en' ? 'Daily Average' : 'Promedio Diario'}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center py-4">
                        <div className="text-2xl font-bold text-ice-600">
                          {dailyAverage} <span className="text-lg">mg/dL</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {language === 'en' 
                            ? `Trend: ${trendDirection}` 
                            : `Tendencia: ${trendDirection === 'stable' ? 'estable' : trendDirection === 'rising' ? 'subiendo' : 'bajando'}`}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Battery className="h-5 w-5 text-green-500" />
                        <CardTitle className="text-base">
                          {language === 'en' ? 'Sensor Status' : 'Estado del Sensor'}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center py-4">
                        <div className="text-xl font-bold text-green-500">
                          {language === 'en' ? 'Active' : 'Activo'}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {language === 'en' 
                            ? '10 days remaining' 
                            : '10 días restantes'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === 'en' ? 'Glucose Levels (Last 24 Hours)' : 'Niveles de Glucosa (Últimas 24 Horas)'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 flex items-center justify-center border rounded-md bg-gray-50">
                      <div className="text-center text-muted-foreground">
                        <LineChart className="h-8 w-8 mx-auto mb-2 opacity-40" />
                        <p>
                          {language === 'en' 
                            ? 'Glucose chart visualization would appear here' 
                            : 'La visualización del gráfico de glucosa aparecería aquí'}
                        </p>
                      </div>
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
                      className="border-orange-200 text-orange-700 hover:bg-orange-50"
                      onClick={handleSyncApp}
                    >
                      <Smartphone className="mr-2 h-4 w-4" />
                      {language === 'en' ? 'Sync with App' : 'Sincronizar con App'}
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-orange-200 text-orange-700 hover:bg-orange-50"
                    >
                      <Activity className="mr-2 h-4 w-4" />
                      {language === 'en' ? 'View Full History' : 'Ver Historial Completo'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Trends Tab */}
              <TabsContent value="trends" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === 'en' ? 'Glucose Trends' : 'Tendencias de Glucosa'}
                    </CardTitle>
                    <CardDescription>
                      {language === 'en' 
                        ? 'Analysis of your glucose patterns' 
                        : 'Análisis de sus patrones de glucosa'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="h-48 flex items-center justify-center border rounded-md bg-gray-50">
                        <div className="text-center text-muted-foreground">
                          <LineChart className="h-8 w-8 mx-auto mb-2 opacity-40" />
                          <p>
                            {language === 'en' 
                              ? 'Weekly trend visualization would appear here' 
                              : 'La visualización de tendencia semanal aparecería aquí'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">
                          {language === 'en' ? 'AI Insights' : 'Información de IA'}
                        </h3>
                        <div className="border rounded-md p-3 text-sm">
                          <p>
                            {language === 'en' 
                              ? 'Your glucose levels have been stable over the past week. Your post-meal spikes have decreased by 15% compared to last month.' 
                              : 'Sus niveles de glucosa han sido estables durante la última semana. Sus picos después de las comidas han disminuido un 15% en comparación con el mes pasado.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        {language === 'en' ? 'Time in Target Range' : 'Tiempo en Rango Objetivo'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center py-4">
                        <div className="w-32 h-32 relative rounded-full flex items-center justify-center bg-gray-100">
                          <div className="absolute inset-0 rounded-full border-8 border-green-500" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
                          <span className="text-2xl font-bold">82%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        {language === 'en' ? 'Events Analysis' : 'Análisis de Eventos'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 py-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {language === 'en' ? 'High readings' : 'Lecturas altas'}:
                          </span>
                          <span>3</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {language === 'en' ? 'Low readings' : 'Lecturas bajas'}:
                          </span>
                          <span>1</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {language === 'en' ? 'Average readings/day' : 'Lecturas promedio/día'}:
                          </span>
                          <span>24</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
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
                        ? 'Customize how your Glucose Monitor works' 
                        : 'Personalice cómo funciona su Monitor de Glucosa'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">
                          {language === 'en' ? 'High Glucose Alerts' : 'Alertas de Glucosa Alta'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' 
                            ? 'Alert when glucose exceeds 180 mg/dL' 
                            : 'Alerta cuando la glucosa excede 180 mg/dL'}
                        </p>
                      </div>
                      <Switch 
                        checked={highAlerts} 
                        onCheckedChange={setHighAlerts} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">
                          {language === 'en' ? 'Low Glucose Alerts' : 'Alertas de Glucosa Baja'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' 
                            ? 'Alert when glucose falls below 70 mg/dL' 
                            : 'Alerta cuando la glucosa cae por debajo de 70 mg/dL'}
                        </p>
                      </div>
                      <Switch 
                        checked={lowAlerts} 
                        onCheckedChange={setLowAlerts} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">
                          {language === 'en' ? 'Trend Predictions' : 'Predicciones de Tendencia'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' 
                            ? 'Use AI to predict glucose trends' 
                            : 'Usar IA para predecir tendencias de glucosa'}
                        </p>
                      </div>
                      <Switch 
                        checked={trendPredictions} 
                        onCheckedChange={setTrendPredictions} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">
                          {language === 'en' ? 'Auto-share with Healthcare Provider' : 'Compartir Auto. con Proveedor de Salud'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' 
                            ? 'Automatically share data with your doctor' 
                            : 'Compartir automáticamente datos con su médico'}
                        </p>
                      </div>
                      <Switch 
                        checked={autoSharing} 
                        onCheckedChange={setAutoSharing} 
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === 'en' ? 'Target Ranges' : 'Rangos Objetivo'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">
                        {language === 'en' ? 'Lower target' : 'Objetivo inferior'}: 
                        <span className="font-medium ml-1">70 mg/dL</span>
                      </span>
                      <Button size="sm" variant="outline">
                        {language === 'en' ? 'Edit' : 'Editar'}
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">
                        {language === 'en' ? 'Upper target' : 'Objetivo superior'}: 
                        <span className="font-medium ml-1">140 mg/dL</span>
                      </span>
                      <Button size="sm" variant="outline">
                        {language === 'en' ? 'Edit' : 'Editar'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Insights Tab */}
              <TabsContent value="insights" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === 'en' ? 'AI Health Insights' : 'Información de Salud IA'}
                    </CardTitle>
                    <CardDescription>
                      {language === 'en' 
                        ? 'Personalized recommendations based on your data' 
                        : 'Recomendaciones personalizadas basadas en sus datos'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-orange-50 border border-orange-100 rounded-md p-4">
                        <h3 className="font-medium text-orange-800 mb-2">
                          {language === 'en' ? 'Nutrition Impact' : 'Impacto Nutricional'}
                        </h3>
                        <p className="text-sm text-orange-700">
                          {language === 'en' 
                            ? 'Your glucose levels tend to spike after carbohydrate-heavy meals. Consider balancing with more protein and fiber.' 
                            : 'Sus niveles de glucosa tienden a aumentar después de comidas ricas en carbohidratos. Considere equilibrar con más proteínas y fibra.'}
                        </p>
                      </div>
                      
                      <div className="bg-ice-50 border border-ice-100 rounded-md p-4">
                        <h3 className="font-medium text-ice-800 mb-2">
                          {language === 'en' ? 'Activity Correlation' : 'Correlación de Actividad'}
                        </h3>
                        <p className="text-sm text-ice-700">
                          {language === 'en' 
                            ? 'We\'ve noticed your glucose levels are more stable on days with moderate physical activity.' 
                            : 'Hemos notado que sus niveles de glucosa son más estables en días con actividad física moderada.'}
                        </p>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        <LineChart className="mr-2 h-4 w-4" />
                        {language === 'en' ? 'View Detailed Analysis' : 'Ver Análisis Detallado'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            /* User doesn't have the device - show purchase option */
            <div className="space-y-6">
              <Card className="border-orange-200">
                <CardHeader className="pb-2">
                  <CardTitle>
                    {language === 'en' 
                      ? 'Add Glucose Monitor to Your Membership' 
                      : 'Añadir Monitor de Glucosa a Su Membresía'}
                  </CardTitle>
                  <CardDescription>
                    {language === 'en' 
                      ? 'Continuous glucose monitoring with AI-powered analysis' 
                      : 'Monitoreo continuo de glucosa con análisis impulsado por IA'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div>
                      <div className="mb-4">
                        <img 
                          src="/lovable-uploads/6eb6b5d1-34a3-4236-ac3a-351d6c22de7e.png" 
                          alt="Glucose Monitor"
                          className="rounded-lg border border-orange-100 bg-white p-4 object-contain mx-auto"
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
                              "Continuous glucose monitoring",
                              "Real-time data transmission",
                              "Customizable alert thresholds",
                              "Trend analysis and predictions",
                              "14-day sensor life"
                            ]
                          : [
                              "Monitoreo continuo de glucosa",
                              "Transmisión de datos en tiempo real",
                              "Umbrales de alerta personalizables",
                              "Análisis de tendencias y predicciones",
                              "Vida útil del sensor de 14 días"
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
                    ? 'The Glucose Monitor provides continuous glucose tracking and helps you understand how diet, activity, and medication affect your levels. It\'s essential for diabetes management and general health monitoring.' 
                    : 'El Monitor de Glucosa proporciona seguimiento continuo de glucosa y le ayuda a entender cómo la dieta, la actividad y la medicación afectan sus niveles. Es esencial para el manejo de la diabetes y el monitoreo general de la salud.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlucoseMonitorPage;
