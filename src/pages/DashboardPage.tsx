
import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MemberSidebar from "@/components/member/MemberSidebar";
import WelcomeSection from "@/components/member/WelcomeSection";
import DashboardMetrics from "@/components/member/DashboardMetrics";
import { DashboardCard } from "@/components/dashboard/DashboardCard";

const DashboardPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="dashboard"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className={`flex-1 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6 max-w-7xl mx-auto">
          <ToastContainer />
          
          <WelcomeSection />
          <DashboardMetrics />
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Guardian AI Dashboard</h2>
            <DashboardCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
