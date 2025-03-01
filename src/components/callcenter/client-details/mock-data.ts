
import { Client, Device, Interaction } from './types';

// Mock data for clients
export const mockClients: Client[] = [
  {
    id: 101,
    name: "María García",
    email: "maria.garcia@example.com",
    phone: "+34 612 345 678",
    address: "Calle Gran Vía 123, Madrid, 28013",
    joinDate: "2023-01-15",
    activeDevices: 2,
    subscription: "Premium",
    subscriptionEndDate: "2024-01-15",
    lastContact: "2023-05-23T14:30:00",
    notes: "Prefers communication via email. Has two devices, one at home and one at her summer house."
  },
  {
    id: 102,
    name: "Juan Rodríguez",
    email: "juan.rodriguez@example.com",
    phone: "+34 623 456 789",
    address: "Avenida Diagonal 456, Barcelona, 08036",
    joinDate: "2023-02-20",
    activeDevices: 1,
    subscription: "Standard",
    subscriptionEndDate: "2024-02-20",
    lastContact: "2023-05-22T09:15:00",
    notes: "Prefers phone calls over emails. Has one device installed at his elderly mother's home."
  },
  {
    id: 103,
    name: "Laura Martínez",
    email: "laura.martinez@example.com",
    phone: "+34 634 567 890",
    address: "Calle Sierpes 78, Sevilla, 41004",
    joinDate: "2023-03-10",
    activeDevices: 3,
    subscription: "Premium",
    subscriptionEndDate: "2024-03-10",
    lastContact: "2023-05-20T13:45:00",
    notes: "Multiple devices for family members. Has recommended our service to several friends."
  },
  {
    id: 104,
    name: "Carlos Sánchez",
    email: "carlos.sanchez@example.com",
    phone: "+34 645 678 901",
    address: "Plaza Mayor 34, Valencia, 46002",
    joinDate: "2023-04-05",
    activeDevices: 1,
    subscription: "Basic",
    subscriptionEndDate: "2024-04-05",
    lastContact: "2023-05-23T08:20:00",
    notes: "New customer, still learning how to use the system. May need additional support."
  },
  {
    id: 105,
    name: "Ana López",
    email: "ana.lopez@example.com",
    phone: "+34 656 789 012",
    address: "Calle Portales 21, Logroño, 26001",
    joinDate: "2023-05-01",
    activeDevices: 2,
    subscription: "Standard",
    subscriptionEndDate: "2024-05-01",
    lastContact: "2023-05-21T16:10:00",
    notes: "Has experienced technical issues with one of her devices. Replacement might be needed."
  }
];

// Mock data for client devices
export const mockDevices: Device[] = [
  {
    id: 201,
    clientId: 101,
    model: "IceAlarm Pro",
    serialNumber: "IAP12345678",
    activationDate: "2023-01-16",
    lastMaintenance: "2023-04-16",
    status: "active",
    location: "Main Residence",
    batteryStatus: "85%"
  },
  {
    id: 202,
    clientId: 101,
    model: "IceAlarm Pro",
    serialNumber: "IAP23456789",
    activationDate: "2023-02-05",
    lastMaintenance: "2023-04-16",
    status: "active",
    location: "Summer House",
    batteryStatus: "92%"
  },
  {
    id: 203,
    clientId: 102,
    model: "IceAlarm Standard",
    serialNumber: "IAS34567890",
    activationDate: "2023-02-21",
    lastMaintenance: "2023-04-10",
    status: "active",
    location: "Mother's Home",
    batteryStatus: "78%"
  },
  {
    id: 204,
    clientId: 103,
    model: "IceAlarm Pro",
    serialNumber: "IAP45678901",
    activationDate: "2023-03-11",
    lastMaintenance: "2023-05-01",
    status: "active",
    location: "Primary Residence",
    batteryStatus: "95%"
  },
  {
    id: 205,
    clientId: 103,
    model: "IceAlarm Standard",
    serialNumber: "IAS56789012",
    activationDate: "2023-03-12",
    lastMaintenance: "2023-05-01",
    status: "active",
    location: "Parents' Home",
    batteryStatus: "90%"
  },
  {
    id: 206,
    clientId: 103,
    model: "IceAlarm Basic",
    serialNumber: "IAB67890123",
    activationDate: "2023-03-13",
    lastMaintenance: "2023-05-01",
    status: "inactive",
    location: "Vacation Home",
    batteryStatus: "N/A"
  },
  {
    id: 207,
    clientId: 104,
    model: "IceAlarm Basic",
    serialNumber: "IAB78901234",
    activationDate: "2023-04-06",
    lastMaintenance: "N/A",
    status: "active",
    location: "Apartment",
    batteryStatus: "89%"
  },
  {
    id: 208,
    clientId: 105,
    model: "IceAlarm Standard",
    serialNumber: "IAS89012345",
    activationDate: "2023-05-02",
    lastMaintenance: "N/A",
    status: "active",
    location: "Home",
    batteryStatus: "87%"
  },
  {
    id: 209,
    clientId: 105,
    model: "IceAlarm Standard",
    serialNumber: "IAS90123456",
    activationDate: "2023-05-02",
    lastMaintenance: "N/A",
    status: "error",
    location: "Office",
    batteryStatus: "65%"
  }
];

// Mock interaction history
export const mockInteractions: Interaction[] = [
  {
    id: 301,
    clientId: 101,
    date: "2023-05-23T14:30:00",
    type: "ticket",
    agent: "Support Agent",
    description: "Client reported device connectivity issues. Created ticket #1."
  },
  {
    id: 302,
    clientId: 101,
    date: "2023-05-10T11:45:00",
    type: "call",
    agent: "Sales Agent",
    description: "Follow-up call about satisfaction with second device. Client is very happy with the product."
  },
  {
    id: 303,
    clientId: 101,
    date: "2023-04-16T09:30:00",
    type: "maintenance",
    agent: "Maintenance Team",
    description: "Routine maintenance performed on both devices. All systems functioning properly."
  },
  {
    id: 304,
    clientId: 102,
    date: "2023-05-22T09:15:00",
    type: "ticket",
    agent: "Support Agent",
    description: "Client had questions about billing. Created ticket #2."
  },
  {
    id: 305,
    clientId: 102,
    date: "2023-04-10T13:20:00",
    type: "maintenance",
    agent: "Maintenance Team",
    description: "Routine maintenance performed. Device firmware updated to latest version."
  },
  {
    id: 306,
    clientId: 103,
    date: "2023-05-20T13:45:00",
    type: "ticket",
    agent: "Support Agent",
    description: "Client requested assistance with new device setup. Created ticket #3."
  },
  {
    id: 307,
    clientId: 104,
    date: "2023-05-23T08:20:00",
    type: "ticket",
    agent: "Support Agent",
    description: "Client inquired about app subscription renewal. Created ticket #4."
  },
  {
    id: 308,
    clientId: 105,
    date: "2023-05-21T16:10:00",
    type: "ticket",
    agent: "Support Agent",
    description: "Client reported battery issues with one device. Created ticket #5."
  }
];
