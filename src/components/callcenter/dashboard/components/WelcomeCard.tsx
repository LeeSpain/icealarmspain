
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, FileQuestion, Bell } from "lucide-react";

interface WelcomeCardProps {
  user: any; // Replace with proper user type
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ user }) => {
  // Extract first name for more personal greeting
  const firstName = user?.name?.split(' ')[0] || 
                   user?.displayName?.split(' ')[0] || 
                   user?.email?.split('@')[0] || 
                   'Agent';
  
  return (
    <Card className="border-l-4 border-blue-500 shadow-md h-full">
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome back, {firstName}!
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Your daily overview is ready
            </p>
          </div>
          
          <div className="mt-2 flex flex-wrap gap-2">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Phone className="h-4 w-4 mr-2" />
              New Call
            </Button>
            <Button size="sm" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
            <Button size="sm" variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Alerts
            </Button>
            <Button size="sm" variant="outline">
              <FileQuestion className="h-4 w-4 mr-2" />
              Help
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
