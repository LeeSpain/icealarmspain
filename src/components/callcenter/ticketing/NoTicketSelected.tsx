
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, TicketIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface NoTicketSelectedProps {
  onCreateTicket: () => void;
}

const NoTicketSelected: React.FC<NoTicketSelectedProps> = ({ onCreateTicket }) => {
  return (
    <Card className="h-full flex items-center justify-center">
      <CardContent className="text-center p-6">
        <TicketIcon className="h-16 w-16 mb-4 mx-auto text-muted-foreground" />
        <h3 className="text-xl font-medium mb-2">No Ticket Selected</h3>
        <p className="text-muted-foreground mb-4">
          Select a ticket from the list to view its details and conversation
        </p>
        <Button onClick={onCreateTicket}>
          <Plus className="h-4 w-4 mr-1" /> Create New Ticket
        </Button>
      </CardContent>
    </Card>
  );
};

export default NoTicketSelected;
