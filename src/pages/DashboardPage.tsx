
import React, { useState, useEffect } from "react";
import MemberSidebar from "@/components/member/MemberSidebar";
import MemberDashboard from "@/components/member/MemberDashboard";
import { useLocation } from "react-router-dom";
import { QuestionnaireProvider } from "@/components/questionnaire/QuestionnaireContext";
import QuestionnaireForm from "@/components/questionnaire/QuestionnaireForm";

const DashboardPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  
  console.log("Dashboard page rendering, path:", location.pathname);
  
  // Check if we're on the questionnaire path
  const isQuestionnairePage = location.pathname === '/dashboard/questionnaire';
  
  // Force dev user role to member
  useEffect(() => {
    const devUser = {
      uid: `dev-member-${Date.now()}`,
      id: `dev-member-${Date.now()}`,
      email: `member@example.com`,
      name: 'Elena Martinez',
      displayName: 'Elena Martinez',
      role: 'member',
      status: 'active',
      profileCompleted: true,
      language: 'en',
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('currentUser', JSON.stringify(devUser));
    localStorage.setItem('userRole', 'member');
    localStorage.setItem('forceDevMode', 'true');
  }, []);
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage={isQuestionnairePage ? "questionnaire" : "dashboard"}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-auto transition-all duration-300">
        <div className="p-4 lg:p-6 w-full max-w-7xl mx-auto">
          {isQuestionnairePage ? (
            <QuestionnaireProvider>
              <QuestionnaireForm />
            </QuestionnaireProvider>
          ) : (
            <MemberDashboard />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
