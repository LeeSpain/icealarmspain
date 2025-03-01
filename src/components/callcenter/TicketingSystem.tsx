
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  TicketIcon, 
  MessageCircle, 
  UserCircle, 
  Calendar, 
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowUpDown,
  Filter,
  Plus
} from "lucide-react";
import { toast } from "react-toastify";

// Mock data for tickets
const mockTickets = [
  { 
    id: 1, 
    clientId: 101,
    clientName: "María García", 
    subject: "Device not connecting to app", 
    status: "open", 
    priority: "high",
    created: "2023-05-23T14:30:00",
    lastUpdated: "2023-05-23T16:45:00"
  },
  { 
    id: 2, 
    clientId: 102,
    clientName: "Juan Rodríguez", 
    subject: "Billing question", 
    status: "pending", 
    priority: "medium",
    created: "2023-05-22T09:15:00",
    lastUpdated: "2023-05-22T11:20:00"
  },
  { 
    id: 3, 
    clientId: 103,
    clientName: "Laura Martínez", 
    subject: "New device setup assistance", 
    status: "closed", 
    priority: "low",
    created: "2023-05-20T13:45:00",
    lastUpdated: "2023-05-21T10:30:00"
  },
  { 
    id: 4, 
    clientId: 104,
    clientName: "Carlos Sánchez", 
    subject: "App subscription renewal", 
    status: "open", 
    priority: "medium",
    created: "2023-05-23T08:20:00",
    lastUpdated: "2023-05-23T09:15:00"
  },
  { 
    id: 5, 
    clientId: 105,
    clientName: "Ana López", 
    subject: "Device battery issues", 
    status: "pending", 
    priority: "high",
    created: "2023-05-21T16:10:00",
    lastUpdated: "2023-05-22T14:30:00"
  }
];

// Mock conversation messages
const mockMessages = [
  {
    id: 1,
    ticketId: 1,
    sender: "María García",
    isClient: true,
    message: "My IceAlarm device is not connecting to the app. I've tried restarting both the device and my phone, but it's still not working.",
    timestamp: "2023-05-23T14:30:00"
  },
  {
    id: 2,
    ticketId: 1,
    sender: "Support Agent",
    isClient: false,
    message: "I'm sorry to hear about the connection issues. Let me help you troubleshoot. What model of IceAlarm are you using?",
    timestamp: "2023-05-23T15:15:00"
  },
  {
    id: 3,
    ticketId: 1,
    sender: "María García",
    isClient: true,
    message: "I'm using the IceAlarm Pro that I purchased last month.",
    timestamp: "2023-05-23T15:45:00"
  },
  {
    id: 4,
    ticketId: 1,
    sender: "Support Agent",
    isClient: false,
    message: "Thank you for that information. For the IceAlarm Pro, please try the following steps: 1) Press and hold the reset button for 10 seconds, 2) Wait for the LED to flash blue, 3) Open the app and go to 'Add Device' instead of trying to connect to your existing device. Let me know if this resolves the issue.",
    timestamp: "2023-05-23T16:30:00"
  }
];

interface TicketingSystemProps {
  onClientSelect: (clientId: number | null) => void;
}

const TicketingSystem: React.FC<TicketingSystemProps> = ({ onClientSelect }) => {
  const [tickets, setTickets] = useState(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
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
      status: "open",
      priority: newTicket.priority,
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
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Get status badge style
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'open':
        return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs";
      case 'pending':
        return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs";
      case 'closed':
        return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs";
      default:
        return "bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs";
    }
  };
  
  // Get priority badge style
  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'high':
        return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs";
      case 'medium':
        return "bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs";
      case 'low':
        return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs";
      default:
        return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs";
    }
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Tickets List Panel */}
      <div className="lg:col-span-1 h-full flex flex-col">
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl flex items-center gap-2">
                <TicketIcon className="h-5 w-5" />
                Support Tickets
              </CardTitle>
              <Button onClick={() => setIsCreateDialogOpen(true)} size="sm" className="h-8">
                <Plus className="h-4 w-4 mr-1" /> New Ticket
              </Button>
            </div>
            <CardDescription>
              Manage client support tickets
            </CardDescription>
            <div className="flex gap-2 mt-2">
              <div className="flex gap-1">
                <Button
                  variant={statusFilter === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(null)}
                  className="h-8 text-xs"
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === "open" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("open")}
                  className="h-8 text-xs"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                  Open
                </Button>
                <Button
                  variant={statusFilter === "pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("pending")}
                  className="h-8 text-xs"
                >
                  <AlertCircle className="h-3.5 w-3.5 mr-1" />
                  Pending
                </Button>
                <Button
                  variant={statusFilter === "closed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("closed")}
                  className="h-8 text-xs"
                >
                  <XCircle className="h-3.5 w-3.5 mr-1" />
                  Closed
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow 
                    key={ticket.id}
                    className={`cursor-pointer ${selectedTicket === ticket.id ? 'bg-muted' : ''}`}
                    onClick={() => {
                      setSelectedTicket(ticket.id);
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
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      {/* Ticket Details & Conversation Panel */}
      <div className="lg:col-span-2 h-full flex flex-col">
        {selectedTicket ? (
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <MessageCircle className="h-5 w-5" />
                    Ticket #{selectedTicket}: {ticketDetails?.subject}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1">
                        <UserCircle className="h-4 w-4" />
                        <span>{ticketDetails?.clientName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(ticketDetails?.created || '')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className={getStatusBadge(ticketDetails?.status || '')}>
                          {ticketDetails?.status.charAt(0).toUpperCase() + ticketDetails?.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className={getPriorityBadge(ticketDetails?.priority || '')}>
                          {ticketDetails?.priority.charAt(0).toUpperCase() + ticketDetails?.priority.slice(1)}
                        </span>
                      </div>
                    </div>
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const updatedTickets = tickets.map(ticket => {
                        if (ticket.id === selectedTicket) {
                          return { ...ticket, status: 'closed' };
                        }
                        return ticket;
                      });
                      setTickets(updatedTickets);
                      toast.success("Ticket closed successfully");
                    }}
                    disabled={ticketDetails?.status === 'closed'}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Close Ticket
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      onClientSelect(ticketDetails?.clientId || null);
                      setActiveSection('clients');
                    }}
                  >
                    <UserCircle className="h-4 w-4 mr-1" />
                    View Client
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-grow overflow-auto space-y-4 p-6">
              {ticketMessages.map((message) => (
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
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center p-12 bg-muted rounded-lg">
              <TicketIcon className="h-16 w-16 mb-4 mx-auto text-muted-foreground" />
              <h3 className="text-xl font-medium mb-2">No Ticket Selected</h3>
              <p className="text-muted-foreground mb-4">
                Select a ticket from the list to view its details and conversation
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-1" /> Create New Ticket
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Create Ticket Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Ticket</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new support ticket for a client
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input 
                id="clientName" 
                value={newTicket.clientName} 
                onChange={(e) => setNewTicket({...newTicket, clientName: e.target.value})}
                placeholder="Enter client name" 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input 
                id="subject" 
                value={newTicket.subject} 
                onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                placeholder="Brief description of the issue" 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <textarea 
                id="description" 
                value={newTicket.description} 
                onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Detailed description of the issue" 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <select 
                id="priority" 
                value={newTicket.priority} 
                onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateTicket}>Create Ticket</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TicketingSystem;
