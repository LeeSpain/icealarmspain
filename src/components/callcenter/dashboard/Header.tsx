import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth";

interface HeaderProps {
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const { user } = useAuth();
  
  const getPageTitle = () => {
    switch (activeSection) {
      case "dashboard": return "Dashboard";
      case "tickets": return "Support Tickets";
      case "chat": return "Chat System";
      case "clients": return "Client Information";
      case "all-clients": return "All Clients";
      case "stats": return "Call Center Stats";
      case "schedule": return "Agent Schedule";
      case "knowledge": return "Knowledge Base";
      case "notifications": return "Notifications";
      case "profile": return "Agent Profile";
      default: return "Dashboard";
    }
  };

  return (
    <div className="border-b px-6 py-4 bg-background flex items-center justify-between">
      <h1 className="text-2xl font-bold">{getPageTitle()}</h1>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary/10 text-primary">
            {user?.name?.charAt(0) || 'A'}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Header;
