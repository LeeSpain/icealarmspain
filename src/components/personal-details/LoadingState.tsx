
import React from "react";
import MemberSidebar from "@/components/member/MemberSidebar";

interface LoadingStateProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  language: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  sidebarCollapsed, 
  setSidebarCollapsed, 
  language 
}) => {
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="onboarding"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ice-600 mb-4"></div>
          <p className="text-ice-700">
            {language === 'en' ? 'Loading your personal details...' : 'Cargando sus datos personales...'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
