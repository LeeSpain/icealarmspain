
import React from "react";
import { Shield, Heart, Medal } from "lucide-react";

export const DashboardHeader: React.FC = () => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-down">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ice-400 to-ice-600 flex items-center justify-center shadow-xl">
          <Shield className="text-white h-8 w-8" />
        </div>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-ice-700 to-ice-900 bg-clip-text text-transparent">
        ICE Members Dashboard
      </h2>
      <p className="text-muted-foreground text-lg mb-6">
        Monitor health data in real-time and receive AI-driven insights for proactive care.
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-ice-100 text-ice-700 text-sm shadow-sm">
          <Heart className="h-3.5 w-3.5" /> Health Monitoring
        </span>
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-guardian-100 text-guardian-700 text-sm shadow-sm">
          <Shield className="h-3.5 w-3.5" /> Emergency Response
        </span>
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-ice-100 text-ice-700 text-sm shadow-sm">
          <Medal className="h-3.5 w-3.5" /> AI Assistance
        </span>
      </div>
    </div>
  );
};
