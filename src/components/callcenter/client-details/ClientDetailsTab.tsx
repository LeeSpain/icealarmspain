
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Calendar, ShieldCheck, TicketIcon } from "lucide-react";
import { Client } from "./types";
import { formatDate } from "./utils";
import { toast } from "react-toastify";

interface ClientDetailsTabProps {
  client: Client;
  editMode: boolean;
}

const ClientDetailsTab: React.FC<ClientDetailsTabProps> = ({ client, editMode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Contact Information</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
              {editMode ? (
                <Input 
                  defaultValue={client.email}
                  className="h-8 max-w-xs"
                />
              ) : (
                <p>{client.email}</p>
              )}
            </div>
            <div className="flex items-start gap-2">
              <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
              {editMode ? (
                <Input 
                  defaultValue={client.phone}
                  className="h-8 max-w-xs"
                />
              ) : (
                <p>{client.phone}</p>
              )}
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
              {editMode ? (
                <Input 
                  defaultValue={client.address}
                  className="h-8 max-w-xs"
                />
              ) : (
                <p>{client.address}</p>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Account Information</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
              <p>Client since: {formatDate(client.joinDate)}</p>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 mt-1 text-muted-foreground" />
              <p>Subscription: {client.subscription}</p>
            </div>
            <div className="flex items-start gap-2">
              <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
              <p>Renewal Date: {formatDate(client.subscriptionEndDate)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Notes</h3>
          {editMode ? (
            <textarea 
              defaultValue={client.notes}
              className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          ) : (
            <p className="bg-muted p-3 rounded-md">{client.notes}</p>
          )}
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Quick Actions</h3>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toast.success("Call initiated")}
            >
              <Phone className="h-4 w-4 mr-1" />
              Call Client
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toast.success("Email draft opened")}
            >
              <Mail className="h-4 w-4 mr-1" />
              Email Client
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toast.success("New ticket created")}
            >
              <TicketIcon className="h-4 w-4 mr-1" />
              Create Ticket
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsTab;
