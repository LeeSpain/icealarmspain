
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, MessageCircle, Activity, Pill, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "react-toastify";

// Mock notification data - In a real app, this would come from an API
const getMockNotifications = () => {
  return [
    {
      id: '1',
      type: 'message',
      title: 'New message from Call Center',
      message: 'Please confirm your appointment for tomorrow at 3:00 PM.',
      time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false
    },
    {
      id: '2',
      type: 'glucose',
      title: 'Glucose Level Alert',
      message: 'Your glucose reading is 180 mg/dL. This is above your target range.',
      time: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      read: false
    },
    {
      id: '3',
      type: 'medication',
      title: 'Medication Reminder',
      message: 'Time to take your evening dose of Metformin.',
      time: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
      read: true
    },
    {
      id: '4',
      type: 'system',
      title: 'Device Update Available',
      message: 'A firmware update is available for your SOS Pendant. Please sync your device.',
      time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true
    }
  ];
};

interface Notification {
  id: string;
  type: 'message' | 'glucose' | 'medication' | 'system';
  title: string;
  message: string;
  time: Date;
  read: boolean;
}

const NotificationSection: React.FC = () => {
  const { language } = useLanguage();
  const [notifications, setNotifications] = useState<Notification[]>(getMockNotifications());
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
  
  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.read;
    return notification.type === activeTab;
  });
  
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes} ${language === 'en' ? 'min ago' : 'min atrás'}`;
    } else if (diffMinutes < 60 * 24) {
      const hours = Math.floor(diffMinutes / 60);
      return `${hours} ${language === 'en' ? 'hours ago' : 'horas atrás'}`;
    } else {
      const days = Math.floor(diffMinutes / (60 * 24));
      return `${days} ${language === 'en' ? 'days ago' : 'días atrás'}`;
    }
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case 'glucose':
        return <Activity className="h-4 w-4 text-amber-500" />;
      case 'medication':
        return <Pill className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };
  
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
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="all" className="text-xs">
              {language === 'en' ? 'All' : 'Todo'}
            </TabsTrigger>
            <TabsTrigger value="unread" className="text-xs">
              {language === 'en' ? 'Unread' : 'No leído'}
            </TabsTrigger>
            <TabsTrigger value="message" className="text-xs">
              {language === 'en' ? 'Chats' : 'Chats'}
            </TabsTrigger>
            <TabsTrigger value="glucose" className="text-xs">
              {language === 'en' ? 'Glucose' : 'Glucosa'}
            </TabsTrigger>
            <TabsTrigger value="medication" className="text-xs">
              {language === 'en' ? 'Meds' : 'Medicamentos'}
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="max-h-[300px] overflow-y-auto pr-1">
          {filteredNotifications.length > 0 ? (
            <div className="space-y-2">
              {filteredNotifications.map(notification => (
                <div 
                  key={notification.id} 
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
                          {formatTime(notification.time)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6" 
                        onClick={() => handleRemoveNotification(notification.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Bell className="h-10 w-10 mx-auto text-gray-300 mb-2" />
              <p className="text-gray-500">
                {language === 'en' 
                  ? 'No notifications found' 
                  : 'No se encontraron notificaciones'}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSection;
