
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, Pill } from "lucide-react";

interface StatusCardsProps {
  language: string;
}

const StatusCards: React.FC<StatusCardsProps> = ({ language }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Device Status Card */}
      <Card className="shadow-sm hover:shadow transition-shadow duration-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">{language === 'en' ? "Active Devices" : "Dispositivos Activos"}</h3>
            <Shield className="h-4 w-4 text-ice-500" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm">{language === 'en' ? "SOS Pendant" : "Colgante SOS"}</span>
              </div>
              <span className="text-xs text-gray-500">{language === 'en' ? "Battery: 86%" : "Batería: 86%"}</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm">{language === 'en' ? "Glucose Monitor" : "Monitor de Glucosa"}</span>
              </div>
              <span className="text-xs text-gray-500">{language === 'en' ? "Connected" : "Conectado"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Medication Reminder Card */}
      <Card className="shadow-sm hover:shadow transition-shadow duration-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">{language === 'en' ? "Medication Reminder" : "Recordatorio de Medicación"}</h3>
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded p-2 flex items-center">
            <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
              <Pill className="h-4 w-4 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{language === 'en' ? "Blood Pressure Medication" : "Medicación para la Presión"}</p>
              <p className="text-xs text-gray-500">{language === 'en' ? "Next dose: 2:00 PM" : "Próxima dosis: 14:00"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusCards;
