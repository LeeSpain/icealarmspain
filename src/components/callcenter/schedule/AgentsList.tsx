
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Phone, Clock } from "lucide-react";

const AgentsList = () => {
  // Mock agent data
  const agents = [
    { id: 1, name: "Carlos Rodriguez", status: "online", role: "Senior Agent", handlesCalls: 12 },
    { id: 2, name: "Maria Lopez", status: "online", role: "Senior Agent", handlesCalls: 10 },
    { id: 3, name: "Juan Perez", status: "offline", role: "Junior Agent", handlesCalls: 8 },
    { id: 4, name: "Elena Gomez", status: "away", role: "Team Lead", handlesCalls: 6 },
  ];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800";
      case "offline":
        return "bg-gray-100 text-gray-800";
      case "away":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center">
          <Users className="h-4 w-4 mr-1" />
          Agents On Duty
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ul className="space-y-2">
          {agents.map(agent => (
            <li key={agent.id} className="flex items-center justify-between py-1">
              <div>
                <p className="font-medium text-sm">{agent.name}</p>
                <p className="text-xs text-muted-foreground">{agent.role}</p>
              </div>
              <div className="flex items-center">
                <div className="mr-2 flex items-center text-xs text-muted-foreground">
                  <Phone className="h-3 w-3 mr-1" />
                  <span>{agent.handlesCalls}</span>
                </div>
                <Badge className={getStatusColor(agent.status)}>
                  {agent.status}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default AgentsList;
