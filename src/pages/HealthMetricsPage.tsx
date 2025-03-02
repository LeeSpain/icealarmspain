
import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Calendar, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample health metrics data
const glucoseData = [
  { date: 'Mon', value: 110 },
  { date: 'Tue', value: 125 },
  { date: 'Wed', value: 118 },
  { date: 'Thu', value: 105 },
  { date: 'Fri', value: 115 },
  { date: 'Sat', value: 122 },
  { date: 'Sun', value: 116 },
];

const heartRateData = [
  { date: 'Mon', value: 72 },
  { date: 'Tue', value: 78 },
  { date: 'Wed', value: 75 },
  { date: 'Thu', value: 82 },
  { date: 'Fri', value: 76 },
  { date: 'Sat', value: 70 },
  { date: 'Sun', value: 74 },
];

const bloodPressureData = [
  { date: 'Mon', systolic: 120, diastolic: 80 },
  { date: 'Tue', systolic: 125, diastolic: 82 },
  { date: 'Wed', systolic: 119, diastolic: 78 },
  { date: 'Thu', systolic: 122, diastolic: 80 },
  { date: 'Fri', systolic: 128, diastolic: 84 },
  { date: 'Sat', systolic: 120, diastolic: 79 },
  { date: 'Sun', systolic: 118, diastolic: 78 },
];

const HealthMetricsPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="health-metrics"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className={`flex-1 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6 max-w-7xl mx-auto">
          <ToastContainer />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-ice-800 mb-2">
              {language === 'en' ? 'Health Metrics' : 'Métricas de Salud'}
            </h1>
            <p className="text-ice-700">
              {language === 'en' 
                ? 'Track and analyze your health data over time' 
                : 'Sigue y analiza tus datos de salud a lo largo del tiempo'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium text-gray-700">
                    {language === 'en' ? 'Blood Glucose' : 'Glucosa en Sangre'}
                  </div>
                  <div className="p-2 rounded-full bg-ice-50 text-ice-600">
                    <Activity size={18} />
                  </div>
                </div>
                <div className="text-2xl font-bold">118 mg/dL</div>
                <div className="mt-2 text-xs text-green-600 flex items-center">
                  <ArrowUpRight size={12} className="inline mr-1" />
                  <span>{language === 'en' ? 'Normal range' : 'Rango normal'}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium text-gray-700">
                    {language === 'en' ? 'Heart Rate' : 'Ritmo Cardíaco'}
                  </div>
                  <div className="p-2 rounded-full bg-ice-50 text-ice-600">
                    <Activity size={18} />
                  </div>
                </div>
                <div className="text-2xl font-bold">76 bpm</div>
                <div className="mt-2 text-xs text-green-600 flex items-center">
                  <ArrowUpRight size={12} className="inline mr-1" />
                  <span>{language === 'en' ? 'Healthy' : 'Saludable'}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium text-gray-700">
                    {language === 'en' ? 'Blood Pressure' : 'Presión Arterial'}
                  </div>
                  <div className="p-2 rounded-full bg-ice-50 text-ice-600">
                    <Activity size={18} />
                  </div>
                </div>
                <div className="text-2xl font-bold">120/80</div>
                <div className="mt-2 text-xs text-green-600 flex items-center">
                  <ArrowUpRight size={12} className="inline mr-1" />
                  <span>{language === 'en' ? 'Optimal' : 'Óptima'}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-ice-500" />
                <CardTitle>
                  {language === 'en' ? 'Glucose Levels' : 'Niveles de Glucosa'}
                </CardTitle>
              </div>
              <CardDescription>
                {language === 'en' 
                  ? '7-day glucose monitoring data' 
                  : 'Datos de monitoreo de glucosa de 7 días'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={glucoseData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#60a5fa"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Heart Rate' : 'Ritmo Cardíaco'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={heartRateData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#f97316"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? 'Blood Pressure' : 'Presión Arterial'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={bloodPressureData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="systolic"
                        stroke="#4ade80"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="diastolic"
                        stroke="#2dd4bf"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-ice-500" />
                <CardTitle>
                  {language === 'en' ? 'Upcoming Health Checkups' : 'Próximas Revisiones de Salud'}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <h3 className="font-medium">
                      {language === 'en' ? 'Blood Work Analysis' : 'Análisis de Sangre'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? 'May 15, 2025' : '15 de Mayo, 2025'}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    {language === 'en' ? 'Reschedule' : 'Reprogramar'}
                  </Button>
                </div>
                
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <h3 className="font-medium">
                      {language === 'en' ? 'General Checkup' : 'Revisión General'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? 'June 10, 2025' : '10 de Junio, 2025'}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    {language === 'en' ? 'Reschedule' : 'Reprogramar'}
                  </Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">
                      {language === 'en' ? 'Device Calibration' : 'Calibración de Dispositivo'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? 'April 30, 2025' : '30 de Abril, 2025'}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    {language === 'en' ? 'Reschedule' : 'Reprogramar'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
        </div>
      </div>
    </div>
  );
};

export default HealthMetricsPage;
