
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "react-toastify";
import NotificationFilter from './NotificationFilter';
import NotificationList from './NotificationList';
import { NotificationType } from './types';
import { getMockNotifications } from './utils';

const NotificationSection: React.FC = () => {
  const { language } = useLanguage();
  const [notifications, setNotifications] = useState<NotificationType[]>(getMockNotifications());
  const [activeTab, setActiveTab] = useState("all");
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    toast.success(
      language === 'en' 
        ? "Notification marked as read" 
        : "Notificación marcada como leída"
    );
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success(
      language === 'en' 
        ? "All notifications marked as read" 
        : "Todas las notificaciones marcadas como leídas"
    );
  };
  
  const handleRemoveNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.info(
      language === 'en' 
        ? "Notification removed" 
        : "Notificación eliminada"
    );
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.read;
    return notification.type === activeTab;
  });
  
  return (
    <Card className="shadow-md">
      <CardHeader className="border-b pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="mr-2 h-5 w-5 text-ice-600" />
            {language === 'en' ? 'Notifications' : 'Notificaciones'}
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-red-500" variant="default">
                {unreadCount}
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleMarkAllAsRead}
              className="text-xs"
            >
              <Check className="h-3 w-3 mr-1" />
              {language === 'en' ? 'Mark all read' : 'Marcar todo como leído'}
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="all" value={activeTab} className="mb-4">
          <NotificationFilter activeTab={activeTab} onTabChange={handleTabChange} />
          
          <TabsContent value={activeTab} className="mt-2">
            <div className="max-h-[300px] overflow-y-auto pr-1">
              <NotificationList 
                notifications={filteredNotifications}
                onMarkAsRead={handleMarkAsRead}
                onRemove={handleRemoveNotification}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NotificationSection;
