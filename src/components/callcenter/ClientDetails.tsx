
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader 
} from "@/components/ui/card";
import { toast } from "react-toastify";

// Import refactored components
import { mockClients, mockDevices, mockInteractions } from "./client-details/mock-data";
import NoClientSelected from "./client-details/NoClientSelected";
import ClientDetailsHeader from "./client-details/ClientDetailsHeader";
import ClientDetailsTabs from "./client-details/ClientDetailsTabs";
import ClientDetailsTab from "./client-details/ClientDetailsTab";
import DevicesTab from "./client-details/DevicesTab";
import InteractionHistoryTab from "./client-details/InteractionHistoryTab";

interface ClientDetailsProps {
  selectedClientId: number | null;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ selectedClientId }) => {
  const [clients, setClients] = useState(mockClients);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  
  // Get selected client details
  const selectedClient = selectedClientId 
    ? clients.find(client => client.id === selectedClientId) 
    : clients[0];
    
  // Get devices for selected client
  const clientDevices = selectedClient 
    ? mockDevices.filter(device => device.clientId === selectedClient.id)
    : [];
    
  // Get interaction history for selected client
  const clientInteractions = selectedClient 
    ? mockInteractions.filter(interaction => interaction.clientId === selectedClient.id)
    : [];
    
  // Handle saving client details
  const handleSaveClientDetails = () => {
    setEditMode(false);
    toast.success("Client details updated successfully");
  };
  
  if (!selectedClient) {
    return <NoClientSelected />;
  }
  
  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Client Overview Card */}
      <Card>
        <CardHeader className="pb-3">
          <ClientDetailsHeader 
            client={selectedClient}
            editMode={editMode}
            setEditMode={setEditMode}
            onSave={handleSaveClientDetails}
          />
          
          <ClientDetailsTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            deviceCount={clientDevices.length}
          />
        </CardHeader>
        
        <CardContent>
          {activeTab === "details" && (
            <ClientDetailsTab 
              client={selectedClient} 
              editMode={editMode}
            />
          )}
          
          {activeTab === "devices" && (
            <DevicesTab devices={clientDevices} />
          )}
          
          {activeTab === "history" && (
            <InteractionHistoryTab interactions={clientInteractions} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDetails;
