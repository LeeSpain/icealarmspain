
import React from "react";
import { User, Clock, Bell } from "lucide-react";

export const UserHeader: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ice-400 to-ice-600 flex items-center justify-center shadow-lg border border-white/50">
          <User size={22} className="text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">María García</h3>
          <p className="text-sm text-muted-foreground">Dashboard Overview</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white shadow-md px-3 py-1.5 rounded-full">
          <Clock size={16} />
          <span>Last updated: 2 min ago</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center relative">
          <Bell size={18} className="text-guardian-600" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
        </div>
      </div>
    </div>
  );
};
