
import React, { useState } from "react";
import { Bell, Filter, Archive, MailCheck, MailX, AlertTriangle, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Notification } from "./NotificationTypes";
import { getMockNotifications } from "./mock-notifications";
import { toast } from "react-toastify";
import NotificationList from "./NotificationList";

const NotificationCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>(getMockNotifications());
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    toast.success("Notification marked as read");
  };
  
  const handleRemoveNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.info("Notification removed");
  };
  
  // Filter notifications based on active tab and search query
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = !searchQuery || 
      notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.clientName.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesTab = 
      activeTab === "all" ||
      (activeTab === "unread" && !notification.read) ||
      (activeTab === "sos" && notification.type === "sos") ||
      (activeTab === "alerts" && notification.type !== "sos");
      
    return matchesSearch && matchesTab;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
          <p className="text-muted-foreground">
            View and manage system and client notifications
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
              <MailCheck className="h-4 w-4 mr-1" />
              Mark All Read
            </Button>
          )}
          
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2 text-ice-600" />
              Notification Center
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-red-100 text-red-800">
                  {unreadCount} unread
                </Badge>
              )}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-2/3 relative">
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search notifications..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <div className="md:w-1/3">
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full">
                    <TabsTrigger value="all" className="flex-1 text-xs">All</TabsTrigger>
                    <TabsTrigger value="unread" className="flex-1 text-xs">Unread</TabsTrigger>
                    <TabsTrigger value="sos" className="flex-1 text-xs">SOS</TabsTrigger>
                    <TabsTrigger value="alerts" className="flex-1 text-xs">Alerts</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            <Separator />
            
            <NotificationList 
              notifications={filteredNotifications}
              onMarkAsRead={handleMarkAsRead}
              onRemove={handleRemoveNotification}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationCenter;
