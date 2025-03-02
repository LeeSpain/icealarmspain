
import React from "react";
import { Card } from "@/components/ui/card";
import { UserHeader } from "./UserHeader";
import { MetricsGrid } from "./MetricsGrid";
import { AIGuardianInteraction } from "./AIGuardianInteraction";
import { MedicationAlert } from "./MedicationAlert";
import { ActionButtons } from "./ActionButtons";

export const DashboardCard: React.FC = () => {
  return (
    <Card className="relative shadow-2xl overflow-hidden border-0 bg-white/90 backdrop-blur-md animate-blur-in rounded-2xl">
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ice-400 via-ice-500 to-guardian-500"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-ice-300/10 rounded-full"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-guardian-300/10 rounded-full"></div>
      
      {/* Added subtle grid pattern for texture */}
      <div className="absolute inset-0 opacity-5" 
           style={{
             backgroundImage: "radial-gradient(#3333 1px, transparent 1px)", 
             backgroundSize: "20px 20px"
           }}></div>

      <div className="p-6 md:p-8 lg:p-10 relative z-10">
        <UserHeader />
        <MetricsGrid />
        <AIGuardianInteraction />
        <MedicationAlert />
        <ActionButtons />
      </div>
    </Card>
  );
};
