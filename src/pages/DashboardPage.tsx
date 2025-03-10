
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import MemberSidebar from "@/components/member/MemberSidebar";
import MemberDashboard from "@/components/member/MemberDashboard";
import { useToast } from "@/components/ui/use-toast";

const DashboardPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Monitor authentication state and redirect if needed
  useEffect(() => {
    console.log("DashboardPage - Auth state:", { isAuthenticated, user, isLoading });
    
    // Only process redirects when loading is complete
    if (!isLoading) {
      if (!isAuthenticated) {
        console.log("DashboardPage - Not authenticated, redirecting to login");
        navigate('/login?redirect=/dashboard');
      } else if (user && user.role !== 'member' && user.role !== 'admin') {
        // Redirect user with incorrect role to the appropriate dashboard
        console.log("DashboardPage - User has role:", user.role, "- redirecting to appropriate dashboard");
        
        toast({
          title: "Access Changed",
          description: "Redirecting to your assigned dashboard",
        });
        
        if (user.role === 'admin') {
          navigate('/admin');
        } else if (user.role === 'callcenter') {
          navigate('/call-center');
        }
      } else {
        console.log("DashboardPage - User authenticated with correct role");
      }
    }
  }, [isAuthenticated, user, isLoading, navigate, toast]);
  
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
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="dashboard"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-auto transition-all duration-300">
        <div className="p-6 w-full">
          <MemberDashboard />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
