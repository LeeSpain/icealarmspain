
import { useState } from "react";

export const useCallCenterDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedClient, setSelectedClient] = useState<number | null>(null);

  // Handle client selection from any component
  const handleClientSelect = (clientId: number | null) => {
    setSelectedClient(clientId);
    if (clientId) {
      setActiveSection("clients");
    }
  };

  return {
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    setSidebarCollapsed,
    selectedClient,
    handleClientSelect
  };
};
