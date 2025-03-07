
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Battery, Signal, Settings, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DashboardGlucoseMonitorPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="glucose-monitor"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-auto transition-all duration-300">
        <div className="p-6 w-full">
          <ToastContainer />
          
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {language === 'en' ? 'Glucose Monitor' : 'Monitor de Glucosa'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Manage and view your glucose readings' 
                : 'Gestione y visualice sus lecturas de glucosa'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-500" />
                  {language === 'en' ? 'Current Reading' : 'Lectura Actual'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Glucose Level' : 'Nivel de Glucosa'}
                  </span>
                  <span className="text-xl font-bold">112 mg/dL</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Last Reading' : 'Última Lectura'}
                  </span>
                  <span className="text-sm">15 minutes ago</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Status' : 'Estado'}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    {language === 'en' ? 'Normal' : 'Normal'}
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Battery className="w-5 h-5 mr-2 text-blue-500" />
                  {language === 'en' ? 'Device Status' : 'Estado del Dispositivo'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Battery' : 'Batería'}
                  </span>
                  <span className="text-sm">72%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '72%' }}></div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Sensor Status' : 'Estado del Sensor'}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    {language === 'en' ? 'Active' : 'Activo'}
                  </span>
                </div>
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
                    {language === 'en' ? 'Connected' : 'Conectado'}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Last Sync' : 'Última Sincronización'}
                  </span>
                  <span className="text-sm">10 minutes ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">
                {language === 'en' ? 'Overview' : 'Visión General'}
              </TabsTrigger>
              <TabsTrigger value="readings">
                {language === 'en' ? 'Reading History' : 'Historial de Lecturas'}
              </TabsTrigger>
              <TabsTrigger value="settings">
                {language === 'en' ? 'Settings' : 'Configuración'}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Glucose Monitor Overview' : 'Visión General del Monitor de Glucosa'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <img 
                          src="/lovable-uploads/6eb6b5d1-34a3-4236-ac3a-351d6c22de7e.png" 
                          alt="Glucose Monitor" 
                          className="w-40 h-auto object-contain"
                        />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">
                          {language === 'en' ? 'Your Device' : 'Su Dispositivo'}
                        </h3>
                        <p>
                          {language === 'en' 
                            ? 'Model: ICE Alarm GlucoGuard' 
                            : 'Modelo: ICE Alarm GlucoGuard'}
                        </p>
                        <p>
                          {language === 'en' 
                            ? 'Serial: GLC-2023-45678' 
                            : 'Serie: GLC-2023-45678'}
                        </p>
                        <p>
                          {language === 'en' 
                            ? 'Sensor Expires: November 10, 2023' 
                            : 'Sensor Caduca: 10 de Noviembre, 2023'}
                        </p>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            {language === 'en' ? 'Calibrate Device' : 'Calibrar Dispositivo'}
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
                          <LineChart className="mr-2 h-4 w-4" />
                          {language === 'en' ? 'View Trends' : 'Ver Tendencias'}
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Settings className="mr-2 h-4 w-4" />
                          {language === 'en' ? 'Alert Settings' : 'Configuración de Alertas'}
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Activity className="mr-2 h-4 w-4" />
                          {language === 'en' ? 'Take Manual Reading' : 'Tomar Lectura Manual'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="readings">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Reading History' : 'Historial de Lecturas'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground mb-4">
                      {language === 'en' 
                        ? 'View your glucose reading history and trends' 
                        : 'Vea su historial de lecturas de glucosa y tendencias'}
                    </p>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">
                        {language === 'en' 
                          ? 'Glucose readings chart will appear here' 
                          : 'El gráfico de lecturas de glucosa aparecerá aquí'}
                      </p>
                    </div>
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
                        {language === 'en' ? 'Alert Thresholds' : 'Umbrales de Alerta'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {language === 'en' 
                          ? 'Configure alert thresholds for high and low glucose readings' 
                          : 'Configure los umbrales de alerta para lecturas altas y bajas de glucosa'}
                      </p>
                      <Button>
                        {language === 'en' ? 'Configure Alerts' : 'Configurar Alertas'}
                      </Button>
                    </div>
                    
                    <div className="border-b pb-4">
                      <h3 className="font-semibold mb-2">
                        {language === 'en' ? 'Device Maintenance' : 'Mantenimiento del Dispositivo'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {language === 'en' 
                          ? 'Calibrate your device and check for sensor updates' 
                          : 'Calibre su dispositivo y verifique las actualizaciones del sensor'}
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline">
                          {language === 'en' ? 'Calibrate' : 'Calibrar'}
                        </Button>
                        <Button variant="outline">
                          {language === 'en' ? 'Update Sensor' : 'Actualizar Sensor'}
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">
                        {language === 'en' ? 'Reading Frequency' : 'Frecuencia de Lecturas'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {language === 'en' 
                          ? 'Configure how often readings are taken and synced' 
                          : 'Configure con qué frecuencia se toman y sincronizan las lecturas'}
                      </p>
                      <Button variant="outline">
                        {language === 'en' ? 'Configure Frequency' : 'Configurar Frecuencia'}
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

export default DashboardGlucoseMonitorPage;
