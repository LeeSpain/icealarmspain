
import { CallStatsData } from './types';

// Mock data for call center statistics
export const mockCallData: CallStatsData = {
  dailyCalls: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    data: [48, 62, 54, 57, 65, 30, 22],
  },
  ticketResolution: [
    { name: "Resolved", value: 65, color: "rgba(82, 196, 26, 0.6)" },
    { name: "Pending", value: 28, color: "rgba(250, 173, 20, 0.6)" },
    { name: "Escalated", value: 7, color: "rgba(245, 34, 45, 0.6)" }
  ],
  responseTime: [
    { name: "Week 1", value: 12 },
    { name: "Week 2", value: 8 },
    { name: "Week 3", value: 6 },
    { name: "Week 4", value: 5 }
  ],
  weeklyMetrics: {
    totalCalls: 338,
    avgDuration: "8.5 min",
    resolvedFirstContact: "78%",
    customerSatisfaction: "92%"
  }
};
