
import React, { useState } from "react";
import { LogOut, User as UserIcon, Circle } from "lucide-react";
import { User } from "@/context/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Status type definition
export type AgentStatus = "online" | "away" | "offline";

interface UserProfileProps {
  user: User | null;
  collapsed: boolean;
  handleLogout?: () => Promise<void>;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, collapsed, handleLogout }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState<AgentStatus>("online");

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

  // Get color for status indicator
  const getStatusColor = (status: AgentStatus): string => {
    switch (status) {
      case "online": return "text-green-500";
      case "away": return "text-amber-500";
      case "offline": return "text-gray-400";
      default: return "text-gray-400";
    }
  };

  // Get text for status
  const getStatusText = (status: AgentStatus): string => {
    switch (status) {
      case "online": return "Online";
      case "away": return "Away";
      case "offline": return "Offline";
      default: return "Offline";
    }
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
        <div className="relative">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" />
            <AvatarFallback>{user?.name ? getInitials(user.name) : 'A'}</AvatarFallback>
          </Avatar>
          <Circle className={`absolute -bottom-1 -right-1 h-3 w-3 ${getStatusColor(status)} fill-current`} />
        </div>
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
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage src="" />
            <AvatarFallback>{user?.name ? getInitials(user.name) : 'A'}</AvatarFallback>
          </Avatar>
          <Circle className={`absolute -bottom-1 -right-1 h-3 w-3 ${getStatusColor(status)} fill-current`} />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">{user?.name || 'Agent'}</p>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <p className={`text-xs flex items-center gap-1 ${getStatusColor(status)}`}>
                <Circle className="h-2 w-2 fill-current" />
                {getStatusText(status)}
              </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatus("online")} className="flex items-center gap-2">
                <Circle className="h-3 w-3 text-green-500 fill-current" />
                <span>Online</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatus("away")} className="flex items-center gap-2">
                <Circle className="h-3 w-3 text-amber-500 fill-current" />
                <span>Away</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatus("offline")} className="flex items-center gap-2">
                <Circle className="h-3 w-3 text-gray-400 fill-current" />
                <span>Offline</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
