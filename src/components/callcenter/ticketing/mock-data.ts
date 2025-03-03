
import { Ticket, Message } from "./types";

// Mock data for tickets
export const mockTickets: Ticket[] = [
  { 
    id: 1, 
    clientId: 101,
    clientName: "María García", 
    subject: "Device not connecting to app", 
    status: "open", 
    priority: "high",
    created: "2023-05-23T14:30:00",
    lastUpdated: "2023-05-23T16:45:00",
    message: "My IceAlarm device is not connecting to the app. I've tried restarting both the device and my phone, but it's still not working.",
    category: "Technical Support"
  },
  { 
    id: 2, 
    clientId: 102,
    clientName: "Juan Rodríguez", 
    subject: "Billing question", 
    status: "pending", 
    priority: "medium",
    created: "2023-05-22T09:15:00",
    lastUpdated: "2023-05-22T11:20:00",
    message: "I have a question about my recent bill. There's a charge I don't recognize.",
    category: "Billing"
  },
  { 
    id: 3, 
    clientId: 103,
    clientName: "Laura Martínez", 
    subject: "New device setup assistance", 
    status: "closed", 
    priority: "low",
    created: "2023-05-20T13:45:00",
    lastUpdated: "2023-05-21T10:30:00",
    message: "I just received my new device and need help setting it up.",
    category: "Setup"
  },
  { 
    id: 4, 
    clientId: 104,
    clientName: "Carlos Sánchez", 
    subject: "App subscription renewal", 
    status: "open", 
    priority: "medium",
    created: "2023-05-23T08:20:00",
    lastUpdated: "2023-05-23T09:15:00",
    message: "I need to renew my app subscription but the payment is failing.",
    category: "Subscription"
  },
  { 
    id: 5, 
    clientId: 105,
    clientName: "Ana López", 
    subject: "Device battery issues", 
    status: "pending", 
    priority: "high",
    created: "2023-05-21T16:10:00",
    lastUpdated: "2023-05-22T14:30:00",
    message: "My device battery is draining very quickly, only lasting a few hours.",
    category: "Hardware"
  }
];

// Mock conversation messages
export const mockMessages: Message[] = [
  {
    id: 1,
    ticketId: 1,
    sender: "María García",
    isClient: true,
    message: "My IceAlarm device is not connecting to the app. I've tried restarting both the device and my phone, but it's still not working.",
    timestamp: "2023-05-23T14:30:00",
    content: "My IceAlarm device is not connecting to the app. I've tried restarting both the device and my phone, but it's still not working.",
    sentBy: "María García",
    sentAt: "2023-05-23T14:30:00",
    isInternal: false
  },
  {
    id: 2,
    ticketId: 1,
    sender: "Support Agent",
    isClient: false,
    message: "I'm sorry to hear about the connection issues. Let me help you troubleshoot. What model of IceAlarm are you using?",
    timestamp: "2023-05-23T15:15:00",
    content: "I'm sorry to hear about the connection issues. Let me help you troubleshoot. What model of IceAlarm are you using?",
    sentBy: "Support Agent",
    sentAt: "2023-05-23T15:15:00",
    isInternal: false
  },
  {
    id: 3,
    ticketId: 1,
    sender: "María García",
    isClient: true,
    message: "I'm using the IceAlarm Pro that I purchased last month.",
    timestamp: "2023-05-23T15:45:00",
    content: "I'm using the IceAlarm Pro that I purchased last month.",
    sentBy: "María García",
    sentAt: "2023-05-23T15:45:00",
    isInternal: false
  },
  {
    id: 4,
    ticketId: 1,
    sender: "Support Agent",
    isClient: false,
    message: "Thank you for that information. For the IceAlarm Pro, please try the following steps: 1) Press and hold the reset button for 10 seconds, 2) Wait for the LED to flash blue, 3) Open the app and go to 'Add Device' instead of trying to connect to your existing device. Let me know if this resolves the issue.",
    timestamp: "2023-05-23T16:30:00",
    content: "Thank you for that information. For the IceAlarm Pro, please try the following steps: 1) Press and hold the reset button for 10 seconds, 2) Wait for the LED to flash blue, 3) Open the app and go to 'Add Device' instead of trying to connect to your existing device. Let me know if this resolves the issue.",
    sentBy: "Support Agent",
    sentAt: "2023-05-23T16:30:00",
    isInternal: false
  }
];
