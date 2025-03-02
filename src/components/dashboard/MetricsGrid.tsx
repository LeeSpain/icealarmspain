
import React from "react";
import { Activity, Check, Calendar } from "lucide-react";
import { MetricCard } from "./MetricCard";

export const MetricsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <MetricCard
        title="Glucose Level"
        value="124 mg/dL"
        icon={<Activity size={20} />}
        trend="Stable"
        status="normal"
        className="animate-slide-up animate-delay-100"
      />
      <MetricCard
        title="SOS Pendant"
        value="Active"
        icon={<Check size={20} />}
        trend="Battery: 92%"
        status="normal"
        className="animate-slide-up animate-delay-200"
      />
      <MetricCard
        title="Last Medication"
        value="8:00 AM"
        icon={<Calendar size={20} />}
        trend="On Schedule"
        status="normal"
        className="animate-slide-up animate-delay-300"
      />
    </div>
  );
};
