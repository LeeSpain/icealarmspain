
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useLanguage } from "@/context/LanguageContext";

const DeviceOverview: React.FC = () => {
  const { language } = useLanguage();
  
  // Mock glucose data
  const mockGlucoseData = [
    { time: '6:00', value: 95 },
    { time: '8:00', value: 120 },
    { time: '10:00', value: 110 },
    { time: '12:00', value: 130 },
    { time: '14:00', value: 95 },
    { time: '16:00', value: 105 },
    { time: '18:00', value: 120 },
    { time: '20:00', value: 115 },
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'en' ? 'Device Status' : 'Estado del Dispositivo'}</CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Current status and information about your Glucose Monitor' 
            : 'Estado actual e información sobre tu Monitor de Glucosa'}
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
            <span className="text-sm font-medium">{language === 'en' ? 'Sensor' : 'Sensor'}</span>
            <span className="text-sm">{language === 'en' ? '10 days remaining' : '10 días restantes'}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{language === 'en' ? 'Last Reading' : 'Última Lectura'}</span>
            <span className="text-sm">{language === 'en' ? '5 minutes ago' : 'Hace 5 minutos'}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{language === 'en' ? 'Current Reading' : 'Lectura Actual'}</span>
            <span className="text-sm font-semibold">115 mg/dL</span>
          </div>
        </div>
        
        <div className="mt-6">
          <Card className="bg-slate-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{language === 'en' ? 'Today\'s Trend' : 'Tendencia de Hoy'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockGlucoseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[60, 200]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#0284c7" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceOverview;
