
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Interaction } from "./types";
import { formatDateTime, getInteractionTypeBadge } from "./utils";

interface InteractionHistoryTabProps {
  interactions: Interaction[];
}

const InteractionHistoryTab: React.FC<InteractionHistoryTabProps> = ({ interactions }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Recent Interactions</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Agent</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {interactions.map((interaction) => (
            <TableRow key={interaction.id}>
              <TableCell>{formatDateTime(interaction.date)}</TableCell>
              <TableCell>
                <span className={getInteractionTypeBadge(interaction.type)}>
                  {interaction.type.charAt(0).toUpperCase() + interaction.type.slice(1)}
                </span>
              </TableCell>
              <TableCell>{interaction.agent}</TableCell>
              <TableCell>{interaction.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InteractionHistoryTab;
