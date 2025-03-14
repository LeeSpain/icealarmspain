
import React from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserManagementHeaderProps {
  onCreateUser: () => void;
}

export const UserManagementHeader: React.FC<UserManagementHeaderProps> = ({ onCreateUser }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <p className="text-muted-foreground mt-1">Manage users, assign roles, and track user activity</p>
      </div>
      <Button onClick={onCreateUser} className="flex items-center gap-2 bg-ice-600 hover:bg-ice-700 text-white self-start sm:self-center">
        <UserPlus size={16} />
        Add User
      </Button>
    </div>
  );
};
