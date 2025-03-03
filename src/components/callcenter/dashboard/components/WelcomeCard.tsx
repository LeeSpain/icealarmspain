
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, FileQuestion } from "lucide-react";

interface WelcomeCardProps {
  user: any; // Replace with proper user type
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ user }) => {
  return (
    <Card className="border-l-4 border-blue-500">
      <CardContent className="pt-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold">Welcome back, {user?.name || 'Agent'}!</h2>
            <p className="text-sm text-muted-foreground">Your daily overview is ready</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="h-8">
              <Phone className="h-4 w-4 mr-1" />
              New Call
            </Button>
            <Button size="sm" variant="outline" className="h-8">
              <Calendar className="h-4 w-4 mr-1" />
              Schedule
            </Button>
            <Button size="sm" variant="outline" className="h-8">
              <FileQuestion className="h-4 w-4 mr-1" />
              Help
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
