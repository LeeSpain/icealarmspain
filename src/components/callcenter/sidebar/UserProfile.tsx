
import React from 'react';
import { User as UserType } from '@/context/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Settings } from 'lucide-react';

interface UserProfileProps {
  user: UserType;
  collapsed: boolean;
  handleLogout?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ 
  user, 
  collapsed,
  handleLogout 
}) => {
  const userInitial = user?.displayName?.charAt(0) || user?.name?.charAt(0) || 'U';
  
  if (collapsed) {
    return (
      <Avatar className="h-8 w-8">
        <AvatarImage src={user?.photoURL || undefined} alt={user?.displayName || user?.name || 'User'} />
        <AvatarFallback className="bg-ice-100 text-ice-800">{userInitial}</AvatarFallback>
      </Avatar>
    );
  }
  
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-9 w-9">
        <AvatarImage src={user?.photoURL || undefined} alt={user?.displayName || user?.name || 'User'} />
        <AvatarFallback className="bg-ice-100 text-ice-800">{userInitial}</AvatarFallback>
      </Avatar>
      <div className="flex-1 overflow-hidden">
        <p className="text-sm font-medium truncate">{user?.displayName || user?.name || 'Call Center Agent'}</p>
        <p className="text-xs text-muted-foreground truncate">{user?.email || 'agent@ice-alarm.com'}</p>
      </div>
    </div>
  );
};

export default UserProfile;
