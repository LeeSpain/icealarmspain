
// Types for call center statistics data
export interface DailyCallData {
  name: string;
  calls: number;
}

export interface TicketResolutionData {
  name: string;
  value: number;
  color: string;
}

export interface ResponseTimeData {
  name: string;
  value: number;
}

export interface WeeklyMetricsData {
  totalCalls: number;
  avgDuration: string;
  resolvedFirstContact: string;
  customerSatisfaction: string;
}

export interface CallStatsData {
  dailyCalls: {
    labels: string[];
    data: number[];
  };
  ticketResolution: TicketResolutionData[];
  responseTime: ResponseTimeData[];
  weeklyMetrics: WeeklyMetricsData;
}
