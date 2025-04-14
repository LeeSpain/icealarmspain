
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, Pill } from "lucide-react";

interface StatusCardsProps {
  language: string;
}

const StatusCards: React.FC<StatusCardsProps> = ({ language }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {/* Device Status Card */}
      <Card className="shadow-sm hover:shadow transition-shadow duration-200">
        <CardContent className="p-2">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-[10px] font-medium text-gray-700">{language === 'en' ? "Active Devices" : "Dispositivos Activos"}</h3>
            <Shield className="h-2.5 w-2.5 text-ice-500" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between bg-gray-50 p-1 rounded text-[9px]">
              <div className="flex items-center">
                <div className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1"></div>
                <span>{language === 'en' ? "SOS Pendant" : "Colgante SOS"}</span>
              </div>
              <span className="text-[9px] text-gray-500">{language === 'en' ? "86%" : "86%"}</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-1 rounded text-[9px]">
              <div className="flex items-center">
                <div className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1"></div>
                <span>{language === 'en' ? "Glucose Monitor" : "Monitor de Glucosa"}</span>
              </div>
              <span className="text-[9px] text-gray-500">{language === 'en' ? "OK" : "OK"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Medication Reminder Card */}
      <Card className="shadow-sm hover:shadow transition-shadow duration-200">
        <CardContent className="p-2">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-[10px] font-medium text-gray-700">{language === 'en' ? "Medication Reminder" : "Recordatorio de Medicación"}</h3>
            <Clock className="h-2.5 w-2.5 text-amber-500" />
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded p-1 flex items-center">
            <div className="h-5 w-5 bg-amber-100 rounded-full flex items-center justify-center mr-1.5">
              <Pill className="h-2.5 w-2.5 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-medium">{language === 'en' ? "Blood Pressure" : "Presión Arterial"}</p>
              <p className="text-[9px] text-gray-500">{language === 'en' ? "Next: 2:00 PM" : "Próxima: 14:00"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusCards;
