
import React from "react";
import WelcomeCard from "./WelcomeCard";
import HealthMetricsGrid from "./HealthMetricsGrid";
import StatusCards from "./StatusCards";

interface DashboardContentProps {
  language: string;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ language }) => {
  return (
    <div className="bg-white p-6" style={{ height: '450px' }}>
      <WelcomeCard language={language} />
      <HealthMetricsGrid language={language} />
      <StatusCards language={language} />
    </div>
  );
};

export default DashboardContent;
