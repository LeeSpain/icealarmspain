
import React from 'react';
import { Bell } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import NotificationItem from './NotificationItem';
import { NotificationType } from './types';

interface NotificationListProps {
  notifications: NotificationType[];
  onMarkAsRead: (id: string) => void;
  onRemove: (id: string) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({ 
  notifications, 
  onMarkAsRead, 
  onRemove 
}) => {
  const { language } = useLanguage();
  
  if (notifications.length === 0) {
    return (
      <div className="text-center py-8">
        <Bell className="h-10 w-10 mx-auto text-gray-300 mb-2" />
        <p className="text-gray-500">
          {language === 'en' 
            ? 'No notifications found' 
            : 'No se encontraron notificaciones'}
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      {notifications.map(notification => (
        <NotificationItem 
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default NotificationList;
