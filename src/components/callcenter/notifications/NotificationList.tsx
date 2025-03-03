import React from "react";
import { format, formatDistanceToNow } from "date-fns";
import { Check, X, AlertTriangle, Activity, Cpu, Phone, User, Bell } from "lucide-react";
import { Notification } from "./NotificationTypes";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onRemove: (id: string) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({ 
  notifications, 
  onMarkAsRead, 
  onRemove 
}) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "sos":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "high-glucose":
        return <Activity className="h-5 w-5 text-yellow-500" />;
      case "device-offline":
        return <Cpu className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    // If less than 24 hours, show relative time
    if (diff < 24 * 60 * 60 * 1000) {
      return formatDistanceToNow(date, { addSuffix: true });
    }
    
    // Otherwise, show the date
    return format(date, "MMM d, yyyy");
  };
  
  if (notifications.length === 0) {
    return (
      <div className="text-center py-12">
        <Bell className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
        <h3 className="font-medium">No notifications found</h3>
        <p className="text-sm text-muted-foreground">
          You're all caught up!
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      {notifications.map(notification => (
        <Card 
          key={notification.id} 
          className={cn(
            "transition-colors",
            !notification.read && "bg-blue-50 border-blue-100"
          )}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-background p-2 border">
                {getNotificationIcon(notification.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <p className={cn(
                        "font-medium",
                        !notification.read ? "text-ice-800" : "text-foreground"
                      )}>
                        {notification.type === "sos" ? "SOS ALERT" : 
                         notification.type === "high-glucose" ? "Glucose Level Alert" : 
                         "Device Alert"}
                      </p>
                      {!notification.read && <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800">New</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                    <div className="flex items-center pt-1 text-xs text-muted-foreground">
                      <User className="h-3 w-3 mr-1" />
                      <span className="mr-3">{notification.clientName} (#{notification.clientId})</span>
                      <span>{formatTimestamp(notification.timestamp)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-1">
                    {!notification.read && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => onMarkAsRead(notification.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={() => onRemove(notification.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex mt-2 space-x-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Phone className="h-3 w-3 mr-1" />
                    Contact Client
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NotificationList;
