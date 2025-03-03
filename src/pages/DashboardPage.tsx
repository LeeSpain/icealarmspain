
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MemberSidebar from "@/components/member/MemberSidebar";
import MemberDashboard from "@/components/member/MemberDashboard";

const DashboardPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [redirectAttempted, setRedirectAttempted] = useState(false);
  
  useEffect(() => {
    console.log("DashboardPage - Auth state:", { isAuthenticated, user, isLoading, redirectAttempted });
    
    // Only redirect if authentication check is complete and not already attempted
    if (!isLoading && !redirectAttempted) {
      setRedirectAttempted(true);
      
      if (!isAuthenticated) {
        console.log("DashboardPage - Redirecting to login - not authenticated");
        navigate('/login');
      } else if (user && user.role !== 'member' && user.role !== 'admin') {
        // If user is authenticated but not a member or admin, redirect to appropriate dashboard
        console.log("DashboardPage - Redirecting to role-specific dashboard", user.role);
        if (user.role === 'callcenter') {
          navigate('/call-center');
        }
      } else {
        console.log("DashboardPage - User authenticated and correct role, rendering dashboard");
      }
    }
  }, [isAuthenticated, navigate, user, isLoading, redirectAttempted]);
  
  // Show loading state while authentication is being checked
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-ice-50/30">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ice-600 mb-4"></div>
          <p className="text-ice-700">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  // Only render dashboard if user is authenticated and is a member or admin
  if (!isAuthenticated || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-ice-50/30">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ice-600 mb-4"></div>
          <p className="text-ice-700">Redirecting to login...</p>
        </div>
      </div>
    );
  }
  
  console.log("DashboardPage rendering - sidebarCollapsed:", sidebarCollapsed);
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="dashboard"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-auto transition-all duration-300">
        <div className="p-6 w-full">
          <ToastContainer />
          <MemberDashboard />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
