
import React from "react";
import { Bell, User } from "lucide-react";

interface DashboardHeaderProps {
  language: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ language }) => {
  return (
    <div className="bg-gradient-to-r from-ice-500 to-guardian-600 h-14 flex items-center px-6">
      <div className="flex items-center space-x-3 text-white">
        <div className="font-semibold">
          {language === 'en' ? "ICE Alarm Health Dashboard" : "Panel de Salud ICE Alarm"}
        </div>
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <Bell className="h-5 w-5 text-white/80" />
        <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
          <User className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
