
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart"; // Assume these are your chart components
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  TicketIcon,
  PhoneCall
} from "lucide-react";

// Mock data for call center statistics
const mockCallData = {
  dailyCalls: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Number of Calls",
        data: [48, 62, 54, 57, 65, 30, 22],
        backgroundColor: "rgba(24, 144, 255, 0.6)",
      }
    ]
  },
  ticketResolution: {
    labels: ["Resolved", "Pending", "Escalated"],
    datasets: [
      {
        label: "Ticket Status",
        data: [65, 28, 7],
        backgroundColor: [
          "rgba(82, 196, 26, 0.6)",
          "rgba(250, 173, 20, 0.6)",
          "rgba(245, 34, 45, 0.6)"
        ],
      }
    ]
  },
  responseTime: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Avg. Response Time (min)",
        data: [12, 8, 6, 5],
        borderColor: "rgba(24, 144, 255, 0.8)",
        backgroundColor: "rgba(24, 144, 255, 0.1)",
        tension: 0.3,
      }
    ]
  },
  weeklyMetrics: {
    totalCalls: 338,
    avgDuration: "8.5 min",
    resolvedFirstContact: "78%",
    customerSatisfaction: "92%"
  }
};

const CallStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Call Volume Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <PhoneCall className="h-5 w-5" />
            Weekly Call Volume
          </CardTitle>
          <CardDescription>
            Total calls per day over the past week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <BarChart
              data={mockCallData.dailyCalls}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Ticket Resolution Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <TicketIcon className="h-5 w-5" />
            Ticket Resolution Status
          </CardTitle>
          <CardDescription>
            Current status of support tickets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <PieChart
              data={mockCallData.ticketResolution}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Response Time Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Average Response Time
          </CardTitle>
          <CardDescription>
            Trend of average response time in minutes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <LineChart
              data={mockCallData.responseTime}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Weekly Metrics Summary */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Weekly Performance Metrics
          </CardTitle>
          <CardDescription>
            Summary of key performance indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-md p-4 text-center">
              <PhoneCall className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="text-xl font-bold">{mockCallData.weeklyMetrics.totalCalls}</h3>
              <p className="text-sm text-muted-foreground">Total Calls</p>
            </div>
            
            <div className="bg-muted rounded-md p-4 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-amber-500" />
              <h3 className="text-xl font-bold">{mockCallData.weeklyMetrics.avgDuration}</h3>
              <p className="text-sm text-muted-foreground">Avg. Call Duration</p>
            </div>
            
            <div className="bg-muted rounded-md p-4 text-center">
              <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <h3 className="text-xl font-bold">{mockCallData.weeklyMetrics.resolvedFirstContact}</h3>
              <p className="text-sm text-muted-foreground">First Contact Resolution</p>
            </div>
            
            <div className="bg-muted rounded-md p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <h3 className="text-xl font-bold">{mockCallData.weeklyMetrics.customerSatisfaction}</h3>
              <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-muted/50 rounded-md">
            <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Weekly Insights
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500" />
                <span>Call volume decreased by 5% compared to last week.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500" />
                <span>Average response time improved by 16%.</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 text-amber-500" />
                <span>Tuesday continues to be the highest volume day.</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CallStats;
