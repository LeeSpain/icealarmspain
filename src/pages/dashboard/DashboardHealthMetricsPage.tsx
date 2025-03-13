
import React, { useState } from "react";
import { useAuth } from "@/context/auth";
import { ToastContainer } from "react-toastify";
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Heart, LineChart, Thermometer, Weight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardHealthMetricsPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useAuth();
  const { language } = useLanguage();
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="health-metrics"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-auto transition-all duration-300">
        <div className="p-6 max-w-7xl mx-auto">
          <ToastContainer />
          
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {language === 'en' ? 'Health Metrics' : 'Métricas de Salud'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Track and monitor your health data' 
                : 'Seguimiento y monitoreo de sus datos de salud'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 flex flex-col items-center">
                <Heart className="h-8 w-8 text-red-500 mb-2" />
                <div className="text-2xl font-bold">72 <span className="text-sm font-normal">bpm</span></div>
                <p className="text-xs text-muted-foreground">
                  {language === 'en' ? 'Heart Rate' : 'Ritmo Cardíaco'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex flex-col items-center">
                <Thermometer className="h-8 w-8 text-orange-500 mb-2" />
                <div className="text-2xl font-bold">36.5 <span className="text-sm font-normal">°C</span></div>
                <p className="text-xs text-muted-foreground">
                  {language === 'en' ? 'Temperature' : 'Temperatura'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex flex-col items-center">
                <Activity className="h-8 w-8 text-blue-500 mb-2" />
                <div className="text-2xl font-bold">112 <span className="text-sm font-normal">mg/dL</span></div>
                <p className="text-xs text-muted-foreground">
                  {language === 'en' ? 'Glucose' : 'Glucosa'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex flex-col items-center">
                <Weight className="h-8 w-8 text-green-500 mb-2" />
                <div className="text-2xl font-bold">68 <span className="text-sm font-normal">kg</span></div>
                <p className="text-xs text-muted-foreground">
                  {language === 'en' ? 'Weight' : 'Peso'}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">
                  {language === 'en' ? 'All Metrics' : 'Todas las Métricas'}
                </TabsTrigger>
                <TabsTrigger value="glucose">
                  {language === 'en' ? 'Glucose' : 'Glucosa'}
                </TabsTrigger>
                <TabsTrigger value="heart">
                  {language === 'en' ? 'Heart Rate' : 'Ritmo Cardíaco'}
                </TabsTrigger>
                <TabsTrigger value="bp">
                  {language === 'en' ? 'Blood Pressure' : 'Presión Arterial'}
                </TabsTrigger>
              </TabsList>
              
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                {language === 'en' ? 'Add Reading' : 'Añadir Lectura'}
              </Button>
            </div>
            
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LineChart className="h-5 w-5 mr-2" />
                    {language === 'en' ? 'Health Metrics Overview' : 'Resumen de Métricas de Salud'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">
                        {language === 'en' 
                          ? 'Health metrics chart will appear here' 
                          : 'El gráfico de métricas de salud aparecerá aquí'}
                      </p>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="font-semibold text-lg mb-4">
                        {language === 'en' ? 'Recent Readings' : 'Lecturas Recientes'}
                      </h3>
                      
                      <div className="space-y-3">
                        <div className="p-3 border rounded-lg flex justify-between items-center">
                          <div className="flex items-center">
                            <Activity className="h-5 w-5 text-blue-500 mr-2" />
                            <div>
                              <h4 className="font-medium">
                                {language === 'en' ? 'Glucose' : 'Glucosa'}
                              </h4>
                              <p className="text-sm text-muted-foreground">112 mg/dL</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm">Today, 10:30 AM</p>
                            <p className="text-xs text-muted-foreground">
                              {language === 'en' ? 'Normal range' : 'Rango normal'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="p-3 border rounded-lg flex justify-between items-center">
                          <div className="flex items-center">
                            <Heart className="h-5 w-5 text-red-500 mr-2" />
                            <div>
                              <h4 className="font-medium">
                                {language === 'en' ? 'Heart Rate' : 'Ritmo Cardíaco'}
                              </h4>
                              <p className="text-sm text-muted-foreground">72 bpm</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm">Today, 9:15 AM</p>
                            <p className="text-xs text-muted-foreground">
                              {language === 'en' ? 'Normal range' : 'Rango normal'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="glucose">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Glucose Readings' : 'Lecturas de Glucosa'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">
                      {language === 'en' 
                        ? 'Glucose chart will appear here' 
                        : 'El gráfico de glucosa aparecerá aquí'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="heart">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Heart Rate Readings' : 'Lecturas de Ritmo Cardíaco'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">
                      {language === 'en' 
                        ? 'Heart rate chart will appear here' 
                        : 'El gráfico de ritmo cardíaco aparecerá aquí'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="bp">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === 'en' ? 'Blood Pressure Readings' : 'Lecturas de Presión Arterial'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">
                      {language === 'en' 
                        ? 'Blood pressure chart will appear here' 
                        : 'El gráfico de presión arterial aparecerá aquí'}
                    </p>
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

export default DashboardHealthMetricsPage;
