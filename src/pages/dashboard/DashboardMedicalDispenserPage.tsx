
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PillIcon, Battery, Signal, Settings, Bell, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DashboardMedicalDispenserPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="medical-dispenser"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-auto transition-all duration-300">
        <div className="p-6 w-full">
          <ToastContainer />
          
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {language === 'en' ? 'Medical Dispenser' : 'Dispensador Médico'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Manage your medication schedule and dispenser settings' 
                : 'Gestione su horario de medicación y configuración del dispensador'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <PillIcon className="w-5 h-5 mr-2 text-green-500" />
                  {language === 'en' ? 'Medication Status' : 'Estado de Medicación'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Next Dose' : 'Próxima Dosis'}
                  </span>
                  <span className="font-medium">2:00 PM</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Medication' : 'Medicamento'}
                  </span>
                  <span className="text-sm">Metformin 500mg</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Doses Remaining' : 'Dosis Restantes'}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium">
                    12 {language === 'en' ? 'days' : 'días'}
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Battery className="w-5 h-5 mr-2 text-green-500" />
                  {language === 'en' ? 'Device Status' : 'Estado del Dispositivo'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Battery' : 'Batería'}
                  </span>
                  <span className="text-sm">94%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '94%' }}></div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Dispenser Status' : 'Estado del Dispensador'}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    {language === 'en' ? 'Ready' : 'Listo'}
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
                  <span className="text-sm">5 minutes ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">
                {language === 'en' ? 'Overview' : 'Visión General'}
              </TabsTrigger>
              <TabsTrigger value="schedule">
                {language === 'en' ? 'Medication Schedule' : 'Horario de Medicamentos'}
              </TabsTrigger>
              <TabsTrigger value="settings">
                {language === 'en' ? 'Settings' : 'Configuración'}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Medical Dispenser Overview' : 'Visión General del Dispensador Médico'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <img 
                          src="/lovable-uploads/5e439305-cf63-4080-962e-52657e864050.png" 
                          alt="Medical Dispenser" 
                          className="w-40 h-auto object-contain"
                        />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">
                          {language === 'en' ? 'Your Device' : 'Su Dispositivo'}
                        </h3>
                        <p>
                          {language === 'en' 
                            ? 'Model: ICE Alarm MediSafe Pro' 
                            : 'Modelo: ICE Alarm MediSafe Pro'}
                        </p>
                        <p>
                          {language === 'en' 
                            ? 'Serial: MDP-2023-32165' 
                            : 'Serie: MDP-2023-32165'}
                        </p>
                        <p>
                          {language === 'en' 
                            ? 'Last Refilled: October 5, 2023' 
                            : 'Última Recarga: 5 de Octubre, 2023'}
                        </p>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            {language === 'en' ? 'Test Dispenser' : 'Probar Dispensador'}
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
                          <PillIcon className="mr-2 h-4 w-4" />
                          {language === 'en' ? 'Update Medications' : 'Actualizar Medicamentos'}
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Bell className="mr-2 h-4 w-4" />
                          {language === 'en' ? 'Reminder Settings' : 'Configuración de Recordatorios'}
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Calendar className="mr-2 h-4 w-4" />
                          {language === 'en' ? 'View Adherence Log' : 'Ver Registro de Adherencia'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Medication Schedule' : 'Horario de Medicamentos'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground mb-4">
                      {language === 'en' 
                        ? 'View and manage your medication schedule' 
                        : 'Vea y gestione su horario de medicación'}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Metformin 500mg</h4>
                          <p className="text-sm text-muted-foreground">2 pills, twice daily</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">8:00 AM, 2:00 PM</p>
                          <p className="text-xs text-muted-foreground">12 days supply left</p>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-lg flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Lisinopril 10mg</h4>
                          <p className="text-sm text-muted-foreground">1 pill, once daily</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">9:00 AM</p>
                          <p className="text-xs text-muted-foreground">25 days supply left</p>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-lg flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Vitamin D3 1000IU</h4>
                          <p className="text-sm text-muted-foreground">1 pill, once daily</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">9:00 AM</p>
                          <p className="text-xs text-muted-foreground">18 days supply left</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <Button>
                        {language === 'en' ? 'Manage Medications' : 'Gestionar Medicamentos'}
                      </Button>
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
                        {language === 'en' ? 'Reminder Settings' : 'Configuración de Recordatorios'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {language === 'en' 
                          ? 'Configure how and when you receive medication reminders' 
                          : 'Configure cómo y cuándo recibe recordatorios de medicación'}
                      </p>
                      <Button>
                        {language === 'en' ? 'Configure Reminders' : 'Configurar Recordatorios'}
                      </Button>
                    </div>
                    
                    <div className="border-b pb-4">
                      <h3 className="font-semibold mb-2">
                        {language === 'en' ? 'Device Maintenance' : 'Mantenimiento del Dispositivo'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {language === 'en' 
                          ? 'Check device status and perform maintenance' 
                          : 'Verifique el estado del dispositivo y realice mantenimiento'}
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
                        {language === 'en' ? 'Notification Options' : 'Opciones de Notificación'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {language === 'en' 
                          ? 'Configure who gets notified when medications are missed' 
                          : 'Configure quién recibe notificaciones cuando se omiten medicamentos'}
                      </p>
                      <Button variant="outline">
                        {language === 'en' ? 'Configure Notifications' : 'Configurar Notificaciones'}
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

export default DashboardMedicalDispenserPage;
