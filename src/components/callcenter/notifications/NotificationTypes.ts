
// Types for call center notifications
export type NotificationType = 'sos' | 'high-glucose' | 'device-offline';

export interface Notification {
  id: string;
  type: NotificationType;
  clientId: number;
  clientName: string;
  timestamp: Date;
  message: string;
  read: boolean;
}
