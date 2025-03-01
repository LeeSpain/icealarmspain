
import React from "react";
import CallVolumeChart from "./CallVolumeChart";
import TicketResolutionChart from "./TicketResolutionChart";
import ResponseTimeChart from "./ResponseTimeChart";
import WeeklyMetricsSummary from "./WeeklyMetricsSummary";
import { mockCallData } from "./mock-data";

const CallStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CallVolumeChart 
        labels={mockCallData.dailyCalls.labels} 
        data={mockCallData.dailyCalls.data} 
      />
      
      <TicketResolutionChart 
        data={mockCallData.ticketResolution} 
      />
      
      <ResponseTimeChart 
        data={mockCallData.responseTime} 
      />
      
      <WeeklyMetricsSummary 
        data={mockCallData.weeklyMetrics} 
      />
    </div>
  );
};

export default CallStats;
