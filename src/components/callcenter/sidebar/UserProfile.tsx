
import React from "react";
import { LogOut, User as UserIcon } from "lucide-react";
import { User } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface UserProfileProps {
  user: User | null;
  collapsed: boolean;
  handleLogout?: () => Promise<void>;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, collapsed, handleLogout }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogoutAction = async () => {
    if (handleLogout) {
      await handleLogout();
    } else {
      await logout();
      navigate('/login');
    }
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name.split(' ').map(part => part.charAt(0)).join('').toUpperCase();
  };

  // Determine role display text and color
  const getRoleBadge = (role: string | null) => {
    switch (role) {
      case 'callcenter':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Call Center Agent</Badge>;
      case 'admin':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">Admin</Badge>;
      case 'member':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Member</Badge>;
      default:
        return <Badge variant="outline">User</Badge>;
    }
  };

  if (collapsed) {
    return (
      <div className="flex flex-col items-center gap-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src="" />
          <AvatarFallback>{user?.name ? getInitials(user.name) : 'A'}</AvatarFallback>
        </Avatar>
        <ModeToggle />
        <Button variant="ghost" size="icon" onClick={handleLogoutAction}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center">
        <Avatar className="h-10 w-10">
          <AvatarImage src="" />
          <AvatarFallback>{user?.name ? getInitials(user.name) : 'A'}</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <p className="text-sm font-medium">{user?.name || 'Agent'}</p>
          <p className="text-xs text-muted-foreground">{user?.email || 'agent@example.com'}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        {user?.role && getRoleBadge(user.role)}
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={handleLogoutAction}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
