
import React from "react";
import { BackgroundEffects } from "./dashboard/BackgroundEffects";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { DashboardCard } from "./dashboard/DashboardCard";

const Dashboard: React.FC = () => {
  return (
    <section id="dashboard" className="py-20 overflow-hidden relative">
      <BackgroundEffects />
      
      <div className="container mx-auto px-4 md:px-6">
        <DashboardHeader />
        
        <div className="max-w-6xl mx-auto">
          <DashboardCard />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
