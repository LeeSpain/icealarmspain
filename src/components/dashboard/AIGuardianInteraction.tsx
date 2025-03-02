
import React from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AIGuardianInteraction: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-white to-ice-50 p-5 rounded-xl border border-ice-100 shadow-lg animate-slide-up animate-delay-400 mb-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ice-500 to-guardian-500 flex items-center justify-center text-white flex-shrink-0 shadow-md border border-white/50">
          <MessageSquare size={20} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between mb-1">
            <p className="font-semibold text-lg text-gray-800">AI Guardian</p>
            <p className="text-xs text-muted-foreground px-2 py-1 bg-white rounded-full shadow-sm">Just now</p>
          </div>
          <p className="text-sm mb-4 text-gray-600">
            Good morning, María. Your glucose levels are within normal range today. Remember to take your medication at 12:00 PM. Would you like me to remind you?
          </p>
          
          <div className="flex flex-wrap gap-2">
            <Button className="h-8 rounded-full bg-ice-600 hover:bg-ice-700 shadow-md">
              Yes, please
            </Button>
            <Button variant="outline" className="h-8 rounded-full border-ice-200 text-ice-700 hover:bg-ice-50 shadow-sm">
              No, thanks
            </Button>
            <Button variant="outline" className="h-8 rounded-full border-ice-200 text-ice-700 hover:bg-ice-50 shadow-sm">
              Show all reminders
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
