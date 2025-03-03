
import React from 'react';
import { MessageCircle, Activity, Pill, Bell } from "lucide-react";
import { NotificationType } from './types';

export const getNotificationIcon = (type: NotificationType['type']) => {
  switch (type) {
    case 'message':
      return <MessageCircle className="h-4 w-4 text-blue-500" />;
    case 'glucose':
      return <Activity className="h-4 w-4 text-amber-500" />;
    case 'medication':
      return <Pill className="h-4 w-4 text-green-500" />;
    default:
      return <Bell className="h-4 w-4 text-gray-500" />;
  }
};

export const formatTime = (date: Date, language: string) => {
  const now = new Date();
  const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffMinutes < 60) {
    return `${diffMinutes} ${language === 'en' ? 'min ago' : 'min atrás'}`;
  } else if (diffMinutes < 60 * 24) {
    const hours = Math.floor(diffMinutes / 60);
    return `${hours} ${language === 'en' ? 'hours ago' : 'horas atrás'}`;
  } else {
    const days = Math.floor(diffMinutes / (60 * 24));
    return `${days} ${language === 'en' ? 'days ago' : 'días atrás'}`;
  }
};

export const getMockNotifications = (): NotificationType[] => {
  return [
    {
      id: '1',
      type: "message",
      title: 'New message from Call Center',
      message: 'Please confirm your appointment for tomorrow at 3:00 PM.',
      time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false
    },
    {
      id: '2',
      type: "glucose",
      title: 'Glucose Level Alert',
      message: 'Your glucose reading is 180 mg/dL. This is above your target range.',
      time: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      read: false
    },
    {
      id: '3',
      type: "medication",
      title: 'Medication Reminder',
      message: 'Time to take your evening dose of Metformin.',
      time: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
      read: true
    },
    {
      id: '4',
      type: "system",
      title: 'Device Update Available',
      message: 'A firmware update is available for your SOS Pendant. Please sync your device.',
      time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true
    }
  ];
};
