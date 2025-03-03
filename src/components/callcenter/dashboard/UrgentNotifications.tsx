
import React from "react";
import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { mockTickets } from "../ticketing/mock-data";
import { Notification } from "../notifications/NotificationTypes";

// Import our new components
import MedicalAlertsSection from "./components/urgentNotifications/MedicalAlertsSection";
import HighPriorityTicketsSection from "./components/urgentNotifications/HighPriorityTicketsSection";
import UnreadMessagesSection from "./components/urgentNotifications/UnreadMessagesSection";
import EmptyNotificationsState from "./components/urgentNotifications/EmptyNotificationsState";

interface UrgentNotificationsProps {
  notifications: Notification[];
  setActiveSection: (section: string) => void;
}

const UrgentNotifications: React.FC<UrgentNotificationsProps> = ({ 
  notifications, 
  setActiveSection 
}) => {
  const { toast } = useToast();
  
  // Filter urgent notifications
  const urgentNotifications = notifications.filter(n => 
    !n.read && (n.type === 'sos' || n.type === 'high-glucose')
  );
  
  // Filter pending high priority tickets
  const urgentTickets = mockTickets.filter(ticket => 
    ticket.status !== 'closed' && ticket.priority === 'high'
  ).slice(0, 3);
  
  // Mock data for urgent chats
  const urgentChats = [
    { id: 1, clientName: "Maria García", message: "I'm having trouble with my medical dispenser", time: "5m ago", unread: true },
    { id: 2, clientName: "John Smith", message: "My glucose monitor isn't sending readings", time: "15m ago", unread: true }
  ];
  
  const handleViewAll = (section: string) => {
    setActiveSection(section);
    toast({
      title: "Navigating to " + section,
      description: "Loading all items in this category",
    });
  };

  // Calculate total items for the badge
  const totalUrgentItems = urgentNotifications.length + urgentTickets.length + urgentChats.length;
  
  return (
    <Card className="border-l-4 border-red-500 shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            Urgent & Important
          </CardTitle>
          <Badge variant="destructive" className="ml-2">
            {totalUrgentItems} items
          </Badge>
        </div>
        <CardDescription>
          Critical items requiring immediate attention
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <MedicalAlertsSection 
          notifications={notifications} 
          handleViewAll={handleViewAll} 
        />
        
        <HighPriorityTicketsSection 
          tickets={urgentTickets} 
          handleViewAll={handleViewAll} 
        />
        
        <UnreadMessagesSection 
          chats={urgentChats} 
          handleViewAll={handleViewAll} 
        />
        
        {totalUrgentItems === 0 && <EmptyNotificationsState />}
      </CardContent>
    </Card>
  );
};

export default UrgentNotifications;
