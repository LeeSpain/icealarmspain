
import React from "react";
import { Phone, Clock, TicketIcon, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface StatsCardsProps {
  totalCalls: number;
  avgResponseTime: number;
  pendingTickets: number;
  criticalTickets: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({
  totalCalls,
  avgResponseTime,
  pendingTickets,
  criticalTickets,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Calls This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-blue-500 mr-2" />
            <div className="text-2xl font-bold">{totalCalls}</div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            +12% from last week
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-amber-500 mr-2" />
            <div className="text-2xl font-bold">{avgResponseTime.toFixed(1)}m</div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            -2.5m from target
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <TicketIcon className="h-5 w-5 text-purple-500 mr-2" />
            <div className="text-2xl font-bold">{pendingTickets}</div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {criticalTickets} high priority
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
            <div className="text-2xl font-bold">92%</div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            +5% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
