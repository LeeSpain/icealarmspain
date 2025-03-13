
import React, { useState, useEffect } from "react";
import MemberSidebar from "@/components/member/MemberSidebar";
import MemberDashboard from "@/components/member/MemberDashboard";
import { useLocation, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { QuestionnaireProvider } from "@/components/questionnaire/QuestionnaireContext";
import QuestionnaireForm from "@/components/questionnaire/QuestionnaireForm";

const DashboardPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  console.log("Dashboard page rendering, path:", location.pathname);
  
  // Check if we're on the questionnaire path
  const isQuestionnairePage = location.pathname === '/dashboard/questionnaire';
  
  // Check if we're on the medical info path - redirect to personal details
  const isMedicalInfoPage = location.pathname === '/dashboard/health/info';
  
  // Check if there's a current user, otherwise prevent auto-creation
  const currentUser = localStorage.getItem('currentUser');
  
  // Force dev user role to member ONLY if no user exists
  useEffect(() => {
    // Check if recently logged out - don't auto-create user in that case
    const recentlyLoggedOut = sessionStorage.getItem('recentlyLoggedOut');
    
    if (recentlyLoggedOut) {
      console.log("Recently logged out, redirecting to login");
      sessionStorage.removeItem('recentlyLoggedOut');
      navigate('/login');
      return;
    }
    
    // Only create a dev user if there isn't one already
    if (!currentUser) {
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
    }
  }, [currentUser, navigate]);

  // Redirect if no auth or medical info to personal details
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  // Redirect medical info to personal details
  if (isMedicalInfoPage) {
    return <Navigate to="/dashboard/personal-details" />;
  }
  
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
