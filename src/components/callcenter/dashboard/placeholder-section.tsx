
import React from 'react';
import { User, Bell, Activity, Users, Calendar, BookOpen, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PlaceholderSectionProps {
  title: string;
}

const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({ title }) => {
  // Determine icon and description based on section title
  let icon = <Bell className="h-6 w-6 text-ice-500" />;
  let description = "This section is under development";
  
  switch (title) {
    case "all-clients":
    case "clients-alerts":
    case "clients-history":
    case "clients-devices":
      icon = <Users className="h-8 w-8 text-ice-500" />;
      description = "Client management features will be available soon";
      break;
    case "stats-performance":
      icon = <Activity className="h-8 w-8 text-ice-500" />;
      description = "Detailed performance analytics coming soon";
      break;
    case "schedule":
      icon = <Calendar className="h-8 w-8 text-ice-500" />;
      description = "Agent scheduling features will be available soon";
      break;
    case "knowledge":
      icon = <BookOpen className="h-8 w-8 text-ice-500" />;
      description = "Knowledge base resources will be available soon";
      break;
    case "profile":
      icon = <User className="h-8 w-8 text-ice-500" />;
      description = "Agent profile management coming soon";
      break;
    case "notifications":
      icon = <Bell className="h-8 w-8 text-ice-500" />;
      description = "Notification center coming soon";
      break;
    case "settings":
      icon = <Settings className="h-8 w-8 text-ice-500" />;
      description = "Settings and preferences will be available soon";
      break;
  }
  
  // Format the title for display
  const formatTitle = (rawTitle: string) => {
    if (rawTitle.includes('-')) {
      // Handle hyphenated titles like 'clients-alerts'
      const parts = rawTitle.split('-');
      return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
    }
    return rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1);
  };
  
  return (
    <div className="h-full flex flex-col items-center justify-center p-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="flex flex-col items-center">
          <div className="rounded-full bg-ice-100 p-4 mb-4">{icon}</div>
          <CardTitle className="text-xl text-center">{formatTitle(title)}</CardTitle>
          <CardDescription className="text-center">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center pb-6">
          <div className="flex items-center justify-center bg-ice-50 rounded-lg p-6 w-full">
            <p className="text-sm text-ice-700">
              We're working on this feature and it will be available soon. Check back later!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaceholderSection;
