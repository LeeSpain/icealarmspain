
import React, { useState, useEffect } from "react";
import MemberSidebar from "@/components/member/MemberSidebar";
import MemberDashboard from "@/components/member/MemberDashboard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const DashboardPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log("DashboardPage - Checking authentication:", isAuthenticated);
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
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
          <MemberDashboard />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
