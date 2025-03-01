
import React from "react";
import { LogOut } from "lucide-react";
import { User } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

interface UserProfileProps {
  user: User | null;
  collapsed: boolean;
  handleLogout: () => Promise<void>;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, collapsed, handleLogout }) => {
  if (collapsed) {
    return (
      <div className="flex flex-col items-center gap-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src="" />
          <AvatarFallback>{user?.name?.charAt(0) || 'A'}</AvatarFallback>
        </Avatar>
        <ModeToggle />
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Avatar className="h-8 w-8">
          <AvatarImage src="" />
          <AvatarFallback>{user?.name?.charAt(0) || 'A'}</AvatarFallback>
        </Avatar>
        <div className="ml-2">
          <p className="text-sm font-medium">{user?.name || 'Agent'}</p>
          <p className="text-xs text-muted-foreground">{user?.email || 'agent@example.com'}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
