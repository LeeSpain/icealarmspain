
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, TicketIcon } from "lucide-react";

interface NoTicketSelectedProps {
  onCreateTicket: () => void;
}

const NoTicketSelected: React.FC<NoTicketSelectedProps> = ({ onCreateTicket }) => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center p-12 bg-muted rounded-lg">
        <TicketIcon className="h-16 w-16 mb-4 mx-auto text-muted-foreground" />
        <h3 className="text-xl font-medium mb-2">No Ticket Selected</h3>
        <p className="text-muted-foreground mb-4">
          Select a ticket from the list to view its details and conversation
        </p>
        <Button onClick={onCreateTicket}>
          <Plus className="h-4 w-4 mr-1" /> Create New Ticket
        </Button>
      </div>
    </div>
  );
};

export default NoTicketSelected;
