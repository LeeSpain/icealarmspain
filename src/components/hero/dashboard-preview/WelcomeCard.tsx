
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Shield } from "lucide-react";

interface WelcomeCardProps {
  language: string;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ language }) => {
  return (
    <Card className="shadow-sm border-l-2 border-ice-500 mb-3">
      <CardContent className="p-3">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center text-xs text-gray-500 mb-0.5">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{language === 'en' ? "Monday, August 5, 2024" : "Lunes, 5 de Agosto, 2024"}</span>
            </div>
            <h3 className="text-sm font-semibold">
              {language === 'en' ? "Welcome back, Elena" : "Bienvenida de nuevo, Elena"}
            </h3>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 bg-green-50 border border-green-200 rounded-full text-green-700 text-xs font-medium">
            <Shield className="h-3 w-3" />
            <span>{language === 'en' ? 'All Systems Normal' : 'Todos los Sistemas Normales'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
