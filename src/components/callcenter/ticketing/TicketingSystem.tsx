
import React, { useState } from "react";
import { toast } from "react-toastify";

import TicketsList from "./TicketsList";
import TicketDetail from "./TicketDetail";
import CreateTicketDialog from "./CreateTicketDialog";
import NoTicketSelected from "./NoTicketSelected";
import { mockTickets, mockMessages } from "./mock-data";
import { Ticket, NewTicketForm } from "./types";

interface TicketingSystemProps {
  onClientSelect: (clientId: number | null) => void;
}

const TicketingSystem: React.FC<TicketingSystemProps> = ({ onClientSelect }) => {
  const [tickets, setTickets] = useState(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newTicket, setNewTicket] = useState<NewTicketForm>({
    clientId: "",
    clientName: "",
    subject: "",
    description: "",
    priority: "medium"
  });
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  
  // Get the selected ticket details
  const ticketDetails = selectedTicket 
    ? tickets.find(ticket => ticket.id === selectedTicket) 
    : null;
  
  // Get messages for the selected ticket
  const ticketMessages = selectedTicket 
    ? mockMessages.filter(message => message.ticketId === selectedTicket)
    : [];
  
  // Apply filters to tickets
  const filteredTickets = tickets.filter(ticket => {
    if (statusFilter && ticket.status !== statusFilter) return false;
    if (priorityFilter && ticket.priority !== priorityFilter) return false;
    return true;
  });
  
  // Handle creating a new ticket
  const handleCreateTicket = () => {
    // Validate fields
    if (!newTicket.clientName || !newTicket.subject) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const newTicketObj = {
      id: tickets.length + 1,
      clientId: parseInt(newTicket.clientId) || tickets.length + 100,
      clientName: newTicket.clientName,
      subject: newTicket.subject,
      status: "open" as const,
      priority: newTicket.priority as "high" | "medium" | "low",
      created: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
    
    setTickets([...tickets, newTicketObj]);
    setIsCreateDialogOpen(false);
    toast.success("Ticket created successfully");
    
    // Reset form
    setNewTicket({
      clientId: "",
      clientName: "",
      subject: "",
      description: "",
      priority: "medium"
    });
  };

  // Handle closing a ticket
  const handleCloseTicket = (ticketId: number) => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return { ...ticket, status: 'closed' as const };
      }
      return ticket;
    });
    setTickets(updatedTickets);
    toast.success("Ticket closed successfully");
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Tickets List Panel */}
      <div className="lg:col-span-1 h-full flex flex-col">
        <TicketsList 
          tickets={filteredTickets}
          selectedTicketId={selectedTicket}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onTicketSelect={setSelectedTicket}
          onClientSelect={onClientSelect}
          onCreateTicket={() => setIsCreateDialogOpen(true)}
        />
      </div>
      
      {/* Ticket Details & Conversation Panel */}
      <div className="lg:col-span-2 h-full flex flex-col">
        {ticketDetails ? (
          <TicketDetail 
            ticket={ticketDetails}
            messages={ticketMessages}
            onCloseTicket={handleCloseTicket}
            onViewClient={(clientId) => onClientSelect(clientId)}
          />
        ) : (
          <NoTicketSelected 
            onCreateTicket={() => setIsCreateDialogOpen(true)} 
          />
        )}
      </div>
      
      {/* Create Ticket Dialog */}
      <CreateTicketDialog 
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        newTicket={newTicket}
        setNewTicket={setNewTicket}
        onCreateTicket={handleCreateTicket}
      />
    </div>
  );
};

export default TicketingSystem;
