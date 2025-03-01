
import { Notification } from "./NotificationTypes";

// Mock data for notifications
export const getMockNotifications = (): Notification[] => {
  return [
    {
      id: '1',
      type: 'sos',
      clientId: 1,
      clientName: 'Maria González',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      message: 'SOS button activated! Immediate assistance required.',
      read: false
    },
    {
      id: '2',
      type: 'high-glucose',
      clientId: 2,
      clientName: 'Juan Martínez',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      message: 'Glucose level at 250 mg/dL (High). Last reading was 180 mg/dL.',
      read: false
    },
    {
      id: '3',
      type: 'device-offline',
      clientId: 3,
      clientName: 'Elena Navarro',
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      message: 'Medical dispenser went offline. Last online 45 minutes ago.',
      read: false
    },
    {
      id: '4',
      type: 'high-glucose',
      clientId: 2,
      clientName: 'Juan Martínez',
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      message: 'Glucose level at 200 mg/dL (Above normal). Monitor required.',
      read: true
    }
  ];
};
