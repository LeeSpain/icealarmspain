
import React from 'react';
import { useCallCenterDashboard } from '@/hooks/useCallCenterDashboard';
import { User } from '@/context/auth/types';
import Sidebar from '@/components/callcenter/Sidebar';
import SectionRenderer from '@/components/callcenter/dashboard/SectionRenderer';
import Header from '@/components/callcenter/dashboard/Header';
import LoadingState from '@/components/callcenter/dashboard/LoadingState';

// Create a default export for this component
const CallCenterDashboard: React.FC = () => {
  const {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    setSidebarCollapsed,
    selectedClient,
    handleClientSelect
  } = useCallCenterDashboard();

  // Mock user for development
  const mockUser: User = {
    uid: '12345',
    id: '12345',
    email: 'agent@example.com',
    name: 'Call Center Agent',
    displayName: 'Call Center Agent',
    role: 'callcenter',
    status: 'active',
    profileCompleted: true,
    language: 'en',
    emailVerified: false,
    isAnonymous: false,
    providerData: [],
    refreshToken: '',
    photoURL: null
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        user={mockUser}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          user={mockUser}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <SectionRenderer
            activeSection={activeSection}
            selectedClient={selectedClient}
            handleClientSelect={handleClientSelect}
            setActiveSection={setActiveSection}
          />
        </main>
      </div>
    </div>
  );
};

export default CallCenterDashboard;
