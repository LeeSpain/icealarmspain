
import React from "react";
import { Bell } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import { Notification } from "./NotificationTypes";

interface NotificationBellProps {
  hasUnreadNotifications: boolean;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  notifications: Notification[];
  viewClientFromNotification: (clientId: number, notificationId: string) => void;
  checkClientServiceReadiness: (clientId: number) => void;
  markAsRead: (id: string) => void;
  setActiveSection: (section: string) => void;
  formatNotificationTime: (date: Date) => string;
}

const NotificationBell: React.FC<NotificationBellProps> = ({
  hasUnreadNotifications,
  showNotifications,
  setShowNotifications,
  notifications,
  viewClientFromNotification,
  checkClientServiceReadiness,
  markAsRead,
  setActiveSection,
  formatNotificationTime
}) => {
  return (
    <div className="relative">
      <button 
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-1.5 rounded-full hover:bg-blue-600"
      >
        <Bell className="h-5 w-5 cursor-pointer text-white" />
        {hasUnreadNotifications && (
          <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-indigo-800" />
        )}
      </button>
      
      <NotificationDropdown
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        notifications={notifications}
        viewClientFromNotification={viewClientFromNotification}
        checkClientServiceReadiness={checkClientServiceReadiness}
        markAsRead={markAsRead}
        setActiveSection={setActiveSection}
        formatNotificationTime={formatNotificationTime}
      />
    </div>
  );
};

export default NotificationBell;
