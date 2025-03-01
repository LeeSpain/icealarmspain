
import React from "react";
import { Button } from "@/components/ui/button";
import { User, Package, Clock } from "lucide-react";

interface ClientDetailsTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  deviceCount: number;
}

const ClientDetailsTabs: React.FC<ClientDetailsTabsProps> = ({ 
  activeTab, 
  setActiveTab,
  deviceCount
}) => {
  return (
    <div className="flex gap-2 mt-4">
      <Button
        variant={activeTab === "details" ? "default" : "outline"}
        size="sm"
        onClick={() => setActiveTab("details")}
      >
        <User className="h-4 w-4 mr-1" />
        Details
      </Button>
      <Button
        variant={activeTab === "devices" ? "default" : "outline"}
        size="sm"
        onClick={() => setActiveTab("devices")}
      >
        <Package className="h-4 w-4 mr-1" />
        Devices ({deviceCount})
      </Button>
      <Button
        variant={activeTab === "history" ? "default" : "outline"}
        size="sm"
        onClick={() => setActiveTab("history")}
      >
        <Clock className="h-4 w-4 mr-1" />
        Interaction History
      </Button>
    </div>
  );
};

export default ClientDetailsTabs;
