
import React from "react";
import { MessageSquare, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const AssistanceFooter: React.FC = () => {
  return (
    <div className="flex justify-between items-center p-6 bg-blue-50 rounded-lg border border-blue-200">
      <div>
        <h3 className="font-medium">Need assistance?</h3>
        <p className="text-sm text-muted-foreground">Contact your supervisor for help or access additional resources</p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="sm">
          <MessageSquare className="mr-2 h-4 w-4" />
          Chat
        </Button>
        <Button size="sm">
          <Users className="mr-2 h-4 w-4" />
          Resources
        </Button>
      </div>
    </div>
  );
};

export default AssistanceFooter;
