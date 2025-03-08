
import React, { useState } from "react";
import { Calendar as CalendarIcon, Users, Clock, File, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import ScheduleWeekView from "./ScheduleWeekView";
import AgentsList from "./AgentsList";
import ShiftAssignment from "./ShiftAssignment";

const AgentSchedule: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedView, setSelectedView] = useState("week");
  
  const handleAddShift = () => {
    console.log("Add new shift functionality will be available soon");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Agent Schedule</h2>
          <p className="text-muted-foreground">
            Manage agent shifts and scheduling for the call center
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(date, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Button onClick={handleAddShift}>
            <Plus className="mr-2 h-4 w-4" />
            New Shift
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Schedule</CardTitle>
              <Tabs value={selectedView} onValueChange={setSelectedView}>
                <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="day">Day</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            {selectedView === "week" ? (
              <ScheduleWeekView currentDate={date} />
            ) : (
              <div className="text-center py-8">
                <Clock className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Day view is coming soon</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <AgentsList />
          <ShiftAssignment date={date} />
        </div>
      </div>
    </div>
  );
};

export default AgentSchedule;
