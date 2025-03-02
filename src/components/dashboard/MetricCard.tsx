
import React from "react";
import { Check, AlertTriangle } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  status?: "normal" | "warning" | "alert";
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  status = "normal",
  className 
}) => {
  const statusColors = {
    normal: "bg-green-50 text-green-600",
    warning: "bg-amber-50 text-amber-600",
    alert: "bg-red-50 text-red-600"
  };
  
  return (
    <div className={`bg-white/90 backdrop-blur-sm border border-ice-100 shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 p-4 ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm font-medium text-gray-700">{title}</div>
        <div className="text-ice-600 bg-ice-50 p-2 rounded-full">{icon}</div>
      </div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      {trend && (
        <div className={`mt-2 text-xs px-2 py-1 rounded-full self-start inline-flex items-center gap-1 ${statusColors[status]}`}>
          {status === "normal" && <Check size={12} />}
          {status === "warning" && <AlertTriangle size={12} />}
          {status === "alert" && <AlertTriangle size={12} />}
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
};
