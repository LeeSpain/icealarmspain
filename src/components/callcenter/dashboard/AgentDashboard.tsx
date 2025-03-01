
import React from "react";
import {
  BarChart3,
  Phone,
  MessageSquare,
  Smartphone,
  TicketIcon,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Users
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockCallData } from "../stats/mock-data";

const AgentDashboard: React.FC = () => {
  // Mock data for the agent dashboard
  const dashboardMetrics = {
    totalCalls: "243",
    resolvedTickets: "187",
    openTickets: "14",
    averageHandlingTime: "4m 32s",
    responseRate: "98%",
    customerSatisfaction: "92%",
    callsByType: [
      { name: "Technical Support", value: 45 },
      { name: "Billing Questions", value: 25 },
      { name: "New Orders", value: 15 },
      { name: "General Inquiries", value: 15 },
    ],
    recentActivities: [
      { id: 1, type: "SOS Alert", clientName: "Hotel Barcelona", description: "SOS button activated in room 506", time: "5 mins ago", priority: "high" },
      { id: 2, type: "Ticket", clientName: "Residencia Madrid", description: "Device offline in common area", time: "32 mins ago", priority: "medium" },
      { id: 3, type: "Call", clientName: "Apartamentos Valencia", description: "Billing inquiry resolved", time: "1 hour ago", priority: "low" },
      { id: 4, type: "Alert", clientName: "Hotel Barcelona", description: "Multiple devices showing connection issues", time: "3 hours ago", priority: "medium" },
      { id: 5, type: "Ticket", clientName: "Residencia Sevilla", description: "New installation request processed", time: "Yesterday", priority: "low" },
    ]
  };

  // Function to render the priority icon
  const renderPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "medium":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "low":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  // Function to render the activity type icon
  const renderActivityIcon = (type: string) => {
    switch (type) {
      case "SOS Alert":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "Ticket":
        return <TicketIcon className="h-4 w-4 text-primary" />;
      case "Call":
        return <Phone className="h-4 w-4 text-primary" />;
      case "Alert":
        return <Bell className="h-4 w-4 text-amber-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardMetrics.totalCalls}</div>
            <p className="text-xs text-muted-foreground">+12.3% from last week</p>
            <Progress className="mt-3" value={78} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resolved Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardMetrics.resolvedTickets}</div>
            <p className="text-xs text-muted-foreground">+8.1% from last week</p>
            <Progress className="mt-3" value={84} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardMetrics.openTickets}</div>
            <p className="text-xs text-muted-foreground">-3.4% from last week</p>
            <Progress className="mt-3" value={34} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Handling Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardMetrics.averageHandlingTime}</div>
            <p className="text-xs text-muted-foreground">-0.5m from last week</p>
            <Progress className="mt-3" value={65} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Call Distribution</CardTitle>
            <CardDescription>Breakdown by call category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <div className="w-full max-w-md">
                {dashboardMetrics.callsByType.map((category, i) => (
                  <div key={category.name} className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-sm font-medium">{category.value}%</span>
                    </div>
                    <Progress value={category.value} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest client interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80">
              <div className="space-y-4">
                {dashboardMetrics.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start pb-4 border-b last:border-0">
                    <div className="mr-4 mt-1">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {renderActivityIcon(activity.type)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">
                          {activity.clientName}
                        </p>
                        <div className="flex items-center">
                          {renderPriorityIcon(activity.priority)}
                          <span className="text-xs text-muted-foreground ml-1">
                            {activity.time}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentDashboard;
