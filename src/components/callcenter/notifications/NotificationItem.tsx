
import React from "react";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AlertCircle, AlertTriangle, Battery } from "lucide-react";
import { Notification, NotificationType } from "./NotificationTypes";

interface NotificationItemProps {
  notification: Notification;
  formatNotificationTime: (date: Date) => string;
  viewClientFromNotification: (clientId: number, notificationId: string) => void;
  checkClientServiceReadiness: (clientId: number) => void;
  markAsRead: (id: string) => void;
  dialogContent: React.ReactNode;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  formatNotificationTime,
  viewClientFromNotification,
  checkClientServiceReadiness,
  markAsRead,
  dialogContent
}) => {
  // Get notification badge color based on type
  const getNotificationColorClass = (type: NotificationType) => {
    switch (type) {
      case 'sos':
        return 'bg-red-600 text-white';
      case 'high-glucose':
        return 'bg-orange-500 text-white';
      case 'device-offline':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  // Get notification icon based on type
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'sos':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'high-glucose':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'device-offline':
        return <Battery className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div 
      key={notification.id}
      className={`p-3 border-b hover:bg-slate-50 cursor-pointer ${!notification.read ? 'bg-blue-50/40' : ''}`}
      onClick={() => viewClientFromNotification(notification.clientId, notification.id)}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">
          {getNotificationIcon(notification.type)}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <Badge variant="outline" className={getNotificationColorClass(notification.type)}>
                {notification.type === 'sos' ? 'SOS ALERT' : 
                  notification.type === 'high-glucose' ? 'HIGH GLUCOSE' : 'DEVICE OFFLINE'}
              </Badge>
            </div>
            <span className="text-xs text-slate-500">
              {formatNotificationTime(notification.timestamp)}
            </span>
          </div>
          <p className="font-medium mt-1 text-slate-800">{notification.clientName}</p>
          <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
          <div className="mt-2 flex justify-between">
            <button 
              className="text-xs text-indigo-600 hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                viewClientFromNotification(notification.clientId, notification.id);
              }}
            >
              View client
            </button>
            {notification.type === 'device-offline' && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button 
                    className="text-xs text-indigo-600 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Check service readiness
                  </button>
                </AlertDialogTrigger>
                {dialogContent}
              </AlertDialog>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
