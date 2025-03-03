
import React from "react";
import { Phone, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User } from "@/context/AuthContext";

interface WelcomeCardProps {
  user: User | null;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ user }) => {
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(currentDate);

  return (
    <Card className="border-l-4 border-blue-500">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Welcome back, {user?.name || 'Agent'}</h2>
            <p className="text-muted-foreground">{formattedDate}</p>
            <div className="flex items-center mt-2">
              <Badge className="bg-green-100 text-green-800 mr-2">Online</Badge>
              <span className="text-sm text-muted-foreground">Agent ID: {user?.id || 'AG-324'}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Phone className="mr-2 h-4 w-4" />
              Set Status
            </Button>
            <Button size="sm" variant="outline">
              <Clock className="mr-2 h-4 w-4" />
              View Schedule
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
