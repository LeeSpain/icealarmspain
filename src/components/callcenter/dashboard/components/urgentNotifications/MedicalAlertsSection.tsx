
import React from "react";
import { Bell, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Notification } from "../../../notifications/NotificationTypes";

interface MedicalAlertsSectionProps {
  notifications: Notification[];
  handleViewAll: (section: string) => void;
}

const MedicalAlertsSection: React.FC<MedicalAlertsSectionProps> = ({ 
  notifications, 
  handleViewAll 
}) => {
  const urgentNotifications = notifications.filter(n => 
    !n.read && (n.type === 'sos' || n.type === 'high-glucose')
  );

  if (urgentNotifications.length === 0) return null;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold flex items-center">
          <Bell className="h-4 w-4 mr-1 text-amber-500" />
          Medical Alerts
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => handleViewAll("notifications")}
          className="text-xs h-6 px-2"
        >
          View all <ArrowUpRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
      <div className="space-y-2">
        {urgentNotifications.map(notification => (
          <div 
            key={notification.id}
            className={`p-3 rounded-md text-sm ${notification.type === 'sos' ? 'bg-red-50 border-l-2 border-red-500' : 'bg-amber-50 border-l-2 border-amber-500'}`}
          >
            <div className="flex justify-between">
              <span className="font-medium">{notification.clientName}</span>
              <Badge variant={notification.type === 'sos' ? 'destructive' : 'outline'} className="text-xs">
                {notification.type === 'sos' ? 'SOS ALERT' : 'HIGH GLUCOSE'}
              </Badge>
            </div>
            <p className="mt-1 text-gray-600">{notification.message}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">
                {new Date(notification.timestamp).toLocaleTimeString()}
              </span>
              <Button 
                size="sm" 
                variant="outline" 
                className="h-6 text-xs"
                onClick={() => handleViewAll("clients")}
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalAlertsSection;
