
import React, { useState } from "react";
import { useAuth } from "@/context/auth";
import { ToastContainer } from "react-toastify";
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Heart, LineChart, Thermometer, Weight, Plus, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

// Mock data for charts
const glucoseData = [
  { name: "Mon", value: 110 },
  { name: "Tue", value: 115 },
  { name: "Wed", value: 112 },
  { name: "Thu", value: 118 },
  { name: "Fri", value: 108 },
  { name: "Sat", value: 112 },
  { name: "Sun", value: 110 },
];

const heartRateData = [
  { name: "Mon", value: 72 },
  { name: "Tue", value: 75 },
  { name: "Wed", value: 73 },
  { name: "Thu", value: 78 },
  { name: "Fri", value: 70 },
  { name: "Sat", value: 72 },
  { name: "Sun", value: 71 },
];

const bloodPressureData = [
  { name: "Mon", systolic: 120, diastolic: 80 },
  { name: "Tue", systolic: 125, diastolic: 82 },
  { name: "Wed", systolic: 118, diastolic: 78 },
  { name: "Thu", systolic: 130, diastolic: 85 },
  { name: "Fri", systolic: 122, diastolic: 80 },
  { name: "Sat", systolic: 119, diastolic: 79 },
  { name: "Sun", systolic: 121, diastolic: 81 },
];

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
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex flex-col items-center">
                <Heart className="h-8 w-8 text-red-500 mb-2" />
                <div className="text-2xl font-bold">72 <span className="text-sm font-normal">bpm</span></div>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  <span>3% from yesterday</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {language === 'en' ? 'Heart Rate' : 'Ritmo Cardíaco'}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex flex-col items-center">
                <Thermometer className="h-8 w-8 text-orange-500 mb-2" />
                <div className="text-2xl font-bold">36.5 <span className="text-sm font-normal">°C</span></div>
                <div className="flex items-center text-xs text-gray-500">
                  <span>No change</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {language === 'en' ? 'Temperature' : 'Temperatura'}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex flex-col items-center">
                <Activity className="h-8 w-8 text-blue-500 mb-2" />
                <div className="text-2xl font-bold">112 <span className="text-sm font-normal">mg/dL</span></div>
                <div className="flex items-center text-xs text-red-600">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>2% from yesterday</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {language === 'en' ? 'Glucose' : 'Glucosa'}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex flex-col items-center">
                <Weight className="h-8 w-8 text-green-500 mb-2" />
                <div className="text-2xl font-bold">68 <span className="text-sm font-normal">kg</span></div>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  <span>0.5kg last week</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {language === 'en' ? 'Weight' : 'Peso'}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList className="bg-white border shadow-sm">
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
              
              <Button size="sm" className="bg-ice-600 hover:bg-ice-700">
                <Plus className="h-4 w-4 mr-1" />
                {language === 'en' ? 'Add Reading' : 'Añadir Lectura'}
              </Button>
            </div>
            
            <TabsContent value="all">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <LineChart className="h-5 w-5 mr-2" />
                    {language === 'en' ? 'Health Metrics Overview' : 'Resumen de Métricas de Salud'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-64 rounded-lg">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={glucoseData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="name" tickLine={false} axisLine={false} />
                          <YAxis tickLine={false} axisLine={false} />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#3B82F6" 
                            strokeWidth={2} 
                            dot={{ r: 4 }} 
                            activeDot={{ r: 6, strokeWidth: 2 }} 
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="font-semibold text-lg mb-4">
                        {language === 'en' ? 'Recent Readings' : 'Lecturas Recientes'}
                      </h3>
                      
                      <div className="space-y-3">
                        <div className="p-3 border rounded-lg flex justify-between items-center bg-white hover:bg-gray-50 transition-colors">
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
                        
                        <div className="p-3 border rounded-lg flex justify-between items-center bg-white hover:bg-gray-50 transition-colors">
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
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {language === 'en' ? 'Glucose Readings' : 'Lecturas de Glucosa'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 rounded-lg">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={glucoseData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#3B82F6" 
                          fill="#93C5FD" 
                          fillOpacity={0.3} 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="heart">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {language === 'en' ? 'Heart Rate Readings' : 'Lecturas de Ritmo Cardíaco'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 rounded-lg">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={heartRateData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#EF4444" 
                          fill="#FCA5A5" 
                          fillOpacity={0.3} 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="bp">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {language === 'en' ? 'Blood Pressure Readings' : 'Lecturas de Presión Arterial'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 rounded-lg">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={bloodPressureData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="systolic" 
                          stroke="#EF4444" 
                          strokeWidth={2} 
                          dot={{ r: 3 }} 
                          activeDot={{ r: 5, strokeWidth: 2 }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="diastolic" 
                          stroke="#3B82F6" 
                          strokeWidth={2} 
                          dot={{ r: 3 }} 
                          activeDot={{ r: 5, strokeWidth: 2 }} 
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
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
