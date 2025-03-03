
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { toast } from "react-toastify";

interface ShiftAssignmentProps {
  date: Date;
}

const ShiftAssignment: React.FC<ShiftAssignmentProps> = ({ date }) => {
  const handleAssignShift = () => {
    toast.success("Shift scheduled successfully");
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Assign Shift</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="selected-date">Date</Label>
          <Input
            id="selected-date"
            value={format(date, "MMMM d, yyyy")}
            readOnly
            className="bg-muted/50"
          />
        </div>
        
        <div>
          <Label htmlFor="agent">Agent</Label>
          <Select>
            <SelectTrigger id="agent">
              <SelectValue placeholder="Select agent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="carlos">Carlos Rodriguez</SelectItem>
              <SelectItem value="maria">Maria Lopez</SelectItem>
              <SelectItem value="juan">Juan Perez</SelectItem>
              <SelectItem value="elena">Elena Gomez</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="shift-type">Shift Type</Label>
          <Select>
            <SelectTrigger id="shift-type">
              <SelectValue placeholder="Select shift type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="regular">Regular (8AM - 4PM)</SelectItem>
              <SelectItem value="evening">Evening (4PM - 12AM)</SelectItem>
              <SelectItem value="night">Night (12AM - 8AM)</SelectItem>
              <SelectItem value="custom">Custom Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full" onClick={handleAssignShift}>
          Assign Shift
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShiftAssignment;
