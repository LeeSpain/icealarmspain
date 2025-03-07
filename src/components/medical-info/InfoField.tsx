
import React from "react";

interface InfoFieldProps {
  label: string;
  value: string;
  editMode: boolean;
  onChange: (value: string) => void;
}

export const InfoField: React.FC<InfoFieldProps> = ({ 
  label, 
  value, 
  editMode, 
  onChange 
}) => {
  return (
    <div className="space-y-1">
      <div className="text-sm font-medium text-gray-500">{label}</div>
      {editMode ? (
        <input 
          type="text" 
          defaultValue={value} 
          className="w-full p-2 border rounded-md" 
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div className="p-2 bg-gray-50 rounded-md border">{value}</div>
      )}
    </div>
  );
};
