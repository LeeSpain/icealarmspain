
import React from "react";
import { AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { Ticket } from "../../ticketing/types";

interface PendingAlertsProps {
  pendingTickets: Ticket[];
}

const PendingAlerts: React.FC<PendingAlertsProps> = ({ pendingTickets }) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          Pending Alerts
        </CardTitle>
        <CardDescription>
          Tickets requiring immediate attention
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingTickets.slice(0, 3).map(ticket => (
            <div key={ticket.id} className="border-l-4 border-amber-500 bg-amber-50 p-4 rounded-md">
              <div className="flex justify-between">
                <h3 className="font-medium">{ticket.subject}</h3>
                <Badge variant={ticket.priority === 'high' ? 'destructive' : 'outline'}>
                  {ticket.priority}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Client: {ticket.clientName}
              </p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-muted-foreground">
                  Created: {ticket.created}
                </span>
                <Button size="sm">
                  View Details
                </Button>
              </div>
            </div>
          ))}
          
          {pendingTickets.length === 0 && (
            <div className="text-center py-6">
              <CheckCircle2 className="mx-auto h-12 w-12 text-green-200" />
              <h3 className="mt-2 font-medium">All clear!</h3>
              <p className="text-sm text-muted-foreground">
                No pending alerts at this time
              </p>
            </div>
          )}
          
          {pendingTickets.length > 3 && (
            <Button variant="outline" className="w-full">
              View All {pendingTickets.length} Tickets
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PendingAlerts;
