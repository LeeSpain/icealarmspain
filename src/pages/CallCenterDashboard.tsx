
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  Users, 
  TicketIcon, 
  MessageCircle, 
  Phone, 
  Clock, 
  Search,
  Bell,
  User,
  AlertTriangle,
  AlertCircle,
  Battery,
  X
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Import shadcn components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

// Import components
import Sidebar from "@/components/callcenter/Sidebar";
import TicketingSystem from "@/components/callcenter/TicketingSystem";
import ClientDetails from "@/components/callcenter/ClientDetails";
import CallStats from "@/components/callcenter/stats/CallStats";
import PlaceholderSection from "@/components/admin/PlaceholderSection";

// Types for notifications
type NotificationType = 'sos' | 'high-glucose' | 'device-offline';

interface Notification {
  id: string;
  type: NotificationType;
  clientId: number;
  clientName: string;
  timestamp: Date;
  message: string;
  read: boolean;
}

const CallCenterDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("tickets");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const { user } = useAuth();

  // Mock data for notifications
  useEffect(() => {
    // This would normally come from an API or websocket
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'sos',
        clientId: 1,
        clientName: 'Maria González',
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        message: 'SOS button activated! Immediate assistance required.',
        read: false
      },
      {
        id: '2',
        type: 'high-glucose',
        clientId: 2,
        clientName: 'Juan Martínez',
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
        message: 'Glucose level at 250 mg/dL (High). Last reading was 180 mg/dL.',
        read: false
      },
      {
        id: '3',
        type: 'device-offline',
        clientId: 3,
        clientName: 'Elena Navarro',
        timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
        message: 'Medical dispenser went offline. Last online 45 minutes ago.',
        read: false
      },
      {
        id: '4',
        type: 'high-glucose',
        clientId: 2,
        clientName: 'Juan Martínez',
        timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
        message: 'Glucose level at 200 mg/dL (Above normal). Monitor required.',
        read: true
      }
    ];

    setNotifications(mockNotifications);
    
    // Check for unread notifications
    const hasUnread = mockNotifications.some(notification => !notification.read);
    setHasUnreadNotifications(hasUnread);
    
    // Show toast for critical notifications
    mockNotifications.forEach(notification => {
      if (!notification.read) {
        if (notification.type === 'sos') {
          toast.error(`SOS ALERT: ${notification.clientName} needs immediate assistance!`, {
            position: "top-right",
            autoClose: false,
            closeOnClick: false,
            draggable: true
          });
        }
      }
    });
  }, []);

  // Handle marking notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    
    // Update the hasUnreadNotifications flag
    const stillHasUnread = notifications.some(notification => 
      notification.id !== id && !notification.read
    );
    setHasUnreadNotifications(stillHasUnread);
  };

  // Handle viewing client details from notification
  const viewClientFromNotification = (clientId: number, notificationId: string) => {
    setSelectedClient(clientId);
    setActiveSection("clients");
    markAsRead(notificationId);
    setShowNotifications(false);
  };

  // Handle client service readiness check
  const checkClientServiceReadiness = (clientId: number) => {
    // This would normally check against real data about the client's devices and services
    // For now, we'll simulate the check with a toast notification
    toast.success("Client has all required services and devices active.", {
      position: "bottom-right",
      autoClose: 3000
    });
  };

  // Render the appropriate section based on activeSection
  const renderActiveSection = () => {
    switch (activeSection) {
      case "tickets":
        return <TicketingSystem 
                 onClientSelect={(clientId) => {
                   setSelectedClient(clientId);
                   if (clientId) setActiveSection("clients");
                 }} 
               />;
      case "clients":
        return <ClientDetails selectedClientId={selectedClient} />;
      case "stats":
        return <CallStats />;
      case "notifications":
        return (
          <PlaceholderSection 
            title="Notifications" 
            description="View all system notifications and alerts" 
            icon={<Bell className="h-5 w-5" />} 
          />
        );
      case "profile":
        return (
          <PlaceholderSection 
            title="Agent Profile" 
            description="View and edit your profile information" 
            icon={<User className="h-5 w-5" />} 
          />
        );
      default:
        return <TicketingSystem 
                 onClientSelect={(clientId) => {
                   setSelectedClient(clientId);
                   if (clientId) setActiveSection("clients");
                 }} 
               />;
    }
  };

  // Get notification badge color based on type
  const getNotificationColorClass = (type: NotificationType) => {
    switch (type) {
      case 'sos':
        return 'bg-red-600 text-white';
      case 'high-glucose':
        return 'bg-orange-500 text-white';
      case 'device-offline':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  // Get notification icon based on type
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'sos':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'high-glucose':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'device-offline':
        return <Battery className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  // Format notification time
  const formatNotificationTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <ToastContainer />
      
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-gradient-to-r from-blue-700 to-indigo-800 text-white border-b px-6 py-4 flex justify-between items-center shadow-md">
          <h1 className="text-2xl font-bold">
            {activeSection === "tickets" && "Support Tickets"}
            {activeSection === "clients" && "Client Information"}
            {activeSection === "stats" && "Call Center Statistics"}
            {activeSection === "notifications" && "Notifications"}
            {activeSection === "profile" && "Agent Profile"}
          </h1>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="h-10 pl-10 pr-4 rounded-md border border-slate-300 bg-white text-slate-800" 
              />
            </div>
            
            <div className="flex items-center gap-2">
              {/* Notification bell with indicator */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-1.5 rounded-full hover:bg-blue-600"
                >
                  <Bell className="h-5 w-5 cursor-pointer text-white" />
                  {hasUnreadNotifications && (
                    <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-indigo-800" />
                  )}
                </button>
                
                {/* Notifications dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-96 bg-white border rounded-md shadow-lg z-50">
                    <div className="p-3 border-b flex justify-between items-center bg-indigo-50">
                      <h3 className="font-semibold text-indigo-900">Notifications</h3>
                      <button 
                        onClick={() => setShowNotifications(false)}
                        className="p-1 rounded-full hover:bg-indigo-100 text-indigo-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-slate-500">
                          No notifications
                        </div>
                      ) : (
                        <div>
                          {notifications.map((notification) => (
                            <div 
                              key={notification.id}
                              className={`p-3 border-b hover:bg-slate-50 cursor-pointer ${!notification.read ? 'bg-blue-50/40' : ''}`}
                              onClick={() => viewClientFromNotification(notification.clientId, notification.id)}
                            >
                              <div className="flex items-start gap-3">
                                <div className="mt-1">
                                  {getNotificationIcon(notification.type)}
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <Badge variant="outline" className={getNotificationColorClass(notification.type)}>
                                        {notification.type === 'sos' ? 'SOS ALERT' : 
                                         notification.type === 'high-glucose' ? 'HIGH GLUCOSE' : 'DEVICE OFFLINE'}
                                      </Badge>
                                    </div>
                                    <span className="text-xs text-slate-500">
                                      {formatNotificationTime(notification.timestamp)}
                                    </span>
                                  </div>
                                  <p className="font-medium mt-1 text-slate-800">{notification.clientName}</p>
                                  <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                                  <div className="mt-2 flex justify-between">
                                    <button 
                                      className="text-xs text-indigo-600 hover:underline"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        viewClientFromNotification(notification.clientId, notification.id);
                                      }}
                                    >
                                      View client
                                    </button>
                                    {notification.type === 'device-offline' && (
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <button 
                                            className="text-xs text-indigo-600 hover:underline"
                                            onClick={(e) => e.stopPropagation()}
                                          >
                                            Check service readiness
                                          </button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>Client Service Validation</AlertDialogTitle>
                                            <AlertDialogDescription>
                                              This will check if the client has all necessary services activated and if their devices are properly registered in our system.
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                              onClick={() => {
                                                checkClientServiceReadiness(notification.clientId);
                                                markAsRead(notification.id);
                                              }}
                                            >
                                              Check Now
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="p-2 border-t bg-indigo-50">
                      <button 
                        className="w-full py-2 text-center text-sm text-indigo-700 hover:underline"
                        onClick={() => {
                          setActiveSection("notifications");
                          setShowNotifications(false);
                        }}
                      >
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2 ml-4 bg-indigo-800 px-3 py-1.5 rounded-md">
                <User className="h-4 w-4 text-indigo-200" />
                <span className="text-sm font-medium text-white">{user?.name || 'Agent'}</span>
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
};

export default CallCenterDashboard;
