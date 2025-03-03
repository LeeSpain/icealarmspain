
export type NotificationType = {
  id: string;
  type: "message" | "glucose" | "medication" | "system";
  title: string;
  message: string;
  time: Date;
  read: boolean;
};

export const notificationTypes = ["message", "glucose", "medication", "system"] as const;
