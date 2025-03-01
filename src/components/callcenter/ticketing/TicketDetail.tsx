
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, UserCircle, Calendar, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";

import { Ticket, Message } from "./types";
import { formatDate, getStatusBadge, getPriorityBadge } from "./utils";

interface TicketDetailProps {
  ticket: Ticket;
  messages: Message[];
  onCloseTicket: (ticketId: number) => void;
  onViewClient: (clientId: number) => void;
}

const TicketDetail: React.FC<TicketDetailProps> = ({
  ticket,
  messages,
  onCloseTicket,
  onViewClient
}) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <MessageCircle className="h-5 w-5" />
              Ticket #{ticket.id}: {ticket.subject}
            </CardTitle>
            <CardDescription className="mt-1">
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <UserCircle className="h-4 w-4" />
                  <span>{ticket.clientName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(ticket.created)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className={getStatusBadge(ticket.status)}>
                    {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className={getPriorityBadge(ticket.priority)}>
                    {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                  </span>
                </div>
              </div>
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onCloseTicket(ticket.id)}
              disabled={ticket.status === 'closed'}
            >
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Close Ticket
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onViewClient(ticket.clientId)}
            >
              <UserCircle className="h-4 w-4 mr-1" />
              View Client
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-auto space-y-4 p-6">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.isClient ? 'justify-start' : 'justify-end'}`}
          >
            <div 
              className={`max-w-[70%] rounded-lg p-3 
                ${message.isClient 
                  ? 'bg-muted text-foreground' 
                  : 'bg-primary text-primary-foreground'}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{message.sender}</span>
                <span className="text-xs opacity-70">
                  {formatDate(message.timestamp)}
                </span>
              </div>
              <p>{message.message}</p>
            </div>
          </div>
        ))}
      </CardContent>
      
      <CardFooter className="border-t p-4">
        <div className="flex gap-2 w-full">
          <Input 
            placeholder="Type your message..." 
            className="flex-grow"
          />
          <Button 
            onClick={() => {
              toast.success("Message sent successfully");
            }}
          >
            Send
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TicketDetail;
