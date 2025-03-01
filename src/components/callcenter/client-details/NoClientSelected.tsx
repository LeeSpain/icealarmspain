
import React from "react";
import { User } from "lucide-react";

const NoClientSelected: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center p-12 bg-muted rounded-lg">
        <User className="h-16 w-16 mb-4 mx-auto text-muted-foreground" />
        <h3 className="text-xl font-medium mb-2">No Client Selected</h3>
        <p className="text-muted-foreground">
          Select a client to view their details or select a ticket to view the associated client
        </p>
      </div>
    </div>
  );
};

export default NoClientSelected;
