
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/callcenter/sidebar/Sidebar";
import DashboardContent from "@/components/callcenter/dashboard/DashboardContent";
import Header from "@/components/callcenter/dashboard/Header";
import { getMockNotifications } from "@/components/callcenter/notifications/mock-notifications";
import { Notification } from "@/components/callcenter/notifications/NotificationTypes";
import { useNavigate } from "react-router-dom";

const CallCenterDashboard: React.FC = () => {
  // Set dashboard as the default active section
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(getMockNotifications());
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Show welcome toast on initial load
  useEffect(() => {
    if (user) {
      toast.success(`Welcome back, ${user.name || 'Agent'}! You have ${notifications.filter(n => !n.read).length} unread notifications.`);
    }
  }, []);

  // Redirect if not authenticated or not a call center agent
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user && user.role !== 'callcenter') {
      // Redirect to appropriate dashboard based on role
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  // Function to check if there are any unread notifications
  const hasUnreadNotifications = notifications.some(notification => !notification.read);

  // Function to mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Function to view a client from a notification
  const viewClientFromNotification = (clientId: number, notificationId: string) => {
    setSelectedClient(clientId);
    setActiveSection("clients");
    markAsRead(notificationId);
    setShowNotifications(false);
  };

  // Function to check if a client is ready for service
  const checkClientServiceReadiness = (clientId: number) => {
    console.log(`Checking service readiness for client ${clientId}`);
    // Implementation would go here
  };

  // Format the notification time
  const formatNotificationTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  // If not authenticated or not a call center agent, show loading
  if (!isAuthenticated || (user && user.role !== 'callcenter')) {
    return <div className="flex h-screen items-center justify-center">Redirecting...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <ToastContainer position="top-right" autoClose={5000} />
      
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        user={user}
      />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Header 
          activeSection={activeSection}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
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
        
        <main className="p-6">
          <DashboardContent 
            activeSection={activeSection}
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
            setActiveSection={setActiveSection}
          />
        </main>
      </div>
    </div>
  );
};

export default CallCenterDashboard;
