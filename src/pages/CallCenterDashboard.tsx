
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "@/context/AuthContext";

// Import refactored components
import Sidebar from "@/components/callcenter/Sidebar";
import Header from "@/components/callcenter/dashboard/Header";
import DashboardContent from "@/components/callcenter/dashboard/DashboardContent";
import { Notification } from "@/components/callcenter/notifications/NotificationTypes";
import { getMockNotifications } from "@/components/callcenter/notifications/mock-notifications";
import { formatNotificationTime } from "@/components/callcenter/dashboard/util";

const CallCenterDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("tickets");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const { user } = useAuth();

  // Set up notifications
  useEffect(() => {
    // Get mock notifications
    const mockNotifications = getMockNotifications();
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

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      <ToastContainer />
      
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          activeSection={activeSection}
          hasUnreadNotifications={hasUnreadNotifications}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          notifications={notifications}
          viewClientFromNotification={viewClientFromNotification}
          checkClientServiceReadiness={checkClientServiceReadiness}
          markAsRead={markAsRead}
          setActiveSection={setActiveSection}
          formatNotificationTime={formatNotificationTime}
          user={user}
        />
        
        <DashboardContent 
          activeSection={activeSection}
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          setActiveSection={setActiveSection}
        />
      </div>
    </div>
  );
};

export default CallCenterDashboard;
