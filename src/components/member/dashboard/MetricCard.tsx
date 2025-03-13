
import React from "react";
import { Activity, AlertTriangle, Bell, Check, ArrowUp, ArrowDown } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  status?: "normal" | "warning" | "alert" | "success";
  description?: string;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon, 
  status = "normal",
  description,
  trend,
  trendDirection = "neutral"
}) => {
  const statusColors = {
    normal: "bg-green-50 text-green-600",
    warning: "bg-amber-50 text-amber-600",
    alert: "bg-red-50 text-red-600",
    success: "bg-green-50 text-green-600"
  };
  
  return (
    <Card>
      <div className="p-5">
        <div className="flex justify-between items-center pb-2">
          <div className="text-sm font-medium text-gray-700">{title}</div>
          <div className={`p-2 rounded-full ${status === 'normal' || status === 'success' ? 'bg-ice-50 text-ice-600' : status === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'}`}>
            {icon}
          </div>
        </div>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <div className={`mt-2 text-xs ${statusColors[status]}`}>
            {status === "normal" || status === "success" ? <Check size={12} className="inline mr-1" /> : null}
            {status === "warning" || status === "alert" ? <AlertTriangle size={12} className="inline mr-1" /> : null}
            <span>{description}</span>
          </div>
        )}
        {trend && (
          <div className={`mt-2 text-xs inline-flex items-center ${trendDirection === "up" ? "text-green-600" : trendDirection === "down" ? "text-red-600" : "text-gray-600"}`}>
            {trendDirection === "up" && <ArrowUp size={12} className="mr-1" />}
            {trendDirection === "down" && <ArrowDown size={12} className="mr-1" />}
            <span>{trend}</span>
          </div>
        )}
      </div>
    </Card>
  );
};
