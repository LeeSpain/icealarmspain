
import React from "react";
import { AlertTriangle } from "lucide-react";

export const MedicationAlert: React.FC = () => {
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200 shadow-md mb-8 animate-slide-up animate-delay-500">
      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 border border-amber-200">
        <AlertTriangle size={20} className="text-amber-600" />
      </div>
      <div>
        <p className="font-medium text-amber-800">Medication Reminder</p>
        <p className="text-sm text-amber-700">
          Your next medication dose is in 45 minutes. The Medical Dispenser is prepared.
        </p>
      </div>
    </div>
  );
};
