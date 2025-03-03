
import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

interface PerformanceMetricsProps {
  data: {
    callsPerDay: number;
    avgHandleTime: string;
    satisfactionScore: number;
    lastMonthCalls: number;
    resolvedTickets: number;
    firstCallResolution: string;
  };
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ data }) => {
  // Mock data for the chart
  const dailyCallsData = [
    { day: "Mon", calls: 38 },
    { day: "Tue", calls: 32 },
    { day: "Wed", calls: 30 },
    { day: "Thu", calls: 35 },
    { day: "Fri", calls: 28 },
    { day: "Sat", calls: 15 },
    { day: "Sun", calls: 8 },
  ];
  
  const ticketsData = [
    { day: "Mon", resolved: 8, escalated: 2 },
    { day: "Tue", resolved: 7, escalated: 1 },
    { day: "Wed", resolved: 6, escalated: 3 },
    { day: "Thu", resolved: 9, escalated: 2 },
    { day: "Fri", resolved: 5, escalated: 1 },
    { day: "Sat", resolved: 3, escalated: 0 },
    { day: "Sun", resolved: 2, escalated: 0 },
  ];
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Performance Metrics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Calls Per Day</div>
            <div className="text-2xl font-bold mt-1">{data.callsPerDay}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Avg. Handle Time</div>
            <div className="text-2xl font-bold mt-1">{data.avgHandleTime}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Satisfaction Score</div>
            <div className="text-2xl font-bold mt-1">{data.satisfactionScore}/5.0</div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="calls">
        <TabsList className="mb-4">
          <TabsTrigger value="calls">Calls</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calls">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyCallsData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="calls" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Last Month Calls</div>
                <div className="text-xl font-bold mt-1">{data.lastMonthCalls}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">First Call Resolution</div>
                <div className="text-xl font-bold mt-1">{data.firstCallResolution}</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="tickets">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ticketsData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="resolved" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="escalated" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Resolved Tickets</div>
                <div className="text-xl font-bold mt-1">{data.resolvedTickets}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Resolution Rate</div>
                <div className="text-xl font-bold mt-1">87%</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceMetrics;
