
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Notification } from "../notifications/NotificationTypes";
import EmptyNotificationsState from "./components/urgentNotifications/EmptyNotificationsState";
import HighPriorityTicketsSection from "./components/urgentNotifications/HighPriorityTicketsSection";
import UnreadMessagesSection from "./components/urgentNotifications/UnreadMessagesSection";
import MedicalAlertsSection from "./components/urgentNotifications/MedicalAlertsSection";
import { mockTickets } from "../ticketing/mock-data";
import { mockChatSessions, mockChatMessages } from "../chat/mock-data";

interface UrgentNotificationsProps {
  notifications: Notification[];
  setActiveSection: (section: string) => void;
}

const UrgentNotifications: React.FC<UrgentNotificationsProps> = ({ 
  notifications, 
  setActiveSection 
}) => {
  // Get high priority tickets
  const highPriorityTickets = mockTickets.filter(ticket => 
    ticket.priority === 'high' && ticket.status !== 'closed'
  );
  
  // Get client messages with unread messages
  const unreadMessages = mockChatSessions
    .filter(session => session.unreadCount > 0)
    .map(session => {
      // Find the last message for this session
      const lastMessage = mockChatMessages
        .filter(msg => msg.sessionId === session.id)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
      
      return {
        id: session.id,
        clientName: session.memberName,
        message: lastMessage?.content || session.lastMessagePreview,
        time: new Date(session.lastMessage).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
        unread: true
      };
    });
  
  // Get medical alerts
  const medicalAlerts = notifications.filter(
    notif => notif.type === 'medical' || notif.type === 'device-alert'
  );
  
  // Decide if we have any urgent notifications
  const hasUrgentNotifications = 
    highPriorityTickets.length > 0 || 
    unreadMessages.length > 0 || 
    medicalAlerts.length > 0;
  
  return (
    <Card className="h-full shadow-md">
      <CardHeader className="pb-2 bg-red-50">
        <CardTitle className="text-md flex items-center gap-2 text-red-700">
          <AlertCircle className="h-5 w-5" />
          Urgent Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-4 max-h-[320px] overflow-y-auto">
        {hasUrgentNotifications ? (
          <>
            <HighPriorityTicketsSection 
              tickets={highPriorityTickets} 
              handleViewAll={(section) => setActiveSection(section)} 
            />
            
            <UnreadMessagesSection 
              chats={unreadMessages}
              handleViewAll={(section) => setActiveSection(section)}
            />
            
            <MedicalAlertsSection 
              alerts={medicalAlerts}
              handleViewAll={(section) => setActiveSection(section)}
            />
          </>
        ) : (
          <EmptyNotificationsState />
        )}
      </CardContent>
    </Card>
  );
};

export default UrgentNotifications;
