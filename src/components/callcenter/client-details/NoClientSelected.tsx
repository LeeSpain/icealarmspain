
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface NoClientSelectedProps {
  onShowAllClients: () => void;
}

const NoClientSelected: React.FC<NoClientSelectedProps> = ({ onShowAllClients }) => {
  return (
    <Card className="text-center">
      <CardContent className="p-10 flex flex-col items-center">
        <div className="w-16 h-16 bg-ice-100 rounded-full flex items-center justify-center mb-4">
          <svg 
            className="w-8 h-8 text-ice-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" 
            />
          </svg>
        </div>
        
        <h3 className="text-lg font-medium mb-2">No Client Selected</h3>
        <p className="text-muted-foreground mb-6">
          Please select a client to view their details or click below to see all clients.
        </p>
        
        <Button onClick={onShowAllClients}>
          View All Clients
        </Button>
      </CardContent>
    </Card>
  );
};

export default NoClientSelected;
