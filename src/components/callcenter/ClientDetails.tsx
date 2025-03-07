
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader 
} from "@/components/ui/card";
import { toast } from "react-toastify";
import { Search, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Import refactored components
import { mockClients, mockDevices, mockInteractions } from "./client-details/mock-data";
import NoClientSelected from "./client-details/NoClientSelected";
import ClientDetailsHeader from "./client-details/ClientDetailsHeader";
import ClientDetailsTabs from "./client-details/ClientDetailsTabs";
import ClientDetailsTab from "./client-details/ClientDetailsTab";
import DevicesTab from "./client-details/DevicesTab";
import InteractionHistoryTab from "./client-details/InteractionHistoryTab";
import HealthDataTab from "./client-details/HealthDataTab";

interface ClientDetailsProps {
  selectedClientId: number | null;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ selectedClientId }) => {
  const [clients, setClients] = useState(mockClients);
  const [filteredClients, setFilteredClients] = useState(mockClients);
  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [showAllClients, setShowAllClients] = useState(!selectedClientId);
  const [runningSystemCheck, setRunningSystemCheck] = useState(false);
  
  // Get selected client details
  const selectedClient = selectedClientId 
    ? clients.find(client => client.id === selectedClientId) 
    : null;
    
  // Get devices for selected client
  const clientDevices = selectedClient 
    ? mockDevices.filter(device => device.clientId === selectedClient.id)
    : [];
    
  // Get interaction history for selected client
  const clientInteractions = selectedClient 
    ? mockInteractions.filter(interaction => interaction.clientId === selectedClient.id)
    : [];
    
  // Handle selecting a client
  const handleSelectClient = (clientId: number) => {
    setShowAllClients(false);
    // We would normally update the URL or state in the parent component
    // but for this mock, we'll just use local state
    toast.info(`Viewing client #${clientId}`);
  };
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (!query) {
      setFilteredClients(clients);
      return;
    }
    
    const filtered = clients.filter(client => 
      client.name.toLowerCase().includes(query) || 
      client.email.toLowerCase().includes(query) ||
      client.phone.toLowerCase().includes(query)
    );
    
    setFilteredClients(filtered);
  };
  
  // Handle saving client details
  const handleSaveClientDetails = () => {
    setEditMode(false);
    toast.success("Client details updated successfully");
  };

  // Handle remote device update/reset
  const handleRemoteDeviceAction = (deviceId: number, action: string) => {
    toast.success(`Device ${deviceId}: ${action} action initiated`);
  };
  
  // Run system check for all client devices
  const handleSystemCheck = () => {
    setRunningSystemCheck(true);
    
    // Simulate system check
    setTimeout(() => {
      setRunningSystemCheck(false);
      toast.success("System check completed. All devices are functioning properly.");
    }, 2000);
  };
  
  // Show all clients view
  const handleShowAllClients = () => {
    setShowAllClients(true);
  };
  
  if (showAllClients) {
    return (
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">All Clients</h2>
              <div className="flex space-x-2">
                <Button 
                  onClick={handleSystemCheck} 
                  variant="outline" 
                  disabled={runningSystemCheck}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${runningSystemCheck ? 'animate-spin' : ''}`} />
                  {runningSystemCheck ? 'Running Check...' : 'Run System Check'}
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search clients by name, email or phone..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClients.length > 0 ? (
                filteredClients.map(client => (
                  <Card 
                    key={client.id} 
                    className="cursor-pointer hover:bg-ice-50 transition-colors"
                    onClick={() => handleSelectClient(client.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-ice-200 flex items-center justify-center text-ice-700 font-bold">
                          {client.name[0]}
                        </div>
                        <div>
                          <h3 className="font-medium">{client.name}</h3>
                          <p className="text-sm text-muted-foreground">{client.email}</p>
                          <p className="text-sm text-muted-foreground">{client.phone}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex justify-between text-sm">
                          <span>Status:</span>
                          <span className={`font-medium ${client.status === 'Active' ? 'text-green-600' : 'text-orange-600'}`}>
                            {client.status || 'Unknown'}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span>Devices:</span>
                          <span className="font-medium">
                            {mockDevices.filter(d => d.clientId === client.id).length}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">No clients found matching your search criteria.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!selectedClient) {
    return <NoClientSelected onShowAllClients={handleShowAllClients} />;
  }
  
  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Client Overview Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center mb-4">
            <Button variant="outline" size="sm" onClick={handleShowAllClients}>
              ← Back to All Clients
            </Button>
            <Button 
              onClick={handleSystemCheck} 
              variant="outline" 
              size="sm"
              disabled={runningSystemCheck}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${runningSystemCheck ? 'animate-spin' : ''}`} />
              {runningSystemCheck ? 'Running Check...' : 'Check Systems'}
            </Button>
          </div>
          
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
            showHealthTab={true}
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
            <DevicesTab 
              devices={clientDevices} 
              allowRemoteActions={true}
              onRemoteAction={handleRemoteDeviceAction}
            />
          )}
          
          {activeTab === "history" && (
            <InteractionHistoryTab interactions={clientInteractions} />
          )}

          {activeTab === "health" && (
            <HealthDataTab clientId={selectedClient.id} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDetails;
