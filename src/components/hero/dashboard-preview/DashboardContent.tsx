
import React from "react";
import WelcomeCard from "./WelcomeCard";
import HealthMetricsGrid from "./HealthMetricsGrid";
import StatusCards from "./StatusCards";

interface DashboardContentProps {
  language: string;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ language }) => {
  return (
    <div className="bg-white p-6 overflow-y-auto" style={{ height: '450px' }}>
      <div className="space-y-6">
        <WelcomeCard language={language} />
        <HealthMetricsGrid language={language} />
        <StatusCards language={language} />
      </div>
    </div>
  );
};

export default DashboardContent;
