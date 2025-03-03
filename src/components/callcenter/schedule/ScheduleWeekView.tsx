
import React from "react";
import { add, format, startOfWeek } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ScheduleWeekViewProps {
  currentDate: Date;
}

// Mock schedule data
const mockScheduleData = [
  { 
    agentName: "Carlos Rodriguez", 
    shifts: [
      { day: 0, time: "8:00 AM - 4:00 PM", type: "regular" },
      { day: 1, time: "8:00 AM - 4:00 PM", type: "regular" },
      { day: 2, time: "8:00 AM - 4:00 PM", type: "regular" },
      { day: 3, time: "8:00 AM - 4:00 PM", type: "regular" },
      { day: 4, time: "8:00 AM - 4:00 PM", type: "regular" },
    ]
  },
  { 
    agentName: "Maria Lopez", 
    shifts: [
      { day: 0, time: "4:00 PM - 12:00 AM", type: "evening" },
      { day: 1, time: "4:00 PM - 12:00 AM", type: "evening" },
      { day: 2, time: "4:00 PM - 12:00 AM", type: "evening" },
      { day: 3, time: "4:00 PM - 12:00 AM", type: "evening" },
      { day: 4, time: "4:00 PM - 12:00 AM", type: "evening" },
    ]
  },
  { 
    agentName: "Juan Perez", 
    shifts: [
      { day: 5, time: "8:00 AM - 4:00 PM", type: "weekend" },
      { day: 6, time: "8:00 AM - 4:00 PM", type: "weekend" },
      { day: 0, time: "12:00 AM - 8:00 AM", type: "night" },
      { day: 1, time: "12:00 AM - 8:00 AM", type: "night" },
      { day: 2, time: "12:00 AM - 8:00 AM", type: "night" },
    ]
  },
  { 
    agentName: "Elena Gomez", 
    shifts: [
      { day: 2, time: "8:00 AM - 4:00 PM", type: "regular" },
      { day: 3, time: "8:00 AM - 4:00 PM", type: "regular" },
      { day: 4, time: "8:00 AM - 4:00 PM", type: "regular" },
      { day: 5, time: "12:00 PM - 8:00 PM", type: "weekend" },
      { day: 6, time: "12:00 PM - 8:00 PM", type: "weekend" },
    ]
  },
];

const ScheduleWeekView: React.FC<ScheduleWeekViewProps> = ({ currentDate }) => {
  // Generate array of dates for the week
  const weekStart = startOfWeek(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => add(weekStart, { days: i }));
  
  const getShiftBadgeColor = (type: string) => {
    switch(type) {
      case "regular":
        return "bg-blue-100 text-blue-800";
      case "evening":
        return "bg-purple-100 text-purple-800";
      case "night":
        return "bg-indigo-100 text-indigo-800";
      case "weekend":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <div className="overflow-auto">
      <div className="min-w-[800px]">
        {/* Header row with days */}
        <div className="grid grid-cols-8 gap-4 mb-4">
          <div className="font-medium">Agent</div>
          {weekDays.map((day, i) => (
            <div key={i} className="text-center font-medium">
              <div>{format(day, "EEE")}</div>
              <div className="text-sm text-muted-foreground">{format(day, "d MMM")}</div>
            </div>
          ))}
        </div>
        
        {/* Schedule rows */}
        {mockScheduleData.map((agent, agentIndex) => (
          <div key={agentIndex} className="grid grid-cols-8 gap-4 py-3 border-t">
            <div className="font-medium truncate">{agent.agentName}</div>
            
            {weekDays.map((_, dayIndex) => {
              const shift = agent.shifts.find(s => s.day === dayIndex);
              
              return (
                <div key={dayIndex} className="text-center">
                  {shift ? (
                    <Badge className={cn("whitespace-nowrap", getShiftBadgeColor(shift.type))}>
                      {shift.time}
                    </Badge>
                  ) : (
                    <span className="text-sm text-muted-foreground">Off</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleWeekView;
