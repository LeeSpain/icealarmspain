
import React from "react";
import { User } from "lucide-react";
import NotificationBell from "../notifications/NotificationBell";
import { Notification } from "../notifications/NotificationTypes";
import { User as UserType } from "@/context/AuthContext";

interface HeaderProps {
  activeSection: string;
  sidebarCollapsed?: boolean;
  setSidebarCollapsed?: (collapsed: boolean) => void;
  hasUnreadNotifications?: boolean;
  showNotifications?: boolean;
  setShowNotifications?: (show: boolean) => void;
  notifications?: Notification[];
  viewClientFromNotification?: (clientId: number, notificationId: string) => void;
  checkClientServiceReadiness?: (clientId: number) => void;
  markAsRead?: (id: string) => void;
  setActiveSection?: (section: string) => void;
  formatNotificationTime?: (date: Date) => string;
  user?: UserType | null;
}

const Header: React.FC<HeaderProps> = ({
  activeSection,
  sidebarCollapsed,
  setSidebarCollapsed,
  hasUnreadNotifications = false,
  showNotifications = false,
  setShowNotifications = () => {},
  notifications = [],
  viewClientFromNotification = () => {},
  checkClientServiceReadiness = () => {},
  markAsRead = () => {},
  setActiveSection = () => {},
  formatNotificationTime = () => "",
  user = null
}) => {
  // Get the title based on the active section
  const getSectionTitle = () => {
    switch (activeSection) {
      case "dashboard": return "Dashboard";
      case "tickets": return "Support Tickets";
      case "all-clients": return "All Clients";
      case "clients": return "Client Information";
      case "clients-alerts": return "Client Alerts";
      case "clients-history": return "Interaction History";
      case "clients-devices": return "Client Devices";
      case "stats": return "Call Center Statistics";
      case "stats-performance": return "Agent Performance";
      case "schedule": return "Agent Schedule";
      case "knowledge": return "Knowledge Base";
      case "notifications": return "Notifications";
      case "profile": return "Agent Profile";
      default: return "Dashboard";
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-background border-b px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">
        {getSectionTitle()}
      </h1>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <NotificationBell
            hasUnreadNotifications={hasUnreadNotifications}
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
            notifications={notifications}
            viewClientFromNotification={viewClientFromNotification}
            checkClientServiceReadiness={checkClientServiceReadiness}
            markAsRead={markAsRead}
            setActiveSection={setActiveSection}
            formatNotificationTime={formatNotificationTime}
          />
          
          <div className="flex items-center gap-2 ml-4 bg-primary/10 px-3 py-1.5 rounded-md">
            <User className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{user?.name || 'Call Center Agent'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
