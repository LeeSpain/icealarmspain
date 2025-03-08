
import React from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserManagementHeaderProps {
  onCreateUser: () => void;
}

export const UserManagementHeader: React.FC<UserManagementHeaderProps> = ({ onCreateUser }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-ice-800">User Management</h2>
        <p className="text-muted-foreground">Manage users, assign roles, and track user activity</p>
      </div>
      <Button onClick={onCreateUser} className="flex items-center gap-2">
        <UserPlus size={16} />
        Add User
      </Button>
    </div>
  );
};
