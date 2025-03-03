
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { NotificationType } from './types';
import { getNotificationIcon, formatTime } from './utils';
import { useLanguage } from "@/context/LanguageContext";

interface NotificationItemProps {
  notification: NotificationType;
  onMarkAsRead: (id: string) => void;
  onRemove: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onMarkAsRead, 
  onRemove 
}) => {
  const { language } = useLanguage();
  
  return (
    <div 
      className={`p-3 rounded-md border ${notification.read ? 'bg-white' : 'bg-blue-50 border-blue-100'}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-2">
          <div className="p-1.5 bg-white rounded-full border mt-0.5">
            {getNotificationIcon(notification.type)}
          </div>
          <div>
            <div className="flex items-center">
              <p className="font-medium text-sm">
                {notification.title}
              </p>
              {!notification.read && (
                <Badge className="ml-2 h-5 bg-blue-100 text-blue-800 text-[10px]" variant="outline">
                  {language === 'en' ? 'NEW' : 'NUEVO'}
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-0.5">
              {notification.message}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {formatTime(notification.time, language)}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1 ml-2">
          {!notification.read && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={() => onMarkAsRead(notification.id)}
            >
              <Check className="h-3 w-3" />
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6" 
            onClick={() => onRemove(notification.id)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
