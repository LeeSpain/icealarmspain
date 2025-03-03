
import React from "react";
import { PlusCircle } from "lucide-react";

const EmptyNotificationsState: React.FC = () => {
  return (
    <div className="py-6 text-center">
      <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
        <PlusCircle className="h-6 w-6 text-green-600" />
      </div>
      <h3 className="text-sm font-medium">All clear!</h3>
      <p className="text-xs text-gray-500 mt-1">No urgent items requiring attention</p>
    </div>
  );
};

export default EmptyNotificationsState;
