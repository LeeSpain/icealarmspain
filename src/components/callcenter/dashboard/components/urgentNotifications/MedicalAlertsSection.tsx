
import React from "react";
import { Bell, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Notification } from "../../../notifications/NotificationTypes";

interface MedicalAlertsSectionProps {
  alerts: Notification[];
  handleViewAll: (section: string) => void;
}

const MedicalAlertsSection: React.FC<MedicalAlertsSectionProps> = ({ 
  alerts, 
  handleViewAll 
}) => {
  const urgentNotifications = alerts.filter(n => 
    !n.read && (n.type === 'sos' || n.type === 'high-glucose')
  );

  if (urgentNotifications.length === 0) return null;

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-xs font-semibold flex items-center">
          <Bell className="h-3 w-3 mr-1 text-amber-500" />
          Medical Alerts
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => handleViewAll("notifications")}
          className="text-xs h-5 px-1"
        >
          <ArrowUpRight className="h-3 w-3" />
        </Button>
      </div>
      <div className="space-y-1">
        {urgentNotifications.slice(0, 1).map(notification => (
          <div 
            key={notification.id}
            className={`p-2 rounded-md text-xs ${notification.type === 'sos' ? 'bg-red-50 border-l-2 border-red-500' : 'bg-amber-50 border-l-2 border-amber-500'}`}
          >
            <div className="flex justify-between">
              <span className="font-medium">{notification.clientName}</span>
              <Badge variant={notification.type === 'sos' ? 'destructive' : 'outline'} className="text-[10px] py-0 px-1 h-4">
                {notification.type === 'sos' ? 'SOS' : 'GLUCOSE'}
              </Badge>
            </div>
            <p className="mt-1 text-gray-600 text-xs line-clamp-1">{notification.message}</p>
            <div className="flex justify-end mt-1">
              <Button 
                size="sm" 
                variant="outline" 
                className="h-5 text-[10px] px-1"
                onClick={() => handleViewAll("clients")}
              >
                View
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalAlertsSection;
