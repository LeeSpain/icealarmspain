
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Shield } from "lucide-react";

interface WelcomeCardProps {
  language: string;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ language }) => {
  return (
    <Card className="shadow-sm border-l-4 border-ice-500 mb-6">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{language === 'en' ? "Monday, August 5, 2024" : "Lunes, 5 de Agosto, 2024"}</span>
            </div>
            <h3 className="text-xl font-semibold">
              {language === 'en' ? "Welcome back, Elena" : "Bienvenida de nuevo, Elena"}
            </h3>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm font-medium">
            <Shield className="h-4 w-4" />
            <span>{language === 'en' ? 'All Systems Normal' : 'Todos los Sistemas Normales'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
