
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
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-xs font-semibold flex items-center">
          <TicketIcon className="h-3 w-3 mr-1 text-purple-500" />
          High Priority
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => handleViewAll("tickets")}
          className="text-xs h-5 px-1"
        >
          <ArrowUpRight className="h-3 w-3" />
        </Button>
      </div>
      <div className="space-y-1">
        {tickets.map(ticket => (
          <div 
            key={ticket.id}
            className="p-2 bg-purple-50 rounded-md text-xs border-l-2 border-purple-500"
          >
            <div className="flex justify-between">
              <span className="font-medium line-clamp-1">{ticket.subject}</span>
              <Badge variant="outline" className="bg-red-100 text-red-800 text-[10px] py-0 px-1 h-4">
                {ticket.priority}
              </Badge>
            </div>
            <p className="mt-1 text-gray-600 text-xs line-clamp-1">Client: {ticket.clientName}</p>
            <div className="flex justify-end mt-1">
              <Button 
                size="sm" 
                variant="outline" 
                className="h-5 text-[10px] px-1"
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
