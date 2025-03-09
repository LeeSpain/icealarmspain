
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Activity, Pill } from "lucide-react";

interface HealthMetricsGridProps {
  language: string;
}

const HealthMetricsGrid: React.FC<HealthMetricsGridProps> = ({ language }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Heart Rate Card */}
      <Card className="shadow-sm hover:shadow transition-shadow duration-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">{language === 'en' ? "Heart Rate" : "Ritmo Cardíaco"}</h3>
            <Heart className="h-4 w-4 text-red-500" />
          </div>
          <div className="flex justify-between items-end">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">72</span>
              <span className="text-sm ml-1 text-gray-500">BPM</span>
            </div>
            <div className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
              {language === 'en' ? "Normal" : "Normal"}
            </div>
          </div>
          <div className="mt-2 h-8 w-full flex items-end">
            {[4, 5, 3, 6, 7, 5, 4, 5, 6, 5, 4, 3].map((h, i) => (
              <div 
                key={i} 
                className={`flex-1 mx-0.5 rounded-t ${i === 6 || i === 7 ? 'bg-red-400' : 'bg-gray-200'}`} 
                style={{ height: `${h * 4}px` }}
              ></div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Blood Pressure Card */}
      <Card className="shadow-sm hover:shadow transition-shadow duration-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">{language === 'en' ? "Blood Pressure" : "Presión Arterial"}</h3>
            <Activity className="h-4 w-4 text-blue-500" />
          </div>
          <div className="flex justify-between items-baseline">
            <div>
              <span className="text-2xl font-bold">118/75</span>
              <span className="text-sm ml-1 text-gray-500">mmHg</span>
            </div>
            <div className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
              {language === 'en' ? "Optimal" : "Óptima"}
            </div>
          </div>
          <div className="mt-3 w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: '35%' }}></div>
          </div>
        </CardContent>
      </Card>
      
      {/* Glucose Level Card */}
      <Card className="shadow-sm hover:shadow transition-shadow duration-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">{language === 'en' ? "Glucose Level" : "Nivel de Glucosa"}</h3>
            <Pill className="h-4 w-4 text-purple-500" />
          </div>
          <div className="flex justify-between items-baseline">
            <div>
              <span className="text-2xl font-bold">103</span>
              <span className="text-sm ml-1 text-gray-500">mg/dL</span>
            </div>
            <div className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full flex items-center">
              <span className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1"></span>
              {language === 'en' ? "Stable" : "Estable"}
            </div>
          </div>
          <div className="mt-3 w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full rounded-full" style={{ width: '45%' }}></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthMetricsGrid;
