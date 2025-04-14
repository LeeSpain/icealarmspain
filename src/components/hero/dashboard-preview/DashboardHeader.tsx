
import React from "react";
import { Bell, User } from "lucide-react";

interface DashboardHeaderProps {
  language: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ language }) => {
  return (
    <div className="bg-gradient-to-r from-ice-500 to-guardian-600 h-6 flex items-center px-3">
      <div className="flex items-center space-x-2 text-white">
        <div className="font-semibold text-[10px]">
          {language === 'en' ? "ICE Alarm Health Dashboard" : "Panel de Salud ICE Alarm"}
        </div>
      </div>
      <div className="ml-auto flex items-center space-x-2">
        <Bell className="h-2.5 w-2.5 text-white/80" />
        <div className="h-4 w-4 bg-white/20 rounded-full flex items-center justify-center">
          <User className="h-2.5 w-2.5 text-white" />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
