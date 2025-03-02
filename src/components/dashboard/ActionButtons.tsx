
import React from "react";
import { Button } from "@/components/ui/button";

export const ActionButtons: React.FC = () => {
  return (
    <div className="text-center">
      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
        Experience the full benefits of the ICE Members Dashboard with our complete range of smart devices.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button className="bg-ice-600 hover:bg-ice-700 rounded-full px-6 shadow-md">
          Explore Our Products
        </Button>
        <Button variant="outline" className="border-ice-300 text-ice-700 hover:bg-ice-50 rounded-full px-6 shadow-sm">
          Become a Member
        </Button>
        <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full px-6 shadow-sm">
          Request Live Demo
        </Button>
      </div>
    </div>
  );
};
