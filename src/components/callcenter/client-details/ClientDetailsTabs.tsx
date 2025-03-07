
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, HardDrive, Clock, Heart } from "lucide-react";

interface ClientDetailsTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  deviceCount: number;
  showHealthTab?: boolean;
}

const ClientDetailsTabs: React.FC<ClientDetailsTabsProps> = ({ 
  activeTab, 
  setActiveTab, 
  deviceCount,
  showHealthTab = false
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="w-full flex justify-start">
        <TabsTrigger value="details" className="flex items-center gap-1">
          <User className="h-4 w-4" />
          <span>Profile</span>
        </TabsTrigger>
        
        <TabsTrigger value="devices" className="flex items-center gap-1">
          <HardDrive className="h-4 w-4" />
          <span>Devices</span>
          {deviceCount > 0 && (
            <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-ice-100 text-ice-800">
              {deviceCount}
            </span>
          )}
        </TabsTrigger>
        
        <TabsTrigger value="history" className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>History</span>
        </TabsTrigger>

        {showHealthTab && (
          <TabsTrigger value="health" className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span>Health</span>
          </TabsTrigger>
        )}
      </TabsList>
    </Tabs>
  );
};

export default ClientDetailsTabs;
