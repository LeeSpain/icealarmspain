
import React from "react";
import { Phone, Clock, TicketIcon, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="grid grid-cols-2 gap-4 h-full">
      <Card className="border-l-4 border-blue-500 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center mb-2">
            <Phone className="h-5 w-5 text-blue-500 mr-2" />
            <h3 className="text-sm font-medium text-blue-600">Total Calls</h3>
          </div>
          <div className="text-2xl font-bold">{totalCalls}</div>
          <p className="text-xs text-muted-foreground mt-1">
            +12% from last week
          </p>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-amber-500 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center mb-2">
            <Clock className="h-5 w-5 text-amber-500 mr-2" />
            <h3 className="text-sm font-medium text-amber-600">Response Time</h3>
          </div>
          <div className="text-2xl font-bold">{avgResponseTime.toFixed(1)}m</div>
          <p className="text-xs text-muted-foreground mt-1">
            -2.5m from target
          </p>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-purple-500 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center mb-2">
            <TicketIcon className="h-5 w-5 text-purple-500 mr-2" />
            <h3 className="text-sm font-medium text-purple-600">Open Tickets</h3>
          </div>
          <div className="text-2xl font-bold">{pendingTickets}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {criticalTickets} high priority
          </p>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-green-500 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center mb-2">
            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
            <h3 className="text-sm font-medium text-green-600">Satisfaction</h3>
          </div>
          <div className="text-2xl font-bold">92%</div>
          <p className="text-xs text-muted-foreground mt-1">
            +5% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
