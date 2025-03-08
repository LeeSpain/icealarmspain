
import React from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, TicketIcon, CheckCircle2, AlertCircle, XCircle, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Ticket } from "./types";
import { getStatusBadge, getPriorityBadge } from "./utils";

interface TicketsListProps {
  tickets: Ticket[];
  selectedTicketId: number | null;
  statusFilter: string | null;
  setStatusFilter: (filter: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onTicketSelect: (ticketId: number) => void;
  onClientSelect: (clientId: number) => void;
  onCreateTicket: () => void;
}

const TicketsList: React.FC<TicketsListProps> = ({
  tickets,
  selectedTicketId,
  statusFilter,
  setStatusFilter,
  searchQuery,
  setSearchQuery,
  onTicketSelect,
  onClientSelect,
  onCreateTicket
}) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <TicketIcon className="h-5 w-5" />
            Support Tickets
          </CardTitle>
          <Button onClick={onCreateTicket} size="sm" className="h-8">
            <Plus className="h-4 w-4 mr-1" /> New Ticket
          </Button>
        </div>
        <CardDescription>
          Manage client support tickets
        </CardDescription>
        
        {/* Search Input */}
        <div className="relative mt-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by client or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          <Button
            variant={statusFilter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter(null)}
            className="h-7 text-xs"
          >
            All
          </Button>
          <Button
            variant={statusFilter === "open" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("open")}
            className="h-7 text-xs"
          >
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Open
          </Button>
          <Button
            variant={statusFilter === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("pending")}
            className="h-7 text-xs"
          >
            <AlertCircle className="h-3.5 w-3.5 mr-1" />
            Pending
          </Button>
          <Button
            variant={statusFilter === "closed" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("closed")}
            className="h-7 text-xs"
          >
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Closed
          </Button>
        </div>
      </CardHeader>
      <CardContent className="overflow-auto flex-grow p-0">
        <div className="overflow-auto h-full">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <TableRow 
                    key={ticket.id}
                    className={`cursor-pointer ${selectedTicketId === ticket.id ? 'bg-muted' : ''}`}
                    onClick={() => {
                      onTicketSelect(ticket.id);
                      onClientSelect(ticket.clientId);
                    }}
                  >
                    <TableCell className="font-medium">{ticket.clientName}</TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>
                      <span className={getStatusBadge(ticket.status)}>
                        {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={getPriorityBadge(ticket.priority)}>
                        {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                    No tickets match your search criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketsList;
