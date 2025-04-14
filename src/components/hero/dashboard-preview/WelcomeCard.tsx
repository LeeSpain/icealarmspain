
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Shield } from "lucide-react";

interface WelcomeCardProps {
  language: string;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ language }) => {
  return (
    <Card className="shadow-sm border-l-2 border-ice-500 mb-2">
      <CardContent className="p-2">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center text-[10px] text-gray-500 mb-0.5">
              <Calendar className="h-2.5 w-2.5 mr-1" />
              <span>{language === 'en' ? "Monday, August 5, 2024" : "Lunes, 5 de Agosto, 2024"}</span>
            </div>
            <h3 className="text-xs font-semibold">
              {language === 'en' ? "Welcome back, Elena" : "Bienvenida de nuevo, Elena"}
            </h3>
          </div>
          <div className="flex items-center gap-1 px-1.5 py-0.5 bg-green-50 border border-green-200 rounded-full text-green-700 text-[10px] font-medium">
            <Shield className="h-2.5 w-2.5" />
            <span>{language === 'en' ? 'All Systems Normal' : 'Todos los Sistemas Normales'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
