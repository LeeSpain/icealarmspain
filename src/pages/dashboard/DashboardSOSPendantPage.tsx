
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, Battery, Signal, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DashboardSOSPendantPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="sos-pendant"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-auto transition-all duration-300">
        <div className="p-6 w-full">
          <ToastContainer />
          
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {language === 'en' ? 'SOS Pendant' : 'Colgante SOS'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Manage and configure your SOS Pendant device' 
                : 'Gestione y configure su dispositivo Colgante SOS'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <ShieldAlert className="w-5 h-5 mr-2 text-red-500" />
                  {language === 'en' ? 'Device Status' : 'Estado del Dispositivo'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Status' : 'Estado'}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    {language === 'en' ? 'Active' : 'Activo'}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Last Test' : 'Última Prueba'}
                  </span>
                  <span className="text-sm">3 days ago</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Battery className="w-5 h-5 mr-2 text-blue-500" />
                  {language === 'en' ? 'Battery' : 'Batería'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Level' : 'Nivel'}
                  </span>
                  <span className="text-sm">87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '87%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {language === 'en' 
                    ? 'Estimated 6 days remaining' 
                    : 'Aproximadamente 6 días restantes'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Signal className="w-5 h-5 mr-2 text-green-500" />
                  {language === 'en' ? 'Connectivity' : 'Conectividad'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Signal' : 'Señal'}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    {language === 'en' ? 'Excellent' : 'Excelente'}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Last Connected' : 'Última Conexión'}
                  </span>
                  <span className="text-sm">Just now</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">
                {language === 'en' ? 'Overview' : 'Visión General'}
              </TabsTrigger>
              <TabsTrigger value="alerts">
                {language === 'en' ? 'Alert History' : 'Historial de Alertas'}
              </TabsTrigger>
              <TabsTrigger value="settings">
                {language === 'en' ? 'Settings' : 'Configuración'}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'SOS Pendant Overview' : 'Visión General del Colgante SOS'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <img 
                          src="/lovable-uploads/ad65a632-e7ef-4c61-a20e-7b6ff282a87a.png" 
                          alt="SOS Pendant" 
                          className="w-40 h-auto object-contain"
                        />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">
                          {language === 'en' ? 'Your Device' : 'Su Dispositivo'}
                        </h3>
                        <p>
                          {language === 'en' 
                            ? 'Model: ICE Alarm Guardian Plus' 
                            : 'Modelo: ICE Alarm Guardian Plus'}
                        </p>
                        <p>
                          {language === 'en' 
                            ? 'Serial: GRD-2023-78542' 
                            : 'Serie: GRD-2023-78542'}
                        </p>
                        <p>
                          {language === 'en' 
                            ? 'Activated: October 12, 2023' 
                            : 'Activado: 12 de Octubre, 2023'}
                        </p>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            {language === 'en' ? 'Test Device' : 'Probar Dispositivo'}
                          </Button>
                          <Button variant="outline" size="sm">
                            {language === 'en' ? 'User Guide' : 'Guía de Usuario'}
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="font-semibold text-lg mb-2">
                        {language === 'en' ? 'Quick Actions' : 'Acciones Rápidas'}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        <Button variant="outline" className="justify-start">
                          <Settings className="mr-2 h-4 w-4" />
                          {language === 'en' ? 'Configure Alert Contacts' : 'Configurar Contactos de Alerta'}
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <ShieldAlert className="mr-2 h-4 w-4" />
                          {language === 'en' ? 'Test Emergency Alert' : 'Probar Alerta de Emergencia'}
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Battery className="mr-2 h-4 w-4" />
                          {language === 'en' ? 'Battery Settings' : 'Configuración de Batería'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="alerts">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Alert History' : 'Historial de Alertas'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      {language === 'en' 
                        ? 'No alerts have been triggered in the last 30 days.' 
                        : 'No se han activado alertas en los últimos 30 días.'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Device Settings' : 'Configuración del Dispositivo'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <h3 className="font-semibold mb-2">
                        {language === 'en' ? 'Notification Settings' : 'Configuración de Notificaciones'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {language === 'en' 
                          ? 'Configure who gets notified when an alert is triggered' 
                          : 'Configure quién recibe notificaciones cuando se activa una alerta'}
                      </p>
                      <Button>
                        {language === 'en' ? 'Manage Contacts' : 'Gestionar Contactos'}
                      </Button>
                    </div>
                    
                    <div className="border-b pb-4">
                      <h3 className="font-semibold mb-2">
                        {language === 'en' ? 'Device Maintenance' : 'Mantenimiento del Dispositivo'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {language === 'en' 
                          ? 'Check battery health and perform diagnostic tests' 
                          : 'Compruebe la salud de la batería y realice pruebas de diagnóstico'}
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline">
                          {language === 'en' ? 'Run Diagnostics' : 'Ejecutar Diagnósticos'}
                        </Button>
                        <Button variant="outline">
                          {language === 'en' ? 'Check For Updates' : 'Buscar Actualizaciones'}
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">
                        {language === 'en' ? 'Advanced Settings' : 'Configuración Avanzada'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {language === 'en' 
                          ? 'Configure sensitivity and other advanced options' 
                          : 'Configure la sensibilidad y otras opciones avanzadas'}
                      </p>
                      <Button variant="outline">
                        {language === 'en' ? 'Advanced Settings' : 'Configuración Avanzada'}
                      </Button>
                    </div>
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

export default DashboardSOSPendantPage;
