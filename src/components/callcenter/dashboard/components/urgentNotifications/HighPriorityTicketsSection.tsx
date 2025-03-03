
import React from "react";
import { TicketIcon, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Ticket } from "../../../ticketing/types";

interface HighPriorityTicketsSectionProps {
  tickets: Ticket[];
  handleViewAll: (section: string) => void;
}

const HighPriorityTicketsSection: React.FC<HighPriorityTicketsSectionProps> = ({ 
  tickets, 
  handleViewAll 
}) => {
  if (tickets.length === 0) return null;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold flex items-center">
          <TicketIcon className="h-4 w-4 mr-1 text-purple-500" />
          High Priority Tickets
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => handleViewAll("tickets")}
          className="text-xs h-6 px-2"
        >
          View all <ArrowUpRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
      <div className="space-y-2">
        {tickets.map(ticket => (
          <div 
            key={ticket.id}
            className="p-3 bg-purple-50 rounded-md text-sm border-l-2 border-purple-500"
          >
            <div className="flex justify-between">
              <span className="font-medium">{ticket.subject}</span>
              <Badge variant="outline" className="bg-red-100 text-red-800 text-xs">
                {ticket.priority}
              </Badge>
            </div>
            <p className="mt-1 text-gray-600">Client: {ticket.clientName}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">{ticket.created}</span>
              <Button 
                size="sm" 
                variant="outline" 
                className="h-6 text-xs"
                onClick={() => handleViewAll("tickets")}
              >
                Respond
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighPriorityTicketsSection;
