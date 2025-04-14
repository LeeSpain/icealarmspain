
import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardContent from "./DashboardContent";
import DashboardFooter from "./DashboardFooter";

interface DashboardPreviewComponentProps {
  language: string;
}

const DashboardPreviewComponent: React.FC<DashboardPreviewComponentProps> = ({ language }) => {
  return (
    <div className="relative mx-auto rounded-xl overflow-hidden bg-white transition-all duration-300">
      <DashboardHeader language={language} />
      <DashboardContent language={language} />
      <DashboardFooter language={language} />
    </div>
  );
};

export default DashboardPreviewComponent;
