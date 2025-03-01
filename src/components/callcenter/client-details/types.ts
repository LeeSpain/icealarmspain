
// Define shared types for client details
export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  activeDevices: number;
  subscription: string;
  subscriptionEndDate: string;
  lastContact: string;
  notes: string;
}

export interface Device {
  id: number;
  clientId: number;
  model: string;
  serialNumber: string;
  activationDate: string;
  lastMaintenance: string;
  status: string;
  location: string;
  batteryStatus: string;
}

export interface Interaction {
  id: number;
  clientId: number;
  date: string;
  type: string;
  agent: string;
  description: string;
}
