
import React from "react";
import { X } from "lucide-react";
import { Notification } from "./NotificationTypes";
import { NotificationItem } from "./NotificationItem";
import { 
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog";

interface NotificationDropdownProps {
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  notifications: Notification[];
  viewClientFromNotification: (clientId: number, notificationId: string) => void;
  checkClientServiceReadiness: (clientId: number) => void;
  markAsRead: (id: string) => void;
  setActiveSection: (section: string) => void;
  formatNotificationTime: (date: Date) => string;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  showNotifications,
  setShowNotifications,
  notifications,
  viewClientFromNotification,
  checkClientServiceReadiness,
  markAsRead,
  setActiveSection,
  formatNotificationTime
}) => {
  if (!showNotifications) return null;

  const dialogContent = (notification: Notification) => (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Client Service Validation</AlertDialogTitle>
        <AlertDialogDescription>
          This will check if the client has all necessary services activated and if their devices are properly registered in our system.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => {
            checkClientServiceReadiness(notification.clientId);
            markAsRead(notification.id);
          }}
        >
          Check Now
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
  
  return (
    <div className="absolute right-0 mt-2 w-96 bg-white border rounded-md shadow-lg z-50">
      <div className="p-3 border-b flex justify-between items-center bg-indigo-50">
        <h3 className="font-semibold text-indigo-900">Notifications</h3>
        <button 
          onClick={() => setShowNotifications(false)}
          className="p-1 rounded-full hover:bg-indigo-100 text-indigo-700"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-slate-500">
            No notifications
          </div>
        ) : (
          <div>
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                formatNotificationTime={formatNotificationTime}
                viewClientFromNotification={viewClientFromNotification}
                checkClientServiceReadiness={checkClientServiceReadiness}
                markAsRead={markAsRead}
                dialogContent={dialogContent(notification)}
              />
            ))}
          </div>
        )}
      </div>
      <div className="p-2 border-t bg-indigo-50">
        <button 
          className="w-full py-2 text-center text-sm text-indigo-700 hover:underline"
          onClick={() => {
            setActiveSection("notifications");
            setShowNotifications(false);
          }}
        >
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
