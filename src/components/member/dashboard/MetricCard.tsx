
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  status?: "normal" | "warning" | "alert" | "success";
  description?: string;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  status = "normal",
  description,
  trend,
  trendDirection = "neutral",
  className,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "alert":
        return "text-red-600 bg-red-50";
      case "warning":
        return "text-yellow-600 bg-yellow-50";
      case "success":
        return "text-emerald-600 bg-emerald-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };
  
  const getTrendIcon = () => {
    switch (trendDirection) {
      case "up":
        return <TrendingUp className="h-3.5 w-3.5 text-emerald-600 ml-1" />;
      case "down":
        return <TrendingDown className="h-3.5 w-3.5 text-red-600 ml-1" />;
      default:
        return <Minus className="h-3.5 w-3.5 text-gray-400 ml-1" />;
    }
  };
  
  const getTrendColor = () => {
    switch (trendDirection) {
      case "up":
        return "text-emerald-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };
  
  return (
    <Card className={`overflow-hidden border shadow-sm ${className}`}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-gray-800">{title}</div>
          <div className={`p-1.5 rounded-md ${getStatusColor()}`}>{icon}</div>
        </div>
        
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-gray-900">{value}</span>
          {description && (
            <span className="text-xs text-gray-500 mt-1">{description}</span>
          )}
        </div>
        
        {trend && (
          <div className={`flex items-center mt-3 text-xs ${getTrendColor()}`}>
            <span>{trend}</span>
            {getTrendIcon()}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
