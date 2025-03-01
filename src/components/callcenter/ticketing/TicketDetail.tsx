
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, UserCircle, Calendar, CheckCircle2, Lock } from "lucide-react";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";

import { Ticket, Message, InternalNote } from "./types";
import { formatDate, getStatusBadge, getPriorityBadge } from "./utils";

interface TicketDetailProps {
  ticket: Ticket;
  messages: Message[];
  internalNotes: InternalNote[];
  onCloseTicket: (ticketId: number) => void;
  onViewClient: (clientId: number) => void;
  onAddInternalNote: (ticketId: number, note: string) => void;
}

const TicketDetail: React.FC<TicketDetailProps> = ({
  ticket,
  messages,
  internalNotes,
  onCloseTicket,
  onViewClient,
  onAddInternalNote
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [newInternalNote, setNewInternalNote] = useState("");

  const handleAddInternalNote = () => {
    if (!newInternalNote.trim()) {
      toast.error("Please enter a note before submitting");
      return;
    }
    
    onAddInternalNote(ticket.id, newInternalNote);
    setNewInternalNote("");
  };

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
      
      <Tabs defaultValue="conversation" className="flex-grow flex flex-col">
        <TabsList className="mx-6 mb-2">
          <TabsTrigger value="conversation">Conversation</TabsTrigger>
          <TabsTrigger value="internal-notes" className="flex items-center gap-1">
            <Lock className="h-3 w-3" />
            Internal Notes
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="conversation" className="flex-grow flex flex-col mx-0 mt-0 p-0">
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
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button 
                onClick={() => {
                  if (newMessage.trim()) {
                    toast.success("Message sent successfully");
                    setNewMessage("");
                  } else {
                    toast.error("Please enter a message");
                  }
                }}
              >
                Send
              </Button>
            </div>
          </CardFooter>
        </TabsContent>
        
        <TabsContent value="internal-notes" className="flex-grow flex flex-col mx-0 mt-0 p-0">
          <CardContent className="flex-grow overflow-auto space-y-4 p-6">
            {internalNotes && internalNotes.length > 0 ? (
              internalNotes.map((note) => (
                <div key={note.id} className="border rounded-md p-4 bg-muted/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{note.agentName}</span>
                    <span className="text-xs text-muted-foreground">{formatDate(note.timestamp)}</span>
                  </div>
                  <p className="text-sm">{note.content}</p>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Lock className="h-8 w-8 mb-2" />
                <p>No internal notes yet.</p>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="border-t p-4">
            <div className="flex flex-col w-full gap-3">
              <Textarea 
                placeholder="Add internal note (visible only to support team)..." 
                className="w-full"
                value={newInternalNote}
                onChange={(e) => setNewInternalNote(e.target.value)}
              />
              <Button 
                className="self-end"
                onClick={handleAddInternalNote}
              >
                <Lock className="h-4 w-4 mr-1" />
                Add Internal Note
              </Button>
            </div>
          </CardFooter>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default TicketDetail;
