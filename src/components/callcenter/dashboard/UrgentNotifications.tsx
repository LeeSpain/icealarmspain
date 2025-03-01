
import React from "react";
import { 
  Bell, 
  MessageCircle, 
  TicketIcon, 
  AlertTriangle, 
  PlusCircle, 
  ArrowUpRight 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { mockTickets } from "../ticketing/mock-data";
import { Notification } from "../notifications/NotificationTypes";

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
  
  return (
    <Card className="border-l-4 border-red-500 shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            Urgent & Important
          </CardTitle>
          <Badge variant="destructive" className="ml-2">
            {urgentNotifications.length + urgentTickets.length + urgentChats.length} items
          </Badge>
        </div>
        <CardDescription>
          Critical items requiring immediate attention
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Medical Dispenser & Glucose Notifications */}
        {urgentNotifications.length > 0 && (
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
        )}
        
        {/* Urgent Tickets */}
        {urgentTickets.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold flex items-center">
                <TicketIcon className="h-4 w-4 mr-1 text-purple-500" />
                High Priority Tickets
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleViewAll("tickets")}
                className="text-xs h-6 px-2"
              >
                View all <ArrowUpRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
            <div className="space-y-2">
              {urgentTickets.map(ticket => (
                <div 
                  key={ticket.id}
                  className="p-3 bg-purple-50 rounded-md text-sm border-l-2 border-purple-500"
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{ticket.subject}</span>
                    <Badge variant="outline" className="bg-red-100 text-red-800 text-xs">
                      {ticket.priority}
                    </Badge>
                  </div>
                  <p className="mt-1 text-gray-600">Client: {ticket.clientName}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">{ticket.created}</span>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-6 text-xs"
                      onClick={() => handleViewAll("tickets")}
                    >
                      Respond
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Unread Chats */}
        {urgentChats.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold flex items-center">
                <MessageCircle className="h-4 w-4 mr-1 text-blue-500" />
                Unread Messages
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleViewAll("chat")}
                className="text-xs h-6 px-2"
              >
                View all <ArrowUpRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
            <div className="space-y-2">
              {urgentChats.map(chat => (
                <div 
                  key={chat.id}
                  className="p-3 bg-blue-50 rounded-md text-sm border-l-2 border-blue-500"
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{chat.clientName}</span>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <p className="mt-1 text-gray-600">{chat.message}</p>
                  <div className="flex justify-end mt-2">
                    <Button 
                      size="sm" 
                      className="h-6 text-xs bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleViewAll("chat")}
                    >
                      Reply Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Empty state */}
        {urgentNotifications.length === 0 && urgentTickets.length === 0 && urgentChats.length === 0 && (
          <div className="py-6 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <PlusCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-sm font-medium">All clear!</h3>
            <p className="text-xs text-gray-500 mt-1">No urgent items requiring attention</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UrgentNotifications;
