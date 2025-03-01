
import React from "react";
import { Search, User } from "lucide-react";
import NotificationBell from "../notifications/NotificationBell";
import { Notification } from "../notifications/NotificationTypes";
import { User as UserType } from "@/context/AuthContext";

interface HeaderProps {
  activeSection: string;
  hasUnreadNotifications: boolean;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  notifications: Notification[];
  viewClientFromNotification: (clientId: number, notificationId: string) => void;
  checkClientServiceReadiness: (clientId: number) => void;
  markAsRead: (id: string) => void;
  setActiveSection: (section: string) => void;
  formatNotificationTime: (date: Date) => string;
  user: UserType | null;
}

const Header: React.FC<HeaderProps> = ({
  activeSection,
  hasUnreadNotifications,
  showNotifications,
  setShowNotifications,
  notifications,
  viewClientFromNotification,
  checkClientServiceReadiness,
  markAsRead,
  setActiveSection,
  formatNotificationTime,
  user
}) => {
  return (
    <header className="sticky top-0 z-10 bg-gradient-to-r from-blue-700 to-indigo-800 text-white border-b px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">
        {activeSection === "tickets" && "Support Tickets"}
        {activeSection === "clients" && "Client Information"}
        {activeSection === "stats" && "Call Center Statistics"}
        {activeSection === "notifications" && "Notifications"}
        {activeSection === "profile" && "Agent Profile"}
      </h1>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="h-10 pl-10 pr-4 rounded-md border border-slate-300 bg-white text-slate-800" 
          />
        </div>
        
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
          
          <div className="flex items-center gap-2 ml-4 bg-indigo-800 px-3 py-1.5 rounded-md">
            <User className="h-4 w-4 text-indigo-200" />
            <span className="text-sm font-medium text-white">{user?.name || 'Agent'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
